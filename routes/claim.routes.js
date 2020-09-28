const { Router } = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const db = require('../db/db')
const sequelize = require('sequelize')
const Op = sequelize.Op
const path = require('path')
const auth = require('../middleware/auth.middleware')
const convert = require('xml-js')
const fs = require('fs')
const Claim = require('../models/Claim');
const Timeline = require('../models/Timeline');
const Departament = require('../models/Departament')
const User = require('../models/User');
const router = Router();

/*
    метод поиска обращения
*/
router.get('/search', async (req, res) => {
    let { term } = req.query
    // term = term.toLowerCase()
    Claim.findAll({ where: { fio: { [Op.like]: '%' + term + '%' } } })
        .then(users => {
            return res.json({
                success: true,
                users
            });
        })
        .catch(err => {
            return res.json({
                success: false,
                message: "Ничего не найдено по вашему запросу!",
                err
            });
        })
});
/*
    метод экспорта обращений
*/
router.get('/export', auth, paginatedResults(Claim), async (req, res) => {
    const exportXML = await convert.json2xml(res.paginatedResults.results, { compact: true, ignoreComment: true, spaces: 4 });
    var date = new Date();
    var datenow = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds()
    var files = 'export/' + datenow + '_export.xml'
    fs.writeFileSync(files, exportXML)
    setTimeout(() => {
        rmDir('export')
    }, 1800000);
    return res.json({
        success: true,
        message: 'Экспорт обращений завершен',
        fileName: datenow + '_export.xml',
        files: files
    });
});
/*
    метод отдачи обращений
*/
router.get('/', auth, paginatedResults(Claim), (req, res) => {
    return res.json({
        success: true,
        claims: res.paginatedResults
    });
});

/* 
    метод добавления обращения
*/
router.post('/', auth, async (req, res, next) => {
    const {
        status,
        timeline,
        userId,
        filesPath,
        address,
        description,
        answerFiles,
        controlDate,
        creationDate,
        createdUser,
        departament,
        departamentId,
        responsibleId,
        responsible,
        answerDescription,
    } = req.body
    Claim.create({
        status,
        timeline,
        userId,
        filesPath,
        address,
        description,
        answerFiles,
        controlDate: Date(controlDate),
        creationDate: Date(creationDate),
        createdUser,
        departament,
        departamentId,
        responsibleId,
        responsible,
        answerDescription,
    })
        .then(async claims => {
            let autor = await User.findOne({ where: { id: claims.dataValues.userId }, raw: true })
            let timelines = await Timeline.create({
                event: 'created',
                text: `Заявка № ${claims.dataValues.id} была создана`,
                time: claims.dataValues.credate,
                claimId: claims.dataValues.id,
                userId: claims.dataValues.userId,
                autor: autor.username
            })
            return res.json({
                success: true,
                claims,
                timelines,
                message: 'Заявка успешно добавлена'
            });
        }).catch((err) => {
            return res.json({
                success: false,
                message: 'Не удалось сохранить заявку',
                err: err
            });
        });
});
/*
    метод получения обращения по ID
*/
router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    await Claim.findOne({ where: { id } })
        .then((claim) => {
            return res.json({
                success: true,
                claim
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                message: 'Не удалось получить заявку',
                err: err
            });
        });
});
/*
    метод обновления обращения по ID
*/
router.put('/:id', auth, async (req, res, next) => {
    let id = req.params.id
    const {
        status,
        timeline,
        userId,
        filesPath,
        description,
        answerFiles,
        controlDate,
        creationDate,
        departamentId,
        createdUser,
        departament,
        responsibleId,
        responsible,
        answerDescription,
    } = req.body
    // обновление обращения
    Claim.update({
        status,
        timeline,
        userId,
        filesPath,
        description,
        answerFiles,
        controlDate,
        creationDate,
        departamentId,
        createdUser,
        departament,
        responsibleId,
        responsible,
        answerDescription,
    }, {
        where: { id }
    })
        .then(async claims => {
            return res.json({
                success: true,
                message: 'Заявка успешно обновлена.',
                claims,
            });
        }).catch(err => {
            return res.json({
                success: false,
                message: 'Не удалось обновить заявку.',
                err: err
            });
        });
});
/*
    метод удаления обращения по ID
*/
router.delete('/:id', auth, async (req, res, next) => {
    let id = req.params.id;
    await Claim.findOne({ where: { id } })
        .then((claim) => {
            claim.filesPath.array.forEach(filePath => {
                fs.unlinkSync(filePath);
            });
        })
        .catch((err) => {
            //console.log(err)
        });

    Claim.destroy({
        where: { id }
    }).then(claims => {
        return res.json({
            success: true,
            message: 'Обращение успешно удалено',
            claims
        });
    })
        .catch((err) => {
            return res.json({
                success: false,
                message: 'Невозможно удалить обращение',
                err: err
            });
        })
})
/*
    функция очистки папки экспорта
*/
rmDir = function (dirPath, removeSelf) {
    // if (removeSelf === undefined)
    //     removeSelf = true;
    try { var files = fs.readdirSync(dirPath); }
    catch (e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    // if (removeSelf)
    //     fs.rmdirSync(dirPath);
};

/*
    функция предварительной обработки, сортировки и фильтрации, перед отдачей на клиентскую часть
*/

function getTotal(model, searchparam, search, status = 'Все', sortIsmain = 'all', userId, dateintervalfrom, dateintervalto, dateinterval) {
    var res
    if (search !== '' && search !== undefined) {
        res = model.findAll({ where: { searchparam: { [Op.like]: '%' + search + '%' } }, raw: true })
        if (searchparam == "fio") {
            res = model.findAll({ where: { fio: { [Op.like]: '%' + search + '%' } }, raw: true })
        } else if (searchparam == "mobilenumber") {
            res = model.findAll({ where: { mobilenumber: { [Op.like]: '%' + search + '%' } }, raw: true })
        } else if (searchparam == "phonenumber") {
            res = model.findAll({ where: { phonenumber: { [Op.like]: '%' + search + '%' } }, raw: true })
        } else if (searchparam == "address") {
            res = model.findAll({ where: { address: { [Op.like]: '%' + search + '%' } }, raw: true })
        } else if (searchparam == "text") {
            res = model.findAll({ where: { text: { [Op.like]: '%' + search + '%' } }, raw: true })
        }
    } else if (dateinterval !== undefined) {
        res = model.findAll({ where: { credate: { [Op.gt]: dateinterval } } })
    } else if (dateintervalfrom !== undefined || dateintervalto !== undefined) {
        res = model.findAll({ where: { credate: { [Op.between]: [dateintervalfrom, dateintervalto] } } })
    } else if (sortIsmain == 'main') {
        res = model.findAll({ where: { userId }, raw: true })
    } else if (status !== 'Все') {
        res = model.findAll({ where: { status: status }, raw: true })
    } else {
        res = model.findAll({ raw: true })
    }
    return res
}
function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.search
        const searchparam = req.query.searchparam
        const status = req.query.status
        const sortIsmain = req.query.sortIsmain
        const dateinterval = req.query.dateinterval
        const dateintervalfrom = req.query.dateintervalfrom
        const dateintervalto = req.query.dateintervalto
        const userId = req.query.userId
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}
        let total = await getTotal(model, searchparam, search, status, sortIsmain, userId, dateintervalfrom, dateintervalto, dateinterval)
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        const thisUser = jwt.verify(token, config.get('jwtSecret'))
        const departament = await Departament.findOne({where: {id:thisUser.departamentId}, raw: true})
        results.pagin = {
            currentPage: page,
            total: total.length,
            limit: limit,
            pageCount: Math.ceil(total.length / limit)
        }
        if (endIndex < total.length) {
            results.next = {
                page: page + 1,
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
            }
        }
        try {
            /*
                условие поиска обращений
            */
            // if (search !== '' && search !== undefined) {
            //     if (searchparam == "fio") {
            //         results.results = await model.findAll({
            //             where: { fio: { [Op.like]: '%' + search + '%' } },
            //             order: [
            //                 ["id", 'DESC']
            //             ],
            //             offset: (startIndex),
            //             limit: limit,
            //             raw: true
            //         })
            //         res.paginatedResults = results
            //     } else if (searchparam == "mobilenumber") {
            //         results.results = await model.findAll({
            //             where: { mobilenumber: { [Op.like]: '%' + search + '%' } },
            //             order: [
            //                 ["id", 'DESC']
            //             ],
            //             offset: (startIndex),
            //             limit: limit,
            //             raw: true
            //         })
            //         res.paginatedResults = results
            //     } else if (searchparam == "phonenumber") {
            //         results.results = await model.findAll({
            //             where: { phonenumber: { [Op.like]: '%' + search + '%' } },
            //             order: [
            //                 ["id", 'DESC']
            //             ],
            //             offset: (startIndex),
            //             limit: limit,
            //             raw: true
            //         })
            //         res.paginatedResults = results
            //     } else if (searchparam == "address") {
            //         results.results = await model.findAll({
            //             where: { address: { [Op.like]: '%' + search + '%' } },
            //             order: [
            //                 ["id", 'DESC']
            //             ],
            //             offset: (startIndex),
            //             limit: limit,
            //             raw: true
            //         })
            //         res.paginatedResults = results
            //     } else if (searchparam == "text") {
            //         results.results = await model.findAll({
            //             where: { text: { [Op.like]: '%' + search + '%' } },
            //             order: [
            //                 ["id", 'DESC']
            //             ],
            //             offset: (startIndex),
            //             limit: limit,
            //             raw: true
            //         })
            //         res.paginatedResults = results
            //     }
            // }
            // else if (dateinterval !== undefined) {
            //     results.results = await model.findAll({
            //         where: {
            //             credate: {
            //                 [Op.gt]: dateinterval
            //                 //[Op.lte]: dateintervalto
            //             }
            //         },
            //         order: [
            //             ["id", 'DESC']
            //         ],
            //         offset: (startIndex),
            //         limit: limit,
            //     })
            //     results.results
            //     res.paginatedResults = results
            // }
            // else if (dateintervalfrom !== undefined || dateintervalto !== undefined) {
            //     results.results = await model.findAll({
            //         where: {
            //             credate: {
            //                 [Op.between]: [dateintervalfrom, dateintervalto]
            //                 //[Op.lte]: dateintervalto
            //             }
            //         },
            //         order: [
            //             ["id", 'DESC']
            //         ],
            //         offset: (startIndex),
            //         limit: limit,
            //     })
            //     results.results
            //     res.paginatedResults = results
            // }
            // else {
            //     if (sortIsmain == 'main') {
            //         results.results = await model.findAll(
            //             {
            //                 where: { userId },
            //                 order: [
            //                     ["id", 'DESC']
            //                 ],
            //                 offset: (startIndex),
            //                 limit: limit,
            //             })
            //         res.paginatedResults = results
            //     } else {
                    
            //         results.results = await model.findAll({
            //             order: [
            //                 ["id", 'DESC']
            //             ],
            //             offset: (startIndex),
            //             limit: limit,
            //         })
            //         res.paginatedResults = results
            //     }
            // }
            if(thisUser.permission == 'Руководитель' && departament.name == 'АМС'){
                results.results = await model.findAll({
                    where: {status},
                    order: [
                        ["id", 'DESC']
                    ],
                    offset: (startIndex),
                    limit: limit,
                })
                res.paginatedResults = results
            }else if(thisUser.permission == 'Руководитель'){
                results.results = await model.findAll({
                    where: { departamentid: departament.id, status },
                    order: [
                        ["id", 'DESC']
                    ],
                    offset: (startIndex),
                    limit: limit,
                })
                res.paginatedResults = results
            }else if(thisUser.permission == 'Сотрудник'){
                results.results = await model.findAll({
                    where: { departamentid: departament.id, userId: thisUser.userId },
                    order: [
                        ["id", 'DESC']
                    ],
                    offset: (startIndex),
                    limit: limit,
                })
                res.paginatedResults = results
            }else if(thisUser.permission == 'root'){
                results.results = await model.findAll({
                    where: {status},
                    order: [
                        ["id", 'DESC']
                    ],
                    offset: (startIndex),
                    limit: limit,
                })
                res.paginatedResults = results
            }

            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

module.exports = router;
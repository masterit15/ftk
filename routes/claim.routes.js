const { Router } = require('express')
const db = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const path = require('path')
const auth = require('../middleware/auth.middleware')
const convert = require('xml-js')
const fs = require('fs')
const Claim = require('../models/Claim');
const Timeline = require('../models/Timeline');
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
        departmentId,
        responsibleId,
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
        departmentId,
        responsibleId,
        answerDescription,
    })
        .then(async claims => {
            let autor = await User.findOne({ where: { id: claims.dataValues.userId }, raw: true })
            let timelines = await Timeline.create({
                event: 'created',
                text: `Обращение № ${claims.dataValues.regnumber} было создано`,
                time: claims.dataValues.credate,
                claimId: claims.dataValues.id,
                userId: claims.dataValues.userId,
                autor: autor.login
            })
            return res.json({
                success: true,
                claims,
                timelines,
                message: 'Обращение успешно добавлено в базу данных.'
            });
        }).catch((err) => {
            return res.json({
                success: false,
                message: 'Не удалось сохранить обрашение',
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
                message: 'Не удалось получить обращение',
                err: err
            });
        });
});
/*
    метод добавления в таймлайн обращения по ID
*/
router.post('/tml/', auth, async (req, res, next) => {
    const { event, text, time, file, ClaimId, userId } = req.body
    let message
    if (event == 'comment') {
        message = 'Комментарий добавлен'
    } else {
        message = text
    }
    let autor = await User.findOne({ where: { id: userId }, raw: true })
    Timeline.create({
        event,
        text,
        time,
        file,
        cqlaimId,
        userId,
        autor: autor.login
    }).then(timelines => {
        return res.json({
            success: true,
            message,
            timelines
        });
    }).catch(err => {
        return res.json({
            success: false,
            message: 'Не удается добавить комментарий',
            err: err
        });
    });
});
/*
    метод получение таймлайна по ID обращения
*/
router.get('/tml/:id', auth, async (req, res, next) => {
    let id = req.params.id
    await Timeline.findAll({ where: { ClaimId: id }, raw: true })
        .then(timelines => {
            return res.json({
                success: true,
                timelines: timelines
            });
        })
        .catch(err => {
            return res.json({
                success: false,
                err: err
            });
        });
});
/*
    метод удаления таймлайна по ID
*/
router.delete('/tml/:id', auth, async (req, res, next) => {
    let id = req.params.id;
    Timeline.destroy({
        where: { id }
    }).then(timeline => {
        return res.json({
            success: true,
            message: 'Комментарий успешно удален',
            timeline
        });
    })
        .catch((err) => {
            return res.json({
                success: false,
                message: 'Невозможно удалить комментарий',
                err: err
            });
        })
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
        departmentId,
        responsibleId,
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
        departmentId,
        responsibleId,
        answerDescription,
    }, {
        where: { id }
    })
        .then(claims => {
            return res.json({
                success: true,
                message: 'Обращение успешно обновлено.',
                claims,
            });
        }).catch(err => {
            return res.json({
                success: false,
                message: 'Не удалось обновить обрашение',
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
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
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
        var total = await getTotal(model, searchparam, search, status, sortIsmain, userId, dateintervalfrom, dateintervalto, dateinterval)
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
            if (search !== '' && search !== undefined) {
                if (searchparam == "fio") {
                    results.results = await model.findAll({
                        where: { fio: { [Op.like]: '%' + search + '%' } },
                        order: [
                            ["id", 'DESC']
                        ],
                        offset: (startIndex),
                        limit: limit,
                        raw: true
                    })
                    res.paginatedResults = results
                } else if (searchparam == "mobilenumber") {
                    results.results = await model.findAll({
                        where: { mobilenumber: { [Op.like]: '%' + search + '%' } },
                        order: [
                            ["id", 'DESC']
                        ],
                        offset: (startIndex),
                        limit: limit,
                        raw: true
                    })
                    res.paginatedResults = results
                } else if (searchparam == "phonenumber") {
                    results.results = await model.findAll({
                        where: { phonenumber: { [Op.like]: '%' + search + '%' } },
                        order: [
                            ["id", 'DESC']
                        ],
                        offset: (startIndex),
                        limit: limit,
                        raw: true
                    })
                    res.paginatedResults = results
                } else if (searchparam == "address") {
                    results.results = await model.findAll({
                        where: { address: { [Op.like]: '%' + search + '%' } },
                        order: [
                            ["id", 'DESC']
                        ],
                        offset: (startIndex),
                        limit: limit,
                        raw: true
                    })
                    res.paginatedResults = results
                } else if (searchparam == "text") {
                    results.results = await model.findAll({
                        where: { text: { [Op.like]: '%' + search + '%' } },
                        order: [
                            ["id", 'DESC']
                        ],
                        offset: (startIndex),
                        limit: limit,
                        raw: true
                    })
                    res.paginatedResults = results
                }
            } else if (status !== 'Все') {
                results.results = await model.findAll({
                    where: { status: status },
                    order: [
                        ["id", 'DESC']
                    ],
                    offset: (startIndex),
                    limit: limit,
                    raw: true
                })
                results.results
                res.paginatedResults = results
            }
            else if (dateinterval !== undefined) {
                results.results = await model.findAll({
                    where: {
                        credate: {
                            [Op.gt]: dateinterval
                            //[Op.lte]: dateintervalto
                        }
                    },
                    order: [
                        ["id", 'DESC']
                    ],
                    offset: (startIndex),
                    limit: limit,
                })
                results.results
                res.paginatedResults = results
            }
            else if (dateintervalfrom !== undefined || dateintervalto !== undefined) {
                results.results = await model.findAll({
                    where: {
                        credate: {
                            [Op.between]: [dateintervalfrom, dateintervalto]
                            //[Op.lte]: dateintervalto
                        }
                    },
                    order: [
                        ["id", 'DESC']
                    ],
                    offset: (startIndex),
                    limit: limit,
                })
                results.results
                res.paginatedResults = results
            }
            else {
                if (sortIsmain == 'main') {
                    results.results = await model.findAll(
                        {
                            where: { userId },
                            order: [
                                ["id", 'DESC']
                            ],
                            offset: (startIndex),
                            limit: limit,
                        })
                    res.paginatedResults = results
                } else {
                    
                    results.results = await model.findAll({
                        order: [
                            ["id", 'DESC']
                        ],
                        offset: (startIndex),
                        limit: limit,
                    })
                    console.log(results.results)
                    res.paginatedResults = results
                }
            }
            results.results = await model.findAll({
                order: [
                    ["id", 'DESC']
                ],
                offset: (startIndex),
                limit: limit,
            })
            console.log(results.results)
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

module.exports = router;
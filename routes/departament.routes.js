const { Router } = require('express')
const sequelize = require('sequelize')
const Op = sequelize.Op
const auth = require('../middleware/auth.middleware')
const fs = require('fs')
const Claim = require('../models/Claim');
const User = require('../models/User');
const Departament = require('../models/Departament')
const router = Router();

/* 
    метод добавления управления (отдела)
*/
router.post('/', auth, async (req, res, next) => {
  const {
    claim,
    name,
  } = req.body
  Departament.create({
    claim,
    name,
      })
      .then(async departaments => {
          return res.json({
              success: true,
              message: 'Управление успешно добавлено в базу данных.',
              departaments
          });
      }).catch((err) => {
          return res.json({
              success: false,
              message: 'Не удалось сохранить управление',
              err: err
          });
      });
});
/* 
    метод получениея управления (отдела)
*/
router.get('/', auth, paginatedResults(Departament), (req, res) => {
  return res.json({
      success: true,
      departament: res.paginatedResults
  });
});


function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}
    const total = await model.findAll({ raw: true })
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
      // results.results = await model.findAll({
      //   order: [
      //     ["id"]
      //   ],
      //   offset: (startIndex),
      //   limit: limit,
      // })
      // res.paginatedResults = results
      if (search !== '' && search !== undefined) {
        results.results = await model.findAll({
          where: { username: { [Op.like]: '%' + search + '%' } },
          order: [
              ["id", 'DESC']
          ],
          offset: (startIndex),
          limit: limit,
          raw: true
      })
      res.paginatedResults = results
      } else {
          results.results = await model.findAll({
              order:[
                  ["id"]
              ],
              include: User,
              offset:(startIndex),
              limit : limit,
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
const { Router } = require('express')
const sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const config = require('config')
const Op = sequelize.Op
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Departament = require('../models/Departament')
const auth = require('../middleware/auth.middleware')
const router = Router()

/*
    метод регистрации
*/
router.post(
  '/',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ options: { min: 8 } })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }
      const { login, email, username, avatar, password, permission, departament } = req.body
      const hashedPassword = await bcrypt.hash(password, 12)
      const candidate = await User.findOne({ where: { login } })
      const dep = await Departament.findOne({ where: { name: departament } })
      let depID = null

      if (dep) {
        depID = dep.dataValues.id
      } else {
        await Departament.create({
          name: departament
        }).then(departament => {
          depID = departament.dataValues.id
        }).catch((err) => { });
      }
      if (candidate) {
        return res.json({ message: 'Такой пользователь уже существует' })
      }
      User.create({
        login,
        email,
        username,
        avatar,
        permission: permission ? permission : 'Сотрудник',
        password: hashedPassword,
        departamentId: depID
      }).then(users => {
        return res.status(201).json({
          success: true,
          message: 'Пользователь создан',
          users
        })
      }).catch((err) => {
        return res.status(500).json({
          success: false,
          message: 'Что-то пошло не так, попробуйте еще раз',
          err
        })
      });
    } catch (e) {
      res.status(500).json({
        err: e,
        message: 'Что-то пошло не так, попробуйте еще раз'
      })
    }
  })

/*
    метод получения списка пользователей
*/
router.get('/', auth, paginatedResults(User), (req, res) => {
  return res.json({
    success: true,
    user: res.paginatedResults
  });
});
/*
    метод получения пользователя по ID
*/
router.get('/:id', auth, async (req, res) => {
  let id = req.params.id;
  User.findOne({ where: { id } })
    .then(user => {
      if (!user) return;
      return res.json({
        success: true,
        message: 'Пользователь найден!',
        user: user
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: 'Пользователь не найден!',
        err: err
      });
    });

})
/*
    метод обновления пользователя по ID
*/
router.put('/', auth, async (req, res) => {
  const { login, email, username, avatar, permission, password } = req.body
  let id = req.body.id
  const hashedPassword = await bcrypt.hash(password, 12)
    password = hashedPassword
    User.update({
      login,
      email,
      username,
      avatar,
      permission,
      password
    }, {
      where: { id }
    }).then(users => {
      return res.json({
        success: true,
        message: 'Пользователь обновлен',
        users
      });
    })
      .catch((err) => {
        return res.json({
          success: false,
          message: 'Не удается обновить пользователя',
          err: err
        });
      })
})
/*
    метод удаления пользователя по ID
*/
router.delete('/delete', auth, (req, res, next) => {
  let id = req.query.id;
  User.destroy({
    where: { id }
  }).then(user => {
    return res.json({
      success: true,
      message: 'Пользователь успешно удален',
      user
    });
  })
    .catch((err) => {
      return res.json({
        success: false,
        message: 'Невозможно удалить пользователя',
        err: err
      });
    })
})
/*
 функция предварительной обработки, сортировки и фильтрации, перед отдачей на клиентскую часть
*/
function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const search = req.query.search
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}
    const total = await model.findAll({ raw: true })
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    const thisUser = jwt.verify(token, config.get('jwtSecret'))
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
      }else if(thisUser.permission == 'root'){
        results.results = await model.findAll({
          order:[
              ["id"]
          ],
          offset:(startIndex),
          limit : limit,
          // attributes: {exclude: ['password', 'email']}
      })
      res.paginatedResults = results
    }else if(thisUser.permission == 'Руководитель'){
          results.results = await model.findAll({
              order:[
                  ["id"]
              ],
              offset:(startIndex),
              limit : limit,
              attributes: {exclude: ['password', 'email', 'subscription']}
          })
          res.paginatedResults = results
      }

      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
module.exports = router
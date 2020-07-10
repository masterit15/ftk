const { Router } = require('express')
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
  '/add',
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
      const { login, email, username, password, permission, departament } = req.body
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
        avatar: '',
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
router.get('/', paginatedResults(User), (req, res) => {
  return res.json({
    success: true,
    user: res.paginatedResults
  });
});
/*
    метод получения пользователя по ID
*/
router.get('/:id', async (req, res) => {
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
router.put('/edit', async (req, res) => {
  const { login, email, username, avatar, permission, password } = req.body
  let id = req.body.id
  // если пароль не менялся
  if (password !== '') {
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
  }
  // если аватар не менялся
  if (avatar !== '') {
    const hashedPassword = await bcrypt.hash(password, 12)
    password = hashedPassword
    User.update({
      login,
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
  }
  User.update({
    login,
    username,
    permission,
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
    const searchparam = req.query.searchparam
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
      results.results = await model.findAll({
        order: [
          ["id"]
        ],
        offset: (startIndex),
        limit: limit,
      })
      res.paginatedResults = results
      // if (search !== '' && search !== undefined) {
      //     if (searchparam == "login") {
      //         results.results = await model.find({ login: { $regex: regsearch } })
      //         res.paginatedResults = results
      //     } else if (searchparam == "permission") {
      //         results.results = await model.find({ permission: { $regex: regsearch } })
      //         res.paginatedResults = results
      //     } else if (searchparam == "userName") {
      //         results.results = await model.find({ userName: { $regex: regsearch } })
      //         res.paginatedResults = results
      //     }
      // } else {
      //     results.results = await model.findAll({
      //         order:[
      //             ["id"]
      //         ],
      //         offset:(startIndex),
      //         limit : limit,
      //     })
      //     res.paginatedResults = results

      //     console.log(results)
      // }

      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
module.exports = router
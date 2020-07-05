const { Router } = require('express')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const auth = require('../middleware/auth.middleware')
const fs = require('fs')
const Claim = require('../models/Claim');
const User = require('../models/User');
const Departament = require('../models/Departament')
const router = Router();

/* 
    метод добавления обращения
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

module.exports = router;
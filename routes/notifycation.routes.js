const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Notifycation = require('../models/Notifycation')
const router = Router()

/*
    метод добавления статуса
*/
router.post('/', auth, async (req, res) => {
  const {name} = req.body
  Notifycation.create({name})
  .then(status => {
    return res.json({
      success: true,
      message: 'Статус добавлен',
      status
    });
  })
  .catch(err => {
    return res.json({
      success: false,
      err
    });
  })
});

/*
    метод получения статусов
*/
router.get('/', auth, Notifycation, async (req, res) => {
  let status = await Notifycation.findAll({order: [["id", 'DESC']]})
  return res.json({
    success: true,
    status
  });
});

/*
    метод обновления статуса по ID
*/
router.put('/', auth, async (req, res) => {
  const { name } = req.body
  let id = req.body.id
  Notifycation.update({
    name
  }, {
    where: { id }
  }).then(status => {
    return res.json({
      success: true,
      message: 'Статус обновлен',
      status
    });
  })
    .catch((err) => {
      return res.json({
        success: false,
        message: 'Не удается обновить статус',
        err: err
      });
    })
})
/*
    метод удаления статуса по ID
*/
router.delete('/', auth, (req, res, next) => {
  let id = req.query.id;
  Notifycation.destroy({
    where: { id }
  }).then(status => {
    return res.json({
      success: true,
      message: 'Статус успешно удален',
      status
    });
  })
    .catch((err) => {
      return res.json({
        success: false,
        message: 'Невозможно удалить статус',
        err: err
      });
    })
})
module.exports = router
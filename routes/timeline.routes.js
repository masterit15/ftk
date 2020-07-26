const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Claim = require('../models/Claim');
const Timeline = require('../models/Timeline');
const Departament = require('../models/Departament')
const User = require('../models/User');
const fs = require('fs')
const router = Router();

/*
    метод добавления в таймлайн обращения по ID
*/
router.post('/', auth, async (req, res, next) => {
  const { event, text, time, file, autor, claimId, userId } = req.body
  let message
  if (event == 'comment') {
      message = 'Комментарий добавлен'
  } else {
      message = text
  }
  Timeline.create({
      event,
      text,
      time,
      file,
      claimId,
      userId,
      autor
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
router.get('/', async (req, res, next) => {
  let id = req.query.id
  await Timeline.findAll({ where: { claimId: id }, raw: true })
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
router.delete('/:id', auth, async (req, res, next) => {
  let id = req.params.id;
  let tml = await Timeline.findOne({where: {id}, raw: true})
  if(tml.file.length > 0){
    tml.file.forEach(file => {
        console.log(file)
        fs.unlink(file,  (err) => {
            if (err) {
              console.error(err)
              return
            }
        })
    })
    }
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

module.exports = router;
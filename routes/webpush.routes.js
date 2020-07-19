const { Router } = require('express')
const config = require('config')
const webpush = require('web-push')
const User = require('../models/User')
const router = Router()

webpush.setVapidDetails('mailto:masterit15@yandex.ru', config.get('public_key'), config.get('privat_key'));

router.post('/', (req, res) => {
    const {id, subscription} = req.body;
    User.update({
      subscription: subscription
    }, {
      where: { id }
    })
    res.status(201).json({
      subscribe: subscription.keys
    });
    const payload = JSON.stringify({ title: 'Вы подписались на уведомления!' });

    webpush.sendNotification(subscription, payload).catch(error => {
      console.error(error.stack);
    });
  });

module.exports = router
const { Router } = require('express')
const config = require('config')
const webpush = require('web-push')
const router = Router()

webpush.setVapidDetails('mailto:masterit15@yandex.ru', config.get('public_key'), config.get('privat_key'));

router.post('/', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'test' });
  
    console.log(subscription);
  
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error(error.stack);
    });
  });

module.exports = router
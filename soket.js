const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const User = require('./models/User')
const webpush = require('./webpush')

io.on('connection', socket => {
  // срабатывает при входе
  socket.on('userJoined', async data => {
    await User.update({
      online: 'Y'
    }, {
      where: { id: data.userId }
    })
    // const payload = JSON.stringify({ title: 'Поступила новая заявка!', body: 'testtesttets!' });
    // const user = await User.findOne({where: { id: data.userId }, raw: true})
    // webpush.sendNotification(user.subscription, payload).catch(error => {
    //   console.error(error.stack);
    // });
  })
  // срабатывает при выходе
  socket.on('userLeft', async data => {
    await User.update({
      online: 'N'
    }, {
      where: { id: data.userId }
    })
  })

  // срабатывает при входе
  socket.on('newClaimNotified', async data => {
    console.log(data)
    const payload = JSON.stringify({ title: 'Поступила новая заявка!', body: 'testtesttets!' });
    const user = await User.findOne({where: { id: data.userId }, raw: true})
    webpush.sendNotification(user.subscription, payload).catch(error => {
      console.error(error.stack);
    });
  })
  // срабатывает при отключении
  socket.on('disconnect', () => {
    // const user = users.remove(socket.id)
    // if (user) {
    //   io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
    //   io.to(user.room).emit(
    //     'newMessage',
    //     m('admin', `Пользователь ${user.name} вышел.`)
    //   )
    // }
  })
})

module.exports = {
  io,
  app,
  server
}
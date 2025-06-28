const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const messages = []

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id)

  socket.emit('chat history', messages)

  socket.on('send message', (msg, callback) => {
    const message = {
      id: Date.now(),
      sender: socket.id,
      text: msg,
      timestamp: new Date(),
    }

    messages.push(message)

    io.emit('new message', message)

    if (callback) callback({ status: 'ok', messageId: message.id })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

server.listen(5002, () => {
  console.log('Server listening on port 5002')
})

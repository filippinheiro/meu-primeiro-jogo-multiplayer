import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

const port = 5000

app.use(express.static('public'))

const game = createGame()

console.debug(game.state)

app.listen(port, () => {
    console.log(`> Server listening on port: ${port}`)
}) 
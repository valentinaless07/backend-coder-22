import express, { urlencoded } from 'express'
import { router } from './routes/index.js'
import { Server } from "socket.io";
const app = express()
import {postMessage, getMessages} from "./controllers/messages.js"


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', router)

const server = app.listen(8080, () => {
    console.log(`Server running on port: ${server.address().port}`)
})

server.on('error', error=> console.log(`Error ${error}`))

const io = new Server(server, {
    
    // ...
  });

  io.on("connection", async (socket) => {
    console.log('Un cliente se ha conectado')


    socket.emit('messages', await getMessages())

    socket.on('new-message', async function(data){
        await postMessage(data)
        socket.emit('messages', await getMessages())
       
    })

});
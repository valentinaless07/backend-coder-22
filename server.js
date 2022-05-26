import express, { urlencoded } from 'express'
import { router } from './routes/index.js'
import session from 'express-session';
import { login } from './routes/login.js';
import { Server } from "socket.io";
const app = express()
import {postMessage, getMessages} from "./controllers/messages.js"
import path from 'path';
import { fileURLToPath } from 'url';
import MongoStore from 'connect-mongo';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(session({
    secret: 'secret',
    store: MongoStore.create({mongoUrl: "mongodb+srv://valentinaless07:vxEEEVwmM2neKCia@cluster0.6p3mf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));
app.use("/public", express.static('./public/'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', router)
app.use(login)

const server = app.listen(8080, () => {
    console.log(`Server running on port: ${server.address().port}`)
})

app.get('/', async (req,res) => {
    try {
        
        if (req.session?.user) {
            res.sendFile(__dirname + '/public/index.html');
        } 
        else{

            res.sendFile(__dirname + '/public/login.html');
        }
        
    } catch (error) {
        console.log(error);
    }
})

app.get('/msg', (req, res) => {
   
    try {
        res.sendFile(__dirname + '/public/message.html');
    } catch (err) {
        console.log(err);
    }
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
        const messages = await getMessages()
        socket.emit('messages', messages)
       
    })

});
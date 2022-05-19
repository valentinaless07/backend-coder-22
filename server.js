import express, { urlencoded } from 'express'
import { router } from './routes'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', router)

const server = app.listen(8080, () => {
    console.log(`Server running on port: ${server.address().port}`)
})

server.on('error', error=> console.log(`Error ${error}`))
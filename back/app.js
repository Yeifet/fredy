import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import update from './routes/update.js'

const port = 3010
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/fredy')
    .then(() => { console.log('Conected') })
    .catch((err) => { console.log(err) })

app.get('/', (req, res) => { res.status(200).json({status: 'Bienvenido'}) })
app.use('/update', update)

app.listen(port, () => {
    console.log('El servidor está corriendo')
})
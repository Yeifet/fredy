import mongoose from 'mongoose'
import { Router as Expressrouter } from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = Expressrouter()

const barrioSchema = mongoose.Schema(
    {
      barrio: String,
      keys: Array
    },
    { versionKey: false }
)

const BarrioModel = mongoose.model('Query', barrioSchema)

const llaves = []
for (let i = 1; i <= 10; i++) {
    llaves.push(uuidv4())
}

router.get('/', async (req, res) => {
    const barrio = new BarrioModel({
        barrio: 'Arduino1',
        keys: llaves
    })
    const result = await barrio.save()
    console.log(result)

    res.status(200).json({status: 'Holas'})
})

router.get('/get', async (req, res) => {
    const result = await BarrioModel.find()
    res.status(200).json(result);
})

router.get('/verify/:name/:id', async (req, res) => {
    const params = { id: req.params.id, name: req.params.name }
    const { id, name } = params

    const consulta = await BarrioModel.findOne({barrio: name})
    const { keys } = consulta
    
    if( keys.includes(id) ) {
        res.status(200).json({status: 'Bienvenido a casa'})
    } else {
        res.status(403).json({status: 'Prohibido'})
    }

    console.log(consulta)
})

export default router

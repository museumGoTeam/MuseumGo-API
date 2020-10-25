import express from 'express'
import mongoose from 'mongoose'
import RoomController from './controllers/RoomController'


const app = express()


app.get('/', (req, res) => {
    res.status(200).json({"status": "ok"})
})

app.use('/rooms', RoomController)


const PORT = 5000


app.listen(PORT, () => {
    try {
        mongoose.connect("mongodb://localhost:27017/museumGO?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('It is working')
    } catch(e) {
        console.log("Error when connecting with the server", e)
    }
})


import express from "express";
import bookingsRoutes from './routes/bookings.rutas.js'
import roomsRoutes from './routes/rooms.rutas.js'

const app = express()

app.use(express.json())
app.use('/api', bookingsRoutes)
app.use('/api', roomsRoutes)

app.use((req,res)=>{
    res.status(404).json({
        message:'Endpoint no encontrado'
    })
})

export default app
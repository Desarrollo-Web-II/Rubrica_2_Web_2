import { pool } from "../db.js";

export const getBookings = async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM bookings')
        res.send(rows)
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}

export const getBooking = async (req, res) => {
    console.log(req.params)
    const {id} = req.params
    try {
        const [rows] = await pool.query('SELECT * FROM bookings WHERE id=?',[id])
        if (rows.length==0) return res.status(404).json({
            message:'Reserva no ha sido registrada'
        })
        res.send(rows[0])
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}

export const createBooking = async (req, res) => {
}

export const updateBooking = async (req, res) => {
}

export const deleteBooking = async (req, res) => {
    console.log(req.params)
    const {id} = req.params
    try {
        const [result] = await pool.query('DELETE FROM bookings WHERE id=?',[id])
        if (result.affectedRows<=0) return res.status(404).json({
            message:'Reserva no encontrada'
        })
        console.log(result)
        res.send(204)
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}
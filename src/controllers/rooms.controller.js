import { pool } from "../db.js";

export const getRooms = async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM rooms')
        res.send(rows)
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}

export const getRoom = async (req, res) => {
    console.log(req.params)
    const {id} = req.params
    try {
        const [rows] = await pool.query('SELECT * FROM rooms WHERE id=?',[id])
        if (rows.length==0) return res.status(404).json({
            message:'Habitacion no sido registrada'
        })
        res.send(rows[0])
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}

export const createRoom = async (req, res) => {
}

export const updateRoom = async (req, res) => {
}

export const deleteRoom = async (req, res) => {
    console.log(req.params)
    const {id} = req.params
    try {
        const [result] = await pool.query('DELETE FROM rooms WHERE id=?',[id])
        if (result.affectedRows<=0) return res.status(404).json({
            message:'Habitacion no encontrada'
        })
        console.log(result)
        res.send(204)
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}
import { pool } from "../db.js";

// funcion para obtener todas las habitaciones  
export const getRooms = async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM rooms')
        res.send(rows)
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}

// funcion para obtener la habitacion por el id   
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

// funcion para Crear habitaciones  
export const createRoom = async (req, res) => {
    try {
        const { numero, tipo, valor } = req.body;
        
        // Se Realiza una validación básica de los datos aquí.

        const [rows] = await pool.query('INSERT INTO rooms (numero, tipo, valor) VALUES (?, ?, ?)', [numero, tipo, valor]);

        if (rows.affectedRows === 1) {
            // El registro se creó exitosamente.
            res.status(201).json({ message: 'Habitacion creada correctamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear la Habitacion' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

// funcion para actualizar las habitaciones  
export const updateRoom = async (req, res) => {

    try {
        const { id } = req.params;
        const { numero, tipo, valor  } = req.body; 

        // Realiza una validación básica de los datos aquí, por ejemplo, asegúrate de que los campos requeridos estén presentes.

        const [rows] = await pool.query('UPDATE rooms SET numero=?, tipo=?, valor=? WHERE id=?', [numero, tipo, valor, id]);

        if (rows.affectedRows === 1) {
            // El registro se actualizó exitosamente.
            res.status(200).json({ message: 'Habitacion actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'Habitacion no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

// funcion para eliminar las habitaciones por el id 
export const deleteRoom = async (req, res) => {
    console.log(req.params)
    const {id} = req.params
    try {
        const [result] = await pool.query('DELETE FROM rooms WHERE id=?',[id])
        if (result.affectedRows<=0) return res.status(404).json({
            message:'Habitacion no encontrada'
        })
        console.log(result)
        res.status(200).json({message: 'Habitacion eliminada correctamente'})
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}
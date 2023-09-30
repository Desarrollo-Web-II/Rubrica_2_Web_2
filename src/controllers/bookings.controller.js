import { pool } from "../db.js";

// funcion para obtener todas las reservas  
export const getBookings = async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM bookings')
        res.send(rows)
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}

// funcion para  obtener las reservas por su id 
export const getBooking = async (req, res) => {
    console.log(req.params)
    const {codigo_habitacion} = req.params
    try {
        const [rows] = await pool.query('SELECT * FROM bookings WHERE id=?',[codigo_habitacion])
        if (rows.length==0) return res.status(404).json({
            message:'Reserva no ha sido registrada'
        })
        res.send(rows[0])
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}

// funcion para crear una reserva 
export const createBooking = async (req, res) => {

    try {
        const { codigo, codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.params; 
        
        // Se Realiza una validación básica de los datos aquí.

        const [rows] = await pool.query('INSERT INTO bookings (codigo, codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida ) VALUES (?, ?, ?, ?, ?, ?, ?)'
        , [codigo, codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida ]);

        if (rows.affectedRows === 1) {
            // El registro se creó exitosamente.
            res.status(201).json({ message: 'Reserva creada correctamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear la reserva' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

// funcion para actualizar una reserva 
export const updateBooking = async (req, res) => {
    try {
        const { codigo_habitacion } = req.params;
        const { codigo, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.params; 

        // Se Realiza una validación básica de los datos aquí.

        const [rows] = await pool.query('UPDATE bookings SET codigo=?, nombre_cliente=?, telefono_cliente=?, fecha_reservacion=?, fecha_entrada=? ,fecha_salida=?WHERE codigo_habitacion=?', 
        [codigo, codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida ]);

        if (rows.affectedRows === 1) {
            // El registro se actualizó exitosamente.
            res.status(200).json({ message: 'Reserva actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

// funcion para eliminar una reserva por el id 
export const deleteBooking = async (req, res) => {
    console.log(req.params)
    const {codigo_habitacion} = req.params
    try {
        const [result] = await pool.query('DELETE FROM bookings WHERE id=?',[codigo_habitacion])
        if (result.affectedRows<=0) return res.status(404).json({
            message:'Reserva no encontrada'
        })
        console.log(result)
        res.send(204)
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un Error'})
    }
}
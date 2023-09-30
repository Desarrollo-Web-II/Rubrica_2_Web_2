import { Router } from "express";
import { createBooking, deleteBooking, getBooking, getBookings, updateBooking } from "../controllers/bookings.controller.js";


const router = Router()

//----------------------------------- RUTAS DE BOOKINGS-------------------------------------
//Cosultar
router.get('/bookings', getBookings)
router.get('/bookings/:id', getBooking)

//Agregar
router.post('/bookings', createBooking)

//Actualizar
router.patch('/bookings/:id', updateBooking)

//Eliminar
router.delete('/bookings/:id', deleteBooking)

export default router;
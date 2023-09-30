import { Router } from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/rooms.controller.js";


const router = Router()

//----------------------------------- RUTAS DE ROOMS-------------------------------------
router.get('/rooms', getRooms)
router.get('/rooms/:id', getRoom)

//Agregar
router.post('/rooms', createRoom)

//Actualizar
router.patch('/rooms/:id', updateRoom)

//Eliminar
router.delete('/rooms/:id', deleteRoom)

export default router;
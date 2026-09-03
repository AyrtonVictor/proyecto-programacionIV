const express = require("express")
const { obtenerAlumnos, obtenerAlumno, crearAlumno, actualizarAlumno, eliminarAlumno } = require("../controllers/alumnos.controller")
const router = express.Router()


router.get("/", obtenerAlumnos)
router.get("/:id", obtenerAlumno)
router.post("/", crearAlumno)
router.post("/:id", actualizarAlumno)
router.post("/:id", eliminarAlumno)

module.exports = router
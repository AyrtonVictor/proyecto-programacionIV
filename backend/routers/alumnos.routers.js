const express = require("express")
const router = express.Router()


router.get("/", obtenerAlumno)

// router.get("/", (req, res) => {               Modificado por ota vercion de arriba, se saca de alumnos.controller
//     res.json(alumnos)
// })

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const alumno = alumnos.find(a => a.id === id)
    res.json(alumno)
})

router.post("/", (req, res) => {
    const nuevoAlumno = req.body
    alumnos.push(nuevoAlumno)
    res.json({ mensaje: "Alumno registrado correctamente" })
    // console.log(req.body)
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const alumno = alumnos.find(a => a.id === id)
    alumno.id = req.body.id
    alumno.nombre = req.body.nombre
    alumno.carrera = req.body.carrera
    alumno.correo = req.body.correo
    res.json({ mensaje: "Alumno actualizado correctamente" })
})

// req.params
// req.body

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    alumnos = alumnos.filter(alumno => alumno.id !== id)  // reasigna alumnos, no "alumno"
    res.json({ mensaje: "Alumno eliminado correctamente" })
})

router.use((req, res, next) => {
    console.log(req.method);
    console.log(res.url);
    next();
})

router.listen(3000, () => {
    console.log("Servidor funcioando en http://localhost:3000")
})


module.exports = router
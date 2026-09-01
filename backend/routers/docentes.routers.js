const express = require("express")
const router = express.Router()


router.get("/", obtenerDocente)

// router.get("/", (req, res) => {               Modificado por ota vercion de arriba, se saca de docentes.controller
//     res.json(docentes)
// })

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const docente = docentes.find(a => a.id === id)
    res.json(docente)
})

router.post("/", (req, res) => {
    const nuevoDocente = req.body
    docentes.push(nuevoDocente)
    res.json({ mensaje: "Docente registrado correctamente" })
    // console.log(req.body)
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const docente = docentes.find(a => a.id === id)
    docente.id = req.body.id
    docente.nombre = req.body.nombre
    docente.carrera = req.body.carrera
    docente.correo = req.body.correo
    res.json({ mensaje: "Docente actualizado correctamente" })
})

// req.params
// req.body

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    docentes = docentes.filter(docente => docente.id !== id)  // reasigna docentes, no "docente"
    res.json({ mensaje: "Docente eliminado correctamente" })
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
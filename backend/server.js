//generalmente se pone el mismo nombre
const express = require("express")
const app = express()
app.use(express.json())
const alumnosRouters = require("/routers/alumnos.routes")
const docentesRouters = requier("/routers/docentes.routes")
app.use / ("/alumos", alumnosRouters)
app.use / ("/docentes", docentesRouters)
// La const es constante y no se puede modificar, y let es modificable.


let alumnos = [
    {
        id: 1,
        nomrbe: "Ana",
        carrera: "Programacion"
    }
    ,
    {
        id: 2,
        nomrbe: "Jose",
        carrera: "Sistemas"
    }
    ,
    {
        id: 3,
        nomrbe: "Juan",
        carrera: "Castrador de Caballos profecional"
    }
    ,
    {
        id: 4,
        nomrbe: "Walter White",
        carrera: "Quimico"
    }
    ,
    {
        id: 5,
        nomrbe: "Lionel",
        carrera: "Fisica de Particulas"
    }

]

let docentes = [
    {
        id: 1,
        nomrbe: "marta",
        carrera: "Quimica"
    }
    ,
    {
        id: 2,
        nomrbe: "Manuel",
        carrera: "Geografia"
    }
    ,
    {
        id: 3,
        nomrbe: "Carlos",
        carrera: "Mateamticas"
    }
]

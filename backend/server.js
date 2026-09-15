const express = require("express")
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors())

const alumnosRouters = require("./routers/alumnos.routers")
app.use("/alumnos", alumnosRouters)


const conectarDB = require("./config/database")
require("dotenv").config()

const PORT = process.env.PORT

conectarDB()
console.log("Ejectuado con nodemon")


const docentesRouters = require("./routers/docentes.routers")
app.use("/docentes", docentesRouters)



app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
})

app.listen(3000, () => {
    console.log(`Servidor funcionando en http://localhost: ${PORT}`)
})
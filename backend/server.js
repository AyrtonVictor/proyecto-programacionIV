const express = require("express")
const app = express()
app.use(express.json())
const alumnosRouters = require("./routers/alumnos.routers")
const docentesRouters = require("./routers/docentes.routers")
const conectarDB = require("./config/database")
app.use("/alumnos", alumnosRouters)
app.use("/docentes", docentesRouters)

require("dotenv").config()
const PORT = process.env.PORT

conectarDB()



app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
})

app.listen(3000, () => {
    console.log(`Servidor funcionando en http://localhost: ${PORT}`)
})
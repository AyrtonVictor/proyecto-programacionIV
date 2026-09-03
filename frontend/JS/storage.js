function guardarDatos(Clave, datos) {
    localStorage.setItem(Clave, JSON.stringify(datos))
}


function obtenerAlumnos(clave) {
    const datos = localStorage.getItem(clave)
    if (datos) {
        return JSON.parse(datos)
    }
    return []
}



// localStorage.setItem("alumnos", JSON.stringify(alumnosActualizados))

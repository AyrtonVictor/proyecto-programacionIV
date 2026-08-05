const alumnos = [
    {
        id: 1,
        nombre: "Sebastian"
    }
    ,
    {
        id: 2,
        nombre: "Martin"
    }
    ,
    {
        id: 2,
        nombre: "Juan"
    }
    ,
    {
        id: 4,
        nombre: "Carlos"
    }


]
function obtenerAlumnos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(alumnos)
        }, 3000);
    })
}

async function iniciar() {
    const datos = await obtenerAlumnos()
    console.table(datos)
}

iniciar();

// Crear obtenerMaterias()
// crear obtenerDocentes()
// Mostrar los datos a travez de async/await
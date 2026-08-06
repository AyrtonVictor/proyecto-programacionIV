// const alumnos = [
//     {
//         id: 1,
//         nombre: "Sebastian"
//     }
//     ,
//     {
//         id: 2,
//         nombre: "Martin"
//     }
//     ,
//     {
//         id: 2,
//         nombre: "Juan"
//     }
//     ,
//     {
//         id: 4,
//         nombre: "Carlos"
//     }


// ]
// function obtenerAlumnos() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(alumnos)
//         }, 3000);
//     })
// }

// async function iniciar() {
//     const datos = await obtenerAlumnos()
//     console.table(datos)
// }

// iniciar();

// Crear obtenerMaterias()
// crear obtenerDocentes()
// Mostrar los datos a travez de async/await

async function obtenerAlumnos() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users") //podes ponerle /1 para llamar solo ese seccion en especifico.
    const alumnos = await respuesta.json()
    // console.log(alumnos)
    // console.table(alumnos)
    return alumnos
}


function mostrarAlumnos(alumnos) {
    console.table(alumnos)
    // console.log(alumnos(5).email)

    // for (const alumno of alumnos) {
    //     console.log(alumnos.name, alumnos.email)
    // }
}

async function iniciar() {
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
}

iniciar();

// probar trer el recurso /post y /coments, traer id,titulo y usuario.
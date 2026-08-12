const formulario = document.querySelector("#formAlumno")
const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")


formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value
    const carrera = document.querySelector("#carrera").value
    const correo = document.querySelector("#correo").value

    const alumno = {
        id: Date.now(),
        nombre: nombre,
        carrera: carrera,
        correo: correo
    }

    const alumnos = obtenerAlumnos()
    alumnos.push(alumno)
    localStorage.setItem("alumnos", JSON.stringify(alumnos))
    mostrarMensaje("Alumno guardado correctamente.")

    mostrarAlumnos(alumnos)
    formulario.reset()
});

function obtenerAlumnos() {
    const datos = localStorage.getItem("alumnos")
    if (datos) {
        return JSON.parse(datos)
    }
    return []
}

function mostrarMensaje(texto) {///Esto es para que le texto desaparezca despues de 3 segundos
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = " ";
    }, 3000);
}


//Esto va agregando a la lista que se mostrara en el index
function mostrarAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button class="btn-editar" data-id="${alumno.id}" >Editar<button>
                <button class="btn-eliminar" data-id="${alumno.id}">Eliminar<button>
            </td>
        </tr>
        `
    }
}

// <li>
//     ${alumno.nombre} - 
//     ${alumno.carrera} -
//     ${alumno.correo}
// </li>



//Esta funcion elimina al alumno en la lista.
function eliminarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumnosActualizados = alumnos.filter(
        alumno => alumno.id != id //genera el array sin el alumno que queremos eliminar
    );

    localStorage.setItem("alumnos", JSON.stringify(alumnosActualizados))
    mostrarAlumnos(alumnosActualizados)
    mostrarMensaje("Alumno eliminado correctamente.")
}



listaAlumnos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const id = Number(e.target.dataset.id)
        eliminarAlumno(id)
    }
})

function editarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.id === id)
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;
    alumnoEditandoId = id;
}
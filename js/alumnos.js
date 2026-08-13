const formulario = document.querySelector("#formAlumno")
const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoId = null;

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || carrera === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electronico válido", "mje-error")
        return
    }
    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe ser mayor a 3 caracteres", "msj-error")
        return
    }
    if (carrera.length < 3) {
        mostrarMensaje("La carrera debe ser mayor a 3 caracteres", "msj-error")
        return
    }
    if (correo.length < 3) {
        mostrarMensaje("El correo debe ser mayor a 3 caracteres", "msj-error")
        return
    }


    const alumnos = obtenerAlumnos()

    if (alumnoEditandoId === null) {
        const alumno = {
            id: Date.now(),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        alumnos.push(alumno)
        mostrarMensaje("Alumno guardado correctamente.")
    } else {
        const alumno = alumnos.find(a => a.id === alumnoEditandoId)
        alumno.nombre = nombre
        alumno.carrera = carrera
        alumno.correo = correo

        alumnoEditandoId = null
        formulario.querySelector("button").textContent = "Guardar alumno"

        mostrarMensaje("Alumno actualizado correctamente")
    }


    localStorage.setItem("alumnos", JSON.stringify(alumnos))
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

function mostrarMensaje(texto, tipo = "mje-exito") {
    mensaje.textContent = texto;
    mensaje.className = tipo;
    setTimeout(() => {
        mensaje.textContent = "";
        mensaje.className = "oculto";
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
                <button class="btn-editar" data-id="${alumno.id}" >Editar</button>
                <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>
            </td>
        </tr>
        `
    }
}

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
    if (e.target.classList.contains("btn-editar")) {
        const id = Number(e.target.dataset.id)
        editarAlumno(id)
    }
})

function editarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.id === id)
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;
    alumnoEditandoId = id;
    formulario.querySelector("button").textContent = "Actualizar alumno"
}

const alumnos = obtenerAlumnos()
mostrarAlumnos(alumnos)

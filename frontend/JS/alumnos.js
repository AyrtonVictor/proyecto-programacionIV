const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");
const listaAlumnos = document.querySelector("#listaAlumnos");
let alumnoEditandoId = null;
let alumnoEditar = null;
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"

const btnGuardar = document.querySelector("#btnGuardar")

async function cargarAlumnos() {
    const respuesta = await fetch("http://localhost:3000/alumnos")
    const alumnos = await respuesta.json()
}




// Funciones auxiliares para LocalStorage
function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

function obtenerDatos(clave) {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : [];
}

function mostrarMensaje(texto, clase = "msj-exito") {
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.className = clase;
        setTimeout(() => { mensaje.textContent = ""; }, 3000);
    }
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const carrera = document.querySelector("#carrera").value.trim();
    const correo = document.querySelector("#correo").value.trim();

    if (nombre === "" || carrera === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "msj-error");
        return;
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electrónico válido", "msj-error");
        return;
    }
    if (nombre.length < 3 || carrera.length < 3 || correo.length < 3) {
        mostrarMensaje("Los campos deben tener más de 3 caracteres", "msj-error");
        return;
    }

    const alumnos = obtenerAlumnos();

    if (alumnoEditandoId === null) {
        const alumno = {
            id: Date.now(),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        };
        alumnos.push(alumno);
        mostrarMensaje("Alumno guardado correctamente.", "msj-exito");
    } else {
        const alumno = alumnos.find(a => a.id === alumnoEditandoId);

        alumno.nombre = nombre;
        alumno.carrera = carrera;
        alumno.correo = correo;

        const datosActuales = {
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }

        // if (datosActuales.nombre === alumnoEditar.nombre && datosActuales.carrera === alumnoEditar.carrera && datosActuales.correo === alumnoEditar.correo) {
        //     mostrarMensaje("No se realizaron cambios", "Se realizaron cambios")
        // } Esto es una vercion como la de abajo pero es mucho mas largo. Necesita el stringify para comparar.

        if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)) {
            mostrarMensaje("No se realizaron cambios", "mje-adv")

        }
        alumnoEditandoId = null;
        alumnoEditar = null;
        btnGuardar.textContent = "Guardar alumno";
        mostrarMensaje("Alumno actualizado correctamente", "msj-exito");
    }

    guardarDatos("alumnos", alumnos);
    mostrarAlumnos(alumnos);
    formulario.reset();
});

async function obtenerAlumnos() {
    const respuesta = await fetch("http://localhost:3000/alumnos")
    const alumnos = await respuesta.json()
    return alumnos
}

function mostrarAlumnos(alumnos) {
    listaAlumnos.innerHTML = "";
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.legajo}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button class="btn-editar" data-id="${alumno.legajo}" title="Editar alumno">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-eliminar" data-id="${alumno.legajo}" title="Eliminar alumno">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

function eliminarAlumno(id) {
    const alumnos = obtenerAlumnos();
    const alumnosActualizados = alumnos.filter(alumno => alumno.id !== id);

    // CORRECCIÓN: Guardar la lista filtrada en LocalStorage
    guardarDatos("alumnos", alumnosActualizados);
    mostrarAlumnos(alumnosActualizados);

    if (alumnoEditandoId === id) {
        formulario.reset();
        alumnoEditandoId = null;
        formulario.querySelector("button").textContent = "Guardar alumno";
    }
    mostrarMensaje("Alumno eliminado correctamente.", "msj-exito");
}

listaAlumnos.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar");
    if (boton_el) {
        const id = Number(boton_el.dataset.id);
        if (confirm("¿Estás seguro de eliminar este alumno?")) {
            eliminarAlumno(id);
        }
        return;
    }

    const boton_ed = e.target.closest(".btn-editar");
    if (boton_ed) {
        const id = Number(boton_ed.dataset.id);
        editarAlumno(id);
    }
});

function editarAlumno(id) {
    const alumnos = obtenerAlumnos();
    const alumno = alumnos.find(a => a.id === id);
    if (!alumno) return;

    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;


    alumnoEditar = {
        nombre: alumno.nombre,
        carrera: alumno.carrera,
        correo: alumno.correo
    }

    alumnoEditandoId = id;
    btnCancelar.style.display = "inline-block"
    btnGuardar = "Actualizar alumno";
    document.querySelector("#nombre").focus();
}

// Carga inicial

function cancelarEdicion() {
    formulario.reset()
    alumnoEditandoId = null
    alumnoEditar = null

    formulario.querySelector("button").textContent = "Guardar alumno"
    btnCancelar.style.display = "none"
}

btnCancelar.addEventListener("click", cancelarEdicion)

async function iniciar() {
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
}

iniciar()
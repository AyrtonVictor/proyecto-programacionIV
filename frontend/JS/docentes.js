const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");
const listaDocentes = document.querySelector("#listaDocentes");
let docenteEditandoId = null;
let docenteEditar = null;
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"

const btnGuardar = document.querySelector("#btnGuardar")


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

    const docentes = obtenerDocentes();

    if (docenteEditandoId === null) {
        const docente = {
            id: Date.now(),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        };
        docentes.push(docente);
        mostrarMensaje("Docente guardado correctamente.", "msj-exito");
    } else {
        const docente = docentes.find(a => a.id === docenteEditandoId);

        docente.nombre = nombre;
        docente.carrera = carrera;
        docente.correo = correo;

        const datosActuales = {
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }

        // if (datosActuales.nombre === docenteEditar.nombre && datosActuales.carrera === docenteEditar.carrera && datosActuales.correo === docenteEditar.correo) {
        //     mostrarMensaje("No se realizaron cambios", "Se realizaron cambios")
        // } Esto es una vercion como la de abajo pero es mucho mas largo. Necesita el stringify para comparar.

        if (JSON.stringify(datosActuales) === JSON.stringify(docenteEditar)) {
            mostrarMensaje("No se realizaron cambios", "mje-adv")

        }
        docenteEditandoId = null;
        docenteEditar = null;
        btnGuardar.textContent = "Guardar docente";
        mostrarMensaje("Docente actualizado correctamente", "msj-exito");
    }

    guardarDatos("docentes", docentes);
    mostrarDocentes(docentes);
    formulario.reset();
});

function obtenerDocentes() {
    return obtenerDatos("docentes");
}

function mostrarDocentes(docentes) {
    listaDocentes.innerHTML = "";
    for (const docente of docentes) {
        listaDocentes.innerHTML += `
        <tr>
            <td>${docente.id}</td>
            <td>${docente.nombre}</td>
            <td>${docente.carrera}</td>
            <td>${docente.correo}</td>
            <td>
                <button class="btn-editar" data-id="${docente.id}" title="Editar docente">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-eliminar" data-id="${docente.id}" title="Eliminar docente">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

function eliminarDocente(id) {
    const docentes = obtenerDocentes();
    const docentesActualizados = docentes.filter(docente => docente.id !== id);

    // CORRECCIÓN: Guardar la lista filtrada en LocalStorage
    guardarDatos("docentes", docentesActualizados);
    mostrarDocentes(docentesActualizados);

    if (docenteEditandoId === id) {
        formulario.reset();
        docenteEditandoId = null;
        formulario.querySelector("button").textContent = "Guardar docente";
    }
    mostrarMensaje("Docente eliminado correctamente.", "msj-exito");
}

listaDocentes.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar");
    if (boton_el) {
        const id = Number(boton_el.dataset.id);
        if (confirm("¿Estás seguro de eliminar este docente?")) {
            eliminarDocente(id);
        }
        return;
    }

    const boton_ed = e.target.closest(".btn-editar");
    if (boton_ed) {
        const id = Number(boton_ed.dataset.id);
        editarDocente(id);
    }
});

function editarDocente(id) {
    const docentes = obtenerDocentes();
    const docente = docentes.find(a => a.id === id);
    if (!docente) return;

    document.querySelector("#nombre").value = docente.nombre;
    document.querySelector("#carrera").value = docente.carrera;
    document.querySelector("#correo").value = docente.correo;


    docenteEditar = {
        nombre: docente.nombre,
        carrera: docente.carrera,
        correo: docente.correo
    }

    docenteEditandoId = id;
    btnCancelar.style.display = "inline-block"
    btnGuardar = "Actualizar docente";
    document.querySelector("#nombre").focus();
}

// Carga inicial

function cancelarEdicion() {
    formulario.reset()
    docenteEditandoId = null
    docenteEditar = null

    formulario.querySelector("button").textContent = "Guardar docente"
    btnCancelar.style.display = "none"
}

btnCancelar.addEventListener("click", cancelarEdicion)

const docentesIniciales = obtenerDocentes();
mostrarDocentes(docentesIniciales);
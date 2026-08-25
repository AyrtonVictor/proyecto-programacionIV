const formulario = document.querySelector("#formdocente")
const mensaje = document.querySelector("#mensaje")
const listadocentes = document.querySelector("#listadocentes")
let docenteEditandoId = null;

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


    const docentes = obtenerdocentes()

    if (docenteEditandoId === null) {
        const docente = {
            id: Date.now(),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        docentes.push(docente)
        mostrarMensaje("docente guardado correctamente.")
    } else {
        const docente = docentes.find(a => a.id === docenteEditandoId)
        docente.nombre = nombre
        docente.carrera = carrera
        docente.correo = correo

        docenteEditandoId = null
        formulario.querySelector("button").textContent = "Guardar docente"

        mostrarMensaje("docente actualizado correctamente")
    }


    // localStorage.setItem("docentes", JSON.stringify(docentes))
    guardarDatos("docentes", docentes)
    mostrardocentes(docentes)
    formulario.reset()

});

function obtenerdocentes() {
    return obtenerDatos("docentes")
}



//Esto va agregando a la lista que se mostrara en el index
function mostrardocentes(docentes) {
    listadocentes.innerHTML = ""
    for (const docente of docentes) {
        listadocentes.innerHTML += `
        <tr>
            <td>${docente.id}</td>
            <td>${docente.nombre}</td>
            <td>${docente.carrera}</td>
            <td>${docente.correo}</td>
            <td>
                <button class="btn-editar" data-id="${docente.id}"
                title="Editar docente">
                <i class="fa-solid fa-pen"></i>
                </button>
                
                
                <button class="btn-eliminar" data-id="${docente.id}"
                title="Eliminar docente">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    }
}

//Esta funcion elimina al docente en la lista.
function eliminardocente(id) {
    const docentes = obtenerdocentes()
    const docentesActualizados = docentes.filter(
        docente => docente.id != id //genera el array sin el docente que queremos eliminar
    );

    localStorage.setItem("docentes", JSON.stringify(docentesActualizados))
    mostrardocentes(docentesActualizados)
    if (docenteEditandoId === id) {
        formulario.reset()
        docenteEditandoId = null
        formulario.querySelector("button").textContent = "Guardar docente";
    }
    mostrarMensaje("docente eliminado correctamente.")
}

listadocentes.addEventListener("click", (e) => {

    const boton_el = e.target.closest(".btn-eliminar");
    if (boton_el) {
        const id = Number(boton_el.dataset.id);
        const confirmar = confirm("¿Estás seguro de eliminar este docente?");
        if (confirmar) {
            eliminardocente(id);
        }
        return;
    }

    const boton_ed = e.target.closest(".btn-editar");
    if (boton_ed) {
        const id = Number(boton_ed.dataset.id);
        editardocente(id);
    }
});


function editardocente(id) {
    const docentes = obtenerdocentes()
    const docente = docentes.find(docente => docente.id === id)
    document.querySelector("#nombre").value = docente.nombre;
    document.querySelector("#carrera").value = docente.carrera;
    document.querySelector("#correo").value = docente.correo;
    docenteEditandoId = id;
    formulario.querySelector("button").textContent = "Actualizar docente"
    document.querySelector("#nombre").focus()
}

const docentes = obtenerdocentes()
mostrardocentes(docentes)

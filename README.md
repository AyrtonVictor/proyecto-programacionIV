# Sistema de Gestión Académica (SGA)
# Gestion del proyecto

clase 10 Estructura Actual



SGA/
frontend
|________index.html
|________alumnos.html
|________docentes.html
|________css/
|          |________style.css
|________js/
           |________alumnos.js
           |________docentes.js
           |________ui.js
           |________asincronia.js
           |________storage.js
backend




## Estado actual

- Pagina de inicio y navegacion entre modulos
- Modulo alumnos-docentes
- CRUD alumnos/docentes
- persistencia mediante localStorage
- Organizacion del codigo y refactorizacion
- Separacion inicial entre frontend y backend
-Implementacion de validaciones para los datos recibidos mediante req.body
- Uso de status 404 para datos invalidos
- status 404 para alumno no encontrado
- status 201 para registrar nuevo alumno
- status 200
- manejo basico de errores en las operaciones del CRUD
- instalacion de mongoose
- Creacion de conexion con MongoDB en config/database.js
- Creacion de Schema y modelos Alumno
- Remplazo del Arrayen memoria por una conexion de MongoDB
- Modificacion de GET /alumnos para consultar MongoDB
- Prueba de la API con datos almacenados en MongoDB
- 


## Almacenamiento

-localStoage
-json.stringify()
-json.parse()
-MongoDB

## Descripción
El Sistema de Gestión Académica (SGA) es una aplicación web que permitirá administrar alumnos, docentes, cursos y materias.

Durante el desarrollo del proyecto se incorporarán progresivamente nuevas tecnologías y funcionalidades.

## Objetivos



- Gestionar alumnos.

- Gestionar docentes.

- Gestionar cursos.

- Gestionar materias.

- Implementar autenticación de usuarios.

- Consumir una API REST.

- Persistir la información en MongoDB.



## Tecnologías

Actualmente:
- HTML5
- CSS3
- JavaScript
- MongoDB
- Expres
- Node.js

Próximamente:
- React

## Autor

Ayrton Victor

Programación IV
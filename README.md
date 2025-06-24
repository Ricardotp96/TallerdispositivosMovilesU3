# 📄 Sistema de Soporte Técnico - README

## 🛠️ Descripción del Proyecto

Esta aplicación móvil fue desarrollada con Ionic + Angular, esta pensada para el departamento de informatica en la cual permite a los usuarios crear solicitudes de soporte técnico y a los técnicos dar el soporte necesario para resolverlas. Se creo para mejorar la eficiencia de dicho Departamento de Informática de la Municipalidad de San Pedro de la Paz.



## 🚀 Instalación

1. **Clonar el repositorio:**
   bash
   git clone https://github.com/Ricardotp96/TallerdispositivosMovilesU3.git
   cd repositorio, por consola
   

2. **Instalar dependencias:**

   npm install, por consola
   

3. **Ejecutar la aplicación:**
   
   ionic serve, por consola
   

**IMOPRTANTE**
Se requiere tener instalado Node.js, npm y el CLI de Ionic.



## 💡 Enfrentando el Desarrollo

Durante el desarrollo, se abordaron las siguientes tareas:

- Crear formularios de login y creación de tickets con validaciones.
- Manejo del usuario logueado mediante `localStorage`.
- Navegación entre páginas usando rutas y condiciones de usuario.
- Uso de `ToastController` para feedback (mensajes) al usuario.
- Diseño responsive con Ionic UI y clases personalizadas.



## ⚠️ Problemas Enfrentados

- **Persistencia del usuario:** Al principio no se mostraba correctamente el nombre del usuario logueado en las pestañas. Se resolvió guardando el nombre en `localStorage` y recuperándolo con `ngOnInit()`.
  
- **Navegación condicional:** La redirección dependiendo del tipo de usuario logueado a `tab1 (crear)` o `tab2 (tecnico)` según corresponda, fue una lógica clave. Se solucionó usando condiciones en `portada.page.ts`. 

- **Mensajes de error:** Se mejoró el diseño del uso de `alert()` añadiendo `ToastController` para notificaciones más profesionales y elegantes.

- **Base de datos** como no se tiene un modelo de datos creado ni configurado, esto genero un problemas validar los datos, por ejemplo de acceso .


## ▶️ Cómo Usar la Aplicación

1. **Inicio de sesión:**
   - Usuario: `rtapia`, Clave: `12345` (accede a Técnico), se muestra ariba en la iterfaz al costado del logo
   - Usuario: `lgardel`, Clave: `gardel` (accede a Usuario), se muestra ariba en la iterfaz al costado del logo

2. **Funciones disponibles:**
   - Acceso con login de usuario correspondiente
   - Creación de tickets de soporte. con mensjae de creacion de soporte 
   - Visualización de estado e historial de tickes (en desarrollo).
   - Logout que redirige a la pantalla de portada.



## 👨‍💻 Tecnologías Usadas

- Ionic Framework
- Angular
- TypeScript
- HTML/CSS
- LocalStorage



## 📂 Estructura del Proyecto 


src/
├── app/
│   ├── portada/
│   ├── tabs1
│   ├── tabs2
│   ├── tabs3
│   ├── tabs
│   └── explore-container/
├── assets/
    └── imgs/



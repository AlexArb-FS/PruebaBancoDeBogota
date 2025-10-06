# Portal de Capacitaciones

Este proyecto es una plataforma de e-learning o gestión de cursos que utiliza React para el frontend, Node.js para el backend y Supabase como base de datos y plataforma de autenticación.

## Credenciales de Acceso

Para iniciar sesión en la aplicación, puedes usar las siguientes credenciales de prueba:

*   **Correo Electrónico:** `alexander.arboleda.fs@gmail.com`
*   **Contraseña:** `contraseña123`

## Configuración del Entorno y Ejecución

Asegúrate de tener Node.js y npm (o yarn) instalados en tu sistema.

### Backend

El backend se encarga de la lógica de negocio y la comunicación con Supabase.

1.  **Abre una terminal** (por ejemplo, Git Bash o la terminal integrada de tu IDE) en la raíz del proyecto.
2.  **Dirígete a la carpeta del backend:**
    ```bash
    cd backend/
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Inicia la aplicación del backend:**
    ```bash
    npm start
    ```
    El servidor se ejecutará en `http://localhost:3001` (o el puerto configurado en las variables de entorno).

### Frontend

El frontend es la interfaz de usuario de la aplicación React.

1.  **Abre una nueva terminal** (por ejemplo, Git Bash) en la raíz del proyecto (donde está el `package.json` principal del frontend).
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Inicia la aplicación web:**
    ```bash
    npm start
    ```
    Esto abrirá la aplicación en tu navegador predeterminado, generalmente en `http://localhost:5173`.

## Interacción con la Plataforma

### Cursos Disponibles

En la sección "Cursos", encontrarás una lista de todos los cursos disponibles en la plataforma.

*   **Inscribirse en un Curso:** Haz clic en el botón `+` (signo de más) en la tarjeta de un curso disponible para inscribirte. Una vez inscrito, el curso se moverá a la sección "Mis Capacitaciones" en el Dashboard y dejará de aparecer en "Cursos Disponibles".
*   **Ver Detalles del Curso:** Haz clic en el botón de ojo para ver el contenido del curso, incluyendo sus módulos.

### Mis Capacitaciones (Dashboard)

En el Dashboard, verás todos los cursos en los que estás inscrito y que tienen progreso (incluyendo el 0% de los cursos recién inscritos).

*   **Seguimiento del Progreso:** Cada tarjeta de curso muestra una barra de progreso que indica cuánto has avanzado en sus módulos.
*   **Completar Módulos:** Al hacer clic en un curso y entrar en su página de detalles, podrás ver la lista de módulos. Marca la casilla de verificación junto a cada módulo para registrarlo como completado. El progreso del curso se actualizará automáticamente.
*   **Curso Completado:** Una vez que todos los módulos de un curso estén marcados como completados, el curso se considerará "Finalizado" y se moverá a la sección "Cursos Finalizados" en la página de Cursos.

### Cursos Finalizados

En la página "Cursos", en la sección "Cursos Finalizados", se listan todos los cursos en los que te has inscrito y has completado al 100%.

*   **Revisar Curso Finalizado:** Puedes hacer clic en el botón con icono de ojo en la tarjeta de un curso finalizado para revisar su contenido y los módulos completados.

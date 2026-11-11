# Guía de instalación — Sistema Gia’s

Esta versión funciona en cualquier página web, sin Claude. Usa dos servicios gratuitos:

- **Firebase (Google):** guarda los datos (pedidos, inventario, ventas, clientes y tasas) y maneja los usuarios con correo y clave.
- **Cloudinary:** guarda las fotos de las prendas, los logos y los archivos de los pedidos.

Ninguno de los dos pide tarjeta de crédito para el plan gratuito.

---

## Paso 0. Crear una cuenta de Google solo para el sistema

Usa una cuenta nueva y exclusiva, por ejemplo `gias.sistema@gmail.com`, en lugar de un correo personal. Así Firebase, Google Sheets y los reportes quedan a nombre de la tienda, y si alguien deja de trabajar con ustedes el sistema no se pierde.

1. Entra a https://accounts.google.com/signup y crea la cuenta.
2. Agrega un número de teléfono de recuperación y guarda la clave en un lugar seguro.
3. Inicia sesión con esa cuenta en Chrome antes de seguir con los demás pasos.

## Paso 1. Crear el proyecto en Firebase

1. Entra a https://console.firebase.google.com con una cuenta de Google y crea un proyecto nuevo (por ejemplo `gias-tiendas`). Google Analytics no hace falta.
2. En la página principal del proyecto, agrega una **app web** (el ícono `</>`). Ponle un nombre y regístrala. No hace falta activar Firebase Hosting.
3. Firebase te muestra un bloque llamado `firebaseConfig`. Copia esos valores en **config.js**, dentro de `window.FIREBASE_CONFIG`.

## Paso 2. Activar el inicio de sesión

1. En el menú del proyecto entra a **Authentication** y pulsa **Comenzar**.
2. En los métodos de acceso, activa **Correo electrónico/contraseña**.
3. En la pestaña **Usuarios**, agrega un usuario por cada persona que va a usar el sistema: tú y cada dueño, con su correo y una clave inicial. Ellos la pueden cambiar con "Olvidé mi clave".

## Paso 3. Crear la base de datos

1. Entra a **Firestore Database** y pulsa **Crear base de datos**. Elige el modo de producción y una ubicación cercana (por ejemplo `us-east1`).
2. Abre la pestaña **Reglas**, borra lo que hay y pega el contenido de **firestore.rules**.
3. Cambia los correos de la lista por los correos reales que creaste en el paso 2, escritos en minúscula, y pulsa **Publicar**.

Solo esos correos podrán ver o modificar los datos. Para darle acceso a alguien nuevo: créalo en Authentication y agrega su correo a las reglas.

## Paso 4. Configurar Cloudinary (fotos y archivos)

1. Crea una cuenta gratis en https://cloudinary.com.
2. En el panel principal copia tu **Cloud name** y pégalo en **config.js**, en `cloudName`.
3. Ve a la configuración (ícono de engranaje), sección **Upload**, y crea un **Upload preset** nuevo:
   - Signing mode: **Unsigned**
   - Nombre: `gias_unsigned` (o el que quieras; debe ser igual al de `uploadPreset` en config.js)
4. Para poder abrir los PDF de las facturas: en la configuración, sección **Security**, activa la opción que permite entregar archivos PDF y ZIP.

## Paso 5. Probar en tu computadora

Firebase no funciona si abres `index.html` con doble clic. Hay que abrirlo con un pequeño servidor:

- **Visual Studio Code:** instala la extensión *Live Server*, clic derecho en `index.html` y luego *Open with Live Server*.
- **Con Python:** en la carpeta del sistema ejecuta `python -m http.server 8000` y abre http://localhost:8000

`localhost` ya viene autorizado en Firebase.

## Paso 6. Publicarlo en internet (GitHub Pages)

1. En GitHub crea un repositorio nuevo, por ejemplo `gias-tiendas`.
2. Sube todos los archivos y la carpeta `icons`: `index.html`, `styles.css`, `script.js`, `config.js`, `manifest.json` y `sw.js`.
3. En el repositorio entra a **Settings** y luego **Pages**. En *Branch* elige `main` y la carpeta `/ (root)`, y guarda.
4. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/gias-tiendas/`.
5. **Importante:** en Firebase, entra a **Authentication**, luego **Configuración** y **Dominios autorizados**, y agrega `TU-USUARIO.github.io`. Sin esto, el inicio de sesión no funciona en la página publicada.

Alternativa sin GitHub: https://app.netlify.com/drop permite arrastrar la carpeta y te da una dirección al instante. Agrega también ese dominio en Firebase.

## Paso 7. Instalarla como aplicación en el teléfono

Solo funciona con la página ya publicada (paso 6), porque necesita `https`.

- **Android (Chrome):** abre la dirección de la página, toca el menú de los tres puntos y elige *Instalar aplicación* o *Agregar a pantalla de inicio*.
- **iPhone (Safari):** abre la dirección, toca el botón *Compartir* (el cuadrito con la flecha) y elige *Agregar a inicio*.

Aparece el ícono de Gia’s en el teléfono. Al tocarlo, el sistema abre a pantalla completa, como cualquier aplicación.

Cuando se actualice el sistema, sube los archivos nuevos y cambia el número de `VERSION` dentro de `sw.js` (por ejemplo, de `gias-v1` a `gias-v2`). Así los teléfonos reciben la versión nueva.

## Paso 8. Preparar Google Sheets para los reportes

1. Con la cuenta del paso 0, entra a https://sheets.google.com y crea una hoja en blanco llamada **Gia’s – Respaldo y reportes**.
2. Copia la dirección de la hoja; se usará para conectar el script de reportes.
3. Compártela, solo como lector, con los correos de los dueños.

El script que copia los datos de Firebase a esta hoja y envía el reporte por correo se agrega después, cuando Firebase ya esté funcionando.

## Paso 9. Primer uso

1. Entra con tu correo y clave.
2. Elige cada tienda y crea su clave interna. Esa clave es la que separa Gia’s de Gia’s Kids.
3. Coloca las tasas del día (euro y dólar) en el recuadro del menú.
4. Pásale a cada dueño la dirección de la página, su usuario y la clave de su tienda.

---

### Sobre la seguridad

- La `apiKey` de Firebase no es secreta. Puede estar en config.js sin problema, porque la protección real está en las **reglas** del paso 3.
- El preset *Unsigned* de Cloudinary permite subir archivos a quien conozca su nombre. Para una tienda está bien; si algún día preocupa, se puede cambiar a subidas firmadas.

### Límites gratuitos (aproximados)

- **Firestore:** 1 GB de datos, 50 000 lecturas y 20 000 escrituras por día. Sobra para dos tiendas.
- **Cloudinary:** unos 25 créditos al mes, suficiente para miles de fotos comprimidas. El sistema ya reduce cada foto antes de subirla.

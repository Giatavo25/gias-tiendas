/* =====================================================
   CONFIGURACIÓN — solo hay que editar este archivo
   ===================================================== */

/* 1) Firebase: Configuración del proyecto > Tus apps > App web > Configuración del SDK.
      Copia aquí los valores de firebaseConfig. */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAG-flfY9LSKuC09MXne8EwrduZ8mrTEdY",
  authDomain: "gias-tiendas.firebaseapp.com",
  projectId: "gias-tiendas",
  storageBucket: "gias-tiendas.firebasestorage.app",
  messagingSenderId: "1092412893555",
  appId: "1:1092412893555:web:44d6c8632b2b68e294fd06"
};

/* 2) Cloudinary (fotos de prendas, logos y archivos de pedidos).
      cloudName: aparece en el panel principal de Cloudinary.
      uploadPreset: el nombre del preset "Unsigned" que crees. */
window.CLOUDINARY = {
  cloudName: "aibha5pv",
  uploadPreset: "gias_unsigned"
};

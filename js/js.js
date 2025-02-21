// // Función para redirigir a WhatsApp
// function comprarPorWhatsapp(mensaje) {
//     const numeroWhatsApp = "51964774354"; // Reemplaza con tu número
//     const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
//     window.open(url, '_blank');
// }

 // Función para filtrar productos por categoría
 function filtrarCategoria(categoria) {
     const productos = document.querySelectorAll('.producto, .producto-header');
     const botones = document.querySelectorAll('.menu a');

     // Mostrar u ocultar productos según la categoría
     productos.forEach(producto => {
         if (producto.getAttribute('data-categoria') === categoria || categoria === 'todos') {
             producto.style.display = 'inline-block';
         } else {
             producto.style.display = 'none';
         }
     });
 }

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btn-whatsapp").forEach(boton => {
        boton.addEventListener("click", function () {
            // Encuentra el contenedor padre del producto (ajustar según tu estructura HTML)
            let producto = this.closest(".producto");

            // Número de WhatsApp (cámbialo por el tuyo)
            let numeroWhatsApp = "51964774354";

            // Obtener la primera imagen del slider dentro del producto
            let imagenProducto = producto.querySelector(".slider img"); // Asegurar el selector correcto
            let urlImagen = imagenProducto ? imagenProducto.src : "";

            // Obtener el nombre del producto
            let nombreProducto = producto.querySelector(".nombre-producto")?.innerText || "Producto";

            // Obtener el precio del producto
            let precioProducto = producto.querySelector(".precio-producto")?.innerText || "No especificado";

            // Construir el mensaje de WhatsApp
            // ${nombreProducto}
            let mensaje = encodeURIComponent(
                `Hola, quiero comprar este producto: \n\nImagen del producto: ${urlImagen}\n\n${precioProducto}`
            );

            // Crear enlace de WhatsApp
            let enlace = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

            // Abrir WhatsApp en una nueva pestaña
            window.open(enlace, "_blank");
        });
    });
});



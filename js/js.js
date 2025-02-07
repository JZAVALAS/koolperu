// Función para redirigir a WhatsApp
function comprarPorWhatsapp(mensaje) {
    const numeroWhatsApp = "51912345678"; // Reemplaza con tu número
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Función para filtrar productos por categoría
function filtrarCategoria(categoria) {
    const productos = document.querySelectorAll('.producto');
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

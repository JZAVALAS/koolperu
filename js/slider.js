document.addEventListener('DOMContentLoaded', function() {
    
    // Configuración
    const totalProducts = 100;
    const imagesPerProduct = 3;
    const productsContainer = document.getElementById('productsContainer');
    
    // Datos de productos (simula la base de datos)
    const categories = ['personalizados', 'kool', 'otros'];
    const products = [];
    
    // Generar datos de productos
    for(let i = 1; i <= totalProducts; i++) {
        products.push({
            id: i,
            name: `Producto ${i}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            images: Array.from({length: imagesPerProduct}, (_, index) => `productos/producto${i}-${index + 1}.jpg`)
        });
    }

    // Smooth scroll para el botón CTA
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        const productsSection = document.querySelector('#products');
        productsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Función para crear una tarjeta de producto
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        
        // Número de WhatsApp y mensaje predeterminado
        const whatsappNumber = "1234567890"; // Reemplaza con tu número de WhatsApp
        const whatsappMessage = `Hola, me interesa el ${product.name}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        card.innerHTML = `
            <div class="slider-container">
                <div class="slider">
                    ${product.images.map(img => `
                        <img src="${img}" alt="${product.name}">
                    `).join('')}
                </div>
                <button class="prev-btn">&lt;</button>
                <button class="next-btn">&gt;</button>
                <div class="dots">
                    ${product.images.map((_, i) => `
                        <span class="dot ${i === 0 ? 'active' : ''}"></span>
                    `).join('')}
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <a href="${whatsappLink}" class="whatsapp-button" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
                    </svg>
                    Comprar
                </a>
            </div>
        `;

        return card;
    }

    // Inicializar slider para una tarjeta de producto
    function initializeSlider(productCard) {
        const slider = productCard.querySelector('.slider');
        const prevBtn = productCard.querySelector('.prev-btn');
        const nextBtn = productCard.querySelector('.next-btn');
        const dots = productCard.querySelectorAll('.dot');
        let currentSlide = 0;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Navegación con botones
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + imagesPerProduct) % imagesPerProduct;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % imagesPerProduct;
            updateSlider();
        });

        // Navegación con dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        slider.addEventListener('touchmove', e => {
            touchEndX = e.touches[0].clientX;
        }, { passive: true });

        slider.addEventListener('touchend', () => {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    currentSlide = (currentSlide - 1 + imagesPerProduct) % imagesPerProduct;
                } else {
                    currentSlide = (currentSlide + 1) % imagesPerProduct;
                }
                updateSlider();
            }
        });
    }

    // Sistema de filtrado
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    function filterProducts(category) {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            if (category === 'todos' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar estado activo de los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar productos
            filterProducts(button.dataset.category);
        });
    });

    // Inicialización inicial
    products.forEach(product => {
        const card = createProductCard(product);
        productsContainer.appendChild(card);
        initializeSlider(card);
    });

    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
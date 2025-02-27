// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Manejo de videos en modales
    initVideoModals();
    
    // Inicialización del desplazamiento suave
    initSmoothScroll();
    
    // Inicialización de la navegación activa
    initActiveNavigation();
    
    // Inicialización de animaciones al hacer scroll
    initScrollAnimations();
});

// Función para manejar los modales de video
function initVideoModals() {
    document.querySelectorAll('.video-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = link.getAttribute('href').split('v=')[1];
            const modal = document.querySelector(link.getAttribute('data-bs-target'));
            const iframe = modal.querySelector('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('hidden.bs.modal', () => {
            const iframe = modal.querySelector('iframe');
            iframe.setAttribute('src', '');
        });
    });
}

// Función para el desplazamiento suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Manejar enlaces que vienen de otras páginas con hash
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

// Función para manejar la navegación activa
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
}

// Función para animaciones al hacer scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .video-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Función para validar formularios
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
} 
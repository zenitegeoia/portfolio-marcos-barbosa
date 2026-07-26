document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header scroll effect
    const header = document.getElementById('header');
    const floatingBtn = document.getElementById('floating-btn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show floating button after scrolling past hero (approx 800px)
        if (window.scrollY > 800 && floatingBtn) {
            floatingBtn.classList.add('visible');
        } else if (floatingBtn) {
            floatingBtn.classList.remove('visible');
        }
    }, { passive: true });

    // 2. Intersection Observer for Scroll Animations
    // Checks if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Unobserve after animating once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.fade-up, .fade-up-delay, .fade-up-delay-1, .fade-up-delay-2, .fade-up-delay-3, .fade-in, .fade-in-right, .reveal-text'
        );

        animatedElements.forEach(el => scrollObserver.observe(el));
    }

    // 3. Form Validation and WhatsApp Redirection
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const company = document.getElementById('company').value.trim();
            const goal = document.getElementById('goal').value.trim();
            
            // Validate basic
            if (!name || !whatsapp || !company || !goal) {
                alert('Por favor, preencha todos os campos para continuarmos.');
                return;
            }
            
            // Construct message
            const message = `Olá, Marcos! Quero receber uma análise da presença digital da minha empresa.\n\nNome: ${name}\nWhatsApp: ${whatsapp}\nEmpresa ou segmento: ${company}\nO que quero melhorar: ${goal}`;
            
            // URL encode
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/5544997769301?text=${encodedMessage}`;
            
            // Track conversion if needed in future
            console.log('Form conversion triggered', { name, company });
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // 4. Tracking Attributes (data-cta)
    const ctaButtons = document.querySelectorAll('[data-cta]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ctaName = button.getAttribute('data-cta');
            console.log(`[Tracking] CTA Clicked: ${ctaName}`);
        });
    });

    // 5. Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

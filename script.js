document.addEventListener('DOMContentLoaded', () => {

    /* --- Initial Load Animations --- */
    const heroContent = document.querySelector('.hero-content');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroTitle = document.querySelector('h1');
    const heroPara = document.querySelector('.hero-content p');
    const heroButtons = document.querySelector('.hero-buttons');

    setTimeout(() => {
        heroSubtitle.classList.add('fade-in-up');
    }, 200);

    setTimeout(() => {
        heroTitle.classList.add('fade-in-up');
    }, 400);

    setTimeout(() => {
        heroPara.classList.add('fade-in-up');
    }, 600);

    setTimeout(() => {
        heroButtons.classList.add('fade-in-up');
    }, 800);

    /* --- Mobile Navigation Toggle --- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Toggle menu visibility
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    /* --- Smooth Scrolling with Offset for Sticky Header --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* --- Animated Numbers (Experience Counter) --- */
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    // Intersection Observer to trigger animation only when scrolled into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                animateCounter(counterElement);
                // Unobserve so it only runs once
                observer.unobserve(counterElement);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            // Speed factor
            const inc = target / speed;
            
            if (count < target) {
                // Add increment and render
                count += inc;
                counter.innerText = Math.ceil(count);
                // Call function again using requestAnimationFrame for smooth animation
                requestAnimationFrame(updateCount);
            } else {
                // Ensure it ends strictly on the target value
                counter.innerText = target;
            }
        };
        
        updateCount();
    }

    /* --- Scroll-triggered Animations --- */
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll();

    /* --- Product Card Hover Animation Enhancement --- */
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotate(1deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    /* --- Contact Form Submission --- */
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Construct message
            const fullMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
            
            // Encode for URL
            const encodedMessage = encodeURIComponent(fullMessage);
            
            // WhatsApp URL
            const whatsappUrl = `https://wa.me/919824888078?text=${encodedMessage}`;
            
            // Email URL
            const emailSubject = encodeURIComponent('Contact from Vastu Ply Lam Website');
            const emailBody = encodeURIComponent(fullMessage);
            const emailUrl = `mailto:bhavinagheda0@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Open email client
            window.open(emailUrl, '_blank');
            
            // Show success message
            alert('Thank you! Your message has been sent to WhatsApp and email. Our team will contact you shortly.');
            
            // Reset form
            contactForm.reset();
        });
    }
});

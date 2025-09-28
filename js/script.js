// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    // Form validation function
    function validateForm(name, email, subject, message) {
        let isValid = true;
        
        // Clear previous error messages
        clearErrorMessages();
        
        // Validate name
        if (name.length < 2) {
            showError('name', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (subject.length < 5) {
            showError('subject', 'Please enter a subject (at least 5 characters)');
            isValid = false;
        }
        
        // Validate message
        if (message.length < 10) {
            showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show error message for specific field
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        
        formGroup.appendChild(errorDiv);
        
        // Add error styling to field
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Remove error styling on focus
        field.addEventListener('focus', function() {
            field.style.borderColor = '';
            field.style.boxShadow = '';
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        });
    }
    
    // Clear all error messages
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
        formFields.forEach(field => {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        });
    }
    
    // Show success/error message
    function showMessage(text, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.textContent = text;
        messageDiv.style.padding = '1rem';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.marginBottom = '1rem';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontSize = '0.95rem';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#dcfce7';
            messageDiv.style.color = '#166534';
            messageDiv.style.border = '1px solid #bbf7d0';
        } else {
            messageDiv.style.backgroundColor = '#fef2f2';
            messageDiv.style.color = '#dc2626';
            messageDiv.style.border = '1px solid #fecaca';
        }
        
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.portfolio-item, .achievement-item, .skill-category');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Set initial styles for animated elements
    document.querySelectorAll('.portfolio-item, .achievement-item, .skill-category').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation on page load
    animateOnScroll();
    
    // Typing animation for hero title (optional enhancement)
    function typeWriter() {
        const titleElement = document.querySelector('.hero-title .highlight');
        if (!titleElement) return;
        
        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 500);
            }
        }
        
        setTimeout(type, 1000);
    }
    
    // Uncomment the line below if you want the typing animation
    // typeWriter();
    
    // Portfolio item hover effects
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Skill tags interactive effects
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            // Scroll-dependent functions are already attached above
        });
    });
    
    console.log('Personal Website Template loaded successfully! 🚀');
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Lazy loading for images (if needed)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Add error handling and use class-based approach for mobile menu
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-open');
        
        // Toggle hamburger animation
        hamburger.classList.toggle('active');
    });
s
    // Add keyboard support for hamburger menu
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navLinks.classList.toggle('nav-open');
            hamburger.classList.toggle('active');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Close mobile menu if it's open
        if (navLinks && navLinks.classList.contains('nav-open')) {
            navLinks.classList.remove('nav-open');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && hamburger && 
        navLinks.classList.contains('nav-open') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('nav-open');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for anchor links (including skip-link)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Account for fixed navigation height
            const navHeight = document.querySelector('nav')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20; // 20px extra spacing
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add fade-in animation for elements when they come into view
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                
                // Remove observer after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-category, .project-card').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Handle window resize to close mobile menu if screen becomes large
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('nav-open')) {
        navLinks.classList.remove('nav-open');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});

// Add loading class removal for any initial animations
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
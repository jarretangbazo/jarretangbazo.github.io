/* =================================================================
   PORTFOLIO SITE
   Main JavaScript File
   ================================================================= */

/* =================================================================
   1. MOBILE NAVIGATION MENU
   Handles hamburger menu toggle, accessibility, and mobile UX
   ================================================================= */

/**
 * Initialize mobile navigation functionality
 * - Toggle menu open/close
 * - Prevent body scroll when menu is open
 * - Close menu when clicking outside or on links
 * - Keyboard accessibility support
 */
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Exit if navigation elements don't exist
    if (!hamburger || !navLinks) {
        console.warn('Navigation elements not found. Mobile menu will not work.');
        return;
    }

    /**
     * Toggle mobile menu open/closed
     * Also handles body scroll lock and aria attributes
     */
    function toggleMobileMenu(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Toggle active states
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('nav-open');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('nav-open')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
        
        // Update ARIA attribute for accessibility
        const isExpanded = navLinks.classList.contains('nav-open');
        hamburger.setAttribute('aria-expanded', isExpanded);
    }

    /**
     * Close mobile menu
     * Resets all menu states
     */
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('nav-open');
        body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Event: Click hamburger button to toggle menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Event: Keyboard support for hamburger button (Enter or Space)
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            toggleMobileMenu(e);
        }
    });

    // Event: Close menu when clicking on any navigation link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-open')) {
                closeMobileMenu();
            }
        });
    });

    // Event: Close menu when clicking outside of navigation
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('nav-open') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Event: Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
            closeMobileMenu();
            hamburger.focus(); // Return focus to hamburger for accessibility
        }
    });

    // Event: Close menu on window resize if viewport becomes desktop size
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Close menu if window width exceeds mobile breakpoint (768px)
            if (window.innerWidth > 768 && navLinks.classList.contains('nav-open')) {
                closeMobileMenu();
            }
        }, 250); // Debounce resize events
    });
}

/* =================================================================
   2. SMOOTH SCROLLING
   Enables smooth scrolling for anchor links with offset for fixed header
   ================================================================= */

/**
 * Initialize smooth scrolling for all anchor links
 * Accounts for fixed navigation height
 */
function initSmoothScrolling() {
    // Select all links that start with # (anchor links)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#" (no target)
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset for fixed navigation
                const nav = document.querySelector('nav');
                const navHeight = nav ? nav.offsetHeight : 80; // Default to 80px if nav not found
                const additionalOffset = 20; // Extra spacing
                const targetPosition = target.offsetTop - navHeight - additionalOffset;
                
                // Smooth scroll to target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update focus to target for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });
}

/* =================================================================
   3. SCROLL ANIMATIONS
   Fade-in animations for cards and sections when they enter viewport
   ================================================================= */

/**
 * Initialize Intersection Observer for scroll animations
 * Elements fade in and slide up when they come into view
 */
function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        console.log('Intersection Observer not supported. Skipping animations.');
        return;
    }

    // Observer configuration
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate element into view
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stop observing this element (animation only happens once)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .blog-card, .experience-item, .education-item, .certification-item, .award-item'
    );

    // Set initial state and observe each element
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

/* =================================================================
   4. ACTIVE PAGE INDICATOR
   Highlights current page in navigation menu
   ================================================================= */

/**
 * Add 'active' class to current page link in navigation
 * Helps users understand which page they're on
 */
function setActiveNavLink() {
    // Get current page filename from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Get link href (filename only)
        const linkPage = link.getAttribute('href');
        
        // Add 'active' class if link matches current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* =================================================================
   5. FORM VALIDATION (Optional - for future contact forms)
   Basic form validation for contact/email forms
   ================================================================= */

/**
 * Initialize form validation if contact forms exist
 * Can be expanded based on your specific form requirements
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form validation logic here
            // Example: check required fields, email format, etc.
            
            const isValid = validateForm(this);
            
            if (isValid) {
                // Form is valid, proceed with submission
                console.log('Form is valid. Ready to submit.');
                // this.submit(); // Uncomment to actually submit
            } else {
                console.log('Form validation failed.');
            }
        });
    });
}

/**
 * Validate individual form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether form is valid
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            // Add error message display logic here
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

/* =================================================================
   6. PERFORMANCE OPTIMIZATION
   Lazy loading images and other performance enhancements
   ================================================================= */

/**
 * Initialize lazy loading for images
 * Improves page load performance by loading images as needed
 */
function initLazyLoading() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    } else {
        // Fallback to Intersection Observer for older browsers
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => imageObserver.observe(img));
        }
    }
}

/* =================================================================
   7. ACCESSIBILITY ENHANCEMENTS
   Additional accessibility features
   ================================================================= */

/**
 * Enhance keyboard navigation and focus management
 */
function enhanceAccessibility() {
    // Add visible focus outline for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Ensure skip link works properly
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    }
}

/* =================================================================
   8. PAGE LOAD INITIALIZATION
   Initialize all functions when DOM is ready
   ================================================================= */

/**
 * Main initialization function
 * Runs when DOM content is fully loaded
 */
function init() {
    console.log('Initializing Jarret Angbazo Portfolio...');
    
    // Initialize all modules
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    setActiveNavLink();
    initFormValidation();
    initLazyLoading();
    enhanceAccessibility();
    
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    console.log('Portfolio initialized successfully!');
}

// Wait for DOM to be ready, then initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already ready
    init();
}

/* =================================================================
   9. UTILITY FUNCTIONS
   Helper functions used throughout the script
   ================================================================= */

/**
 * Debounce function to limit how often a function can run
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to ensure a function runs at most once per interval
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* =================================================================
   10. ERROR HANDLING
   Global error handlers for debugging
   ================================================================= */

/**
 * Log errors to console in development
 * Can be extended to send errors to analytics in production
 */
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // In production, you could send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // In production, you could send this to an error tracking service
});

/* =================================================================
   END OF SCRIPT
   ================================================================= */
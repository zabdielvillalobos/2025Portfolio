// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Function to handle smooth scrolling
function smoothScrollToTarget(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const navHeight = document.querySelector('.navigation').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const offset = targetId === 'cupboard' ? 20 : 0; // Add a small offset for the work section
        
        window.scrollTo({
            top: targetPosition - navHeight - offset,
            behavior: 'smooth'
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        smoothScrollToTarget(targetId);
        
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Handle initial scroll and hash changes
document.addEventListener('DOMContentLoaded', () => {
    // Handle hash fragments on page load
    if (window.location.hash) {
        const targetId = window.location.hash.slice(1);
        // Small delay to ensure DOM is fully ready
        setTimeout(() => {
            smoothScrollToTarget(targetId);
        }, 100);
    }
});

// Handle hash changes during navigation
window.addEventListener('hashchange', () => {
    const targetId = window.location.hash.slice(1);
    if (targetId) {
        smoothScrollToTarget(targetId);
    }
});

// Intersection Observer for animations and lazy loading
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Handle fade-in animations
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Handle lazy loading elements
            if (entry.target.classList.contains('lazy-load')) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe sections for fade-in
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Observe elements for lazy loading
document.querySelectorAll('.project-showcase, .skill-card, .floating-icon').forEach(el => {
    el.classList.add('lazy-load');
    observer.observe(el);
});

// Form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#28a745';

        contactForm.reset();

        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '#0066cc';
        }, 3000);
    });
}

// Navbar background change on scroll
const navigation = document.querySelector('.navigation');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navigation.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navigation.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navigation.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        navigation.style.boxShadow = 'none';
    }
});

// Image loading handler
document.addEventListener('DOMContentLoaded', function() {
    // Handle all images
    document.querySelectorAll('img').forEach(img => {
        const handleLoad = () => {
            img.classList.remove('loading');
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        };

        // Add loading class initially
        img.classList.add('loading');
        
        // Check if image is already loaded
        if (img.complete) {
            handleLoad();
        } else {
            img.addEventListener('load', handleLoad);
        }

        // Handle loading errors
        img.addEventListener('error', () => {
            console.warn(`Failed to load image: ${img.src}`);
            img.style.opacity = '1'; // Show broken image icon rather than nothing
        });
    });

    // Optimize skill carousel
    const scrollTrack = document.querySelector('.scroll-track');
    if (scrollTrack) {
        // Pause animation on hover
        scrollTrack.addEventListener('mouseenter', () => {
            scrollTrack.style.animationPlayState = 'paused';
        });
        
        scrollTrack.addEventListener('mouseleave', () => {
            scrollTrack.style.animationPlayState = 'running';
        });

        // Ensure smooth animation
        scrollTrack.addEventListener('animationiteration', () => {
            scrollTrack.style.willChange = 'transform';
        });
    }

    // Handle floating icons
    document.querySelectorAll('.floating-icon').forEach(icon => {
        icon.style.opacity = '1';
        icon.style.visibility = 'visible';
    });

    // Optimize project showcase images
    document.querySelectorAll('.screen').forEach(screen => {
        screen.setAttribute('loading', 'lazy');
        
        const handleScreenLoad = () => {
            screen.classList.remove('loading');
            screen.style.opacity = '1';
        };

        screen.classList.add('loading');
        
        if (screen.complete) {
            handleScreenLoad();
        } else {
            screen.addEventListener('load', handleScreenLoad);
        }
    });
});
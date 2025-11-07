// Custom JavaScript for Walkabout Investments

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    
    // Add scrolled class styles
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background-color: rgba(52, 58, 64, 0.95) !important;
            backdrop-filter: blur(10px);
            transition: background-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Fade in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation to section content, but exclude headings
                const section = entry.target;
                const heading = section.querySelector('h2');
                
                // Protect heading from animation
                if (heading) {
                    heading.style.opacity = '1';
                    heading.style.transform = 'none';
                    heading.style.animation = 'none';
                }
                
                // Apply animation to the section
                section.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation (exclude about section)
    const sections = document.querySelectorAll('section:not(#about)');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle image loading errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder for missing images
            this.style.backgroundColor = '#f8f9fa';
            this.style.color = '#6c757d';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontSize = '14px';
            this.style.border = '1px solid #dee2e6';
            this.alt = 'Image not available';
            this.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
                    <rect width="300" height="200" fill="#f8f9fa"/>
                    <text x="150" y="100" text-anchor="middle" fill="#6c757d" font-family="Arial" font-size="14">Image Not Available</text>
                </svg>
            `);
        });
    });
    
    // Form validation for future contact forms
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Add styles for active navigation
    const activeNavStyle = document.createElement('style');
    activeNavStyle.textContent = `
        .nav-link.active {
            color: #007bff !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(activeNavStyle);
    
    // Initialize
    updateNavbar();
    updateActiveNav();
    
    // Console log for debugging (remove in production)
    console.log('Walkabout Investments website loaded successfully');
});
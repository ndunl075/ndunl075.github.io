// ===== PORTFOLIO WEBSITE JAVASCRIPT ENHANCEMENTS =====
// This file adds interactive and visually appealing features to the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initScrollAnimations();
    initTypingEffect();
    initParallaxEffects();
    initMobileMenu();
    initScrollProgress();
    initThemeToggle();
    initInteractiveButtons();
    initParticleBackground();
    initContactForm();
    initPageSpecificFeatures();
});

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SCROLL-TRIGGERED ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .about-container, #hero h1, #hero p');
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

// ===== TYPING EFFECT FOR HERO SECTION =====
function initTypingEffect() {
    const heroTitle = document.querySelector('#hero h1');
    const heroSubtitle = document.querySelector('#hero p');
    
    if (heroTitle && heroSubtitle) {
        const originalTitle = heroTitle.textContent;
        const originalSubtitle = heroSubtitle.textContent;
        
        // Clear initial content
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        // Type title
        typeText(heroTitle, originalTitle, 100, () => {
            // Type subtitle after title is complete
            setTimeout(() => {
                typeText(heroSubtitle, originalSubtitle, 50);
            }, 500);
        });
    } else {
        // For pages without hero section, animate the main heading
        const mainHeading = document.querySelector('.content-page h1');
        if (mainHeading) {
            const originalText = mainHeading.textContent;
            mainHeading.textContent = '';
            setTimeout(() => {
                typeText(mainHeading, originalText, 80);
            }, 300);
        }
    }
}

function typeText(element, text, speed, callback) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

// ===== PARALLAX SCROLLING EFFECTS =====
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const navList = nav.querySelector('ul');
    
    // Check if mobile menu button already exists
    let menuButton = nav.querySelector('.mobile-menu-button');
    
    if (!menuButton) {
        // Create hamburger button
        menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 10px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1001;
        `;
        
        nav.style.position = 'relative';
        nav.insertBefore(menuButton, navList);
    }
    
    // Toggle mobile menu
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navList.classList.toggle('mobile-open');
        menuButton.innerHTML = navList.classList.contains('mobile-open') ? '✕' : '☰';
    });
    
    // Close menu when clicking on a link
    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navList.classList.remove('mobile-open');
            menuButton.innerHTML = '☰';
            // Don't prevent default - let the link work normally
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navList.classList.remove('mobile-open');
            menuButton.innerHTML = '☰';
        }
    });
    
    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navList.classList.remove('mobile-open');
            menuButton.innerHTML = '☰';
        }
    });
    
    // Add mobile styles only once
    if (!document.querySelector('#mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-button {
                    display: block !important;
                }
                
                .main-nav {
                    position: relative;
                }
                
                .main-nav ul {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: #333;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    z-index: 1000;
                    border-radius: 0 0 8px 8px;
                }
                
                .main-nav ul.mobile-open {
                    display: flex !important;
                }
                
                .main-nav li {
                    display: block !important;
                    margin: 10px 0 !important;
                    text-align: center;
                }
                
                .main-nav a {
                    display: block;
                    padding: 15px;
                    border-radius: 4px;
                    transition: background-color 0.3s ease;
                }
                
                .main-nav a:hover {
                    background-color: rgba(164, 207, 246, 0.1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #a4cff6, #8abde7);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    // Create theme toggle button
    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    themeButton.innerHTML = '🌙';
    themeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.1);
        border: 2px solid #a4cff6;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    document.body.appendChild(themeButton);
    
    // Theme toggle functionality
    let isDark = true;
    themeButton.addEventListener('click', () => {
        isDark = !isDark;
        themeButton.innerHTML = isDark ? '🌙' : '☀️';
        
        if (isDark) {
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
        }
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        themeButton.click();
    }
    
    // Add light theme styles
    const style = document.createElement('style');
    style.textContent = `
        .light-theme {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: #333 !important;
        }
        
        .light-theme .main-nav {
            background-color: rgba(255,255,255,0.9) !important;
            backdrop-filter: blur(10px);
        }
        
        .light-theme .main-nav a {
            color: #333 !important;
        }
        
        .light-theme .project-card {
            background-color: rgba(255,255,255,0.9) !important;
            color: #333 !important;
        }
        
        .light-theme .about-text {
            color: #333 !important;
        }
        
        .light-theme .cta-button {
            background-color: #667eea !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== ENHANCED BUTTON INTERACTIONS =====
function initInteractiveButtons() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Add magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== PARTICLE BACKGROUND =====
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(164, 207, 246, ${particle.opacity})`;
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// ===== ADDITIONAL ANIMATION STYLES =====
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 25px rgba(164, 207, 246, 0.3);
    }
    
    .cta-button {
        transition: all 0.3s ease;
    }
    
    .cta-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(164, 207, 246, 0.4);
    }
    
    .profile-picture {
        transition: transform 0.3s ease;
    }
    
    .profile-picture:hover {
        transform: scale(1.05);
    }
    
    .main-nav a {
        position: relative;
        overflow: hidden;
    }
    
    .main-nav a::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
        pointer-events: none; /* Don't interfere with clicking */
    }
    
    .main-nav a:hover::before {
        left: 100%;
    }
    
    .scroll-progress {
        box-shadow: 0 0 10px rgba(164, 207, 246, 0.5);
    }
    
    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(164, 207, 246, 0.3);
    }
`;

document.head.appendChild(animationStyles);

// ===== CONTACT FORM ENHANCEMENTS =====
function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Add floating label effect
    inputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add input validation styling
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        });
    });
    
    // Enhanced form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual submission)
            setTimeout(() => {
                submitButton.textContent = 'Message Sent! ✓';
                submitButton.style.backgroundColor = '#4CAF50';
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                    inputs.forEach(input => {
                        input.classList.remove('valid', 'invalid');
                        input.parentElement.classList.remove('focused');
                    });
                }, 2000);
            }, 1500);
        }
    });
    
    // Add form styles
    const formStyles = document.createElement('style');
    formStyles.textContent = `
        form {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        
        form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #a4cff6;
        }
        
        form input, form textarea {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 2px solid #444;
            border-radius: 5px;
            background-color: rgba(255,255,255,0.1);
            color: white;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        form input:focus, form textarea:focus {
            outline: none;
            border-color: #a4cff6;
            box-shadow: 0 0 10px rgba(164, 207, 246, 0.3);
        }
        
        form input.valid {
            border-color: #4CAF50;
        }
        
        form input.invalid {
            border-color: #f44336;
        }
        
        form textarea {
            height: 120px;
            resize: vertical;
        }
        
        .contact-info {
            background-color: rgba(30, 42, 56, 0.5);
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #a4cff6;
        }
        
        .contact-info p {
            margin: 10px 0;
        }
        
        .contact-info a {
            color: #a4cff6;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .contact-info a:hover {
            color: #8abde7;
            text-decoration: underline;
        }
    `;
    document.head.appendChild(formStyles);
}

// ===== PAGE-SPECIFIC FEATURES =====
function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'projects.html':
            initProjectPageFeatures();
            break;
        case 'aboutme.html':
            initAboutPageFeatures();
            break;
        case 'contact.html':
            initContactPageFeatures();
            break;
        case 'index.html':
            initHomePageFeatures();
            break;
    }
}

function initProjectPageFeatures() {
    // Add staggered animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-ready');
    });
    
    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initAboutPageFeatures() {
    // Add animation to list items
    const listItems = document.querySelectorAll('ul li');
    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });
}

function initContactPageFeatures() {
    // Add floating animation to contact info
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.style.animation = 'float 3s ease-in-out infinite';
    }
    
    // Add floating animation keyframes
    const floatStyles = document.createElement('style');
    floatStyles.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyles);
}

function initHomePageFeatures() {
    // Add special effects for home page
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        // Add parallax effect to hero section
        heroSection.classList.add('parallax');
        heroSection.dataset.speed = '0.3';
    }
}

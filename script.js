// ===== PORTFOLIO JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initTypingEffect();
    initMobileMenu();
    initScrollProgress();
    initInteractiveButtons();
    initParticleBackground();
    initSmoothScrolling();
});

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== SCROLL-TRIGGERED ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.project-card, .about-container, #hero h1, #hero p').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

// ===== TYPING EFFECT (inner pages only) =====
function initTypingEffect() {
    const heading = document.querySelector('.content-page h1');
    if (heading) {
        const text = heading.textContent;
        heading.textContent = '';
        setTimeout(() => typeText(heading, text, 45), 200);
    }
}

function typeText(element, text, speed, callback) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const nav     = document.querySelector('.main-nav');
    const navList = nav.querySelector('ul');

    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '&#9776;';
    menuButton.setAttribute('aria-label', 'Toggle menu');
    nav.appendChild(menuButton);

    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = navList.classList.toggle('mobile-open');
        menuButton.innerHTML = open ? '&#10005;' : '&#9776;';
    });

    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navList.classList.remove('mobile-open');
            menuButton.innerHTML = '&#9776;';
        }
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navList.classList.remove('mobile-open');
            menuButton.innerHTML = '&#9776;';
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navList.classList.remove('mobile-open');
            menuButton.innerHTML = '&#9776;';
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-button {
            display: none;
            background: none;
            border: 1px solid #1e1e1e;
            border-radius: 4px;
            color: #666;
            font-size: 18px;
            cursor: pointer;
            padding: 6px 10px;
            margin-left: auto;
            transition: color 0.2s, border-color 0.2s;
        }
        .mobile-menu-button:hover { color: #e8e8e8; border-color: #2a2a2a; }

        @media (max-width: 768px) {
            .mobile-menu-button { display: block; }

            .main-nav ul {
                display: none;
                position: absolute;
                top: 56px;
                left: 0;
                right: 0;
                background-color: #0a0a0a;
                border-bottom: 1px solid #1e1e1e;
                flex-direction: column;
                padding: 12px 16px;
                z-index: 999;
            }

            .main-nav ul.mobile-open { display: flex !important; }

            .main-nav li { display: block !important; margin: 2px 0 !important; }

            .main-nav a,
            .main-nav a:link,
            .main-nav a:visited {
                display: block;
                padding: 10px 12px;
                border-radius: 4px;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.style.cssText = `
        position: fixed; top: 0; left: 0; width: 0%;
        height: 2px; background: linear-gradient(90deg, #00d4ff, #a855f7);
        z-index: 9999; transition: width 0.08s linear;
        box-shadow: 0 0 8px rgba(0, 212, 255, 0.4);
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const pct = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = pct + '%';
    });
}

// ===== BUTTON RIPPLE EFFECT =====
function initInteractiveButtons() {
    document.querySelectorAll('.btn, .cta-button, .secondary-cta').forEach(button => {
        button.addEventListener('click', function (e) {
            const rect   = this.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px; height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                background: rgba(255,255,255,0.12);
                border-radius: 50%;
                transform: scale(0);
                animation: _ripple 0.5s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });

    const style = document.createElement('style');
    style.textContent = `@keyframes _ripple { to { transform: scale(4); opacity: 0; } }`;
    document.head.appendChild(style);
}

// ===== PARTICLE BACKGROUND =====
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: -1; opacity: 0.25;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function make() {
        const cyan = Math.random() > 0.5;
        return {
            x:    Math.random() * canvas.width,
            y:    Math.random() * canvas.height,
            vx:   (Math.random() - 0.5) * 0.4,
            vy:   (Math.random() - 0.5) * 0.4,
            r:    Math.random() * 1.5 + 0.5,
            o:    Math.random() * 0.35 + 0.1,
            cyan: cyan,
        };
    }

    function init() {
        particles = Array.from({ length: 55 }, make);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update positions
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;
        });

        // Draw connecting lines between nearby particles
        const maxDist = 160;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        // Draw particle dots
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.cyan ? `rgba(0, 212, 255, ${p.o})` : `rgba(168, 85, 247, ${p.o})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener('resize', () => { resize(); init(); });
}

// ===== GLOBAL ANIMATION STYLES =====
const animStyle = document.createElement('style');
animStyle.textContent = `
    .animate-ready {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animStyle);

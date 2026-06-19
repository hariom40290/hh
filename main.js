document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: false, // Trigger every time
        mirror: true, // Trigger when scrolling up too
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'ri-close-line';
            } else {
                icon.className = 'ri-menu-3-line';
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.querySelector('i').className = 'ri-menu-3-line';
            }
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'ri-moon-line';
        } else {
            themeIcon.className = 'ri-sun-line';
        }
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Showcase Slider Logic
    const sliders = document.querySelectorAll('.showcase-slider');
    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('.slide');
        const nextBtn = slider.querySelector('.next-btn');
        const prevBtn = slider.querySelector('.prev-btn');
        const dotsContainer = slider.querySelector('.slider-dots');
        
        let currentIndex = 0;
        
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.dot');
        
        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        });
    });

    // Form Submission (Mock)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo portfolio.');
            contactForm.reset();
        });
    }
});
const lines = document.querySelectorAll(".grid-lines span");

let lastScroll = window.scrollY;
let hideTimer;

window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;
    const diff = currentScroll - lastScroll;

    lines.forEach((line, index) => {

        const travel = currentScroll * 0.8 + (index * 150);

        let position;

        if (diff > 0) {
            // Scroll Down
            position = travel % window.innerHeight;
        } else {
            // Scroll Up
            position = window.innerHeight - (travel % window.innerHeight);
        }

        line.style.setProperty(
            "--glow-y",
            `${position}px`
        );

        line.style.setProperty(
            "--glow-opacity",
            "1"
        );
    });

    lastScroll = currentScroll;

    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {

        lines.forEach(line => {
            line.style.setProperty(
                "--glow-opacity",
                "0"
            );
        });

    }, 120);
});
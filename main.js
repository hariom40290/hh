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

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

function openMenu() {
    navLinks.classList.add("active");
    menuToggle.classList.add("active");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {

    if (navLinks.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }

});


/* Close when clicking navigation link */
navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
        closeMenu();
    });

});


/* Close with ESC */
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        closeMenu();
    }

});


/* Close if screen becomes desktop */
window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {
        closeMenu();
    }

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
document.addEventListener("DOMContentLoaded", () => {

    lightGallery(document.getElementById("gallery-container"), {
        speed: 500,
        plugins: [lgZoom]
    });
    const galleryItems = document.querySelectorAll("#gallery-container a");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    const itemsPerClick = 10;
    let visibleItems = itemsPerClick;

    function updateGallery() {

        galleryItems.forEach((item, index) => {

            if (index < visibleItems) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

        if (visibleItems >= galleryItems.length) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "inline-flex";
        }

    }

    updateGallery();

    loadMoreBtn.addEventListener("click", () => {

        visibleItems += itemsPerClick;

        updateGallery();

    });

});






const indicator = document.querySelector(".nav-indicator");
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

function updateIndicator(el) {
    if (!el) return;

    const parent = document.querySelector(".nav-links");
    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    indicator.style.left = (rect.left - parentRect.left) + "px";
    indicator.style.width = rect.width + "px";

    links.forEach(link => link.classList.remove("active"));
    el.classList.add("active");
}

// Click
links.forEach(link => {
    link.addEventListener("click", function () {
        links.forEach(l => l.classList.remove("active"));
    });
});

// Initial
window.addEventListener("load", () => {
    updateIndicator(document.querySelector(".nav-links a.active"));
});

// Resize
window.addEventListener("resize", () => {
    updateIndicator(document.querySelector(".nav-links a.active"));
});

// Scroll Spy
window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            currentSection = section.getAttribute("id");
        }
    });

    if (currentSection) {
        const activeLink = document.querySelector(
            `.nav-links a[href="#${currentSection}"]`
        );

        if (activeLink && !activeLink.classList.contains("active")) {
            updateIndicator(activeLink);
        }
    }

});
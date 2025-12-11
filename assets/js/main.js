// Initialize Icons
lucide.createIcons();

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    if (isClosed) {
        mobileMenu.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        mobileMenu.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
if (overlay) overlay.addEventListener('click', toggleMenu);

// Close menu when link clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Dark Mode Logic
const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');

// Check local storage or system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
}

// Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Add click event to doctor cards to navigate to detail page
const doctorCards = document.querySelectorAll('#dokter .bg-white, #dokter .dark\\:bg-card');
doctorCards.forEach(card => {
    const doctorName = card.querySelector('h3').textContent;
    const chatButton = card.querySelector('a'); // Now it's a link

    // We've already set the href in the HTML, but we can add additional functionality here if needed
    if (chatButton) {
        chatButton.addEventListener('click', (e) => {
            // The navigation is handled by the href, but we can add analytics or other functionality here
            console.log(`Navigating to detail page for ${doctorName}`);
        });
    }
});

// Add click event to article cards to navigate to detail page
const articleCards = document.querySelectorAll('#artikel article');
articleCards.forEach(card => {
    const articleTitle = card.querySelector('h3').textContent;
    const readMoreLink = card.querySelector('a'); // Now it's a link

    // We've already set the href in the HTML, but we can add additional functionality here if needed
    if (readMoreLink) {
        readMoreLink.addEventListener('click', (e) => {
            // The navigation is handled by the href, but we can add analytics or other functionality here
            console.log(`Navigating to detail page for ${articleTitle}`);
        });
    }
});

// Modal Logic
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const loginBtns = document.querySelectorAll('.login-btn');
const registerBtns = document.querySelectorAll('.register-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const loginOverlay = document.getElementById('login-modal-overlay');
const registerOverlay = document.getElementById('register-modal-overlay');
const switchToRegister = document.querySelector('.switch-to-register');
const switchToLogin = document.querySelector('.switch-to-login');

function openModal(modal) {
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Open Listeners
loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (registerModal) closeModal(registerModal);
        openModal(loginModal);
        // If sidebar is open, close it (mobile)
        if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
            toggleMenu();
        }
    });
});

registerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginModal) closeModal(loginModal);
        openModal(registerModal);
        // If sidebar is open, close it (mobile)
        if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
            toggleMenu();
        }
    });
});

// Close Listeners
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(registerModal);
    });
});

if (loginOverlay) loginOverlay.addEventListener('click', () => closeModal(loginModal));
if (registerOverlay) registerOverlay.addEventListener('click', () => closeModal(registerModal));

// Switch Listeners
if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
}

if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
}
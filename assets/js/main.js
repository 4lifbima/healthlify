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

                    mobileMenuBtn.addEventListener('click', toggleMenu);
                    closeMenuBtn.addEventListener('click', toggleMenu);
                    overlay.addEventListener('click', toggleMenu);

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
                    window.addEventListener('scroll', () => {
                        if (window.scrollY > 20) {
                            navbar.classList.add('shadow-md');
                        } else {
                            navbar.classList.remove('shadow-md');
                        }
                    });

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
                        chatButton.addEventListener('click', (e) => {
                            // The navigation is handled by the href, but we can add analytics or other functionality here
                            console.log(`Navigating to detail page for ${doctorName}`);
                        });
                    });

                    // Add click event to article cards to navigate to detail page
                    const articleCards = document.querySelectorAll('#artikel article');
                    articleCards.forEach(card => {
                        const articleTitle = card.querySelector('h3').textContent;
                        const readMoreLink = card.querySelector('a'); // Now it's a link
                        
                        // We've already set the href in the HTML, but we can add additional functionality here if needed
                        readMoreLink.addEventListener('click', (e) => {
                            // The navigation is handled by the href, but we can add analytics or other functionality here
                            console.log(`Navigating to detail page for ${articleTitle}`);
                        });
                    });
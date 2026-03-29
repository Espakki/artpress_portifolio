/* ============================================================
   ArtPress – Interactions Script
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    // Preloader Sequence (GSAP MorphSVG)
    const preloader = document.getElementById('preloader');
    if (preloader && typeof gsap !== 'undefined') {
        document.body.style.overflow = 'hidden';
        
        if (typeof MorphSVGPlugin !== 'undefined') {
            gsap.registerPlugin(MorphSVGPlugin);
        }

        let tl = gsap.timeline({
            defaults: { duration: 0.9, ease: "expo.inOut" }
        })
        .to("#morph", { morphSVG: "#speech" })
        .to("#morph", { morphSVG: "#rocket" })
        .to("#morph", { morphSVG: "#lightning" })
        .to("#morph", { morphSVG: "#thumb" })
        .to("#morph", { morphSVG: "#square" })
        .to("#morph", { morphSVG: "#grid" })
        .to("#morph", { morphSVG: "#bulb" });

        // Fade in ARTPRESS logo text below the GSAP animation
        gsap.to("#preloader-text", {
            duration: 1.5, 
            opacity: 1, 
            y: 0, 
            ease: "power3.out", 
            delay: 0.3 
        });

        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                document.body.style.overflow = '';
                document.body.classList.remove('overflow-hidden');
            }, 800);
        }, 6500); // Sweet spot between 5s and 8.5s
    } else if (preloader) {
        setTimeout(() => { preloader.style.opacity = '0'; setTimeout(() => preloader.remove(), 800); }, 1000);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu?.querySelectorAll("a");
    mobileLinks?.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

    // Contact Form Submission Mock
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = document.getElementById("submit-btn");
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Enviando... <span class="material-symbols-outlined">hourglass_empty</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '✓ Enviado';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 1200);
        });
    }

    // Curved Marquee Interaction
    const marqueeSection = document.getElementById('curved-marquee');
    const textPath = document.getElementById('curve-text-path');
    if (marqueeSection && textPath) {
        const marqueeText = "ARTPRESS ✦ IMPRESSÃO PREMIUM ✦ DESIGN EXCLUSIVO ✦ COMUNICAÇÃO DE IMPACTO ✦ ";
        const svg = marqueeSection.querySelector('svg');
        
        const measureText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        measureText.textContent = marqueeText;
        measureText.style.visibility = "hidden";
        measureText.style.fontSize = "5rem";
        measureText.style.fontFamily = "'Space Grotesk', sans-serif";
        svg.appendChild(measureText);
        
        setTimeout(() => {
            let spacing = 1500;
            try {
                spacing = measureText.getComputedTextLength();
            } catch(e) {}
            
            const repeats = Math.ceil(2500 / spacing) + 2;
            textPath.textContent = Array(repeats).fill(marqueeText).join('');
            measureText.remove();
            
            let offset = -spacing;
            let speed = 1.5;
            let isDragging = false;
            let lastX = 0;
            let vel = 0;
            let dir = -1;
            
            function step() {
                if (!isDragging) {
                    offset += speed * dir;
                } else {
                    offset += vel;
                }
                
                if (offset <= -spacing) offset += spacing;
                if (offset > 0) offset -= spacing;
                
                textPath.setAttribute('startOffset', offset + 'px');
                requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            
            marqueeSection.addEventListener('pointerdown', (e) => {
                isDragging = true;
                lastX = e.clientX;
                vel = 0;
                marqueeSection.setPointerCapture(e.pointerId);
                marqueeSection.classList.replace('cursor-grab', 'cursor-grabbing');
            });
            
            marqueeSection.addEventListener('pointermove', (e) => {
                if (!isDragging) return;
                const dx = e.clientX - lastX;
                lastX = e.clientX;
                vel = dx;
            });
            
            const stopDrag = () => {
                if (!isDragging) return;
                isDragging = false;
                if (vel > 0) dir = 1;
                else if (vel < 0) dir = -1;
                marqueeSection.classList.replace('cursor-grabbing', 'cursor-grab');
            };
            
            marqueeSection.addEventListener('pointerup', stopDrag);
            marqueeSection.addEventListener('pointercancel', stopDrag);
        }, 100); // give font slightly more time
    }

    // GSAP ScrollTrigger Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Reveal Sections (skip hero to avoid first-paint instability on CTA)
        const sections = document.querySelectorAll('section:not(#hero)');
        sections.forEach(section => {
            const container = section.querySelector('.container');
            if (!container) return;
            
            gsap.from(container, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                immediateRender: false
            });
        });

        // 2. Staggered Cards (Services & Portfolio only)
        const gridContainers = document.querySelectorAll('#services .grid, #portfolio .grid');
        gridContainers.forEach(grid => {
            const cards = grid.querySelectorAll('.group');
            if (cards.length > 0) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 80%",
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power2.out",
                    immediateRender: false
                });
            }
        });

        // 3. Watermark Parallax Effect
        const watermarks = document.querySelectorAll('.absolute.inset-0.flex, .absolute.inset-x-0.bottom-0, .absolute.left-0.top-0');
        watermarks.forEach(wm => {
            gsap.to(wm, {
                scrollTrigger: {
                    trigger: wm.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: -100,
                ease: "none"
            });
        });

        // 4. Hero Content Specific Reveal
        gsap.from("#hero h1, #hero p, #hero-cta", {
            duration: 1.5,
            y: 40,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            delay: 7 // Wait for preloader
        });
    }
});

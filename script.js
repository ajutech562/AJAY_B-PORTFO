/* ---------- Heavy interactive JS (scroll reveal, progress animation, nav highlight) ---------- */

/* Helper: observe many elements */
const observerOptions = { root: null, threshold: 0.12 };

/* Scroll reveal: add .in-view when visible */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // if skill-card -> animate progress
            if (entry.target.classList.contains('skill-card')) {
                const progress = entry.target.querySelector('.progress');
                const target = progress.style.getPropertyValue('--target') || progress.getAttribute('data-target') || progress.style.getPropertyValue('width');
                // trigger animated width
                progress.style.animation = `progressFill 1.4s cubic-bezier(.22,.9,.22,1) forwards`;
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

/* Observe all elements with class hidden */
document.querySelectorAll('.hidden').forEach(el => revealObserver.observe(el));

/* ALSO observe .hidden elements that were in HTML as 'hidden' class */
document.querySelectorAll('.hidden').forEach(el => revealObserver.observe(el));

/* Animate progress bars more robustly: set width from CSS var --target */
document.querySelectorAll('.progress').forEach(p => {
    // If a CSS custom property is present, use it (already set in HTML: style="--target:90%")
    const root = getComputedStyle(p);
    const t = p.style.getPropertyValue('--target') || root.getPropertyValue('--target');
    // nothing further—animation handled by CSS keyframes when element gets in-view
});

/* NAV HIGHLIGHT */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector('.nav-link[href="#' + id + '"]');
            if (active) active.classList.add('active');
        }
    });
}
window.addEventListener('scroll', onScroll);
onScroll();

/* Smooth anchor behavior for internal links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* Back-to-top small effect: float on hover already via CSS */

/* CONTACT FORM: show temporary toast (FormSubmit will handle actual sending) */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Let form submit normally so FormSubmit receives it
        // But show a small on-page confirmation before redirect (non-blocking).
        const toast = document.createElement('div');
        toast.textContent = 'Sending your message... Opening email confirmation (verify first submission).';
        toast.style.position = 'fixed';
        toast.style.right = '20px';
        toast.style.bottom = '20px';
        toast.style.background = 'linear-gradient(90deg,#8b5cf6,#f43f5e)';
        toast.style.color = '#fff';
        toast.style.padding = '12px 16px';
        toast.style.borderRadius = '10px';
        toast.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
        toast.style.zIndex = 2000;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4500);
        // allow default submit to continue
    });
}

/* Hero photo micro-parallax on mouse move for heavy animation feel */
const heroPhoto = document.querySelector('.hero-photo');
const heroSection = document.querySelector('.home');
if (heroPhoto && heroSection) {
    heroSection.addEventListener('mousemove', e => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroPhoto.style.transform = `translate(${x * 12}px, ${y * 8}px) rotate(${x * -3}deg) scale(1.02)`;
    });
    heroSection.addEventListener('mouseleave', () => {
        heroPhoto.style.transform = '';
    });
}

/* Mobile: toggle nav */
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navbar');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        hamburger.classList.toggle('open');
    });
}

/* Accessibility: trap focus if mobile nav open (simple) */

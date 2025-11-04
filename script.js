// 1. SCROLL REVEAL ANIMATION using Intersection Observer
const hiddenElements = document.querySelectorAll('.hidden-element');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            observer.unobserve(entry.target); // Stop observing once animated
            
            // Special handling for the Skills section to animate progress bars
            if (entry.target.classList.contains('skill-card')) {
                animateProgressBar(entry.target);
            }
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

hiddenElements.forEach(el => observer.observe(el));


// 2. PROGRESS BAR ANIMATION (Triggered by Scroll Reveal)
function animateProgressBar(skillCard) {
    const progressBar = skillCard.querySelector('.progress');
    // Get the width style attribute (e.g., "90%") and remove the '%'
    const finalWidth = progressBar.style.width; 

    // Set a CSS variable for the animation keyframes
    progressBar.style.setProperty('--final-width', finalWidth);
    
    // Set width to 0 before applying the animation class
    progressBar.style.width = '0';

    // Trigger the CSS animation
    // Use a small timeout to ensure the browser registers the width: 0 before animating
    setTimeout(() => {
        progressBar.classList.add('animate-fill');
    }, 100);
}


// 3. ACTIVE NAV LINK HIGHLIGHTING
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar a');

    sections.forEach(sec => {
        let top = window.scrollY;
        // Adjust offset to account for the fixed header height
        let offset = sec.offsetTop - 150; 
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            // Ensure the link for the current section is set to active
            document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
        }
    });
});


// 4. Basic Form Submission (Placeholder)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon. (Simulated submission)');
    this.reset();
});

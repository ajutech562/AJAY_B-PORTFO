// Hover focus glow animation for project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 6px 20px rgba(20, 184, 166, 0.4)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = 'none';
  });
});

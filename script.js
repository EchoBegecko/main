const card = document.getElementById('tiltCard');

card.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();
    
    // Locates the center points of the card
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Calculates cursor distance offsets relative to the card's midpoint
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    // Map offsets to tilt angles (maximum limit capped at 25 degrees)
    const maxTilt = 25;
    const tiltX = (mouseY / (cardRect.height / 2)) * -maxTilt;
    const tiltY = (mouseX / (cardRect.width / 2)) * maxTilt;
    
    // Updates rotational translation in real-time
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
});

// Snaps back smoothly to center point when your cursor leaves the boundary box
card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

// Reactivates rapid tracking interpolation immediately on cursor entry
card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease-out';
});

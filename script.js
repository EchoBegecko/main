const card = document.getElementById('tiltCard');
const workspace = document.getElementById('workspaceContainer');

// Track mouse movement across the workspace canvas to follow the cursor smoothly
workspace.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();
    
    // Locates exact center point coordinates of the card container
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Calculates cursor distance offsets relative to the card's midpoint
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    // Map offsets into amplified tilt parameters (Capped at 75 degrees max tilt)
    const maxTilt = 75;
    const tiltX = (mouseY / (window.innerHeight / 2)) * -maxTilt;
    const tiltY = (mouseX / (window.innerWidth / 2)) * maxTilt;
    
    // Apply smooth rotation update directly following mouse position coordinates
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

// Snaps layout flat back to zero coordinates smoothly when cursor exits boundary frame
workspace.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.6s ease-in-out';
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// Re-enables instantaneous fluid cursor adjustments when mouse enters workspace canvas
workspace.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease-out';
});


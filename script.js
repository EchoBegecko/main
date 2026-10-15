
const card = document.getElementById('tiltCard');
const workspace = document.getElementById('workspaceContainer');

let targetTiltX = 0;
let targetTiltY = 0;
let currentTiltX = 0;
let currentTiltY = 0;

// Adjust these to customise the effect
const maxTilt = 12;      // Maximum tilt in degrees
const followSpeed = 0.04; // Lower = slower, smoother movement

workspace.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();

    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    // Calculate a much smaller tilt
    targetTiltX = (mouseY / (window.innerHeight / 2)) * -maxTilt;
    targetTiltY = (mouseX / (window.innerWidth / 2)) * maxTilt;
});

// Smoothly ease the card towards the mouse
function animateTilt() {
    currentTiltX += (targetTiltX - currentTiltX) * followSpeed;
    currentTiltY += (targetTiltY - currentTiltY) * followSpeed;

    card.style.transform =
        `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;

    requestAnimationFrame(animateTilt);
}

animateTilt();

// Return the card to its neutral position
workspace.addEventListener('mouseleave', () => {
    targetTiltX = 0;
    targetTiltY = 0;
});

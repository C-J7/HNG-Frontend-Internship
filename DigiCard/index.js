const currentTime = document.querySelector('[data-testid="test-user-time"]');

function updateTime() {
    currentTime.textContent = Date.now();
}

updateTime();

// Update the time every second
window.setInterval(updateTime, 1000);

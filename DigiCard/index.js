const avatar = document.querySelector('[data-testid="test-user-avatar"]');
const currentTime = document.querySelector('[data-testid="test-user-time"]');


// SVG avatar illustration
const avatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-labelledby="title desc">
  <title id="title">Portrait illustration</title>
  <desc id="desc">A clean circular profile illustration with a blue and teal gradient background.</desc>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9" />
      <stop offset="100%" stop-color="#14b8a6" />
    </linearGradient>
  </defs>
  <rect width="320" height="320" rx="36" fill="url(#bg)" />
  <circle cx="160" cy="126" r="58" fill="#dbeafe" opacity="0.95" />
  <path d="M74 282c10-55 50-88 86-88s76 33 86 88" fill="#eff6ff" opacity="0.95" />
  <circle cx="138" cy="120" r="8" fill="#0f172a" />
  <circle cx="182" cy="120" r="8" fill="#0f172a" />
  <path d="M141 150c12 10 26 10 38 0" fill="none" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
  
</svg>`;




function updateTime() {
    currentTime.textContent = Date.now();
}


avatar.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(avatarSvg)}`;
avatar.loading = 'eager';


updateTime();

// Update the time every second
window.setInterval(updateTime, 1000);

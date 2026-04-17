
// ─── Config ───────────────────────────────────────────────
const IMAGE_DIR = './images/';          // path to your folder
const IMAGE_FILES = [
    'heart2.jpg',
    'alisa-kujou-roshidere.gif',
    // add as many as you like...
];
const PARTICLE_COUNT = 40;
// ──────────────────────────────────────────────────────────

const particleContainer = document.getElementById('particle-container');

function createParticle( a ) {

    const img = document.createElement('img');
    const file = IMAGE_FILES[Math.floor(Math.random() * IMAGE_FILES.length)];

    img.src = IMAGE_DIR + file;
    img.classList.add('particle');
    img.draggable = false;

    img.style.left = Math.random() * 100 + 'vw';
    img.style.animationDuration = (Math.random() * 10 + 15) + 's';
    img.style.zIndex=a;

    // Optional: randomise size a bit so they feel more organic
    const size = Math.random() * 40 + Math.random()*100 + 15;   
    img.style.width = size + 'px';
    img.style.height = size + 'px';
    img.style.objectFit = 'contain';

    particleContainer.appendChild(img);
    /*console.log("created particle at zindex:",img.style.zIndex);*/
    img.addEventListener('animationend', () => {
        img.remove();
        createParticle(a);
    });
}

for (let i = 1; i < PARTICLE_COUNT; i++) {
    setTimeout(()=>createParticle(i), i * 200);
}
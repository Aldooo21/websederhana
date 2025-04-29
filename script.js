// Produk data dummy
const products = {
    panel: [
        { name: "Panel Pemula", img: "gambar/panel1.jpg", price: "Rp 5.000", desc: "Memory/Disk/Cpu 3100/3100/150%." },
        { name: "Panel Magang", img: "gambar/panel1.jpg", price: "Rp 8.000", desc: "Memory/Disk/Cpu 4100/4100/200%." },
        { name: "Panel Pro", img: "gambar/panel1.jpg", price: "Rp 10.000", desc: "Memory/Disk/Cpu 5100/5100/250%." },
        { name: "Panel Sepuh", img: "gambar/panel1.jpg", price: "Rp 15.000", desc: "Memory/Disk/Cpu UNLIMITED." },
    ],
    aplikasi: [
        { name: "Canva Premium", img: "https://static.vecteezy.com/system/resources/previews/048/759/334/non_2x/canva-transparent-icon-free-png.png", price: "Rp 10.000", desc: "Canva Team" },
        { name: "Youtube Premium", img: "https://as2.ftcdn.net/v2/jpg/03/38/30/39/1000_F_338303963_oayKkEnViwubK9RV0BZBZja8bAMjjhZN.jpg", price: "Rp 10.000", desc: "Famplan" },
        { name: "Spotify Premium", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png", price: "Rp 10.000", desc: "famplan" },
        { name: "Netflix 1P1U", img: "https://static.vecteezy.com/system/resources/previews/020/336/373/non_2x/netflix-logo-netflix-icon-free-free-vector.jpg", price: "Rp 35.000", desc: "1P 1U SEMI PRIVAT" },
    ],
    script: [
        { name: "Script Bot Store", img: "gambar/panel1.jpg", price: "Rp 50.000", desc: "Script bot store di lengkapi  fitur fitur menarikk." },
        { name: "Script Bot Top UP Integrasi Order Kouta", img: "gambar/panel1.jpg", price: "Rp 100.000", desc: "Script bot topup automatis via order kouta di lengkapi fitur store." },
    ]
};

// Function buat nampilin section
function showSection(section) {
    document.querySelectorAll('.product-section').forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

// Function buat nampilin produk
function showProducts(type) {
    const container = document.getElementById(`${type}-products`);
    container.innerHTML = "";

    products[type].forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <p>${product.desc}</p>
            <button onclick="buyNow('${product.name}')">Beli Sekarang</button>
        `;
        container.appendChild(card);
    });
}

// Function buat redirect ke WhatsApp
function buyNow(productName) {
    const nomorWA = '6282276853797'; // ganti sama nomor lo bro!
    const message = `Halo saya mau beli produk: ${productName}`;
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(message)}`, '_blank');
}

function toggleMenu() {
    const container = document.querySelector('.element-container');
    container.classList.toggle('show');
}

// Tutup menu saat klik di luar
document.addEventListener('click', function(event) {
    const container = document.querySelector('.element-container');
    const button = document.querySelector('.floating-button');
    
    if (!container.contains(event.target) && !button.contains(event.target)) {
        container.classList.remove('show');
    }
});
const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Efek gerak mouse & usap layar
document.addEventListener('mousemove', (e) => createParticles(e, false));
document.addEventListener('touchmove', function(e) {
    for (let touch of e.touches) {
        createParticles({ clientX: touch.clientX, clientY: touch.clientY }, false);
    }
});

// Efek klik ledakan
document.addEventListener('click', (e) => createParticles(e, true));

function createParticles(e, explode) {
    const numberOfParticles = explode ? 50 : 3; // klik = 50 partikel, gerak biasa = 3 partikel
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * (explode ? 10 : 5) + 2,
            speedX: (Math.random() - 0.5) * (explode ? 10 : 3),
            speedY: (Math.random() - 0.5) * (explode ? 10 : 3),
            color: `rgba(138, 43, 226, ${Math.random() * 0.8 + 0.2})` // warna ungu neon dengan random opacity
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.95; // partikel mengecil pelan-pelan
        if (p.size < 0.5) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

animateParticles();
// Ambil element
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const backgroundMusic = document.getElementById('background-music');

let isPlaying = false;

// Saat klik icon musik
musicControl.addEventListener('click', () => {
    if (!isPlaying) {
        backgroundMusic.play();
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-pause');
        isPlaying = true;
    } else {
        backgroundMusic.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-music');
        isPlaying = false;
    }
});
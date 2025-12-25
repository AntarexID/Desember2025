document.getElementById('open-btn').addEventListener('click', function() {
    // 1. Jalankan musik natal
    const music = document.getElementById('christmas-music');
    music.play().catch(e => console.log("Menunggu interaksi"));

    // 2. Ganti tampilan layar
    document.getElementById('gift-screen').style.display = 'none';
    const treeScreen = document.getElementById('tree-screen');
    treeScreen.classList.remove('hidden');

    // 3. Bangun pohon dan salju
    generate3DTree();
    setInterval(createSnow, 200);

    // 4. LOGIKA JUMPSCARE (Muncul setelah 2 detik secara diam-diam)
    setTimeout(() => {
        const videoContainer = document.getElementById('jumpscare-container');
        const video = document.getElementById('jumpscare-video');

        // Berhentikan musik natal agar jumpscare lebih mengagetkan
        music.pause();

        // Munculkan video
        videoContainer.classList.remove('hidden-video');
        video.play();
        
        // Opsional: Jika video selesai, balik ke pohon lagi
        video.onended = function() {
            videoContainer.classList.add('hidden-video');
            music.play();
        };
    }, 5000); // 5000ms = 5 detik
});

function generate3DTree() {
    const container = document.getElementById('tree-layers');
    const layers = 5; 
    const sides = 6; 

    for (let i = 0; i < layers; i++) {
        const scale = 1 - (i * 0.18);
        const yOffset = i * 40;
        for (let j = 0; j < sides; j++) {
            const leaf = document.createElement('div');
            leaf.className = 'tree-layer';
            const rotateY = j * (360 / sides);
            leaf.style.transform = `translateY(-${yOffset}px) rotateY(${rotateY}deg) scale(${scale})`;
            leaf.style.borderBottomColor = i % 2 === 0 ? '#1b4d3e' : '#2d5a27';
            
            // Lampu hias
            if (Math.random() > 0.4) {
                const light = document.createElement('div');
                light.className = 'light';
                const colors = ['#ff4757', '#f1c40f', '#2e86de', '#fff'];
                light.style.background = colors[Math.floor(Math.random() * colors.length)];
                light.style.top = '80px';
                light.style.left = (Math.random() * 40 - 20) + 'px';
                leaf.appendChild(light);
            }
            container.appendChild(leaf);
        }
    }
}

function createSnow() {
    const snow = document.createElement('div');
    snow.className = 'snowflake';
    snow.innerHTML = '❄';
    snow.style.left = Math.random() * 100 + 'vw';
    snow.style.fontSize = (Math.random() * 10 + 10) + 'px';
    const duration = Math.random() * 3 + 2;
    snow.style.animationDuration = duration + 's';
    document.body.appendChild(snow);
    setTimeout(() => { snow.remove(); }, duration * 1000);
}
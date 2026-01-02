document.addEventListener('DOMContentLoaded', function() {
    const codeOutput = document.getElementById('code-output');
    const terminal = document.querySelector('.terminal');
    const mainContent = document.getElementById('main-content');
    const flower = document.getElementById('magic-flower');
    const bloomSound = document.getElementById('bloom-sound');
    
    const codeLines = [
        "Initializing love_generator.exe...",
        "Loading emotions...",
        "Compiling heartbeats...",
        "Rendering flower for Berra...",
        "Executing bloom_animation();"
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let typingSpeed = 80;
    
    function typeWriter() {
        if (lineIndex < codeLines.length) {
            if (charIndex < codeLines[lineIndex].length) {
                codeOutput.innerHTML += codeLines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                codeOutput.innerHTML += '<br>$ ';
                lineIndex++;
                charIndex = 0;
                
                if (lineIndex === codeLines.length) {
                    // Kod yazma bitti, terminal kapanıyor
                    setTimeout(() => {
                        terminal.style.opacity = '0';
                        terminal.style.transform = 'translateY(-50px)';
                        terminal.style.transition = 'all 1s ease';
                        
                        setTimeout(() => {
                            terminal.classList.add('hidden');
                            mainContent.classList.remove('hidden');
                            startFlowerAnimation();
                        }, 1000);
                    }, 1000);
                    return;
                }
                
                setTimeout(typeWriter, 500);
            }
        }
    }
    
    function startFlowerAnimation() {
        // Çiçeği büyüt
        flower.classList.add('grow-animation');
        
        // Çiçek açma animasyonu
        setTimeout(() => {
            flower.classList.add('bloom-animation');
            
            // Ses efekti
            if (bloomSound) {
                bloomSound.currentTime = 0;
                bloomSound.play().catch(e => console.log("Ses oynatılamadı: ", e));
            }
            
            // Her taç yaprağı için gecikmeli animasyon
            const petals = document.querySelectorAll('.petal');
            petals.forEach((petal, index) => {
                petal.style.setProperty('--rot', `${index * 45}deg`);
                petal.style.animationDelay = `${index * 0.2}s`;
            });
            
            // Konfeti efekti
            setTimeout(createConfetti, 1500);
        }, 1000);
    }
    
    function createConfetti() {
        const colors = ['#ff4081', '#4caf50', '#2196f3', '#ffcc00', '#9c27b0'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = '-20px';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0.8';
            
            document.body.appendChild(confetti);
            
            // Animasyon
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    function replayAnimation() {
        // Çiçeği sıfırla
        flower.classList.remove('grow-animation', 'bloom-animation');
        void flower.offsetWidth; // Trigger reflow
        
        // Terminali geri getir
        terminal.classList.remove('hidden');
        terminal.style.opacity = '1';
        terminal.style.transform = 'translateY(0)';
        mainContent.classList.add('hidden');
        
        // Kod yazmayı sıfırla
        codeOutput.innerHTML = '';
        lineIndex = 0;
        charIndex = 0;
        
        // Yeniden başlat
        setTimeout(typeWriter, 500);
    }
    
    // Başlangıç
    setTimeout(typeWriter, 1000);
    
    // Klavye kısayolu (R tuşu = tekrar oynat)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'r' || e.key === 'R') {
            replayAnimation();
        }
    });
});

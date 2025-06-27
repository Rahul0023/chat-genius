 const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Magnetic button effect
        document.querySelectorAll('.btn-magnetic').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                button.style.setProperty('--x', `${x}px`);
                button.style.setProperty('--y', `${y}px`);
            });
        });
// Particle Background
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.5 + 0.2})`
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(168, 85, 247, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) * 0.2;
            const moveY = (y - centerY) * 0.2;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            // Glow effect
            const glow = document.createElement('div');
            glow.className = 'btn-glow';
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            button.appendChild(glow);
            
            setTimeout(() => {
                glow.remove();
            }, 500);
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Typing Animation
function initTypingAnimation() {
    const messages = [
        "How do I reset my password?",
        "What's the status of my order #12345?",
        "Can I upgrade my subscription plan?",
        "How do I integrate with Odoo?"
    ];
    
    const typingElement = document.querySelector('.typing');
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingElement.querySelector('.typing-indicator').previousElementSibling.textContent = 
                currentMessage.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.querySelector('.typing-indicator').previousElementSibling.textContent = 
                currentMessage.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(type, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }
    }
    
    // Start typing animation
    setTimeout(type, 1500);
}

// GSAP Animations
function initGSAPAnimations() {
    gsap.registerEffect({
        name: "fadeIn",
        effect: (targets, config) => {
            return gsap.from(targets, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
                ...config
            });
        }
    });
    
    // Animate hero elements
    gsap.effects.fadeIn(".hero-content > *", { stagger: 0.15 });
    
    // Chat window animation
    gsap.from(".chat-window", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
    });
    
    // Floating elements animation
    gsap.from(".floating-card", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.8
    });
    
    // Integration badge animation
    gsap.from(".integration-badge", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        delay: 1.2
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initMagneticButtons();
    initTypingAnimation();
    initGSAPAnimations();
});


// Tab Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Animation for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });


     document.addEventListener('DOMContentLoaded', function() {
        const billingToggle = document.getElementById('billing-toggle');
        
        billingToggle.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const annualPrices = document.querySelectorAll('.annual-price');
            const monthlyTexts = document.querySelectorAll('.monthly-text');
            const annualTexts = document.querySelectorAll('.annual-text');
            
            if (this.checked) {
                monthlyPrices.forEach(el => el.style.display = 'none');
                annualPrices.forEach(el => el.style.display = 'inline');
                monthlyTexts.forEach(el => el.style.display = 'none');
                annualTexts.forEach(el => el.style.display = 'inline');
            } else {
                monthlyPrices.forEach(el => el.style.display = 'inline');
                annualPrices.forEach(el => el.style.display = 'none');
                monthlyTexts.forEach(el => el.style.display = 'inline');
                annualTexts.forEach(el => el.style.display = 'none');
            }
        });
    });


    // Magnetic button effect
    document.addEventListener('DOMContentLoaded', function() {
        const magneticBtns = document.querySelectorAll('.btn-magnetic');
        
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) * 0.2;
                const moveY = (y - centerY) * 0.2;
                
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    });


    // Tab Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    });
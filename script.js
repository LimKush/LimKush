// ===========================
// NAVIGATION & MENU MOBILE
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle du menu hamburger
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ===========================
// NAVIGATION ACTIVE
// ===========================

let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            updateNavbarShadow();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

function updateActiveLink() {
    let current = '';
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// MEMBRES - PANNEAU DÉROULANT
// ===========================

const memberCards = document.querySelectorAll('.member-card');

memberCards.forEach(card => {
    const header = card.querySelector('.member-header');
    const details = card.querySelector('.member-details');
    const expandBtn = card.querySelector('.expand-btn');
    
    if (header && details && expandBtn) {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const isCurrentlyActive = details.classList.contains('active');
            
            // Fermer tous les autres panneaux avec animation fluide
            memberCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherDetails = otherCard.querySelector('.member-details');
                    const otherBtn = otherCard.querySelector('.expand-btn');
                    if (otherDetails && otherBtn) {
                        otherDetails.classList.remove('active');
                        otherBtn.textContent = '+';
                    }
                }
            });
            
            // Toggle du panneau actuel
            if (isCurrentlyActive) {
                details.classList.remove('active');
                expandBtn.textContent = '+';
            } else {
                details.classList.add('active');
                expandBtn.textContent = '−';
            }
        });
    }
});

// ===========================
// ANIMATION AU SCROLL
// ===========================

// Observer pour les animations d'apparition avec meilleure configuration
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Désactiver l'observation après l'animation
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Éléments à animer - Excluant ceux qui ont déjà leurs propres animations
const animatedElements = document.querySelectorAll(`
    .place-card,
    .member-card,
    .requirement-card,
    .alter-card,
    .level
`);

// Configurer les éléments pour l'animation
animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    fadeInObserver.observe(el);
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

const navbar = document.querySelector('.navbar');

function updateNavbarShadow() {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(255, 0, 64, 0.5)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(255, 0, 64, 0.3)';
        }
    }
}

// ===========================
// STATISTIQUES ANIMÉES
// ===========================

let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return; // Empêcher la double animation
    statsAnimated = true;
    
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach((stat, index) => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 60; // 60 frames pour une animation d'environ 1 seconde
            const hasPlusSign = finalValue.includes('+');
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = hasPlusSign ? numericValue + '+' : numericValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = hasPlusSign ? Math.floor(currentValue) + '+' : Math.floor(currentValue);
                }
            }, 16); // ~60fps
        }
    });
};

// Observer pour les statistiques
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===========================
// ARBRE GÉNÉALOGIQUE
// ===========================

// Fonction pour charger l'arbre généalogique
const loadGenealogyTree = (url) => {
    const iframe = document.getElementById('genealogy-frame');
    if (iframe && url && url !== 'about:blank') {
        iframe.src = url;
    }
};

// Exemple d'utilisation - Décommenter et remplacer l'URL
// loadGenealogyTree('https://votre-url-arbre-genealogique.com');

// ===========================
// EFFET D'ESPRITS VENGEURS
// ===========================

// Créer un effet d'esprits vengeurs flottants dans le hero
const createSpiritParticles = () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const spiritCount = 15;
    const spiritsContainer = document.createElement('div');
    spiritsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < spiritCount; i++) {
        const spirit = document.createElement('div');
        const size = Math.random() * 40 + 20;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        
        // Créer un esprit avec une aura
        spirit.innerHTML = `
            <div class="spirit-core"></div>
            <div class="spirit-aura"></div>
        `;
        
        spirit.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            top: ${startY}%;
            animation: spiritRise ${duration}s ease-in-out ${delay}s infinite;
            filter: blur(1px);
        `;
        
        const core = spirit.querySelector('.spirit-core');
        core.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 0, 64, 0.8), rgba(220, 20, 60, 0.3));
            border-radius: 50%;
            animation: spiritPulse 3s ease-in-out infinite;
        `;
        
        const aura = spirit.querySelector('.spirit-aura');
        aura.style.cssText = `
            position: absolute;
            width: 150%;
            height: 150%;
            top: -25%;
            left: -25%;
            background: radial-gradient(circle, transparent 30%, rgba(255, 0, 64, 0.2), transparent);
            border-radius: 50%;
            animation: spiritAura 2s ease-in-out infinite;
        `;
        
        spiritsContainer.appendChild(spirit);
    }
    
    heroSection.insertBefore(spiritsContainer, heroSection.firstChild);
    
    // Ajouter les animations CSS pour les esprits
    if (!document.getElementById('spirit-animations')) {
        const style = document.createElement('style');
        style.id = 'spirit-animations';
        style.textContent = `
            @keyframes spiritRise {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                50% {
                    transform: translate(30px, -100px) rotate(180deg);
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translate(-20px, -200px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes spiritPulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 0.6;
                }
                50% {
                    transform: scale(1.3);
                    opacity: 1;
                }
            }
            
            @keyframes spiritAura {
                0%, 100% {
                    transform: scale(1) rotate(0deg);
                    opacity: 0.3;
                }
                50% {
                    transform: scale(1.2) rotate(180deg);
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Activer les esprits au chargement
window.addEventListener('load', () => {
    createSpiritParticles();
});

// ===========================
// COPIE DU TEMPLATE
// ===========================

// Fonction pour copier le template dans le presse-papier
const addCopyButtonToTemplate = () => {
    const templateSection = document.querySelector('.template-section');
    if (!templateSection) return;
    
    const copyButton = document.createElement('button');
    copyButton.textContent = '📋 Copier le template';
    copyButton.style.cssText = `
        display: block;
        margin: 1rem auto;
        padding: 0.8rem 2rem;
        background: linear-gradient(135deg, #ff1744, #dc143c);
        color: white;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
        box-shadow: 0 5px 15px rgba(255, 0, 64, 0.3);
    `;
    
    copyButton.addEventListener('mouseenter', () => {
        copyButton.style.transform = 'scale(1.05) translateY(-2px)';
        copyButton.style.boxShadow = '0 8px 25px rgba(255, 0, 64, 0.5)';
    });
    
    copyButton.addEventListener('mouseleave', () => {
        copyButton.style.transform = 'scale(1) translateY(0)';
        copyButton.style.boxShadow = '0 5px 15px rgba(255, 0, 64, 0.3)';
    });
    
    copyButton.addEventListener('click', () => {
        const templateText = document.querySelector('.template-box pre').textContent;
        
        navigator.clipboard.writeText(templateText).then(() => {
            copyButton.textContent = '✅ Copié !';
            copyButton.style.background = 'linear-gradient(135deg, #00ff00, #008800)';
            setTimeout(() => {
                copyButton.textContent = '📋 Copier le template';
                copyButton.style.background = 'linear-gradient(135deg, #ff1744, #dc143c)';
            }, 2000);
        }).catch(err => {
            console.error('Erreur lors de la copie:', err);
            copyButton.textContent = '❌ Erreur';
            copyButton.style.background = 'linear-gradient(135deg, #ff0000, #cc0000)';
            setTimeout(() => {
                copyButton.textContent = '📋 Copier le template';
                copyButton.style.background = 'linear-gradient(135deg, #ff1744, #dc143c)';
            }, 2000);
        });
    });
    
    templateSection.insertBefore(copyButton, templateSection.querySelector('.template-box'));
};

window.addEventListener('load', () => {
    addCopyButtonToTemplate();
});

// ===========================
// EASTER EGG - KONAMI CODE
// ===========================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

const activateEasterEgg = () => {
    // Message secret
    const message = document.createElement('div');
    message.textContent = '🎉 Code secret activé ! Vous avez débloqué le mode héros ! ⚡';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff0040, #dc143c);
        color: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 10px 50px rgba(255, 0, 64, 0.8);
        text-align: center;
        animation: easterEggPulse 1s infinite;
    `;
    
    document.body.appendChild(message);
    
    // Effet d'écran
    document.body.style.animation = 'easterEggFlash 2s linear';
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            message.remove();
            document.body.style.animation = '';
        }, 500);
    }, 2500);
    
    // Ajouter les animations si elles n'existent pas
    if (!document.getElementById('easter-egg-animations')) {
        const style = document.createElement('style');
        style.id = 'easter-egg-animations';
        style.textContent = `
            @keyframes easterEggPulse {
                0%, 100% { 
                    transform: translate(-50%, -50%) scale(1);
                    box-shadow: 0 10px 50px rgba(255, 0, 64, 0.8);
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.05);
                    box-shadow: 0 15px 60px rgba(255, 0, 64, 1);
                }
            }
            @keyframes easterEggFlash {
                0%, 100% { filter: brightness(1) hue-rotate(0deg); }
                25% { filter: brightness(1.3) hue-rotate(90deg); }
                50% { filter: brightness(1) hue-rotate(180deg); }
                75% { filter: brightness(1.3) hue-rotate(270deg); }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
};

// ===========================
// LAZY LOADING DES IMAGES
// ===========================

const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

window.addEventListener('load', lazyLoadImages);

// ===========================
// THÈME ALTERNATIF (OPTIONNEL)
// ===========================

// Fonction pour basculer entre les thèmes
const toggleTheme = () => {
    document.body.classList.toggle('light-theme');
    const isDark = !document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Charger le thème sauvegardé
const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
};

window.addEventListener('load', loadTheme);

// ===========================
// GESTION DES ERREURS
// ===========================

window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.message);
});

// ===========================
// PERFORMANCE MONITORING
// ===========================

// Mesurer le temps de chargement
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`✅ Site chargé en ${(loadTime / 1000).toFixed(2)} secondes`);
});

// ===========================
// INITIALISATION
// ===========================

console.log('%c🩸 CLAN REIKETSU 🩸', 'color: #ff0040; font-size: 30px; font-weight: bold; text-shadow: 0 0 10px #ff0040;');
console.log('%cBienvenue dans le système du Clan Reiketsu', 'color: #dc143c; font-size: 16px;');
console.log('%cType "help()" pour voir les commandes disponibles', 'color: #cccccc; font-size: 12px;');

// Fonction d'aide pour les développeurs
window.help = () => {
    console.log(`
    🩸 COMMANDES DISPONIBLES 🩸
    
    loadGenealogyTree(url) - Charger un arbre généalogique
    toggleTheme()          - Basculer entre thème clair/sombre
    createSpiritParticles()- Réactiver l'effet d'esprits vengeurs
    
    📝 Astuce: Essayez le code Konami pour un easter egg !
    ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
    `);
};

// Message de bienvenue
console.log('%c⚡ Site prêt ! ⚡', 'color: #ff0040; font-size: 20px; font-weight: bold;');
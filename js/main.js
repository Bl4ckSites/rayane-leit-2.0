/* ==========================================================================
   RAIANE LEIT — main.js
   Cards redesenhados em glassmorphism: ícone SVG + rótulo de texto.
   ========================================================================== */
'use strict';

/* =============================================================
   CONFIG
============================================================= */
const CONFIG = {
    socials: {
        instagram: 'https://www.instagram.com/rai.moraesht',
        telegram:  'https://t.me/Rayane_leite',
        x:         'https://x.com/raiane_leit',
        facebook:  'https://www.facebook.com/share/18UeksBW8A',
        tiktok:    'https://www.tiktok.com/@rayane.leit'
    },
    cards: [
        {
            id: 'privacy',
            name: 'Privacy',
            image: 'cards/card1.webp',
            url: 'https://privacy.com.br/checkout/Rayanne_leite',
            requiresAgeCheck: true
        },
        {
            id: 'vip',
            name: 'Telegram VIP',
            image: 'cards/card2.webp',
            urlChunks: ['nN==', 'YmcmpUE0', 'Y2IgYaDi', 'nJIZnJSF', 'qT9vK2I0'],
            requiresAgeCheck: true
        },
        {
            id: 'exclusivos',
            name: 'Exclusivos',
            image: 'cards/card3.webp',
            urlChunks: ['qTt=', 'Yl86p3O0', 'paOeozyf', 'pUOuYaMc', 'ozScLKVi', 'MKEcMJky'],
            requiresAgeCheck: true
        },
        {
            id: 'onlyfans',
            name: 'OnlyFans',
            image: 'cards/card4.webp',
            urlChunks: ['qTt=', 'Yl86p3O0', 'LJM5oT5i', 'oJ9wYaAh', 'ozS5LKVi', 'qTyyoP5y'],
            requiresAgeCheck: true
        },
        {
            id: 'fatalfans',
            name: 'Fatal Fans',
            image: 'cards/card5.webp',
            urlChunks: ['pUE0nN==', 'LJLiYmcm', 'ozSzoTS0', 'Y21iLl5m', 'MJ5unJSl', 'MKEcMJks'],
            requiresAgeCheck: true
        },
        {
            id: 'free',
            name: 'Telegram Free',
            image: 'cards/card6.webp',
            urlChunks: ['nN==', 'YmcmpUE0', 'Y2IgYaDi', 'MJ5urJSF', 'MKEcMJks'],
            requiresAgeCheck: true
        }
    ],
    // Vídeo de fundo desativado: usamos raiane-bg.jpg em .page-bg.
    // O breakpoint é inalcançável para impedir a criação do <video>.
    video: { src: 'imgs/desktop-background.mp4', breakpoint: 99999 }
};

const TIMINGS = {
    ROTATION_MS: 400,
    FADE_MS:     300,
    RIPPLE_MS:   600
};

/* =============================================================
   ÍCONES SVG — embutidos por id de card
   Cada string é um <svg> completo, colorido por currentColor.
============================================================= */
const ICONS = {
    privacy:
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path d="M8 21V4h6a5 5 0 0 1 0 10H8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<circle cx="18" cy="19" r="1.6" fill="currentColor"/>' +
        '</svg>',

    telegram:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
            '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>' +
        '</svg>',

    exclusivos:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
            '<rect x="3" y="8" width="18" height="4" rx="1.2"/>' +
            '<path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8"/>' +
            '<path d="M12 8v13"/>' +
            '<path d="M12 8s-2.2-5-4.2-5S5.2 5 6.4 6.6 12 8 12 8z"/>' +
            '<path d="M12 8s2.2-5 4.2-5 2.6 2 1.4 3.6S12 8 12 8z"/>' +
        '</svg>',

    onlyfans:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
            '<path d="M24 4.003h-4.015c-3.45 0-5.3.197-7.127 1.173a12.46 12.46 0 0 0-4.79 4.79c-.98 1.83-1.178 3.68-1.178 7.13v2.66H3.62a5.53 5.53 0 0 1-1.883-.271 5.51 5.51 0 0 1-1.525-1.153 5.52 5.52 0 0 1-1.156-1.523A5.53 5.53 0 0 1 0 5.53v-.007a5.53 5.53 0 0 1 .271-1.883A5.51 5.51 0 0 1 1.424 2.115 5.52 5.52 0 0 1 2.947.959A5.53 5.53 0 0 1 4.83 0h14.174v4.003z"/>' +
            '<path d="M20.314 8.66c-1.22 0-2.243.44-3.07 1.32-.83.88-1.24 2.02-1.24 3.43v2.09H9.68v-4.94c0-1.44-.15-2.62-.44-3.53h4.99c.42 0 .83.03 1.22.1v6.3h4.87v-4.77z"/>' +
        '</svg>',

    fatalfans:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
            '<path d="M11.9 6.6 6.6 1.9C5.4.8 3.4 1.5 3.4 3.2v17.6c0 1.7 2 2.4 3.2 1.3l5.3-4.7 5.3 4.7c1.2 1.1 3.2.4 3.2-1.3V3.2c0-1.7-2-2.4-3.2-1.3l-5.3 4.7z"/>' +
        '</svg>',

    // Fallback visual de "Telegram Free" (reutiliza ícone do Telegram)
    free:
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
            '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>' +
        '</svg>'
};

/* =============================================================
   GA4 — rastreamento de cliques nos cards
============================================================= */
function trackCardClick(cardName, cardId, destinationUrl) {
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', 'select_content', {
        content_type:    'card_link',
        content_id:      cardId || cardName,
        card_name:       cardName,
        card_id:         cardId || cardName,
        destination_url: destinationUrl || ''
    });
}

/* =============================================================
   RESOLVE URL
============================================================= */
function decodeUrl(chunks) {
    try {
        if (!Array.isArray(chunks) || chunks.length === 0) return '#';

        const reversed = [...chunks].reverse().join('');

        const rot13Decoded = reversed.replace(/[a-zA-Z]/g, c =>
            String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)
        );

        return atob(rot13Decoded).split('').reverse().join('');
    } catch (e) {
        console.error('[Security] Falha na decodificação da URL');
        return '#';
    }
}

function resolveCardUrl(card) {
    if (typeof card.url === 'string' && card.url.length > 0) return card.url;
    if (Array.isArray(card.urlChunks)) return decodeUrl(card.urlChunks);
    return '#';
}

/* =============================================================
   ÁUDIO
============================================================= */
let audioCtx = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function initAudio() {
    if (audioCtx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    try { audioCtx = new Ctx(); } catch (_) { audioCtx = null; }
}

function playClickSound() {
    if (prefersReducedMotion.matches) return;
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
}

/* =============================================================
   RIPPLE
============================================================= */
function createRipple(event, element) {
    if (prefersReducedMotion.matches) return;
    if (!element || element.querySelector('.ripple')) return;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const cx   = (event && typeof event.clientX === 'number') ? event.clientX : rect.left + rect.width  / 2;
    const cy   = (event && typeof event.clientY === 'number') ? event.clientY : rect.top  + rect.height / 2;
    const x    = cx - rect.left - size / 2;
    const y    = cy - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width  = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left   = x + 'px';
    ripple.style.top    = y + 'px';

    element.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

/* =============================================================
   TAP HELPER
============================================================= */
const TAP_MAX_DISTANCE = 10;
const TAP_MAX_DURATION = 500;

function attachTapHandler(element, handler) {
    let startX = 0, startY = 0, startTime = 0;
    let isTap = false;
    let lastHandled = 0;

    const run = (event) => {
        const now = Date.now();
        if (now - lastHandled < 400) return;
        lastHandled = now;
        playClickSound();
        handler(event);
    };

    element.addEventListener('touchstart', (e) => {
        const t = e.changedTouches[0];
        startX = t.clientX;
        startY = t.clientY;
        startTime = Date.now();
        isTap = true;
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
        if (!isTap) return;
        const t = e.changedTouches[0];
        if (Math.abs(t.clientX - startX) > TAP_MAX_DISTANCE || Math.abs(t.clientY - startY) > TAP_MAX_DISTANCE) {
            isTap = false;
        }
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
        if (!isTap) return;
        if (Date.now() - startTime > TAP_MAX_DURATION) return;
        const t = e.changedTouches[0];
        if (Math.abs(t.clientX - startX) > TAP_MAX_DISTANCE || Math.abs(t.clientY - startY) > TAP_MAX_DISTANCE) return;

        e.preventDefault();
        run({ clientX: t.clientX, clientY: t.clientY, currentTarget: element, target: e.target });
    }, { passive: false });

    element.addEventListener('click', (e) => {
        e.preventDefault();
        run({ clientX: e.clientX, clientY: e.clientY, currentTarget: element, target: e.target });
    });
}

/* =============================================================
   INIT
============================================================= */
document.addEventListener('DOMContentLoaded', () => {
    initSocialLinks();
    renderCards();
    initModal();
    initDesktopVideo();
});

function initSocialLinks() {
    document.querySelectorAll('.social-link[data-social]').forEach(link => {
        const platform = link.getAttribute('data-social');
        if (CONFIG.socials[platform]) link.href = CONFIG.socials[platform];
    });
}

/* =============================================================
   RENDER CARDS — versão glassmorphism (ícone SVG + rótulo)
============================================================= */
function renderCards() {
    const container = document.getElementById('cards-container');
    if (!container) return;

    CONFIG.cards.forEach((card, index) => {
        const cardElement = document.createElement('a');
        cardElement.className = 'card-item';

        // SEGURANÇA: href é sempre '#'. A URL real só é resolvida no clique.
        cardElement.href = '#';
        cardElement.setAttribute('role', 'button');
        cardElement.setAttribute('aria-label', `Acessar ${card.name}`);
        cardElement.style.setProperty('--card-index', index);

        // Ícone (SVG inline)
        const iconWrap = document.createElement('span');
        iconWrap.className = `card-icon card-icon--${card.id}`;
        iconWrap.setAttribute('aria-hidden', 'true');
        iconWrap.innerHTML = ICONS[card.id] || '';

        // Rótulo (nome do card, preservado do CONFIG)
        const label = document.createElement('span');
        label.className = 'card-label';
        label.textContent = card.name;

        cardElement.appendChild(iconWrap);
        cardElement.appendChild(label);

        attachTapHandler(cardElement, () => {
            const realUrl = resolveCardUrl(card);
            handleCardClick(realUrl, card, cardElement);
        });

        container.appendChild(cardElement);
    });
}

function handleCardClick(url, card, cardElement) {
    if (cardElement && !prefersReducedMotion.matches) {
        cardElement.classList.add('card-pulse');
        cardElement.addEventListener('animationend', () => {
            cardElement.classList.remove('card-pulse');
        }, { once: true });
    }

    if (url === '#' || !url) return;

    // === RASTREAMENTO GA4 ===
    trackCardClick(card.name, card.id, url);

    if (card.requiresAgeCheck && typeof window.triggerAgeModal === 'function') {
        window.triggerAgeModal(url);
    } else {
        window.location.href = url;
    }
}

/* =============================================================
   MODAL +18
============================================================= */
function initModal() {
    const modal      = document.getElementById('age-modal');
    const closeBtn   = document.getElementById('modal-close');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn  = document.getElementById('modal-cancel');

    if (!modal) return;

    let selectedDestination = null;
    let previouslyFocusedElement = null;
    let closeTimer = null;

    function calculateScrollbarWidth() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.setProperty('--scrollbar-compensation', scrollbarWidth + 'px');
    }

    const openModal = () => {
        clearTimeout(closeTimer);
        previouslyFocusedElement = document.activeElement;
        calculateScrollbarWidth();

        if (closeBtn) closeBtn.classList.remove('is-closing');
        modal.classList.remove('is-closing');
        modal.classList.remove('active');

        modal.hidden = false;
        document.body.classList.add('modal-active');

        void modal.offsetHeight;
        modal.classList.add('active');

        if (confirmBtn) confirmBtn.focus();
    };

    const closeModal = () => {
        if (modal.hidden || modal.classList.contains('is-closing')) return;

        modal.classList.add('is-closing');
        modal.classList.remove('active');
        document.body.classList.remove('modal-active');

        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
            modal.hidden = true;
            modal.classList.remove('is-closing');
            if (closeBtn) closeBtn.classList.remove('is-closing');

            if (previouslyFocusedElement && previouslyFocusedElement.focus) {
                previouslyFocusedElement.focus();
            }
        }, TIMINGS.FADE_MS);

        selectedDestination = null;
    };

    const closeBtnHandler = () => {
        if (closeBtn.classList.contains('is-closing')) return;
        closeBtn.classList.add('is-closing');
        setTimeout(() => { closeModal(); }, TIMINGS.ROTATION_MS);
    };

    const confirmAndGo = () => {
        if (!selectedDestination) { closeModal(); return; }
        const url = selectedDestination;
        closeModal();
        setTimeout(() => { window.location.href = url; }, TIMINGS.FADE_MS + 50);
    };

    if (closeBtn) attachTapHandler(closeBtn, closeBtnHandler);

    if (cancelBtn) {
        attachTapHandler(cancelBtn, (e) => {
            createRipple(e, cancelBtn);
            closeModal();
        });
    }

    if (confirmBtn) {
        attachTapHandler(confirmBtn, (e) => {
            createRipple(e, confirmBtn);
            confirmAndGo();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    window.triggerAgeModal = (url) => {
        selectedDestination = url;
        openModal();
    };
}

/* =============================================================
   VÍDEO DE FUNDO — mantido por compatibilidade, porém inativo
   (breakpoint 99999 impede a criação; CSS também oculta as camadas)
============================================================= */
function initDesktopVideo() {
    const container = document.getElementById('video-background-container');
    const overlay   = document.querySelector('.video-overlay');
    if (!container || !overlay) return;

    let currentVideo = null;

    function tryPlay(video) {
        const p = video.play();
        if (p && typeof p.catch === 'function') {
            p.catch((err) => {
                console.warn('[video] Autoplay bloqueado:', err && err.name);
                const resume = () => {
                    video.play().catch(() => {});
                    document.removeEventListener('click', resume);
                    document.removeEventListener('touchstart', resume);
                    document.removeEventListener('keydown', resume);
                };
                document.addEventListener('click', resume, { once: true });
                document.addEventListener('touchstart', resume, { once: true });
                document.addEventListener('keydown', resume, { once: true });
            });
        }
    }

    function createVideo() {
        const video = document.createElement('video');
        video.src = CONFIG.video.src;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('muted', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('aria-hidden', 'true');
        video.setAttribute('disablepictureinpicture', '');
        video.setAttribute('tabindex', '-1');

        video.addEventListener('error', () => {
            console.error('[video] FALHA ao carregar:', CONFIG.video.src);
            container.classList.remove('active');
            overlay.classList.remove('active');
        });

        video.addEventListener('loadeddata', () => {
            tryPlay(video);
        }, { once: true });

        container.appendChild(video);
        container.classList.add('active');
        overlay.classList.add('active');

        tryPlay(video);
        currentVideo = video;
    }

    function destroyVideo() {
        if (!currentVideo) return;
        try { currentVideo.pause(); } catch (_) {}
        currentVideo.removeAttribute('src');
        try { currentVideo.load(); } catch (_) {}
        container.innerHTML = '';
        container.classList.remove('active');
        overlay.classList.remove('active');
        currentVideo = null;
    }

    const checkDesktop = () => {
        const isDesktop = window.matchMedia(`(min-width: ${CONFIG.video.breakpoint}px)`).matches;
        const hasVideo  = !!container.querySelector('video');

        if (isDesktop && !hasVideo) {
            createVideo();
        } else if (!isDesktop && hasVideo) {
            destroyVideo();
        }
    };

    checkDesktop();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkDesktop, 200);
    });

    document.addEventListener('visibilitychange', () => {
        if (!currentVideo) return;
        if (document.hidden) {
            try { currentVideo.pause(); } catch (_) {}
        } else {
            tryPlay(currentVideo);
        }
    });
}

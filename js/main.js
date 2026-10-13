/* ==========================================================================
   RAIANE LEIT — main.js
   Cards em vidro claro: imagem (pasta /icons) OU SVG inline (Telegram).
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
            iconSrc: 'icons/privacy.png',
            url: 'https://privacy.com.br/checkout/Rayanne_leite',
            requiresAgeCheck: true
        },
        {
            id: 'vip',
            name: 'Telegram VIP',
            svg: 'telegram',
            urlChunks: ['nN==', 'YmcmpUE0', 'Y2IgYaDi', 'nJIZnJSF', 'qT9vK2I0'],
            requiresAgeCheck: true
        },
        {
            id: 'exclusivos',
            name: 'Exclusivos',
            iconSrc: 'icons/exclusivos.png',
            urlChunks: ['qTt=', 'Yl86p3O0', 'paOeozyf', 'pUOuYaMc', 'ozScLKVi', 'MKEcMJky'],
            requiresAgeCheck: true
        },
        {
            id: 'onlyfans',
            name: 'OnlyFans',
            iconSrc: 'icons/onlyfans.png',
            urlChunks: ['qTt=', 'Yl86p3O0', 'LJM5oT5i', 'oJ9wYaAh', 'ozS5LKVi', 'qTyyoP5y'],
            requiresAgeCheck: true
        },
        {
            id: 'fatalfans',
            name: 'FatalFans',
            iconSrc: 'icons/fatalfans.png',
            urlChunks: ['pUE0nN==', 'LJLiYmcm', 'ozSzoTS0', 'Y21iLl5m', 'MJ5unJSl', 'MKEcMJks'],
            requiresAgeCheck: true
        },
        {
            id: 'free',
            name: 'Telegram Free',
            svg: 'telegram',
            urlChunks: ['nN==', 'YmcmpUE0', 'Y2IgYaDi', 'MJ5urJSF', 'MKEcMJks'],
            requiresAgeCheck: true
        }
    ]
};

const TIMINGS = {
    ROTATION_MS: 400,
    FADE_MS:     300,
    RIPPLE_MS:   600
};


/* =============================================================
   ÍCONES SVG — apenas Telegram (os demais vêm de /icons/*.png)
============================================================= */
const ICONS = {
    telegram:
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
   RESOLVE URL — url direta OU chunks decodificados
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
   ÁUDIO — clique sintético
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
   TAP HELPER — clique/tap unificado com proteção
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
});


/* =============================================================
   SOCIAL LINKS
============================================================= */
function initSocialLinks() {
    document.querySelectorAll('.social-link[data-social]').forEach(link => {
        const platform = link.getAttribute('data-social');
        if (CONFIG.socials[platform]) link.href = CONFIG.socials[platform];
    });
}


/* =============================================================
   RENDER CARDS — imagem OU svg + rótulo
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

        // --- Ícone: imagem (padrão) ou SVG (quando card.svg existe) ---
        const iconWrap = document.createElement('span');
        iconWrap.className = `card-icon card-icon--${card.id}`;
        iconWrap.setAttribute('aria-hidden', 'true');

        if (card.svg && ICONS[card.svg]) {
            iconWrap.innerHTML = ICONS[card.svg];
        } else if (card.iconSrc) {
            const img = document.createElement('img');
            img.src = card.iconSrc;
            img.alt = '';
            img.loading = 'lazy';
            img.decoding = 'async';
            iconWrap.appendChild(img);
        }

        // --- Rótulo (nome do card, preservado do CONFIG) ---
        const label = document.createElement('span');
        label.className = 'card-label';
        label.textContent = card.name;

        cardElement.appendChild(iconWrap);
        cardElement.appendChild(label);

        // --- Handler único de clique/tap com ripple ---
        attachTapHandler(cardElement, (event) => {
            createRipple(event, cardElement);
            const realUrl = resolveCardUrl(card);
            handleCardClick(realUrl, card, cardElement);
        });

        container.appendChild(cardElement);
    });
}


/* =============================================================
   CLIQUE NO CARD
============================================================= */
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

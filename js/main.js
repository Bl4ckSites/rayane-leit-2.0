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
    ripple.addEventListener('animationend', () => ripple

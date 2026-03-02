// js/i18n.js
const i18n = (function() {
    let currentLang = localStorage.getItem('lang') || 'en';
    let translations = {};

    async function loadLanguage(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error('Failed to load translations');
            translations = await response.json();
            currentLang = lang;
            localStorage.setItem('lang', lang);
            updateStaticContent();
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        } catch (error) {
            console.error('i18n error:', error);
            translations = {};
        }
    }

    function updateStaticContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getNestedTranslation(key);
            if (translation) el.textContent = translation;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = getNestedTranslation(key);
            if (translation) el.placeholder = translation;
        });
    }

    function getNestedTranslation(key) {
        return key.split('.').reduce((obj, part) => obj && obj[part], translations);
    }

    return {
        init: async () => {
            await loadLanguage(currentLang);
        },
        t: (key, params = {}) => {
            const translation = getNestedTranslation(key);
            if (translation === undefined) return '';
            // If it's a string, replace placeholders; otherwise return as is (object/array)
            if (typeof translation === 'string') {
                return translation.replace(/\{(\w+)\}/g, (match, p1) => params[p1] !== undefined ? params[p1] : match);
            }
            return translation;
        },
        setLanguage: async (lang) => {
            await loadLanguage(lang);
        },
        getCurrentLang: () => currentLang
    };
})();

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    // Force re-render of dynamic content after translations are loaded
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: i18n.getCurrentLang() } }));

    // Language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        function updateLangToggle() {
            const currentLang = i18n.getCurrentLang();
            const langText = document.getElementById('lang-text');
            if (currentLang === 'en') {
                langText.textContent = 'नेपाली';
            } else {
                langText.textContent = 'English';
            }
        }
        updateLangToggle();

        langToggle.addEventListener('click', async (e) => {
            e.preventDefault();
            const currentLang = i18n.getCurrentLang();
            const newLang = currentLang === 'en' ? 'np' : 'en';
            await i18n.setLanguage(newLang);
            updateLangToggle();
        });
    }
});
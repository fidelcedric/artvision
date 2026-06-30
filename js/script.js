(function () {
    'use strict';

    var menuBtn = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var el = document.querySelector(this.getAttribute('href'));
            if (el) {
                e.preventDefault();
                window.scrollTo({
                    top: el.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-content');
    var originalLightboxSrc = '';
    var currentLightboxSrc = '';

    document.querySelectorAll('.gallery-card img').forEach(function (img) {
        img.addEventListener('click', function () {
            originalLightboxSrc = currentLightboxSrc = this.src;
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt || 'Artwork';
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                closeLightbox();
            }
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    var filterBar = document.getElementById('lightbox-filter-bar');
    if (filterBar) {
        filterBar.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-filter]');
            if (!btn) return;
            var filter = btn.dataset.filter;
            if (filter === 'reset') {
                lightboxImg.src = originalLightboxSrc;
                currentLightboxSrc = originalLightboxSrc;
                lightboxImg.style.filter = '';
                return;
            }
            if (window.wasmReady) {
                applyWasmFilter(filter);
            } else {
                var cssFilters = { grayscale: 'grayscale(1)', sepia: 'sepia(0.8)', invert: 'invert(1)' };
                lightboxImg.style.filter = cssFilters[filter] || '';
            }
        });
    }

    async function applyWasmFilter(name) {
        try {
            var img = lightboxImg;
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var ptr = Module._malloc(imageData.data.length);
            Module.HEAPU8.set(imageData.data, ptr);
            if (name === 'grayscale') Module._apply_grayscale(ptr, canvas.width, canvas.height);
            else if (name === 'sepia') Module._apply_sepia(ptr, canvas.width, canvas.height);
            else if (name === 'invert') Module._apply_invert(ptr, canvas.width, canvas.height);
            imageData.data.set(new Uint8ClampedArray(Module.HEAPU8.buffer, ptr, imageData.data.length));
            Module._free(ptr);
            ctx.putImageData(imageData, 0, 0);
            img.src = canvas.toDataURL();
            currentLightboxSrc = img.src;
        } catch (e) {
            console.warn('WASM filter failed, using CSS fallback', e);
            var cssFilters = { grayscale: 'grayscale(1)', sepia: 'sepia(0.8)', invert: 'invert(1)' };
            lightboxImg.style.filter = cssFilters[name] || '';
        }
    }

    var galleryFilters = document.getElementById('gallery-filters');
    if (galleryFilters) {
        galleryFilters.addEventListener('click', function (e) {
            var btn = e.target.closest('.gallery-filter-btn');
            if (!btn) return;
            document.querySelectorAll('.gallery-filter-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            var cat = btn.dataset.filter;
            document.querySelectorAll('.gallery-card').forEach(function (card) {
                card.classList.toggle('hidden', cat !== 'all' && card.dataset.category !== cat);
            });
        });
    }

    var currentT = 0;
    var testimonials = document.querySelectorAll('.testimonial-card');
    var indicators = document.querySelectorAll('.testimonial-indicator');
    var totalT = testimonials.length;
    var tAutoTimer = null;

    function updateTestimonial(idx) {
        currentT = idx;
        testimonials.forEach(function (t, i) {
            t.style.opacity = i === idx ? '1' : '0';
            t.classList.toggle('invisible', i !== idx);
            if (indicators[i]) indicators[i].classList.toggle('active', i === idx);
        });
    }

    function nextT() { updateTestimonial((currentT + 1) % totalT); }
    function prevT() { updateTestimonial((currentT - 1 + totalT) % totalT); }

    var prevBtn = document.getElementById('testimonial-prev');
    var nextBtn = document.getElementById('testimonial-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { prevT(); resetTAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { nextT(); resetTAuto(); });
    document.querySelectorAll('.testimonial-indicator').forEach(function (dot, i) {
        dot.addEventListener('click', function () { updateTestimonial(i); resetTAuto(); });
    });

    function resetTAuto() {
        if (tAutoTimer) clearInterval(tAutoTimer);
        tAutoTimer = setInterval(nextT, 5000);
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });

    document.addEventListener('DOMContentLoaded', function () {
        updateTestimonial(0);
        resetTAuto();
        var firstFilter = document.querySelector('.gallery-filter-btn');
        if (firstFilter) firstFilter.classList.add('active');
    });

})();

'use strict';

/* =========================================================
   Air Medical 24X7 — Main Script
   Pure Vanilla JS  |  Depends on Bootstrap 5.3 (CDN)
   ========================================================= */

// ── 1. NAVBAR SCROLL EFFECT ─────────────────────────────────
(function () {
    var nav = document.getElementById('mainNav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();

// ── 2. ACTIVE NAV LINK HIGHLIGHT ───────────────────────────
(function () {
    var sections = Array.from(document.querySelectorAll('section[id]'));
    var links = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
    if (!sections.length || !links.length) return;

    function updateActive() {
        var scrollY = window.scrollY + 130;
        var current = '';
        sections.forEach(function (sec) {
            if (sec.offsetTop <= scrollY) current = sec.id;
        });
        links.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();

// ── 3. SMOOTH SCROLL ────────────────────────────────────────
(function () {
    function getOffset() {
        var bar = document.querySelector('.emergency-bar');
        var nav = document.getElementById('mainNav');
        return (bar ? bar.offsetHeight : 42) + (nav ? nav.offsetHeight : 70) + 8;
    }

    document.addEventListener('click', function (e) {
        var a = e.target.closest('a[href^="#"]');
        if (!a) return;
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - getOffset();
        window.scrollTo({ top: top, behavior: 'smooth' });
        // Close mobile menu
        var collapse = document.getElementById('navbarNav');
        if (collapse && collapse.classList.contains('show')) {
            var bsCol = bootstrap.Collapse.getOrCreateInstance(collapse);
            bsCol.hide();
        }
    });
})();

// ── 4. STATS COUNTER ANIMATION ──────────────────────────────
(function () {
    var section = document.getElementById('stats');
    if (!section) return;
    var animated = false;

    function countUp(el, target, duration) {
        var startTime = null;
        function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
                countUp(el, parseInt(el.dataset.target, 10), 2000);
            });
        }
    }, { threshold: 0.4 });

    observer.observe(section);
})();

// ── 5. SCROLL FADE-IN FOR CARDS & ELEMENTS ──────────────────
(function () {
    var els = Array.from(document.querySelectorAll('.svc-card, .feature-item, .proc-step, .cov-stat'));

    els.forEach(function (el) {
        el.classList.add('fade-in-el');
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, idx) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, (idx % 4) * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(function (el) { observer.observe(el); });
})();

// ── 6. QUOTE FORM HANDLER ───────────────────────────────────
(function () {
    var submitBtn = document.getElementById('submitQuoteBtn');
    var form = document.getElementById('quoteForm');
    if (!submitBtn || !form) return;

    submitBtn.addEventListener('click', function () {
        form.classList.add('was-validated');
        if (!form.checkValidity()) return;

        var btnText = submitBtn.querySelector('.btn-text-inner');
        var btnSpinner = submitBtn.querySelector('.btn-spinner-inner');
        submitBtn.disabled = true;
        btnText.classList.add('d-none');
        btnSpinner.classList.remove('d-none');

        // Simulate async submission — show toast on success
        setTimeout(function () {
            submitBtn.disabled = false;
            btnText.classList.remove('d-none');
            btnSpinner.classList.add('d-none');
            form.classList.remove('was-validated');
            form.reset();

            // Close modal
            var modalEl = document.getElementById('quoteModal');
            var modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();

            // Show success toast
            var toastEl = document.getElementById('successToast');
            var toast = new bootstrap.Toast(toastEl, { delay: 5000 });
            toast.show();
        }, 1500);
    });
})();

// ── 7. NEWSLETTER FORM ──────────────────────────────────────
(function () {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (!input || !input.checkValidity()) {
            input && input.classList.add('is-invalid');
            return;
        }
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        input.value = '';
        setTimeout(function () { input.classList.remove('is-valid'); }, 3000);
    });
})();

// ── 8. BACK TO TOP ──────────────────────────────────────────
(function () {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

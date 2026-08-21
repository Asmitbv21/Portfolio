/* ============================================================
   ASMIT VISHWAKARMA — PORTFOLIO
   Micro-interactions: scroll-velocity tilt, mouse tilt,
   magnetic buttons, reveals, counters, rotor, spy nav.
   All effects are transform/opacity only (GPU friendly) and
   disabled for touch + prefers-reduced-motion.
   ============================================================ */

(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const root = document.documentElement;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initTheme();
        initReveals();
        initNavSpy();
        initFiltering();
        initRoleRows();
        initModal();
        initCounters();
        initRotor();
        if (!reduced) {
            initMainLoop();
            if (finePointer) {
                initMagnetic();
            }
        }
        initYear();
    }

    /* ---------------- Light / dark theme ---------------- */
    function initTheme() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const next =
                document.documentElement.getAttribute('data-theme') === 'light'
                    ? 'dark'
                    : 'light';

            root.classList.add('theming');
            document.documentElement.setAttribute('data-theme', next);

            try { localStorage.setItem('theme', next); } catch (e) { }

            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', next === 'light' ? '#f4f4f2' : '#0a0a0b');

            setTimeout(() => root.classList.remove('theming'), 500);
        });
    }

    /* ---------------- Reveal on scroll (bidirectional blur/fade) ---------------- */
    function initReveals() {
        const els = document.querySelectorAll('[data-reveal]');
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('revealed'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // entering viewport -> come out of blur;
                // leaving viewport -> fade/blur back down
                entry.target.classList.toggle('revealed', entry.isIntersecting);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
        els.forEach(el => io.observe(el));
    }

    /* ---------------- Main rAF loop:
       scroll-velocity tilt + progress bar + navbar state --------------- */
    function initMainLoop() {
        const progress = document.querySelector('.progress');
        const navbar = document.getElementById('navbar');
        let lastY = window.scrollY;
        let vel = 0;
        let navScrolled = false;

        function frame() {
            const y = window.scrollY;
            const dy = y - lastY;
            lastY = y;

            // tilt target from scroll velocity, clamped to ±4deg
            const target = Math.max(-4, Math.min(4, dy * 0.35));
            vel += (target - vel) * 0.08;
            if (Math.abs(vel) < 0.002) vel = 0;
            root.style.setProperty('--sv', vel.toFixed(3) + 'deg');

            // progress bar
            if (progress) {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
            }

            // navbar glass density
            if (navbar) {
                const shouldScroll = y > 30;
                if (shouldScroll !== navScrolled) {
                    navScrolled = shouldScroll;
                    navbar.classList.toggle('scrolled', shouldScroll);
                }
            }

            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    /* ---------------- Magnetic buttons ---------------- */
    function initMagnetic() {
        document.querySelectorAll('.btn-primary, .btn-ghost, .nav-resume').forEach(btn => {
            btn.addEventListener('pointermove', e => {
                const r = btn.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.18;
                const y = (e.clientY - r.top - r.height / 2) * 0.3;
                btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
            });
            btn.addEventListener('pointerleave', () => btn.style.removeProperty('transform'));
        });
    }

    /* ---------------- Scroll spy (active island) ---------------- */
    function initNavSpy() {
        const links = document.querySelectorAll('.nav-link[href^="#"]');
        const sections = ['home', 'experience', 'about', 'projects']
            .map(id => document.getElementById(id))
            .filter(Boolean);

        if (!('IntersectionObserver' in window) || !sections.length) return;

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = '#' + entry.target.id;
                links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach(s => io.observe(s));
    }

    /* ---------------- Project filtering ---------------- */
    function initFiltering() {
        const buttons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.project-card');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => applyFilter(btn.dataset.filter, buttons, cards));
        });
    }

    function applyFilter(filter, buttons, cards) {
        if (buttons) {
            buttons.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
        }
        let visibleIndex = 0;
        cards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            if (match) {
                card.style.display = '';
                card.classList.remove('pop');
                void card.offsetWidth; // restart animation
                card.style.animationDelay = (visibleIndex++ * 60) + 'ms';
                card.classList.add('pop');
                // release the animation's fill so scroll reveals work again
                card.addEventListener('animationend', () => card.classList.remove('pop'), { once: true });
            } else {
                card.style.display = 'none';
                card.classList.remove('pop');
            }
        });
    }

    /* ---------------- Role rows -> filter + jump ---------------- */
    function initRoleRows() {
        const buttons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.project-card');
        document.querySelectorAll('.role-row[data-filter]').forEach(row => {
            row.addEventListener('click', () => applyFilter(row.dataset.filter, buttons, cards));
        });
    }

    /* ---------------- Project modal ---------------- */
    function initModal() {
        const modal = document.getElementById('projectModal');
        if (!modal) return;

        modal.addEventListener('click', e => {
            if (e.target === modal) closeProjectModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeProjectModal();
        });
    }

    function openProjectModal(title, imageSrc, description) {
        const modal = document.getElementById('projectModal');
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-image').src = imageSrc;
        document.getElementById('modal-description').textContent = description;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        const modal = document.getElementById('projectModal');
        if (!modal || !modal.classList.contains('open')) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    /* ---------------- Animated counters ---------------- */
    function initCounters() {
        const nums = document.querySelectorAll('.stat-num[data-count]');
        if (!nums.length) return;

        const animate = el => {
            const target = parseInt(el.dataset.count, 10) || 0;
            if (reduced) { el.textContent = target; return; }
            const dur = 1400;
            const t0 = performance.now();
            (function tick(t) {
                const p = Math.min((t - t0) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased);
                if (p < 1) requestAnimationFrame(tick);
            })(t0);
        };

        if (!('IntersectionObserver' in window)) {
            nums.forEach(animate);
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        nums.forEach(n => io.observe(n));
    }

    /* ---------------- Hero rotor word cycle ---------------- */
    function initRotor() {
        const rotor = document.getElementById('rotor');
        if (!rotor || reduced) return;
        const words = ['UI/UX Designer', 'Graphic Designer', 'Developer', '3D Artist'];
        let i = 0;
        setInterval(() => {
            rotor.classList.add('rotor-out');
            setTimeout(() => {
                i = (i + 1) % words.length;
                rotor.textContent = words[i];
                rotor.classList.remove('rotor-out');
            }, 320);
        }, 2400);
    }

    /* ---------------- Footer year ---------------- */
    function initYear() {
        const y = document.getElementById('year');
        if (y) y.textContent = new Date().getFullYear();
    }

    /* expose for inline onclick handlers */
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;
})();

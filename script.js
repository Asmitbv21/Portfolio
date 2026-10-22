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

    /* shared per-frame motion values */
    const motionState = { vel: 0 };

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initTheme();
        initReveals();
        initNavSpy();
        initFiltering();
        initRoleRows();
        initModal();
        initWftCards();
        initCounters();
        initRotor();
        if (!reduced) {
            initMainLoop();
            if (finePointer) {
                initMagnetic();
                initCursor();
                initPortraitGaze();
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
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
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
        let lastSv = '';

        function frame() {
            const y = window.scrollY;
            const dy = y - lastY;
            lastY = y;

            // tilt target from scroll velocity, clamped to ±3deg
            const target = Math.max(-3, Math.min(3, dy * 0.3));
            vel += (target - vel) * 0.09;
            if (Math.abs(vel) < 0.002) vel = 0;
            motionState.vel = vel;

            // only touch the custom property when it actually changes,
            // otherwise the whole document restyles on every frame
            const sv = vel.toFixed(2) + 'deg';
            if (sv !== lastSv) {
                root.style.setProperty('--sv', sv);
                lastSv = sv;
            }

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

    /* ---------------- Magnetic buttons ----------------
       The offset is published as --mx / --my so the CSS transform
       stays composable with :hover and :active (no inline overrides). */
    function initMagnetic() {
        document.querySelectorAll('.btn-primary, .btn-ghost, .nav-resume').forEach(btn => {
            let rect = null;

            const measure = () => { rect = btn.getBoundingClientRect(); };

            btn.addEventListener('pointerenter', measure);
            btn.addEventListener('pointermove', e => {
                if (!rect) measure();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
                btn.style.setProperty('--mx', x.toFixed(1) + 'px');
                btn.style.setProperty('--my', y.toFixed(1) + 'px');
            });
            btn.addEventListener('pointerleave', () => {
                rect = null;
                btn.style.removeProperty('--mx');
                btn.style.removeProperty('--my');
            });
        });
    }

    /* ---------------- Scroll spy (active island) ---------------- */
    function initNavSpy() {
        const links = document.querySelectorAll('.nav-link[href^="#"]');
        const sections = ['home', 'experience', 'about', 'projects']
            .map(id => document.getElementById(id))
            .filter(Boolean);

        function mark(active) {
            links.forEach(l => {
                const on = l === active;
                l.classList.toggle('is-active', on);
                if (on) l.setAttribute('aria-current', 'true');
                else l.removeAttribute('aria-current');
            });
        }

        // instant feedback on click — no waiting for the scroll to settle
        links.forEach(l => {
            l.addEventListener('click', () => mark(l));
        });

        if (!('IntersectionObserver' in window) || !sections.length) return;

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = '#' + entry.target.id;
                mark([...links].find(l => l.getAttribute('href') === id));
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

    /* ---------------- WeFrameTech cards: whole card is a hit target ------
       The visible "Details" button stays the keyboard-accessible control. */
    function initWftCards() {
        document.querySelectorAll('.wft-card').forEach(card => {
            card.addEventListener('click', e => {
                if (e.target.closest('.wft-link')) return;   // button handles itself
                const link = card.querySelector('.wft-link');
                if (link) link.click();
            });
        });
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

    /* ---------------- Hero rotor word cycle ----------------
       Only runs on wide screens — the mobile hero shows a static
       role list, so the cycling word would be invisible noise. */
    function initRotor() {
        const rotor = document.getElementById('rotor');
        if (!rotor || reduced) return;

        const words = ['UI/UX Designer', 'Graphic Designer', 'Developer', '3D Artist'];
        const mq = window.matchMedia('(min-width: 769px)');
        let i = 0;
        let timer = null;

        function cycle() {
            rotor.classList.add('rotor-out');
            setTimeout(() => {
                i = (i + 1) % words.length;
                rotor.textContent = words[i];
                rotor.classList.remove('rotor-out');
            }, 320);
        }

        function sync() {
            if (mq.matches) {
                if (!timer) timer = setInterval(cycle, 2400);
            } else if (timer) {
                clearInterval(timer);
                timer = null;
                rotor.classList.remove('rotor-out');
            }
        }

        if (mq.addEventListener) mq.addEventListener('change', sync);
        else if (mq.addListener) mq.addListener(sync);
        sync();
    }

    /* ---------------- Footer year ---------------- */
    function initYear() {
        const y = document.getElementById('year');
        if (y) y.textContent = new Date().getFullYear();
    }

    /* ---------------- Liquid cursor ---------------- */
    function initCursor() {
        const layer = document.querySelector('.cursor-layer');
        const dot = document.querySelector('.cursor-dot');
        const blob = document.querySelector('.cursor-blob');
        if (!layer || !dot || !blob) return;

        root.classList.add('has-cursor');

        const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]';

        let mx = innerWidth / 2, my = innerHeight / 2;   // mouse
        let dx = mx, dy = my;                            // dot (fast follow)
        let bx = mx, by = my;                            // blob (laggy follow)
        let dotScale = 2, blobScale = 2;                 // current
        let tDotScale = 1, tBlobScale = 1;               // target
        let pressed = false;
        let hovering = false;

        function retarget() {
            tDotScale = hovering ? 0.4 : 2.0;
            tBlobScale = hovering ? 2 : 1;
            if (pressed) { tDotScale *= 3.0; tBlobScale *= 13.0; }
        }

        window.addEventListener('pointermove', e => {
            mx = e.clientX;
            my = e.clientY;
            layer.style.opacity = '1';
            const hit = e.target.closest(INTERACTIVE);
            const wasHovering = hovering;
            hovering = !!hit;
            if (wasHovering !== hovering) retarget();
        }, { passive: true });

        window.addEventListener('pointerdown', () => {
            pressed = true;
            retarget();
        });
        window.addEventListener('pointerup', () => {
            pressed = false;
            retarget();
        });

        document.documentElement.addEventListener('mouseleave', () => {
            layer.style.opacity = '0';
        });
        document.documentElement.addEventListener('mouseenter', () => {
            layer.style.opacity = '1';
        });

        (function tick() {
            // the dot chases quickly, the blob drifts behind —
            // the goo filter melts them together like liquid
            dx += (mx - dx) * 0.4;
            dy += (my - dy) * 0.4;
            bx += (mx - bx) * 0.16;
            by += (my - by) * 0.16;
            dotScale += (tDotScale - dotScale) * 0.2;
            blobScale += (tBlobScale - blobScale) * 0.14;

            dot.style.transform =
                'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + dotScale.toFixed(3) + ')';
            blob.style.transform =
                'translate3d(' + bx.toFixed(1) + 'px,' + by.toFixed(1) + 'px,0) scale(' + blobScale.toFixed(3) + ')';

            requestAnimationFrame(tick);
        })();
    }

    /* ---------------- Portrait faces the cursor in 3D ---------------- */
    function initPortraitGaze() {
        const el = document.querySelector('.portrait-tilt');
        if (!el) return;

        let mx = innerWidth / 2, my = innerHeight / 2;
        let rx = 0, ry = 0;        // current rotation
        let trx = 0, try_ = 0;     // target rotation

        window.addEventListener('pointermove', e => {
            mx = e.clientX;
            my = e.clientY;
        }, { passive: true });

        (function tick() {
            const r = el.getBoundingClientRect();
            if (r.bottom > -100 && r.top < innerHeight + 100) {
                const nx = Math.max(-1, Math.min(1, (mx - (r.left + r.width / 2)) / r.width));
                const ny = Math.max(-1, Math.min(1, (my - (r.top + r.height / 2)) / r.height));
                // face towards the cursor: positive rotateX looks up,
                // negative rotateY turns right
                trx = (-ny * 8);
                try_ = (-nx * 10);
            }

            rx += (trx - rx) * 0.08;
            ry += (try_ - ry) * 0.08;

            el.style.transform =
                'perspective(1100px) rotateX(' + (rx + motionState.vel).toFixed(3) + 'deg) rotateY(' + ry.toFixed(3) + 'deg)';

            requestAnimationFrame(tick);
        })();
    }

    /* expose for inline onclick handlers */
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;
})();

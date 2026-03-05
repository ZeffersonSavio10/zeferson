// Custom cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    (function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '16px'; cursor.style.height = '16px';
            ring.style.width = '52px'; ring.style.height = '52px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '10px'; cursor.style.height = '10px';
            ring.style.width = '36px'; ring.style.height = '36px';
        });
    });

    // Hero bg
    window.addEventListener('load', () => {
        const bg = document.getElementById('heroBg');
        bg.style.backgroundImage = "url('images/ko.png')";
        setTimeout(() => bg.classList.add('loaded'), 100);
    });

    // Scroll reveal
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // Nav on scroll
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 60 ? 'rgba(5,5,5,0.97)' : 'rgba(5,5,5,0.85)';
    });

    // ATHLETE SLIDER
    const track = document.getElementById('athletesTrack');
    const cards = track.querySelectorAll('.athlete-card');
    const total = cards.length;
    const dotsWrap = document.getElementById('sliderDots');
    const currentEl = document.getElementById('currentSlide');
    document.getElementById('totalSlides').textContent = total;

    let current = 0;
    const gap = 2;

    function getCardWidth() {
        return cards[0].getBoundingClientRect().width;
    }

    function updateSlider() {
        const cardW = getCardWidth();
        const offset = current * (cardW + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
        currentEl.textContent = current + 1;
        dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    function goTo(idx) {
        current = Math.max(0, Math.min(idx, total - 1));
        updateSlider();
    }

    // Build dots
    for (let i = 0; i < total; i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
    }

    document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
    document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

    // Keyboard arrows
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Mouse drag
    const wrap = document.getElementById('trackWrap');
    let startX = 0, isDragging = false, dragDelta = 0;

    wrap.addEventListener('mousedown', e => { isDragging = true; startX = e.clientX; });
    wrap.addEventListener('mousemove', e => { if (!isDragging) return; dragDelta = e.clientX - startX; });
    wrap.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        if (dragDelta < -60) goTo(current + 1);
        else if (dragDelta > 60) goTo(current - 1);
        dragDelta = 0;
    });
    wrap.addEventListener('mouseleave', () => { isDragging = false; dragDelta = 0; });

    // Touch swipe
    wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (diff < -50) goTo(current + 1);
        else if (diff > 50) goTo(current - 1);
    });

    window.addEventListener('resize', updateSlider);
    window.addEventListener('load', updateSlider);
/* =========================================================================
   SHIKHA CLUB — INTERACTIVITY
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // 2. Mobile Menu
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 3. Render Modules
    const modulesGrid = document.getElementById('modulesGrid');
    if (modulesGrid && typeof MODULES_DATA !== 'undefined') {
        const catMap = {
            steam: "STEAM & Tech",
            academic: "Academic",
            arts: "Arts & Creativity",
            comms: "Communication",
            skills: "Skills Lab",
            business: "Business",
            mind: "Well-Being"
        };

        MODULES_DATA.forEach(mod => {
            const card = document.createElement('div');
            card.className = 'module-card';
            card.setAttribute('data-category', mod.category);
            card.innerHTML = `
                <div class="module-cat">${catMap[mod.category] || mod.category}</div>
                <div class="module-icon">${mod.icon}</div>
                <h3 class="module-title">${mod.title}</h3>
                <p class="module-sub">${mod.sub}</p>
                <p class="module-desc">${mod.desc}</p>
            `;
            modulesGrid.appendChild(card);
        });
    }

    // 4. Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const moduleCards = document.querySelectorAll('.module-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.getAttribute('data-filter');

            moduleCards.forEach(card => {
                const match = val === 'all' || card.getAttribute('data-category') === val;
                if (match) {
                    card.style.display = '';
                    requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 250);
                }
            });
        });
    });

    // 5. Render FAQs
    const faqContainer = document.getElementById('faqContainer');
    if (faqContainer && typeof FAQ_DATA !== 'undefined') {
        FAQ_DATA.forEach(faq => {
            const item = document.createElement('div');
            item.className = 'faq-item';
            item.innerHTML = `
                <div class="faq-question">${faq.question} <span class="faq-icon">+</span></div>
                <div class="faq-answer" style="display: none;">${faq.answer}</div>
            `;
            faqContainer.appendChild(item);
        });

        document.querySelectorAll('.faq-question').forEach(q => {
            q.addEventListener('click', () => {
                const answer = q.nextElementSibling;
                q.classList.toggle('active');
                answer.style.display = q.classList.contains('active') ? 'block' : 'none';
            });
        });
    }

    // 6. Render Testimonials
    const testContainer = document.getElementById('testimonialContainer');
    const testControls = document.getElementById('testimonialControls');

    if (testContainer && typeof TESTIMONIALS_DATA !== 'undefined') {
        TESTIMONIALS_DATA.forEach((t, i) => {
            const el = document.createElement('div');
            el.className = 'testimonial' + (i === 0 ? ' active' : '');
            el.id = `test${i + 1}`;
            el.style.display = i === 0 ? 'block' : 'none';
            el.innerHTML = `<p class="quote">${t.quote}</p><div class="author">${t.author}</div>`;
            testContainer.insertBefore(el, testControls);
        });
        if (TESTIMONIALS_DATA.length > 1) testControls.style.display = 'block';
    }

    // 7. Scroll Reveal
    const reveals = document.querySelectorAll('.section-header, .about-card, .diff-card, .module-card, .format-card, .pricing-card, .step-item, .faq-item, .testimonial-container, .reg-steps');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // 8. Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// 9. Testimonial Slider
let currentTestimonial = 1;

window.nextTestimonial = function () {
    const total = typeof TESTIMONIALS_DATA !== 'undefined' ? TESTIMONIALS_DATA.length : 1;
    if (total <= 1) return;

    document.getElementById(`test${currentTestimonial}`).classList.remove('active');
    setTimeout(() => {
        document.getElementById(`test${currentTestimonial}`).style.display = 'none';
        currentTestimonial = currentTestimonial >= total ? 1 : currentTestimonial + 1;
        const next = document.getElementById(`test${currentTestimonial}`);
        next.style.display = 'block';
        requestAnimationFrame(() => next.classList.add('active'));
    }, 300);
};

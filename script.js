
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});


const hoverElements = document.querySelectorAll('[data-cursor="hover"]');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});


const particlesContainer = document.getElementById('particles');

function createParticles() {
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        const colors = ['#00f2ff', '#ff00aa', '#faff00', '#8800ff', '#00ff66'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (Math.random() * 4 + 3) + 'px';
        particle.style.height = particle.style.width;
        
        particlesContainer.appendChild(particle);
    }
}
createParticles();


gsap.registerPlugin(ScrollTrigger);


window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', { opacity: 0, y: -30, duration: 0.8, ease: 'power3.out' })
      .from('.title-line', { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: 'power4.out' }, '-=0.5')
      .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.hero-buttons', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.hero-stats', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .from('.floating-card', { opacity: 0, scale: 0.5, duration: 1, stagger: 0.2, ease: 'back.out(1.7)' }, '-=0.5')
      .from('.scroll-down', { opacity: 0, duration: 0.5 });
});


document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    cards.forEach((card, i) => {
        gsap.to(card, { x: x * (i + 1), y: y * (i + 1), duration: 1, ease: 'power2.out' });
    });
});


gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: { trigger: header, start: 'top 80%' },
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out'
    });
});


gsap.utils.toArray('.feature-card, .course-card, .business-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        opacity: 0, y: 60, duration: 0.8, delay: i * 0.1, ease: 'power3.out'
    });
});


const statNums = document.querySelectorAll('.stat-num');
statNums.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    gsap.to(stat, {
        scrollTrigger: { trigger: stat, start: 'top 85%' },
        innerHTML: target, duration: 2, snap: { innerHTML: 1 }, ease: 'power1.out',
        onUpdate: function() { stat.innerHTML = Math.round(this.targets()[0].innerHTML).toLocaleString(); }
    });
});


ScrollTrigger.create({
    trigger: '.signup-form',
    start: 'top 80%',
    onEnter: () => {
        const tl = gsap.timeline();
        
        tl.to('.form-header', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .to('.input-group', { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              stagger: 0.15, 
              ease: 'power3.out' 
          }, '-=0.3')
          .to('.btn-submit', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
          .to('.form-footer', { opacity: 1, duration: 0.5 });
    },
    once: true 
});


gsap.set('.form-header', { opacity: 0, y: 30 });
gsap.set('.input-group', { opacity: 0, y: 30 });
gsap.set('.btn-submit', { opacity: 0, y: 20 });
gsap.set('.form-footer', { opacity: 0 });


window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
        nav.style.padding = '15px 60px';
    } else {
        nav.style.background = 'rgba(5, 5, 5, 0.8)';
        nav.style.padding = '20px 60px';
    }
});


const modal = document.getElementById('detailModal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const cardData = {
    'shopping-1': { title: 'ফাস্ট ডেলিভারি', icon: 'fa-truck-fast', desc: 'আমাদের ফাস্ট ডেলিভারি সার্ভিস আপনার অর্ডার ২৪ ঘণ্টার মধ্যে পৌঁছে দেবে। সারা দেশে ফ্রি শিপিং।', features: ['২৪ ঘণ্টার মধ্যে ডেলিভারি', 'সারা দেশে ফ্রি শিপিং', 'রিয়েল-টাইম ট্র্যাকিং', '১০০% সেফ ডেলিভারি'] },
    'shopping-2': { title: 'অসাধারণ অফার', icon: 'fa-percent', desc: 'প্রতিদিন নতুন অফার। বিগ সেল, ফ্ল্যাশ সেল এবং আরও অনেক কিছু।', features: ['৭০% পর্যন্ত ছাড়', 'বিগ সেল অফার', 'ফ্ল্যাশ সেল', 'কুপন কোড'] },
    'shopping-3': { title: 'নিরাপদ পেমেন্ট', icon: 'fa-shield-halved', desc: 'আমাদের সিকিউর পেমেন্ট গেটওয়ে আপনার লেনদেন সম্পূর্ণ নিরাপদ রাখে।', features: ['SSL সার্টিফাইড', 'বিকাশ/নগদ সাপোর্ট', 'রিফান্ড গ্যারান্টি', '২৪/৭ পেমেন্ট সাপোর্ট'] },
    'course-1': { title: 'ওয়েব ডেভেলপমেন্ট', icon: 'fa-laptop-code', desc: 'HTML, CSS, JavaScript শিখুন পেশাদার পদ্ধতিতে। ওয়েব ডেভেলপার হন আজই।', features: ['৫০+ ভিডিও লেকচার', 'প্রজেক্ট ভিত্তিক শেখা', 'সার্টিফিকেট', 'লাইফটাইম অ্যাক্সেস'] },
    'course-2': { title: 'অ্যাপ ডেভেলপমেন্ট', icon: 'fa-mobile-screen', desc: 'Flutter দিয়ে অ্যাপ তৈরি করুন। অ্যান্ড্রয়েড ও আইওএসের জন্য অ্যাপ বানান।', features: ['৬০+ ভিডিও লেকচার', 'রিয়েল অ্যাপ প্রজেক্ট', 'গিটহাব গাইড', 'ইন্ডাস্ট্রি এক্সপার্ট'] },
    'course-3': { title: 'গ্রাফিক ডিজাইন', icon: 'fa-palette', desc: 'Photoshop ও Illustrator শিখুন এবং প্রফেশনাল ডিজাইনার হন।', features: ['৪০+ ভিডিও লেকচার', 'প্র্যাকটিস ফাইল', 'ব্র্যান্ডিং গাইড', 'পোর্টফোলিও তৈরি'] },
    'biz-1': { title: 'অনলাইন স্টোর', icon: 'fa-store', desc: 'মিনিটে আপনার স্টোর তৈরি করুন। পেমেন্ট গেটওয়ে সহ পূর্ণাঙ্গ ই-কমার্স সলিউশন।', features: ['ফ্রি ডোমেইন', 'পেমেন্ট গেটওয়ে', 'প্রোডাক্ট ম্যানেজমেন্ট', 'অর্ডার ট্র্যাকিং'] },
    'biz-2': { title: 'ডিজিটাল মার্কেটিং', icon: 'fa-bullhorn', desc: 'আপনার প্রোডাক্ট প্রমোট করুন এবং বিক্রি বাড়ান আমাদের মার্কেটিং টুলস দিয়ে।', features: ['SEO সার্ভিস', 'সোশ্যাল মিডিয়া', 'অ্যাড ক্যাম্পেইন', 'অ্যানালিটিক্স'] },
    'biz-3': { title: 'অ্যাফিলিয়েট মার্কেটিং', icon: 'fa-coins', desc: 'প্রোডাক্ট সেল করে কমিশন কামান। সবচেয়ে বেশি কমিশন পান এখানে।', features: ['হাই কমিশন', 'ট্র্যাকিং টুল', 'টাইমলি পেমেন্ট', '১০০০+ প্রোডাক্ট'] }
};


document.querySelectorAll('.feature-card, .course-card, .business-card').forEach(card => {
    card.addEventListener('click', () => {
        const cardId = card.getAttribute('data-card');
        const data = cardData[cardId];
        
        if (data) {
            const modalBody = document.getElementById('modalBody');
            let featuresHTML = data.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('');
            
            modalBody.innerHTML = `
                <h2><i class="fa-solid ${data.icon}"></i> ${data.title}</h2>
                <p>${data.desc}</p>
                <ul class="modal-features">${featuresHTML}</ul>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});


modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modalOverlay.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});


document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    

    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-solid fa-check"></i> সফল!';
    btn.style.background = 'linear-gradient(135deg, #00ff66, #00cc55)';
    
    setTimeout(() => {
        alert('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! 🚀');
        btn.innerHTML = originalText;
        btn.style.background = '';
        document.getElementById('signupForm').reset();
    }, 1500);
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                if(nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    if(tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.category-content').forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(category).classList.add('active');
            });
        });
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    if(statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    const duration = 2000; 
                    const step = Math.ceil(count / (duration / 16)); 
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if(current >= count) {
                            clearInterval(timer);
                            current = count;
                        }
                        target.textContent = current;
                    }, 16);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }
});
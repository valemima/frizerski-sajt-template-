// Registracija Service Worker-a
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrovan: ', registration);
            })
            .catch(err => {
                console.log('Registracija Service Worker-a neuspešna: ', err);
            });
    });
}

// Čekamo da se CEO prozor učita (uključujući slike i stilove)
window.addEventListener('load', function() {
    // Sakrivamo preloader tek kada je SVE učitano
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

// Čekamo da se samo HTML struktura učita
document.addEventListener('DOMContentLoaded', function() {
    // ================== PROVERA URL PARAMETARA ==================
    const urlParams = new URLSearchParams(window.location.search);
    const popustTip = urlParams.get('popust');
    if (popustTip) {
        localStorage.setItem('popustTip', popustTip);
    }
    // ================== KRAJ PROVERE URL PARAMETARA ==================

    // Kod za HAMBURGER MENI
    const hamburger = document.getElementById('hamburger-meni');
    const navMeni = document.querySelector('.nav-center');
    const links = document.querySelectorAll('.nav-center a');

    if (hamburger && navMeni) {
        hamburger.addEventListener('click', () => {
            navMeni.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navMeni.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Kod za STRELICU ZA VRH
    const idiNaVrhDugme = document.querySelector('.idi-na-vrh');
    if (idiNaVrhDugme) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                idiNaVrhDugme.classList.add('aktivan');
            } else {
                idiNaVrhDugme.classList.remove('aktivan');
            }
        });
    }

    // ================== HANDLER ZA POPUST FORMU ==================
    const popustForma = document.getElementById('popust-forma');
    if (popustForma) {
        popustForma.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email-popust').value;

            if (email) {
                const popustTip = localStorage.getItem('popustTip');
                console.log('Email:', email, 'Popust:', popustTip);
                
                // REDIREKT NA CALENDLY SA EMAILOM
                window.open(`https://calendly.com/mihaljevvalentin/45-tica?email=${encodeURIComponent(email)}`, '_blank');
                
                popustForma.reset();
                localStorage.removeItem('popustTip');
                
                if (popustTip) {
                    alert('Hvala! Check your email for the discount PDF soon!');
                }
            } else {
                alert('Molimo unesite email.');
            }
        });
    }
    // ================== KRAJ HANDLERA ZA POPUST FORMU ==================

    // ================== HANDLER ZA AKCIJE DIGMAD ==================
    document.querySelectorAll('.dugme-akcija').forEach(dugme => {
        dugme.addEventListener('click', function(event) {
            // Sprečavamo podrazumevano ponašanje linkova
            event.preventDefault();
            
            // Izvučemo vrstu popusta iz href atributa
            const href = this.getAttribute('href');
            const urlParams = new URLSearchParams(href.split('?')[1]); // Uzima deo posle ?
            const popustTip = urlParams.get('popust');
            
            if (popustTip) {
                // Sačuvamo vrstu popusta u localStorage
                localStorage.setItem('popustTip', popustTip);
                console.log('Popust sačuvan:', popustTip);
                
                // Skrolujemo do kontakt forme
                document.getElementById('kontakt').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });
    // ================== KRAJ HANDLERA ZA AKCIJE DIGMAD ==================
});
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

    // ================== HANDLER ZA POPUST FORMU (Hero sekcija) ==================
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
            event.preventDefault();
            
            const href = this.getAttribute('href');
            const urlParams = new URLSearchParams(href.split('?')[1]);
            const popustTip = urlParams.get('popust');
            
            if (popustTip) {
                // Sačuvaj tip popusta
                localStorage.setItem('popustTip', popustTip);
                console.log('Popust sačuvan:', popustTip);
                
                // Prikaži notifikaciju
                prikaziPopustNotifikaciju(popustTip);
                
                // Otvori Calendly u novom tabu
                window.open(href, '_blank');
            }
        });
    });

    // Funkcija za prikaz notifikacije
    function prikaziPopustNotifikaciju(popustTip) {
        // Ukloni postojeću notifikaciju ako postoji
        const postojecaNotifikacija = document.querySelector('.popust-notifikacija');
        if (postojecaNotifikacija) {
            postojecaNotifikacija.remove();
        }
        
        // Tekst poruke zavisan od tipa popusta
        let poruka = '';
        switch(popustTip) {
            case 'studentski':
                poruka = '🎓 Studentski popust od 20% je aktiviran!';
                break;
            case 'dame':
                poruka = '💅 Paket za dame sa popustom je aktiviran!';
                break;
            case 'prijatelj':
                poruka = '👥 Popust "Dovedi prijatelja" od 15% je aktiviran!';
                break;
            default:
                poruka = '🎉 Popust od 10% je aktiviran!';
        }
        
        // Kreiraj notifikaciju
        const notifikacija = document.createElement('div');
        notifikacija.className = 'popust-notifikacija';
        notifikacija.innerHTML = `
            ${poruka}
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Dodaj notifikaciju u body
        document.body.appendChild(notifikacija);
        
        // Automatski sakrij notifikaciju nakon 5 sekundi
        setTimeout(() => {
            if (notifikacija.parentElement) {
                notifikacija.remove();
            }
        }, 5000);
    }
    // ================== KRAJ HANDLERA ZA AKCIJE DIGMAD ==================
});
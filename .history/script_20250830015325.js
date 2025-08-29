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

// Sakrivanje preloadera
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

// Glavni kod koji se izvršava nakon učitavanja DOM-a
document.addEventListener('DOMContentLoaded', function() {
    // Provera URL parametara za popust
    const urlParams = new URLSearchParams(window.location.search);
    const popustTip = urlParams.get('popust');
    if (popustTip) {
        localStorage.setItem('popustTip', popustTip);
    }

    // Hamburger meni funkcionalnost
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

    // Strelica za povratak na vrh
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

    // Handler za popust formu (hero sekcija)
    const popustForma = document.getElementById('popust-forma');
    if (popustForma) {
        popustForma.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email-popust').value;

            if (email) {
                const popustTip = localStorage.getItem('popustTip');
                console.log('Email:', email, 'Popust:', popustTip);
                
                // Redirekt na Calendly sa emailom
                const calendlyUrl = 'https://calendly.com/mihaljevvalentin/45-tica?email=' + encodeURIComponent(email);
                window.open(calendlyUrl, '_blank');
                
                popustForma.reset();
                localStorage.removeItem('popustTip');
                
                // Prikazi poruku za genericki popust
                if (!popustTip) {
                    alert('Hvala! Vaš popust od 10% će biti primenjen u salonu. Pokažite ovu poruku.');
                }
            } else {
                alert('Molimo unesite email.');
            }
        });
    }

    // Handler za dugmad akcija
    document.querySelectorAll('.dugme-akcija').forEach(dugme => {
        dugme.addEventListener('click', function(event) {
            event.preventDefault();
            
            const href = this.getAttribute('href');
            const urlParams = new URLSearchParams(href.split('?')[1]);
            const popustTip = urlParams.get('popust');
            
            if (popustTip) {
                // Sačuvaj specifični popust
                localStorage.setItem('popustTip', popustTip);
                
                // Prikaži notifikaciju
                prikaziPopustNotifikaciju(popustTip);
                
                // Otvori Calendly
                window.open('https://calendly.com/mihaljevvalentin/45-tica', '_blank');
            }
        });
    });

    // Funkcija za prikaz notifikacije
    function prikaziPopustNotifikaciju(popustTip) {
        // Ukloni postojeću notifikaciju
        const postojecaNotifikacija = document.querySelector('.popust-notifikacija');
        if (postojecaNotifikacija) {
            postojecaNotifikacija.remove();
        }
        
        // Tekst poruke za specifične popuste
        let poruka = '';
        switch(popustTip) {
            case 'studentski':
                poruka = '🎓 Studentski popust od 20% je aktiviran! Pokažite studentski indeks u salonu.';
                break;
            case 'dame':
                poruka = '💅 Paket za dame sa popustom je aktiviran! Pokažite ovu poruku u salonu.';
                break;
            case 'prijatelj':
                poruka = '👥 Popust "Dovedi prijatelja" od 15% je aktiviran! Dođite sa prijateljem.';
                break;
            default:
                poruka = '🎉 Popust je aktiviran! Pokažite ovu poruku u salonu.';
        }
        
        // Kreiraj i prikaži notifikaciju
        const notifikacija = document.createElement('div');
        notifikacija.className = 'popust-notifikacija';
        notifikacija.innerHTML = `
            ${poruka}
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(notifikacija);
        
        // Automatsko sklanjanje notifikacije
        setTimeout(() => {
            if (notifikacija.parentElement) {
                notifikacija.remove();
            }
        }, 5000);
    }
});
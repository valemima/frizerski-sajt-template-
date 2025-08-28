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

    // Handler za FORMU ZA ZAKAZIVANJE
    const kalendarForma = document.getElementById('kalendar-forma');
    if (kalendarForma) {
        kalendarForma.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const ime = document.getElementById('ime').value;
            const datum = document.getElementById('datum').value;

            if (ime && datum) {
                alert(`Hvala ${ime}! Vaš termin za ${datum} je uspešno rezervisan. Uskoro ćemo Vas kontaktirati za potvrdu.`);
                kalendarForma.reset();
            } else {
                alert('Molimo Vas popunite sva polja.');
            }
        });
    }

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

    // === KODOVI POPUSTA I EVIDENCIJA ===
    // Funkcija za preusmeravanje sa kodom popusta
    function redirectToBooking(popustKod, popustTip) {
        // Sačuvaj u localStorage
        localStorage.setItem('izabraniPopust', JSON.stringify({
            kod: popustKod,
            tip: popustTip,
            vreme: new Date().getTime()
        }));
        
        // Redirekt na booking stranicu sa parametrom
        window.location.href = `booking.html?popust=${popustKod}`;
    }

    // Provera da li postoji sačuvan popust pri učitavanju
    document.addEventListener('DOMContentLoaded', function() {
        // === POPUST NOTIFIKACIJA I HANDLERI ===
        const sacuvaniPopust = localStorage.getItem('izabraniPopust');
        if (sacuvaniPopust) {
            const popust = JSON.parse(sacuvaniPopust);
            const istekloVreme = new Date().getTime() - popust.vreme > 24 * 60 * 60 * 1000; // 24 sata
            
            if (!istekloVreme) {
                // Prikaži notifikaciju
                const notifikacija = document.createElement('div');
                notifikacija.style.cssText = `
                    position: fixed; bottom: 20px; right: 20px; 
                    background: #4CAF50; color: white; padding: 15px; 
                    border-radius: 5px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                `;
                notifikacija.innerHTML = `
                    <strong>Popust aktiviran!</strong><br>
                    Vaš ${popust.tip} je sačuvan. Pokažite ovaj ekran prilikom dolaska.
                `;
                document.body.appendChild(notifikacija);
                
                // Automatski sakrij notifikaciju nakon 5 sekundi
                setTimeout(() => {
                    notifikacija.style.opacity = '0';
                    setTimeout(() => notifikacija.remove(), 300);
                }, 5000);
            } else {
                localStorage.removeItem('izabraniPopust');
            }
        }
        
        // Event listeneri za dugmad sa popustom
        document.querySelectorAll('[data-popust-kod]').forEach(dugme => {
            dugme.addEventListener('click', function(e) {
                e.preventDefault();
                const kod = this.getAttribute('data-popust-kod');
                const tip = this.getAttribute('data-popust-tip');
                redirectToBooking(kod, tip);
            });
        });
    });
});
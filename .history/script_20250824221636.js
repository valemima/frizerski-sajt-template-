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

// PRELOADER
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});


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

    // Handler za KONTAKT FORMU
    const kontaktForma = document.getElementById('kontakt-forma');
    if (kontaktForma) {
        kontaktForma.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Hvala na poruci! Uskoro ćemo Vas kontaktirati.');
            kontaktForma.reset();
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

});
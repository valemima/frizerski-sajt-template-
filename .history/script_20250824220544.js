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

document.addEventListener('DOMContentLoaded', function() {

    // === Handler za FORMU ZA ZAKAZIVANJE (u hero sekciji) ===
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

    // === Handler za KONTAKT FORMU (na dnu stranice) ===
    const kontaktForma = document.getElementById('kontakt-forma');
    if (kontaktForma) {
        kontaktForma.addEventListener('submit', function(event) {
            event.preventDefault();
            // U pravom projektu, ovde bi se koristio Formspree.io
            // <form action="https://formspree.io/f/VAŠ_KOD" method="POST">
            alert('Hvala na poruci! Uskoro ćemo Vas kontaktirati.');
            kontaktForma.reset();
        });
    }

    // === Kod za HAMBURGER MENI ===
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

});

// ===== NOVO: KOD ZA PRELOADER =====
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ===== NOVO: KOD ZA STRELICU ZA VRH =====
document.addEventListener('DOMContentLoaded', function() {
    const idiNaVrhDugme = document.querySelector('.idi-na-vrh');
    window.addEventListener('scroll', () => {
        if (idiNaVrhDugme) {
            if (window.scrollY > 400) {
                idiNaVrhDugme.classList.add('aktivan');
            } else {
                idiNaVrhDugme.classList.remove('aktivan');
            }
        }
    });
});
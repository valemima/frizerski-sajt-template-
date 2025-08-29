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
    // ================== NOVI KOD: PROVERA URL PARAMETARA ==================
    // Proveri da li ima popust parameter u URL-u
    const urlParams = new URLSearchParams(window.location.search);
    const popustTip = urlParams.get('popust');

    // Ako ima, sacuvaj ga u LocalStorage
    if (popustTip) {
        localStorage.setItem('popustTip', popustTip);
    }
    // ================== KRAJ NOVOG KODA ==================

    // Handler za FORMU ZA ZAKAZIVANJE (OVAJ BRISES JER SI ZAMENIO CALENDLY LINKOM)
    // (Obrisi ili zakomentarisi celo ovaj deo za kalendar-forma)

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

    // ================== NOVI KOD: HANDLER ZA POPUST FORMU ==================
    // Handler za POPUST FORMU
    const popustForma = document.getElementById('popust-forma');
    if (popustForma) {
        popustForma.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email-popust').value;

            if (email) {
                // Proveri da li je dosao sa popusta
                const popustTip = localStorage.getItem('popustTip');
                
                // 1. Sacuvaj email (i tip popusta ako postoji)
                console.log('Email:', email, 'Popust:', popustTip);

                // 2. Redirect na Calendly SA email parametrom
                window.open(`https://calendly.com/mihaljevvalentin/45min?email=${encodeURIComponent(email)}`, '_blank');

                // 3. Resetuj formu i ocisti storage
                popustForma.reset();
                localStorage.removeItem('popustTip'); // Ocisti

                // 4. Ako je dosao sa popusta, pokazi specijalnu poruku
                if (popustTip) {
                    alert('Hvala! Check your email for the discount PDF soon!');
                    // OVDE BI POSLAO SPECIJALNI EMAIL SA PDF-OM (preko Formspree auto-responder-a)
                }
            } else {
                alert('Molimo unesite email.');
            }
        });
    }
    // ================== KRAJ NOVOG KODA ==================

});
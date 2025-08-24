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

 // Ovde ide tvoj postojeći kod...
 document.addEventListener('DOMContentLoaded', function() {
     // ...sav kod za forme i hamburger...
 });
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
            alert('Hvala na poruci! Uskoro ćemo Vas kontaktirati.');
            kontaktForma.reset();
        });
    }

    // === Kod za HAMBURGER MENI ===
    const hamburger = document.getElementById('hamburger-meni');
    const navMeni = document.querySelector('.nav-center');
    const links = document.querySelectorAll('.nav-center a');

    if (hamburger && navMeni) { // Provera da li elementi postoje
        hamburger.addEventListener('click', () => {
            // Otvara/zatvara meni
            navMeni.classList.toggle('active');
            // Animiraj hamburger u "X" i nazad
            hamburger.classList.toggle('active');
        });

        // Funkcionalnost da se meni zatvori kada se klikne na link
        links.forEach(link => {
            link.addEventListener('click', () => {
                navMeni.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

});
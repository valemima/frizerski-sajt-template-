document.addEventListener('DOMContentLoaded', function() {

    // --- Handler za NOVU FORMU ZA ZAKAZIVANJE (u hero sekciji) ---
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

    // --- Handler za KONTAKT FORMU (na dnu stranice) ---
    const kontaktForma = document.getElementById('kontakt-forma');
    
    if (kontaktForma) {
        kontaktForma.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Hvala na poruci! Uskoro ćemo Vas kontaktirati.');
            kontaktForma.reset();
        });
    }

});
document.addEventListener('DOMContentLoaded', function() {

    // --- Postojeći kod za forme... ---
    const kalendarForma = document.getElementById('kalendar-forma');
    if (kalendarForma) {
        // ... (kod za kalendar formu) ...
    }
    const kontaktForma = document.getElementById('kontakt-forma');
    if (kontaktForma) {
        // ... (kod za kontakt formu) ...
    }


    // ===== NOVI KOD ZA HAMBURGER MENI =====
    const hamburger = document.getElementById('hamburger-meni');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        // Otvara/zatvara meni
        navLinks.classList.toggle('active');
        // Animiraj hamburger u "X" i nazad
        hamburger.classList.toggle('active');
    });

    // Dodajemo funkcionalnost da se meni zatvori kada se klikne na link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

});
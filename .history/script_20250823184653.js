document.addEventListener('DOMContentLoaded', function() {

    // --- Handler za NOVU FORMU ZA ZAKAZIVANJE (u hero sekciji) ---
    const kalendarForma = document.getElementById('kalendar-forma');

    if (kalendarForma) {
        kalendarForma.addEventListener('submit', function(event) {
            // Sprečava da se stranica ponovo učita prilikom slanja
            event.preventDefault(); 
            
            // Uzimamo vrednosti iz polja za ime i datum
            const ime = document.getElementById('ime').value;
            const datum = document.getElementById('datum').value;

            // Proveravamo da li su podaci uneti
            if (ime && datum) {
                // Prikazujemo personalizovanu poruku
                alert(`Hvala ${ime}! Vaš termin za ${datum} je uspešno rezervisan. Uskoro ćemo Vas kontaktirati za potvrdu.`);
                kalendarForma.reset(); // Čistimo polja forme
            } else {
                alert('Molimo Vas popunite sva polja.');
            }
        });
    }


    // --- Handler za STARU KONTAKT FORMU (na dnu stranice) ---
    const kontaktForma = document.getElementById('kontakt-forma');
    
    if (kontaktForma) {
        kontaktForma.addEventListener('submit', function(event) {
            event.preventDefault(); // Sprečava podrazumevano slanje forme
            
            // Prikazujemo generičku poruku
            alert('Hvala na poruci! Uskoro ćemo Vas kontaktirati.');
            kontaktForma.reset(); // Čistimo polja forme
        });
    }

});
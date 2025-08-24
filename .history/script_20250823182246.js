document.addEventListener('DOMContentLoaded', function() {
    const kontaktForma = document.getElementById('kontakt-forma');

    if (kontaktForma) {
        kontaktForma.addEventListener('submit', function(event) {
            event.preventDefault(); // Sprečava podrazumevano slanje forme
            alert('Hvala na poruci! Uskoro ćemo Vas kontaktirati.');
            kontaktForma.reset();
        });
    }
});
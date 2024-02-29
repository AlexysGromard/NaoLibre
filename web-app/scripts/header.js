// Sélection des éléments DOM
const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');

// Ajout d'un écouteur d'événement pour le clic sur le bouton de recherche
btnSearch.addEventListener('click', function() {
    // Vérifier si l'input est actuellement ouvert
    const isOpen = inputSearch.classList.contains('open');

    // Si l'input est ouvert, le fermer ; sinon, l'ouvrir
    if (isOpen) {
        inputSearch.classList.remove('open');
    } else {
        inputSearch.classList.add('open');
    }
});

// SEARCH OPEN/CLOSE
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

// Ajout d'un écouteur d'événement pour l'ouverture du contenu des perturbations
const lineBoxes = document.querySelectorAll('.line-box.interactive');
// Pour chaque élément .line-box.interactive, ajouter un écouteur d'événement pour le clic sur .down-arrow
lineBoxes.forEach(function(lineBox) {
    console.log(lineBox);
    const downArrow = lineBox.querySelector('.down-arrow');
    const content = lineBox.querySelector('.content');

    downArrow.addEventListener('click', function() {
        const isOpen = content.classList.contains('open');

        if (isOpen) {
            content.classList.remove('open');
            downArrow.classList.remove('open');
        } else {
            content.classList.add('open');
            downArrow.classList.add('open');
        }
    });
});
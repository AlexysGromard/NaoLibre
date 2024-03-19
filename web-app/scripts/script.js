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
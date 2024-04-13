export default class Arret {
    codelieu
    libelle
    distance
    ligne
    nom
    constructor(codelieu,nom =null, libelle=null, distance =null, ligne=null) {
        this.codelieu = codelieu
        this.libelle = libelle
        this.nom = nom
        this.distance = distance
        this.ligne = ligne
    }
}


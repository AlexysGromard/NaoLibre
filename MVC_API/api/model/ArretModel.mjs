export default class Arret {
    codelieu
    libelle
    distance
    ligne
    constructor(codelieu, libelle, distance =null, ligne) {
        this.codelieu = codelieu
        this.libelle = libelle
        this.distance = distance
        this.ligne = ligne
    }
}


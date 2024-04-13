export default class Bus {
    ligne
    terminus
    temps
    sens
    codeArret
    constructor(ligne, terminus, temps, sens, codeArret) {
        this.ligne = ligne
        this.terminus = terminus
        this.temps = temps
        this.sens = sens
        this.codeArret = codeArret
    }
}
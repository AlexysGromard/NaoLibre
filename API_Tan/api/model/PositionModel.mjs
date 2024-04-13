// Objet Pos qui permet de stocker une position que l'on peut utiliser pour connaître les arrêts les plus proches
export default class Pos {
    latitude 
    longitude
    constructor(lat, long) {

        this.latitude = lat
        this.longitude = long
    }
}

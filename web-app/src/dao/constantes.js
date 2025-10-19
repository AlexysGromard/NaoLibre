// Utilise les variables d'environnement ou localhost par défaut
const baseURLTan = process.env.REACT_APP_API_TAN_URL || 'http://localhost:8080/tan/'
const baseURLUser = process.env.REACT_APP_API_USER_URL || 'http://localhost:8081/NaoLibre/'

export {baseURLTan,baseURLUser}




 curl -X POST -H "Content-Type: application/json" -d '{ 
  "iduser": "6603fbd99e4cf58b788893ca",
  "note": 4,
  "date": "2024-03-28T12:00:00Z",
  "dayweek": "lundi"
}' http://localhost:8080/NaoLibre/avis/C6



curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe", "email":"john@example.com", "password":"password123", "point": 100, "favori" : ["lol","bonjour"]}' http://localhost:8080/NaoLibre/user

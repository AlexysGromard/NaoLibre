# Rapport - Qualité́ et au-delà̀ du relationnel
## Introduction
Dans le cadre de la SAE du 4ème semestre, nous avons réalisé un site web React.js permettant d'intéragir avec une API REST Naolibe (Service de transport en commun de la ville de Nantes). Nous avons également déployé notre propre API REST pour gerer les utilisateurs ainsi que les différentes informations qu'ils peuvent ajouter concernant un transport en commun (Affluence).

## Équipe de projet
Ce rapport a été préparé par :
- Alexys GROMARD
- Floran MARTEL
- Lancelot JOUAULT
- Clovis LEPORT
- ARTHUR CHEVREUX

Equipe : eq_01_01

## Informations complémentaires
📍 IUT de Nantes (Département Informatique) </br>
📆 Quand : 2024 (4ème semestre)

## Sommaire
- [Introduction](#introduction)
- [Qualité des sources de données](#qualité-des-sources-de-données)
- [Choix de modélisation](#choix-de-modélisation)
- [Choix de modélisation](#choix-de-modélisation)
- [Retour sur l'utilisation de MongoDB](#retour-sur-lutilisation-de-mongodb)
- [Connexion de l'API via des routes](#connexion-de-lapi-via-des-routes)

## Introduction
Dans le cadre de notre projet, nous avons utilisé __MongoDB__ pour stocker les données de notre application. Nous avons opté pour une base de données afin de conserver les informations relatives aux utilisateurs et aux avis. Concernant l'API de la Tan, nous n'avons pas stocké ses données dans notre propre base, mais nous avons plutôt mis en place un filtrage pour afficher les informations pertinentes sur notre site web.

La technologies _NoSQL_ nous a offert la possibilité de stocker des données (sous forme de collections) de manière plus flexible et plus rapide que les bases de données relationnelles. Cette approche nous a permis d'établir des connexions plus cohérentes entre les données et de les manipuler plus aisément à l'aide de requêtes en JavaScript, le langage utilisé par MongoDB, tant pour notre backend que pour notre frontend.

Dans la base de données `NaoLibre`, nous avons créé deux collections : `Users` et `Avis`. La collection `Users` contient les informations des utilisateurs de notre application telles que leur nom, leur adresse e-mail, leur mot de passe, leurs favoris et leurs points. Quant à la collection "Avis", elle recueille les évaluations des utilisateurs concernant les lignes de bus et de tramway de la Tan.

## Qualité des sources de données
Les données présentes dans la base de données Naolibre sont généralement cohérentes, bien qu'il puisse y avoir des redondances possibles dans les favoris et les noms des utilisateurs. Dans la collection Avis, les données sont également cohérentes et ne présentent pas de redondance évidente.

De plus, afin d'éviter toute redondance de données, le DAO effectue en amont des vérifications de certaines contraintes pour prévenir les doublons dans les collections. Par exemple, pour la collection "Avis", nous avons mis en place une vérification pour s'assurer qu'un utilisateur ne puisse pas publier deux avis sur la même ligne de bus ou de tramway dans un intervalle de temps donné (par exemple, une heure).

## Choix de modélisation
Nous avons opté pour une modélisation de données qui les rend facilement manipulables et connectables tout en maintenant leur cohérence.

La base de données `Naolibre` est une base de données NoSQL qui a été mise en place avec les collections `User` et `Avis`. Chaque collection contient des documents représentant les données de notre application, intégrées avec un schéma de validation pour assurer la solidité des données.

Voici le schema créé dans mongoDB pour la collection `User` de la base de données `Naolibre`:
```json
{
  $jsonSchema: {
    required: [
      '_id',
      'name',
      'email',
      'password',
      'point',
      'favori'
    ],
    type: 'object',
    properties: {
      _id: {
        bsonType: 'objectId',
        description: 'must be a string and is required'
      },
      name: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      email: {
        bsonType: 'string',
        description: 'the email is required and must be a string'
      },
      password: {
        bsonType: 'string',
        description: 'the password is required and must be a string'
      },
      point: {
        bsonType: 'int',
        description: 'this attribute represente the point partisipation of users'
      },
      favori: {
        bsonType: 'array',
        description: 'this attribute represente the favori ligne of users',
        items: {
          type: 'string'
        }
      }
    }
  }
}
```

Maintenant, voici le schéma de la collection `Avis` dans la base de données `Naolibre`:
```json
{
  $jsonSchema: {
    required: [
      'nomLigne',
      'avis'
    ],
    type: 'object',
    properties: {
      nomLigne: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      avis: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            iduser: {
              bsonType: 'objectId',
              description: 'must be a string and is required'
            },
            note: {
              bsonType: 'int',
              description: 'must be a string and is required'
            },
            date: {
              bsonType: 'date',
              description: 'must be a date and is required'
            },
            dayweek: {
              bsonType: 'string',
              description: 'must be a string and is required'
            }
          },
          required: [
            'iduser',
            'note',
            'date',
            'dayweek'
          ]
        }
      }
    }
  }
}
```

## Retour sur l'utilisation de MongoDB

Le choix d'utiliser la base de données NoSQL MongoDB pour stocker nos données a eu un impact très positif sur l'utilisation de celles-ci dans nos applications et/ou services. La flexibilité de la base de données "Naolibre" nous permet de stocker les données de manière rapide et efficace.

Cette décision a également facilité l'accès aux informations via l'API, notamment pour consulter les avis sur une ligne de bus ou de tramway spécifique. L'utilisation de MongoDB a simplifié le code de notre application en réduisant le nombre de requêtes et en minimisant les erreurs potentielles.

Cependant, nous avons rencontré des défis, notamment en ce qui concerne les contraintes sur les collections. Il a été difficile de mettre en place des règles pour empêcher un utilisateur de soumettre deux fois le même avis sur une même ligne de bus ou de tramway. De plus, nous avons rencontré des problèmes liés aux types de données, tels que l'entrée d'une chaîne de caractères au lieu d'un entier.

Enfin, le principal défi a été notre manque d'expérience dans la conception de bases de données NoSQL, ce qui a entraîné un retard dans le développement de l'application.


## Connexion de l'API via des routes
Nous avons utilisé un MVC simplifier (sans Controleur) avec une achitecture simple au niveaux des dossier qui est :
```bash
C:./api
├───model
├───repositories
├───routes
└───tools
```

* __model__ : Ce dossier contient les classes ou les fichiers qui définissent la structure des données de votre application, également appelées "modèles". Les modèles représentent généralement les entités principales de notre système, telles que les utilisateurs, les avis, etc. 

* __repositories__ : Ce dossier contient les __dao__ qui permettent de faire les requetes sur mongodb pour les ajouts, delete, update, find. Chaque __DAO__ sont connecté a une collection et database. On utilise la librairie __mongoose__ pour simplifier l'extration des document via schema.

* __routes__ : Ce dossier contient les fichiers de routage de notre application. Ces fichiers définissent les points de terminaison de l'API ou les routes que l'application expose, ainsi que les fonctions associés à chaque route. C'est là que nous définision les actions à effectuer en réponse à différentes requêtes HTTP.
Nous avons utilisé la librairie __express__ pour créer les routes et pour gérer les requêtes HTTP.

* __tools__ : Ce dossier contient des fichiers qui regroupent des fonctions ou des utilitaires réutilisables qui ne sont pas directement liés à un modèle, à un dépôt ou à une route spécifique. Ces fichiers peuvent contenir des fonctions utilitaires, des fonctions de validation, des fonctions de formatage, etc: cryptage, qui permet de crypter les mots de passe des utilisateurs.


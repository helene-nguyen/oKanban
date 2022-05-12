# API Rest

Mise en place API

### Archi

Mettre en place l'architecture "classique" d'une projet express :

- installer les dépendances nécessaires avec npm.
- dossier `app/controllers`.
- fichier `app/router.js`.
- point d'entrée `index.js`.

### Le Train-train Express

Mettre en place le fichier `index.js`. Oui c'est vrai, c'est un peu toujours la même chose...

Note: pensez qu'on va faire des routes POST ! (donc avec des body ...)

### Premiers controller, premières routes

En respectant au maximum les principes de l'architecture REST, et le tableau de routes fait ensemble, implémentez tout ce que vous pouvez !

- commencez plutôt par les routes GET
- puis les POST
- puis les PATCH
- et enfin les DELETE
- ceci n'est qu'un conseil ! si vous préférez faire toutes les "/list" d'abord, libre à vous !

Pour tester toutes ces routes, il existe plusieurs solutions, mais la plus simple reste d'utiliser un petit logiciel :

- [Insomnia](https://support.insomnia.rest/article/23-installation#ubuntu)
- [POSTMAN](https://www.getpostman.com/)
- [VSC REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- y'en a probablement d'autres...

N'oubliez pas que les routes GET sont facilement testables depuis n'importe quel navigateur en tapant la route dans la barre d'URL

---
# Routes

| URL | GET | POST | PATCH | DELETE | PUT |
|---|---|---|---|---|---|
| `/lists` | récupérer toutes les listes | créer une liste | mettre à jour toutes les listes (❌) | supprimer toutes les listes (❌) | remplacer toutes les listes (❌) |
| `/lists/:id` | récupérer UNE liste via son ID | créer une listes en fixant son id d'avance (❌) | mettre à jour une liste via son ID | supprimer une liste via son ID | remplacer entièrement liste (❌) |
| |
| `/cards` | récupérer toutes les cartes | créer une carte | mettre à jour toutes les cartes (❌) | supprimer toutes les cartes (❌) | remplacer toutes les cartes (❌)
| `/cards/:id` | récupérer UNE carte via son ID | créer une carte en fixant son id d'avance (❌) | mettre à jour une carte via son ID | supprimer une carte via son ID | remplacer entièrement une carte (❌) |
| |
| `/tags`| récupérer tous les labels | créer un label | mettre à jour tous les labels (❌) | supprimer tous les labels (❌) | remplacer tous les labels (❌)
| `/tags/:id` | récupérer UN label via son ID | créer un label en fixant son id d'avance (❌) | mettre à jour un label via son ID | supprimer un label via son ID | remplacer entièrement un label


(❌) = ne pas faire
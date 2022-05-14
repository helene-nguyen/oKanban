# oKanban : Atelier Conception

Project made with @[GaetanSantucci](https://github.com/GaetanSantucci) and @[Megafredo](https://github.com/Megafredo) 😊

## Description du projet 

- On souhaite créer une application de type Kanban où il est possible de créer des cartes à l'intérieur de listes.
- L'utilisateur peut créer autant de listes qu'il désire et mettre autant de cartes à l'intérieur de ces listes.
- Chaque liste dispose d'un nom.
- Chaque carte dispose d'un titre, d'une position au sein de la liste, d'une couleur (optionnelle) et d'un ou plusieurs label(s) (optionnel(s))
- Les labels ont des couleurs

## Gestion du projet : phase de conception

Etablissement des éléments et mise en place avec MCD/MLD et MPD
Tout le détail de l'étude de conception c'est [ici](./__docs/Conception.md)

## Base de données : phase de création

Pour cette étape, toute la mise en place pour la création de la base de données est détaillée [là](./__docs/Database.md)

## Base de données : phase de connexion à la base de données

Cette phase là explique notre démarche pour la connexion avec la base de données. 
Nous avons utilisé les imports et exports par le biais d'*ES6 Module System* avec un environnement strict de *JavaScript* et tout le détail se trouve [là](./__docs/ConnectDB.md)


## API RESTful : phase de test de l'API en respectant l'architecture REST

On cherche à définir les différentes routes en respectant l'architecture REST en suivant les indications suivantes :

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

### Listes

[Voir specifications](../resources/api-endpoints-specifications.md)

### Cartes

En vous inspirant des spécifications sur les listes, mettre en place les routes suivantes :

| VERB | PATH | DESCRIPTION |
|--|--|--|
| `GET` | `/cards` | renvoie toutes les cartes existantes. |
| `GET` | `/cards/:id` | renvoie les détails de la carte demandée, avec les tags qui lui sont associés. |
| `POST` | `/cards` | crée une nouvelle carte (sans tags) et la retourne. |
| `PATCH` | `/cards/:id` | modifie une carte (ne modifie pas les tags). |
| `DELETE` | `cards/:id` | supprime une carte. |
| |
| `GET` | `/lists/:id/cards` | renvoie toutes les cartes d'une liste. Chaque carte doit porter les tags qui lui sont associés. |

### Tags

En vous inspirant des spécifications sur les listes, mettre en place les routes suivantes :

| VERB | PATH | DESCRIPTION |
|--|--|--|
| `GET` | `/tags` | renvoie tous les tags.
| `POST` | `/tags` | crée un nouveau tag.
| `PATCH` | `/tags/:id` | modifie un tag.
| `DELETE` | `/tags/:id` | supprime un tag.
| |
| `PUT` | `/cards/:card_id/tags/:tag_id` | associe un tag à la carte ciblée. Note : si on appelle plusieurs fois cette route, l'association ne doit être présent qu'une fois en base.
| `DELETE` | `/cards/:card_id/tags/:tag_id` | supprime l'as


Tout de détail de notre implémentation c'est par [ici](./__docs/ApiRest.md) !

Attention pour les tests, si on fait un reset de la table avec create_db.sql, bien vérifier qu'on a créé un utilisateur pour pouvoir générer une liste avec la méthode *POST*.


## Notre API

Notre API RESTful renvoie bien les données récupérées à la base de données en JSON en faisant un `res.json()` et on permet aux personnes intéressées
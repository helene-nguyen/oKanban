# API Rest

Mise en place API avec l'architecture REST

### Architecture REST

**REST (Representational State Transfer) ou RESTful** est un style d’architecture permettant de construire des applications (Web, Intranet, Web Service). Il s’agit d’un ensemble de conventions et de bonnes pratiques à respecter et non d’une technologie à part entière. L’architecture REST utilise les spécifications originelles du **protocole HTTP**, plutôt que de réinventer une surcouche (comme le font SOAP ou XML-RPC par exemple qui sont aussi d'autres architectures).

- Règle n°1 : l’URI comme identifiant des ressources
- Règle n°2 : les verbes HTTP comme identifiant des opérations
- Règle n°3 : les réponses HTTP comme représentation des ressources
- Règle n°4 : les liens comme relation entre ressources
- Règle n°5 : un paramètre comme jeton d’authentification

Le détail du fonctionnement des API RESTful peuvent être retrouvé [ici](https://blog.nicolashachet.com/developpement-php/larchitecture-rest-expliquee-en-5-regles/)

Ce qui est important à retenir, c'est que généralement pour une ressource, il y a 4 opérations possibles (CRUD) :

- Créer (create)
- Afficher (read)
- Mettre à jour (update)
- Supprimer (delete)

HTTP propose les verbes correspondant :

- Créer (create) => **POST**
- Afficher (read) => **GET**
- Mettre à jour (update) => **PUT** ou **PATCH**
- Supprimer (delete) => **DELETE**

Pour tester les routes, il existe plusieurs solutions, et la plus simple reste d'utiliser un petit logiciel :

- [Insomnia](https://support.insomnia.rest/article/23-installation#ubuntu)
- [POSTMAN](https://www.getpostman.com/)
- [VSC REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (celui sur lequel nous sommes partis)
- y'en a probablement d'autres...

[Source venant des cours de l'école O'clock](https://oclock.io/formations)

---

## Mise en place des routes

Pour la gestion des routes, nous avons choisi de partir sur l'indexation des routes, nous avons séparés les différentes routes en fonction des différentes tables pour une gestion indépendantes des éléments.

Pour la visualisation de l'index :

```js
//~import modules
import { Router } from 'express';
const router = Router();

//~routers

//main
import { router as mainRouter } from './main.js';
router.use(mainRouter);
//list
import { router as listRouter } from './list.js';
router.use(listRouter);
//card
import { router as cardRouter } from './card.js';
router.use(cardRouter);
//tag
import { router as tagRouter } from './tag.js';
router.use(tagRouter);

export { router };
```

On importe le module pour gérer les routes avec Express puis on importe les différentes routes.

## Test des routes et gestion des données par les controllers

### Router

Pour l'exemple, nous partons sur le routeur pour la gestion des listes.

On importe le module *Router* d'[Express](https://expressjs.com/fr/4x/api.html#app) ainsi que les méthodes que nous utiliserons sur chaque route dans notre architecture RESTful.

```js
//~import modules
import { Router } from 'express';
const router = Router();

import { createList, deleteList, fetchAllLists, fetchOneList, updateList } from '../controllers/listController.js'

//^===============LIST
router.get('/lists', fetchAllLists);
router.post('/lists', createList);

router.get('/lists/:id', fetchOneList);
router.patch('/lists/:id', updateList);
router.delete('/lists/:id', deleteList);

export { router };
```

Chaque méthode sera donc gérée par notre controller pour les listes de la manière suivante :

- Importation des modules nécessaires :

```js
//~import modules
import * as error from './errorController.js';

import {
    List
} from '../models/index.js';
```

#### <u>Gestion des erreurs avec le controller </u>

Pour la gestion des erreurs, nous sommes partis sur un controller indépendant qui va assembler toutes les erreur :

```js
function _400(req, res) {
    res.status(400).json('BAD REQUEST');
};
function _401(req, res) { res.status(401).json('AUTHENTIFICATION ERROR');
};
function _403(req, res) { res.status(403).json('ACCESS DENIED');
};
function _404(req, res, message) {
    res.status(404).json({ "Error 404": message });
};
function _500(err, req, res) { res.status(500).json({"Server Error 500": err.message});
};

export { _400,_401, _403,_404,_500 };
```

Celle-ci en l'important dans les controllers, permettra de redistribuer les erreurs recherchées.

### FetchAllLists

- Pour récupérer toutes les listes :

```js
async function fetchAllLists(req, res) {
    try {
        const lists = await List.findAll({
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            //-------------------------------------------------------//
            //~Methode 1 en citant les model et en les important
            include: [{
                model: Card,
                as: 'cards',
                attributes: {
                    exclude: ['id', 'order', 'user_id', 'list_id', 'color', 'created_at', 'updated_at']
                },
            }, {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['id', 'avatar', 'email', 'password', 'created_at', 'updated_at']
                }
            }]
            //-----------------------------------------------------//

            //~Methode 2 en allant directement chercher l'alias sans importer les models
            include: [{
                    association: 'cards',
                    attributes: {
                        exclude: ['id', 'order', 'user_id', 'list_id', 'color', 'created_at', 'updated_at']
                    },
                },
                {
                    association: 'user',
                    attributes: {
                        exclude: ['id', 'avatar', 'email', 'password', 'created_at', 'updated_at']
                    }
                }
            ],
            order: [
                // je viens ordonner les listes par position croissante
                ['order', 'ASC'],
                // et les cards par position croissante
                ['cards', 'order', 'ASC']
            ]
          //-----------------------------------------------------//
        });

          res.json(lists);

    } catch (err) {
        error._500(err, req, res);
    }
};
```

Pour récupérer toutes les listes en incluant les tables associées, nous avons fait les tests avec 2 méthodes différentes.

Les tests ont été fait avec [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) et la vitesse ainsi que la mémoire utilisée sont les mêmes pour les 2 méthodes.

Nous avons choisi de partir sur la première méthode dans un soucis de clarté de lecture du code.

### CreateOneList

- Pour créer une liste :

```js
async function createList(req, res) {
    try {
      //---------------------------------------------------------//
      //~Méthode 1
        // je récupère ce qui est envoyé par la requête POST
        const list = req.body;

        //on met en place les conditions pour renvoyer les erreurs si ce qui ne doit pas être NULL doit être rempli
        if (!list.title) {
            throw new Error("Le nom de la liste doit être précisé");
        };
        if (!list.order) {
            throw new Error("La position de la liste doit être précisée");
        }

        if (!list.user_id) {
            throw new Error("L'utilisateur doit être identifié");
        }
        //Et seulement après on peut générér une liste
        // le .save() vient insérer en BDD notre objet, au retour, il vient mettre à jour l'id de celui-ci
        let newList = List.build({
            title: list.title,
            order: list.order,
            user_id: list.user_id
        });

        await newList.save();

        res.json(newList);

    } catch (err) {
        error._500(err, req, res);
    }
};
```

Pour la création de la liste, on compte 3 manières différentes de procéder que vous retrouverez ci-dessous :

```js
 // Méthode 1
        // Utilisation de la méthode create
        const list = await List.create({
            title: 'Tache finalisé !',
            order: 3,
            description: 'En paix !',
            user_id: 1
        })
        return res.json('Liste créer')
       
        
        // Méthode 2
        // Utilisation de la méthode build()
        const list2 = List.build({
            title: 'Tache finalisé !',
            order: 3,
            description: 'En paix !',
            user_id: 1
        });
        return res.json(await list2.save());

        // Méthode 3
        // Utilisation de la méthode new List()
        const list3 = new List({
            title: 'Tache finalisé !',
            order: 3,
            description: 'En paix !',
            user_id: 1
        });
        return await list3.save();

        //merci Fredo pour la rédaction des méthodes :)
```

Ces 3 méthodes permettent de créer une liste, testées toutes les 3 et approuvées ! Enfin, on a quand même décidé de partir sur la méthode **create( )** !

### FetchOneList

- Pour récupérer une liste :

```js
async function fetchOneList(req, res) {
    try {

        //On récupère l'id  paramètres de l'url(query string)
        const listId = req.params.id;

        //On récupère la liste en BDD via son id
        const list = await List.findByPk(listId, {
            include: [{
                association: "cards",
                include: [{
                    association: "tags"
                }]
            }],
            order: [
                // les cards par position croissante
                ["cards", "order", "ASC"]
            ]
        });

        //on vérifie que la liste n'est pas vide
        if (!list) {
            return error._404(req, res, "Impossible to retreive the list with this id");
        };

        res.json(list);

    } catch (err) {
        error._500(err, req, res);
    }
};
```


Pour cette étape, on va bien chercher l'élément en fonction de son id et les associations nous permettent d'avoir les informations que l'on souhaite afficher lors de l'envoi des données.

On met en place avant l'envoi des données la condition d'existence d'une liste.

### UpdateOneList

- Pour mettre à jour une liste :

```js
async function updateList(req, res) {
    try {
        const listId = req.params.id;

        //-------------------------------------------------//
        //~Methode 1

        //on récupère la liste en BDD
        const list = await List.findByPk(listId);

        //on vérifie si une liste a été trouvée
        if (!list) {
            return error._404(req, res, "Impossible to retreive the list with this id");
        };

        if (req.body.title) { //on vérifie si on souhaite modifier le nom
            list.title = req.body.title;
        };

        if (req.body.order) { //on vérifie si on souhaite modifier la order
            list.order = req.body.order;
        };
        //puis on met à jour en BDD
        await list.save();

        res.json(list);

        //-------------------------------------------------------//
        //~Methode 2

        

    } catch (err) {
        error._500(err, req, res);
    }
};
```

Ici aussi on met les conditions d'existence pour chaque élément à modifier et on indique ce qu'on souhaite exclure

- Pour supprimer une liste :

### Test avec Insomnia

### Test avec l'extension Rest Client VSCode

Test des envois fait avec l'extension Rest-Client

```shell
#-------HOME
GET http://localhost:4100/

###
#-------LIST
GET http://localhost:4100/lists

###
POST http://localhost:4100/lists

```

Affichage d'une liste

```js
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 147
ETag: W/"93-psMITlR1mWCu/wL/VDz5OX8LnO8"
Date: Thu, 12 May 2022 14:37:51 GMT
Connection: close

{
  "id": 2,
  "title": "Never going back",
  "description": "Never giving in",
  "order": 1,
  "user_id": 1,
  "created_at": "2022-05-12T14:33:14.938Z",
  "updated_at": null
}
```

Affichage des listes :

```js
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 297
ETag: W/"129-S+08z+Syzu+tL4Wog9pRJQHJXfs"
Date: Thu, 12 May 2022 14:45:37 GMT
Connection: close

[
  {
    "id": 1,
    "title": "Never going back",
    "description": "Never giving in",
    "order": 1,
    "user_id": 1,
    "created_at": "2022-05-12T14:24:55.612Z",
    "updated_at": null
  },
  {
    "id": 2,
    "title": "Never going back",
    "description": "Never giving in",
    "order": 1,
    "user_id": 1,
    "created_at": "2022-05-12T14:33:14.938Z",
    "updated_at": null
  }
]
```

Erreur qu'on peut trouver si on reset nos tables et qu'un utilisateur n'existe pas dans la table car nous avons imposé le fait que une liste ne peut exister qu'uniquement si un utilisateur existe :

Erreur dans le body :

```js
insert or update on table "list" violates foreign key constraint "list_user_id_fkey"
```

Affichage des erreurs géré par notre errorController :

```js
function _500(err, req, res) { res.status(500).json({"Server Error 500": err.message});
};
```

```js
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 121
ETag: W/"79-ATDzh+ktgm6e93+i1ICXLnXic3U"
Date: Fri, 13 May 2022 09:17:00 GMT
Connection: close

{
  "Server Error 500": "une valeur NULL viole la contrainte NOT NULL de la colonne « order » dans la relation « list »"
}
```

Pour lancer une erreur, ne pas oublier de créer la nouvelle erreur avec throw new Error :

```js
     if (!list.title) {
            throw new Error("Le nom de la liste doit être précisé");
        }
;
```

Pour les test avec l'extension Rest Client, le format du body doit être écrit de la manière suivante selon des règles très strictes :

```shell

POST http://localhost:4100/lists
#format json
Content-type: application/json
#Très strict le format d'écriture pour le test, C majuscule, espace avant application et saut à la ligne

{
    "title": "sample",
    "order": 9,
    "user_id": 1
}
```

[Retour à l'accueil](/README.md)

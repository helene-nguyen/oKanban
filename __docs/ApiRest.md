# API Rest

Mise en place API avec l'architecture REST

### Architecture REST

**REST (Representational State Transfer) ou RESTful** est un style d’architecture permettant de construire des applications (Web, Intranet, Web Service). Il s’agit d’un ensemble de conventions et de bonnes pratiques à respecter et non d’une technologie à part entière. L’architecture REST utilise les spécifications originelles du **protocole HTTP**, plutôt que de réinventer une surcouche (comme le font SOAP ou XML-RPC par exemple).

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
- [VSC REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- y'en a probablement d'autres...

[Source venant des cours de l'école O'clock](https://oclock.io/formations)


---



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

Subtilité entre **PUT** et **PATCH**

Test mené :

```js
//!TEST ZONE
async function updateTest(req, res) {
    try {
        const list = await List.upsert(
            {
                title: `I'm a survivor`,
                order: 1,
                user_id:1
            },
            {
                where: { id: 7 }
            });

        console.log(list);

    } catch (err) {
        error._500(err, req, res);
    }
};
```

Valeurs obligatoires sinon renvoie une erreur

Erreur

```js
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 98
ETag: W/"62-Sj3R3CTUzSGl+Pun0rZkI/8rJz8"
Date: Thu, 12 May 2022 16:43:45 GMT
Connection: close

une valeur NULL viole la contrainte NOT NULL de la colonne « order » dans la relation « list »
```

Résultat

```js
  {
    "id": 17,
    "title": "I'm a survivor",
    "description": null,
    "order": 1,
    "user_id": 1,
    "created_at": "2022-05-12T16:34:46.745Z",
    "updated_at": null
  }
```


[Retour à l'accueil](/README.md)
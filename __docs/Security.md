# Security

## CORS

Cross-Origin Resource Sharing

[Source info](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)

Au sein de notre API, on va autoriser des origines à venir effectuer des requêtes.

Ici pour gérer les autorisations, nous avons plusieurs solutions :

- Soit passer par un module

```
npm i cors
```

Et on l'importe sur notre fichier index.js qui va lancer l'autorisation de notre API

```js
import cors from 'cors';
app.use(cors());
```

- Soit en passant par Express directement et mettre en place les valeurs autorisées en créant un middleware

```js
app.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');

    next();
});
```

Le `header` est un alias des caractéristiques suivantes nativement présentes dans Express :

```js
//res.set(field [, value])

res.set('Content-Type', 'text/plain')

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123', //valeurs qu'on peut attribuer
  ETag: '12345'
})

// Aliased as res.header(field [, value])
```

Par défaut côté serveur ET navigateur, il y a un problème. On ne peut pas appeler le serveur d'une origine différente et c'est pourquoi on doit tout autoriser

##

##

##

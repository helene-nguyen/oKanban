# Security

## CORS

Cross-Origin Resource Sharing

[Source info](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)

Au sein de notre API, on va autoriser des origines à venir effectuer des requêtes côté client.

Ici pour gérer les autorisations, nous avons plusieurs solutions :

- Soit passer par un module

```
npm i cors
```

Et on l'importe sur notre fichier index.js qui va lancer l'autorisation de notre API

```js
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:4000'}));
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

Par défaut côté serveur ET navigateur, il y a un problème. On ne peut pas appeler le serveur d'une origine différente et c'est pourquoi on doit tout autoriser.

Tout cela servira aussi à se protéger contre les attaques [DDoS](https://fr.wikipedia.org/wiki/Attaque_par_d%C3%A9ni_de_service)

Dans notre cas on a bien autorisé *<http://localhost:4000>* à se connecter.

Cette adresse pourra donc faire des appels de notre API.

## XSS

XSS = Cross Site Scripting

Cross-site scripting (XSS) est une faille de sécurité qui permet à un attaquant d'injecter dans un site web un code client malveillant.

Ces attaques réussissent si l'application Web n'emploie pas assez de validation ou d'encodage.

Les attaques de script intersite se produisent généralement lorsque :

1) les données entrent dans une application Web via une source non fiable (le plus souvent une requête web)

2) le contenu dynamique est envoyé à un utilisateur web sans être reconnu comme un contenu malveillant.

La diversité des attaques basées sur XSS est presque illimitée, mais elles incluent généralement la transmission de données privées comme des *cookies* ou d'autres informations de session à l'attaquant, redirigeant la victime vers une page Web contrôlée par l'attaquant ou exécutant d'autres opérations malveillantes sur la machine de l'utilisateur.

Les attaques XSS peuvent être classées en 3 catégories : stockée (aussi appelée persistante), reflétée (aussi appelée non-persistante) ou basée sur DOM.

- ***Les attaques XSS stockées***

Le script injecté est stocké en permanence sur les serveurs cibles. La victime extrait ensuite ce script malveillant du serveur lorsque le navigateur envoie une demande de données.

- ***Les attaques XSS reflétées***

Lorsqu'un utilisateur est trompé en cliquant sur un lien malveillant, en soumettant un formulaire spécialement conçu ou en naviguant sur un site malveillant, le code injecté se rend sur le site Web vulnérable. Le serveur Web renvoie le script injecté au navigateur de l'utilisateur, par exemple dans un message d'erreur, un résultat de recherche ou toute autre réponse incluant des données envoyées au serveur dans le cadre de la demande. Le navigateur exécute le code car il suppose que la réponse provient d'un serveur "de confiance" avec lequel l'utilisateur a déjà interagi.

- ***Les attaques XSS basées sur DOM***

La charge utile est exécutée à la suite de la modification de l'environnement DOM (dans le navigateur de la victime) utilisé par le script côté client d'origine. En d'autres termes, la page elle-même ne change pas, mais le code côté client contenu dans la page s'exécute de manière inattendue en raison des modifications malveillantes apportées à l'environnement DOM.

[Source MDN très complète](https://developer.mozilla.org/fr/docs/Glossary/Cross-site_scripting)

Il faudra gérer la sécurité côté serveur ET côté client.

## FormData

[Source MDN](https://developer.mozilla.org/fr/docs/Web/API/FormData)

## Conseils de sécurité se préparer contre les injections SQL

- Côté Front :
  - Utiliser *textContent* plutôt que *innerHTML*
  - Ne jamais utiliser *eval*

  [Source pour éviter les attaques par injection](https://snyk.io/blog/5-ways-to-prevent-code-injection-in-javascript-and-node-js/)

- Côté Back :
  - se protéger avec npm sanitizer pour par exemple échapper les caractères spéciaux
  - vérifier chaque envoi fait par un utilisateur
  - utliser Sequelize permet de se prémunir des injections SQL
  - PG permet aussi de se protéger en faisant les requêtes préparées (en utilisant les token)

   [Autre source Best Practice](https://www.educative.io/blog/secure-nodejs-apps-best-practices)


## CSRF

Cross Site Request Forgery est une méthode qui vient à utiliser la session de l'utilisateur et donc les droits qu'ils peut avoir au niveau d'une application pour réaliser des actions malveillantes.

Ici, la personne vient prendre 'l'apparence' de l'utilisateur pour s'infiltrer dans le système.

(Petit conseil : Sequelize comme les autres ORM, dégradent un peu les performances)

## Performance du site 

On peut tester les performances, les console.log consomment énormément.

On peut tester de la manière suivante :

```js
   console.time("performance");
        for(let counter=0;counter<10000;counter++){
           console.log(counter);
        }
        console.timeEnd("performance");
```


## COURS O'CLOCK
## Versionner une API

=> Si notre API est utilisé (intégré) dans de nombreux code base, on a interêt à ne pas introduire de BREAKING CHANGES dans nos routes. 
Pour cela, au lieu de "casser" nos controlleurs, on en créé des nouveaux et on précise (dans la doc de l'ancienne route, dans les headers de l'ancienne route, etc...) que cette vieille route sera supportée pendant encore ~6 mois puis dépréciée.
=> Généralement, on ajoute des version (`/v1`) dans le PATH de nos routes.

Note: quand on a une API qui concerne uniquement notre entreprise (voir notre seul FRONT), on s'embête pas forcément.

## PR workflow

- On fait une PR de notre branche vers `master` (ou `main`)
- Nos collègues font les retours.
- On fix les retours sur notre branche
- La PR est ensuite mergée sur `master`
- On met à jour en local notre `master`. 

## Tests

Assure que lorsque l'on modifie une fonctionnalité de notre application, on ne casse pas autre chose sans le savoir.
On prend du temps à les écrire mais au long terme, ça permet d'avoir un codebase viable et protégé des breaking changes. 

JEST => environnement / moteur de tests (`describe`, `it`) 
FRISBY => un exemple de framework pour tester les requêtes HTTP 

## Notre API est-elle sécurisée ?

#### Oui

- `Injection SQL`: le fait d'injecter dans un input du code SQL malicieux qui a vocation à modifier l'état de la BDD à l'insu des développeurs.
  - Avec `Sequelize` installé, on est bon ! 
  - `npm audit` => pas de vulnérabilité dans nos packages. On est toujours bon ! 
  - il faut veiller au grain pour s'assurer de l'intégrité des nos "composants" (aka `modules`)

- `CORS` (Cross Origin Ressource Sharing)
  - C'est un système de protection des "serveurs" par défaut qui consiste à bloquer toutes requests provenant d'un autre DOMAIN (ex: une requête de http://instagram.com vers http://reddit.com sera bloqué par défaut). 
  - Sauf si on les autorise explicitement (à l'aide d'un module bien pratique qui s'appelle `cors`). On autorise un (ou des) nom de domaines (aka. origines)
  - Exemple:
    - Appeller http://localhost:3000/api/lists depuis https://devhumor.com ne fonctionne pas pour l'instant
    - Appeler https://geo.api.gouv.fr/regions depuis https://devhumor.com fonctionne car l'api de gouv.fr a sans doute autorisé les cross requests depuis n'importe quel domaine (normal, c'est une API public, l'intêret qu'ils ont est qu'on l'utilise facilement!)
  - Faisons la même chose, on autorise tout le monde : 
  - C'est au niveau du serveur qu'on autorise les CORS. ATTENTION : en rajoutant la possibilité de faire des CORS depuis n'importe quelle orgine, on laisse une faille.
  - Utilité ? 
    - Permet d'interdire aux développeurs malicieux d'intégré nos routes dans une iFrame (et donc potentiellement faire croire à l'utilisateur qu'il est sur notre site, alors qu'en fait il "voit" notre site à travers un autre, qui peut potentiellement écouter ces clicks et inputs)
    - Peut éviter quelques DDOS attacks (spam de notre API par des serveurs tiers)

### Non !

- `DDOS`
  - on est sensible aux `attaques par déni de service`.
    - c'est une avalanche d'appels vers notre API dans le but de surcharger nos serveurs et donc de les rendre inutilisable. 
  - Je vais vous parler d'une méthode (c'est pas vraiment ça qui protégera notre serveur mais ça fait pas de mal) : Ajouter du `limit rate` !
  - On interdit à une IP particulière de faire plus de X appels en moins de Y minutes.

- `XSS injections`:
  - Injection de code JavaScript dans le navigateur d'un utilisateur (côté client donc)
    - Exemple : vol de cookies, redirection vers des sites de phishing
  - Démonstration : 
    - créons un client pour notre APP 
    - On peut facilement inséré dans la BDD du code malicieux type:
      - <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Pirate_Flag_of_Jack_Rackham.svg/744px-Pirate_Flag_of_Jack_Rackham.svg.png">
    
  - Comment s'en prémunier ?
    - `Côté client` : encoder les output.
      - => fini les `innerHTML`, `insertAdjacentHTML`, etc...
      - => allons plutôt sur des `insertAdjacentText` ou `textContent` etc...
      - => ou utiliser un framework protège généralement de ce genre de problèmes
        - typiquement `EJS` protège de ça !
          - => quand on fait un output EJS `<%= name %>` alors on est protégé contre ce genre d'attaque car l'encodage est réalisé par EJS sans rien demandé.
        - mais tous les frameworks le font (React (Next), Vue (Nuxt), Ember, Svelte, et compagnie)
    - `Côté backend` : filtrer les inputs ! 
      - **DO NOT TRUST USER INPUT**
      - Plein de méthodes pour ça :
        - faire le filtrage à la main (avec des regex, des règles écrire manuellement en JS, etc...)
        - ou utiliser un module ;) 


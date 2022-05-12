# Database

## Créer la base de données

Dans le terminal, on commence par lancer PostreSQL avec la commande suivante :

```shell
psql -U postgres
```
Ensuite quelques commandes SQL pour la création de notre utilisateur ainsi que notre base de données !

```sql
CREATE USER okanban WITH PASSWORD 'okanban'
```

```sql
CREATE DATABASE okanban OWNER 'okanban'
```

- Check si on peut se connecter

```shell
\c okanban okanban
```
- Check si on a bien okanban dans notre liste

```shell
\l
```
![list](./images/list_pg.png)

Parfait, tout est là !

## Syntaxes à respecter

On va écrire notre SQL pour créer la DB, dans un premier temps, il faut ouvrir un nouveau fichier sql (ici, dans le dossier data, j'ai bien mon premier fichier de création de la base de données create_db.sql).

Quelques précisions pour la ***PRIMARY KEY*** :

- une clé primaire est automatiquement **NOT NULL**. Pas besoin de le préciser lors de la création d'une table.

- On spécifie que la colonne sera généré automatiquement par la BDD en suivant une séquence numérique prédéfinie de 1 en 1

- On peut définir **BY DEFAULT** (surcharge de la valeur possible) ou **ALWAYS** (surcharge de la valeur impossible)

- On utilise **BY DEFAULT** car on définit nous même les valeurs des clés primaires dans les insertions du fichier *import_data.sql*

- Mais on utilisera plus généralement **ALWAYS** afin de sécuriser l'incrémentation des valeurs du champ

Concernant les valeurs de *updated_at* et *created_at*, utilise deux colonnes pour gérer la date de création et les mises à jour par défaut 

```sql
BEGIN; --Toujours commencer par BEGIN pour démarrer la transaction

 --On supprime d'abord les tables existantes si elles existent
DROP TABLE IF EXISTS "user",
"list",
"card",
"tag",
"card_has_tag"; --Ne pas oublier de refermer

--exemple de création de tables
CREATE TABLE IF NOT EXISTS "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, --Ecriture moderne
    "avatar" TEXT NULL,
    "firstname" TEXT NULL,
    "lastname" TEXT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "list" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NULL,
    "order" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "card" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NULL,
    "color" TEXT NULL,
    "order" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
     -- le ON DELETE CASCADE permet d'indiquer à notre système que lorsqu'une List est supprimée, on supprime les cartes associées. S'il n'est pas présent, nous aurons une erreur à la suppression de la liste
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "tag"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "card_has_tag"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
    "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
    UNIQUE("card_id", "tag_id")
);

COMMIT;
```

Si les clés primaires sont générées par défault, pour éviter tout problème on ajoute :

```sql
SELECT setval('category_id_seq', (SELECT MAX(id) from "category"));
```

Ci-dessous un modèle type d'une importation de données :

```sql
BEGIN;

INSERT INTO "role"("id","name")
VALUES 
 (1, 'admin'), 
 (2, 'user');

INSERT INTO "user"
    ("id","username","email","password", "role_id")
VALUES 
 (1, 'admin', 'admin@admin.com','admin', 1);

SELECT setval('category_id_seq', (SELECT MAX(id) from "category"));
SELECT setval('role_id_seq', (SELECT MAX(id) from "role"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('snippet_id_seq', (SELECT MAX(id) from "snippet"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
```

## La création des tables 

On va maintenant importer notre création create_db.sql dans okanban avec la commande suivnate dans le terminal :

```shell
\i c:/Users/Gamer/Desktop/oKanban/data/01-create_db.sql 
```

Résultat .... TADAAAAAM ! : 

![createdb](./images/createdb.png)

Un petit check de toutes les tables créées :

- Pour l'utilisateur :

![createdb](./images/user.png)

- Pour la liste

![createdb](./images/list.png)

- Pour les cartes

![createdb](./images/card.png)

- Pour les tags

![createdb](./images/tag.png)

- Pour la table pivot

![createdb](./images/card_has_tag.png)


## Importer des données 

Si on veut insérer des données, on peut créer sur un fichier à part les informations qu'on veut saisir.

Dans notre cas, on veut y ajouter des informations dans notre table "tag", on va donc créer un fichier à part pour l'importation

```shell
BEGIN;

INSERT INTO "tag"("name", "color")
VALUES
    ('note', '#BDE6F1'),
    ('todo', '#FFE59D'),
    ('info', '#7D1E6A'),
    ('important', '#6A67CE'),
    ('success', '#6D8B74'),
    ('help', '#EC994B'),
    ('question', '#97C4B8'),
    ('warning', '#FFCD38'),
    ('social', '#FFEF82'),
    ('bug', '#F2F2F2'),
    ('tips', '#187498'),
    ('search', '#36AE7C'),
    ('doc', '#EB5353');

COMMIT;
```

Résultat :

![import](./images/import.png)

Et tadaaaaam !

![import data](./images/import_data.png)

Tout est là, on va maintenant pouvoir tester la base de données en s'y connectant.


[Retour à la page d'accueil](/README.md)
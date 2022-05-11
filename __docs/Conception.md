# Conception du projet O'Kanban

## User case et MCD

|        En tant que        |Je veux pouvoir |Dans le but de|
|----------------|-------------------------------|-----------------------------|
|Visiteur|   Accéder au site    |Visualiser le contenu du site            |
|Visiteur|   M'inscrire     |           |
|Visiteur|	Me connecter ||
||--||--|
|Utilisateur|Accéder à ma page profil |Visualiser mes infos|
|Utilisateur|Modifier mon profil |Mettre à jour mes infos|
|Utilisateur|Me déconnecter |Sortir de ma session|
||--||--|
|Utilisateur|Créer une liste| Rajouter une liste|
|Utilisateur|Déplacer une liste| Changer l'ordre de la liste |
|Utilisateur|Modifier une liste|Mettre à jour ma liste|
|Utilisateur|Supprimer une liste|--|
||--||--|
|Utilisateur|Créer une carte| Rajouter une carte dans ma liste|
|Utilisateur|Déplacer une carte| Changer le placement de la carte |
|Utilisateur|Modifier une carte|Mettre à jour ma carte|
|Utilisateur|Supprimer une carte|--|
||--||--|
|Utilisateur|Créer un label| Rajouter des labels à ma liste |
|Utilisateur|Modifier un label|Mettre à jour les labels liés à ma liste|
|Utilisateur|Supprimer un label|--|


### Etablissement du MCD sur [Mocodo](http://mocodo.wingi.net/)

```
LIST: code_list, title, order, description, created_at, updated_at,
CREATE, 0N USER, 11 LIST
USER: code_user, avatar, firstname, lastname, email, password, created_at, updated_at,

CONTAIN, 0N LIST, 11 CARD
CARD : code_card, title, order, color,  description, created_at, updated_at,
ETABLISH, 0N USER, 11 CARD

:
HAVE, 0N CARD, 0N TAG
TAG : code_tag, name, color, created_at, updated_at,
```

Visualisation :

![MCD](./images/mcd.png)

## MLD

```
LIST ( code_list, title, order, description, created_at, updated_at, , #code_user )
USER ( code_user, avatar, firstname, lastname, email, password, created_at, updated_at, )
CARD ( code_card, title, order, color, description, created_at, updated_at, , #code_user, #code_list )
HAVE ( #code_card, #code_tag )
TAG ( code_tag, name, color, created_at, updated_at, )
```

## MPD

Mise en place du MPD 

![MPD](./images/MPD.jpg)


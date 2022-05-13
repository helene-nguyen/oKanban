//~import modules
import * as error from './errorController.js';

import {
    List,
    Card,
    User, Tag
} from '../models/index.js';

//~controller
//&=================ALL LISTS
async function fetchAllLists(req, res) {
    try {
        const lists = await List.findAll({
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            //~Methode 1 en cherchant les models
            include: [{
                model: Card,
                as: 'cards',
                // association : 'cards',
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
        });

        res.json(lists);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================CREATE LIST
async function createList(req, res) {
    try {
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
      List.create({
            title: list.title,
            order: list.order,
            user_id: list.user_id
        });

        res.json(`La liste ${list.title} a bien été crée`);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================ONE LIST
async function fetchOneList(req, res) {
    try {

        //On récupère l'id  paramètres de l'url(query string)
        const listID = req.params.id;

        //On récupère la liste en BDD via son id
        const list = await List.findByPk(listID, {
            include: [{
                model: Card,
                as: "cards",
                include: [{
                    model: Tag,
                    as: 'tags'
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

//&=================UPDATE LIST
async function updateList(req, res) {
    try {
        const listId = req.params.id;

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

    } catch (err) {
        error._500(err, req, res);
    }
};
//&=================DELETE LIST
async function deleteList(req, res) {
    try {
        const listId = req.params.id;
        const list = await List.findByPk(listId);

        //on supprime en BDD
        await list.destroy();

        res.json(`List [ ${list.title} ] is deleted !`);

    } catch (err) {
        error._500(err, req, res);
    }
};

export {
    fetchAllLists,
    fetchOneList,
    createList,
    updateList,
    deleteList
};
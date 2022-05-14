//~import modules
import {_500 } from './errorController.js';
import assert from 'assert';

import {
    List,
    Card,
    User,
    Tag
} from '../models/index.js';

//~controller
//&================= ALL LISTS
async function fetchAllLists(req, res) {
    try {
        const lists = await List.findAll({
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            order: [
                ['order', 'ASC']
            ]
        });

        res.json(lists);

    } catch (err) {
        _500(err, req, res);
    }
};

//&================= CREATE LIST
async function createList(req, res) {
    try {
        assert.ok(req.body.title, 'Le nom de la liste doit être précisé');
        assert.ok(req.body.order, 'La position de la liste doit être précisée');
        assert.ok(req.body.user_id, `L'utilisateur doit être identifié`);

        List.create({
            ...req.body
        });

        res.json(`La liste ${req.body.title} a bien été crée`);

    } catch (err) {
        _500(err, req, res);
    }
};

//&================= ONE LIST
async function fetchOneList(req, res) {
    try {

        const listId = Number(req.params.id);
        //On récupère la liste en DB via son id
        const list = await List.findByPk(listId, {
            attributes: {
                exclude: ['id', 'order', 'user_id', 'created_at', 'updated_at']
            }
        });

        assert.ok(list, `Aucune liste n'a été trouvée !`);

        res.json(list);

    } catch (err) {
        _500(err, req, res);
    }
};

//&================= UPDATE LIST
async function updateList(req, res) {
    try {
        // ! Méthode 1 utilisation de UPDATE()
        await List.update(
            // l'ordre est important [values, conditions]
            {
                ...req.body
            }, {
                where: {
                    ...req.params
                }
            }
        );

        return res.json(`Les informations de la liste a bien été mise à jour`);

    } catch (err) {
        _500(err, req, res);
    }
};
//&================= DELETE LIST
async function deleteList(req, res) {
    try {
        await List.destroy({
            where: {
                ...req.params
            }
        });

        res.json(`La liste a bien été supprimée !`);

    } catch (err) {
        _500(err, req, res);
    }
};

export {
    fetchAllLists,
    fetchOneList,
    createList,
    updateList,
    deleteList
};
//~import modules
import {
    _500,
    _404
} from './errorController.js';
import assert from 'assert';
import {
    List,
    Card
} from '../models/index.js';

//~controller
//~ ------------------------------------------------ ALL LISTS
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

//~ ------------------------------------------------ CREATE LIST
async function createList(req, res) {
    try {
       console.log(req.body);
        let {
            title,
            description,
            user_id
        } = req.body;

        //^conditions
        assert.ok(title, `Invalid body. Should provide at least a 'title' or 'order' property`);
        assert.ok(user_id, `User must be provided`);

//todo order ne passe pas
        //create list if order === null ?
        await List.create({
            ...req.body
        });

        res.json(`La liste ${req.body.title} a bien été créée`);

    } catch (err) {
        _404(err, req, res);
    }
};

//~ ------------------------------------------------ ONE LIST
async function fetchOneList(req, res) {
    try {

        const listId = Number(req.params.id);
        //On récupère la liste en DB via son id

        assert.ok(!isNaN(listId), `Please verify the provided id, it's not a number`);

        const list = await List.findByPk(listId, {
            attributes: ['title', 'description']
        });

        assert.ok(list, `Aucune liste n'a été trouvée !`);

        res.json(list);

    } catch (err) {
        _404(err, req, res);
    }
};

//~ ------------------------------------------------ UPDATE LIST
async function updateList(req, res) {
    try {
        console.log(req.body);
        let {
            title,
            description,
            order,
            user_id
        } = req.body;

        const listId = Number(req.params.id);

        const list = await List.findOne({
            where: {
                id: listId
            }
        });

        //^conditions
        assert.ok(list, `La liste n'existe pas`);
        assert.ok(!isNaN(order), `Invalid body parameter 'order'. Should provide a number`); 
        assert.ok(user_id, `User must be provided`);

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

        return res.json(`Les informations de la liste ont bien été mises à jour`);

    } catch (err) {
        _404(err, req, res);
    }
};
//~ ------------------------------------------------ DELETE LIST
async function deleteList(req, res) {
    try {
        const listId = Number(req.params.id);
        //TODO Gtn
        assert.ok(!isNaN(listId), `Please verify the provided id, it's not a number`);

        const list = await List.findOne({
            where: {
                id: listId
            }
        });

        //^conditions
        //todo Gtn add
        assert.ok(list, `La carte n'existe pas`);

        await List.destroy({
            where: {
                ...req.params
            }
        });

        res.json(`La liste a bien été supprimée !`);

    } catch (err) {
        _404(err, req, res);
    }
};

export {
    fetchAllLists,
    fetchOneList,
    createList,
    updateList,
    deleteList
};
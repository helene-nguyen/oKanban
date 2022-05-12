//~import modules
import * as error from './errorController.js';

import {
    List
} from '../models/index.js';

//~controller
//&=================ALL LISTS
async function fetchAllLists(req, res) {
    try {
        const lists = await List.findAll();

        res.json(lists);

    } catch (err) {
        error._500(err, req, res);
    }
};
//&=================ONE LISTS
async function fetchOneList(req, res) {
    try {
        const list = await List.findByPk(2);

        res.json(list);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================CREATE LIST
async function createList(req, res) {
    try {
        const list = await List.create({
            title: 'Never going back',
            order: 1,
            description: 'Never giving in',
            user_id: 1
        });

        console.log(list);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================UPDATE LIST
async function updateList(req, res) {
    try {
        const list = await List.update(
            //values
            {
                title: `I'm a survivor`
            },
            //options
            {
                where: {
                    id: 7
                }
            });

        console.log(list);

    } catch (err) {
        error._500(err, req, res);
    }
};
//&=================DELETE LIST
async function deleteList(req, res) {
    try {
        const deleteList = await List.destroy({
            where: {
                id: 11
            }
        });

        console.log(deleteList);

    } catch (err) {
        error._500(err,req,res);
    }
};


export {
    fetchAllLists,
    fetchOneList,
    createList,
    updateList,
    deleteList
};
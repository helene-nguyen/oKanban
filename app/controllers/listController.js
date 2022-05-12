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
        error._500;
    }
};
//&=================ONE LISTS
async function fetchOneList(req, res) {
    try {
        const list = await List.findByPk(2);

        res.json(list);

    } catch (err) {
        error._500;
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
        error._500;
    }
};

//&=================UPDATE LIST
async function updateList(req, res) {
    try {
        const list = await List.update(
            //values
            {
                title: `I'm a survivor`,
                description: `My Own Way`
            },
            //options
            { where: { id: 8 }
            });

        console.log(list);

    } catch (err) {
        error._500;
    }
};
//&=================DELETE LIST



export {
    fetchAllLists,
    fetchOneList,
    createList,
    updateList
};
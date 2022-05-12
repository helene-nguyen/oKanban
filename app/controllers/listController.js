//~import modules
import * as error from './errorController.js';

import { List } from '../models/index.js';

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

export { fetchAllLists, createList };
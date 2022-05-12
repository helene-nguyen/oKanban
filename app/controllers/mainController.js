//~import modules
import * as error from './errorController.js';

import {
    Tag
} from '../models/index.js';

//~controllers
async function testDB(req, res) {
    try {
        console.log('TEEEEST');
        const tags = await Tag.findAll();
        res.json(tags);

    } catch (err) {
        error._500(err, req, res);
    }
};

export {
    testDB
};
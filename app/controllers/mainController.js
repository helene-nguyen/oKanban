//~import modules
import * as error from './errorController.js';

import { User } from '../models/index.js';

//~controllers
async function testDB(req, res) {
    try {
        
        const user = await User.findAll();
        res.send(user);
        res.end();

    } catch (err) {
        error._500;
    }
};

export { testDB };
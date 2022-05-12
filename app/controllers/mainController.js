//~import modules
import * as error from './errorController.js';
import clc from 'cli-color';

/* import { User } from '../models/index.js'; */

//~controllers
async function testDB(req, res) {
    try {
        res.send("|------------------- TEST -----------------|");
        res.end();
 
    } catch (err) {
        error._500;
    }
};

export { testDB };
//~import modules
import * as error from './errorController.js';

//~controllers
async function renderHomePage(req, res) {
    try {
        
        res.json('Welcome to Okanban API');

    } catch (err) {
        error._500(err, req, res);
    }
};

export {
    renderHomePage
};
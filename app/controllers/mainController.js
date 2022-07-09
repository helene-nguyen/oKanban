//~import modules
import errorAPI from './errorController.js';

//~controllers
async function renderHomePage(req, res) {
    try {
        
        res.json('Welcome to Okanban API');

    } catch (err) {
        errorAPI(err, req, res,500);
    }
};

export {
    renderHomePage
};
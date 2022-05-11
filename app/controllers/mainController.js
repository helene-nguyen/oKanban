//~import modules
import * as error from './errorController.js'

//~controllers
function testDB(req, res) {
    try {
        
        res.send('Youhouuu');
        res.end();

    } catch (err) {
        error._500;
    }
};

export { testDB };
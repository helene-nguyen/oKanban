//~environment
import 'dotenv/config';
//~import modules
import express from 'express';
const app = express();

// import session from 'express-session';
import {router} from './app/routes/index.js';
import errorAPI from './app/controllers/errorController.js';
import helmet from 'helmet';
app.use(helmet());

//~ Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');

    // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    next();

});

import session from 'express-session';

import {userMiddleware} from './app/middlewares/auth.js'



//~read the body
//accept Content-type: application/json
app.use(express.json());
// accept Content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));


//~session
app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
        //24 hours
    }
));

//&great mw to keep the user connected !
app.use(userMiddleware);

//~body parser for forms
//none for waiting no files but only classical forms
//~ Import Multer for formdata
import multer from 'multer';
const bodyParser = multer();
app.use(bodyParser.none());

//~router
app.use(router);

//~error
app.use((req, res)=>{
    errorAPI({ message: 'Error 404 Page Not Found' }, req, res, 400);
});

//~ Launch Server 
const PORT = process.env.PORT ??  3000; 
 
app.listen(PORT, () => { 
console.log(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`); 
});
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

//~body parser for forms
//none for waiting no files but only classical forms
//~ Import Multer for formdata
import multer from 'multer';
const bodyParser = multer();
app.use(bodyParser.none());


//~ Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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

//If you have your node.js behind a proxy and are using secure: true, you need to set 'trust proxy' in express
app.set('trust proxy', 1) // trust first proxy if deploy Heroku

//~ Session
app.use(session({
    saveUninitialized: true,
    resave: true,
    proxy: true,
    secret: process.env.SESSION_SECRET,
    cookie: { 
        secure : true,
        sameSite: 'lax', // or 'strict'
        maxAge: 24 * 60 * 60 * 1000 //24 hours
        //expires : new Date(Date.now() + 60 * 60 * 1000) //1 hour
        }
}));

//&great mw to keep the user connected !
app.use(userMiddleware);

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

//~environment
import 'dotenv/config';
//~import modules
import express from 'express';
const app = express();
import session from 'express-session';
import {
    router
} from './app/routes/index.js';
import * as error from './app/controllers/errorController.js';
import multer from 'multer';
const bodyParser = multer();

import cors from 'cors';
app.use(cors('*'));
/* app.use(cors({ origin: 'http://localhost:4000'}));*/

/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    next();
}); */

//~read the body
//accept Content-type: application/json
app.use(express.json());
// accept Content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));

//~body parser for forms
//none for waiting no files but only classical forms
app.use(bodyParser.none());

//~router
app.use(router);

//~error
app.use(error._400);

//~launch app
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
});
//~environment
import 'dotenv/config';
//~import modules
import express from 'express';
const app = express();

import session from 'express-session';
import {router} from './app/routes/index.js';
import {_404} from './app/controllers/errorController.js';
import multer from 'multer';
const bodyParser = multer();
import helmet from 'helmet';
app.use(helmet());

import cors from 'cors';
app.use(cors());

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
app.use(_404);

//~launch app
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
});
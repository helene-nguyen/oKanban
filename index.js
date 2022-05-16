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

/* import cors from 'cors';
app.use(cors({ origin: 'http://localhost:4000'})); */

app.use((req, res, next) => {   
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');

    next();
});


//~read the body
//accept Content-type: application/json
app.use(express.json());
// accept Content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));

//~session

//~router
app.use(router);

//~error
app.use(error._400);

//~launch app
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
});
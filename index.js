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
app.use(cors()); */

app.use((req, res, next) => {
    //res.set() to set header, res.header is an alias
    /* res.set(field [, value])
res.set('Content-Type', 'text/plain')

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  ETag: '12345'
})
Aliased as res.header(field [, value]). */   
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
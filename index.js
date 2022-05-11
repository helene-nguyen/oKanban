//~environment
import 'dotenv/config';
//~import modules
import express from 'express';
const app = express();
import session from 'express-session';
import { router } from './app/routes/index.js';
import * as error from './app/controllers/errorController.js'

//~url encoded

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
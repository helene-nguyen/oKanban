//~environment
import 'dotenv/config';

//~import modules
import express from 'express';
const app = express();

//~url encoded
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//~statics
app.use('/', express.static('assets'));

//~launch app
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
});

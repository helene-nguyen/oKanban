//~import modules
import {
    Card
} from '../models/index.js';
import {
    _500
} from './errorController.js';

//~controllers
//&=================ALL CARDS
async function fetchAllCards(req, res) {

    try {

        const allCards = await Card.findAll();
        res.json(allCards);

    } catch (err) {
        _500(err, req, res);
    }
};
//&=================CREATE CARD
async function createCard(req, res) {

    try {
        const card = await Card.create({
            title: 'Card -> Survivor',
            order: 1,
            description: 'On part en guerre !',
            color: '#FFF',
            user_id: 1,
            list_id: 8,
        })
        res.json(card)

    } catch (err) {
        _500(err, req, res);
    }
};
//&=================ONE CARD
async function fetchOneCard(req, res) {

    try {

        const id = 1;
        const oneCard = await Card.findByPk(id);

        res.json(oneCard)

    } catch (err) {
        _500(err, req, res);
    }
};
//&================= UPDATE CARD
async function updateCard(req, res) {
    try {

        const update = await Card.update(

            //! Attention l'ordre est important [values, conditions]
            // pour un update ou un upsert
            // On a dans un premier temps les Values 
            {
                title: 'Trop content !!!!!'
            },
            // Dans un second temps les conditions
            {
                where: {
                    id: 1
                }
            },
        );
        console.log(update);

    } catch (err) {
        _500(err, req, res);
    }
};

//&=================DELETE CARD
async function deleteCard(req, res) {
    try {

        const cardDestroy = await Card.destroy({
            where: {
                id: 2
            }
        });
        console.log('Card DESTROY -----', cardDestroy)

    } catch (err) {
        _500(err, req, res);
    }
};


export {
    fetchAllCards,
    createCard,
    fetchOneCard,
    updateCard,
    deleteCard
};
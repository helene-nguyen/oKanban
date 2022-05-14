//~import modules
import assert from 'assert';
import {
    Card,
    Tag,
    List
} from '../models/index.js';
import {
    _500
} from './errorController.js';

//~controllers
//&=================ALL CARDS
async function fetchAllCards(req, res) {
    try {
        const allCards = await Card.findAll({attributes: {
            exclude: ['id', 'order', 'user_id', 'list_id', 'created_at', 'updated_at']
        },
        include: [{
                model: List,
                as: 'list',
                attributes: {
                    exclude: ['id', 'order', 'user_id', 'created_at', 'updated_at']
                }
            },
            {
                model: Tag,
                as: 'tags',
                attributes: {
                    exclude: ['id', 'created_at', 'updated_at']
                }
            }
        ]});

        res.json(allCards);

    } catch (err) {
        _500(err, req, res);
    }
};
//&=================CREATE CARD
async function createCard(req, res) {
    try {
        assert.ok(req.body.title, 'Le nom de la carte doit être précisé');
        assert.ok(req.body.order, 'La position de la carte doit être précisée');
        assert.ok(req.body.description, 'La description doit être précisé');

        Card.create({ ...req.body});

        res.json(`La carte ${req.body.title} a bien été crée`);

    } catch (err) {
        _500(err, req, res);
    }
};
//&=================ONE CARD
async function fetchOneCard(req, res) {
    try {
        const cardId = Number(req.params.id);

        const oneCard = await Card.findByPk(cardId, {
            attributes: {
                exclude: ['id', 'order', 'user_id', 'list_id', 'created_at', 'updated_at']
            },
            include: [{
                    model: List,
                    as: 'list',
                    attributes: {
                        exclude: ['id', 'order', 'user_id', 'created_at', 'updated_at']
                    }
                },
                {
                    model: Tag,
                    as: 'tags',
                    attributes: {
                        exclude: ['id', 'created_at', 'updated_at']
                    }
                }
            ]
        });

        res.json(oneCard)

    } catch (err) {
        _500(err, req, res);
    }
};
//&================= UPDATE CARD
async function updateCard(req, res) {
    try {
        await Card.update(
            // l'ordre est important [values, conditions]
            {
                ...req.body
            }, {
                where: {
                    ...req.params
                }
            }
        );

        return res.json(`Les informations de la carte ont bien été mises à jour`);

    } catch (err) {
        _500(err, req, res);
    }
};

//&=================DELETE CARD
async function deleteCard(req, res) {
    try {
        await Card.destroy({
            where: {
                ...req.params
            }
        });

        res.json(`La carte a bien été supprimée !`);

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
//Yumicode 2022
// ~ IMPORTATIONS
import { Card, List } from "../models/index.js";
import { _404, _500 } from "./errorController.js";
import assert from "assert";
import { isValidHexadecimalColor } from "../middlewares/validHex.js";

// ~ FUNCTIONS
// ~ ------------------------------- FETCH ALL CARDS
// GET http://[adress]/cards
async function fetchAllCards(req, res) {
  try {
    const allCards = await Card.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"]
      },
      order: [["order", "ASC"]]
    });

    res.json(allCards);
  } catch (err) {
    _500(err, req, res);
  }
}

// ~ ------------------------------- CREATE CARD
// POST http://[adress]/cards .
async function createCard(req, res) {
  try {
    let { title, order, description, color } = req.body;
    // Syntax: assert.ok(condition, [message]) => (import assert from 'assert';)
    //NON NULL in our tables
    assert.ok(
      title,
      `Title or description should be provided`
    );
    assert.ok(description, `A description should be provided`);
    assert.ok(
      isValidHexadecimalColor(color ? color : (color = "#000")),
      `Invalid type: color should be a valid hexadecimal code (string)`
    );

    // with create() with Sequelize, no need to save()
    await Card.create({
      ...req.body
    });

    res.json(`Card created !`);
  } catch (err) {
    _404(err, req, res);
  }
}

// ~ ------------------------------- FETCH ONE CARD
// ( GET http://[adress]/cards/[:id] )
async function fetchOneCard(req, res) {
  try {
    // Récupération de l'id ( Number permet une certaine sécurité )
    const cardId = Number(req.params.id);

    assert.ok(
      !isNaN(cardId),
      `Please verify the provided id, it's not a number`
    );
    // L'utilisation de la méthode findOne() récupère la première entrée
    // qui remplit les options de requête, ici on a juste un where "id"
    // comme pour les autres méthodes on exclus tout les éléments non nécessaires
    const card = await Card.findOne({
      where: {
        id: cardId
      },
      attributes: {
        exclude: ["created_at", "updated_at"]
      }
    });
    assert.ok(card, `This card doesn't exist !`);
    // on affiche avec json notre résultat
    res.json(card);
  } catch (err) {
    _404(err, req, res);
  }
}

// ~ ------------------------------- UPDATE CARD
// ( PATCH http://[adress]/cards/[:id] )
async function updateCard(req, res) {
  try {
    let { title, order, description, color } = req.body;

    const cardId = Number(req.params.id);
    assert.ok(
      !isNaN(cardId),
      `Please verify the provided id, it's not a number`
    );

    const card = await Card.findOne({
      where: {
        id: cardId
      }
    });

    //^conditions
    assert.ok(card, `La carte n'existe pas`);

    assert.ok(
      isValidHexadecimalColor(color ? color : "#000"),
      `Invalid type: position should be a valid hexadecimal code (string)`
    );

    await Card.update(
      // order of info is important here [values, conditions]
      {
        ...req.body
      },
      {
        where: {
          ...req.params
        }
      }
    );

    res.json(`Everything is updated !`);
  } catch (err) {
    _404(err, req, res);
  }
}

// ~ ------------------------------- DELETE CARD
// ( DELETE http://[adress]/cards/[:id] )
async function deleteCard(req, res) {
  try {
    const cardId = Number(req.params.id);

    assert.ok(
      !isNaN(cardId),
      `Please verify the provided id, it's not a number`
    );

    const card = await Card.findOne({
      where: {
        id: cardId
      }
    });

    //^conditions
    assert.ok(card, `This card doesn't exist !`);

    await Card.destroy({
      where: {
        ...req.params
      }
    });

    res.json(`Card deleted !`);
  } catch (err) {
    _404(err, req, res);
  }
}

// ~ ------------------------------- FETCH ALL CARDS BY LIST ID
// ( GET http://[adress]/lists/[:id]/cards )
async function fetchAllCardsByListId(req, res) {
  try {
    const listId = Number(req.params.id);

    assert.ok(
      !isNaN(listId),
      `Please verify the provided id, it's not a number`
    );

    const fetchOneList = await List.findOne({
      where: {
        id: listId
      }
    });

    assert.ok(fetchOneList, `List doesn't exist !`);

    const allCards = await fetchOneList.getCards();

    res.json(allCards);
  } catch (err) {
    _404(err, req, res);
  }
}

export {
  fetchAllCards,
  createCard,
  fetchOneCard,
  updateCard,
  deleteCard,
  fetchAllCardsByListId
};

//~import modules
import { _500, _404 } from "./errorController.js";
import assert from "assert";
import { Tag, Card } from "../models/index.js";

//~controller
//~ ------------------------------- TAGS
async function fetchAllTags(req, res) {
  try {
    const tags = await Tag.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"]
      },
      order: [["id", "DESC"]]
    });

    res.json(tags);
  } catch (err) {
    _500(err, req, res);
  }
}

//~ ------------------------------- CREATE TAG
async function createTag(req, res) {
  try {
    assert.ok(req.body.name, "Tag name should be provided !");

    Tag.create({
      ...req.body
    });

    res.json(`Tag [ ${req.body.name} ] is created !`);
  } catch (err) {
    _404(err, req, res);
  }
}

//~ ------------------------------- ONE TAG
async function fetchOneTag(req, res) {
  try {
    const tagId = Number(req.params.id);
    assert.ok(
      !isNaN(tagId),
      `Please verify the provided id, it's not a number`
    );

    const tag = await Tag.findByPk(tagId, {
      attributes: ["name", "color"]
    });

    assert.ok(tag, `This tag doesn't exist !`);

    res.json(tag);
  } catch (err) {
    _404(err, req, res);
  }
}

//~ ------------------------------- UPDATE TAG (PATCH)
async function updateTag(req, res) {
  try {
    const tagId = Number(req.params.id);
    assert.ok(
      !isNaN(tagId),
      `Please verify the provided id, it's not a number`
    );

    const tag = await Tag.findByPk(tagId, {
      attributes: ["name", "color"]
    });

    //^condition
    assert.ok(tag, `This tag doesn't exist !`);
    assert.ok(req.body.name, "Tag name should be provided !");

    await Tag.update(
      //[values, conditions]
      {
        ...req.body
      },
      {
        where: {
          ...req.params
        }
      }
    );

    return res.json(`Everything is up-to-date !`);
  } catch (err) {
    _404(err, req, res);
  }
}
//~ ------------------------------- DELETE TAG
async function deleteTag(req, res) {
  try {
    const tagId = Number(req.params.id);
    assert.ok(
      !isNaN(tagId),
      `Please verify the provided id, it's not a number`
    );

    const tag = await Tag.findByPk(tagId, {
      attributes: ["name", "color"]
    });

    //^condition
    assert.ok(tag, `This tag doesn't exist !`);

    await Tag.destroy({
      where: {
        ...req.params
      }
    });

    res.json(`Tag deleted !`);
  } catch (err) {
    _404(err, req, res);
  }
}

// ~ ------------------------------- UPSERT TAG BY CARD ID(PUT)
// PUT http://[adresse]/cards/[:cardId]/tags/[:tagName]
async function findOrCreateTagByCardId(req, res) {
  try {
    const cardId = Number(req.params.cardId);
    const tagName = req.params.tagName.toString();
    const color = req.body.color;

    assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`);

    let tag = await Tag.findOne({
      where: {
        name: tagName
      }
    });

    tag === null ? (tag = color) : tag;

    const myCard = await Card.findOne({
      where: {
        id: cardId
      }
    });

    assert.ok(myCard, `This tag doesn't exist !`);

    // findOrCreate() find the instance, or create it
    //! "defaults" when create
    await Tag.findOrCreate({
      where: {
        name: tagName
      },
      defaults: {
        name: `${tagName}`,
        color: `${tag}`
      }
    });

    const myTag = await Tag.findOne({
      where: {
        name: tagName
      }
    });

    // Sequelize links
    //methods: add, remove, set, get, count, has, create
    //* -------->  foo.methode[as](bar)  <--------
    //* -------->  myCard.addTags(myTag)  <--------

    //!!
    myCard.addTags(myTag);

    res.json(`Tag is linked to card`);
  } catch (err) {
    _404(err, req, res);
  }
}

//~ ------------------------------- DELETE TAGS BY CARD ID
async function addTagToCard(req, res) {
  try {
    const cardId = Number(req.params.cardId);
    const tagId = Number(req.params.tagId);

    assert.ok(
      !isNaN(cardId),
      `Please verify the provided id, it's not a number`
    );
    assert.ok(
      !isNaN(tagId),
      `Please verify the provided id, it's not a number`
    );

    const card = await Card.findOne({
      where: {
        id: cardId
      }
    });
    const tag = await Tag.findOne({
      where: {
        id: tagId
      }
    });

    assert.ok(card, `This card doesn't exist !`);
    assert.ok(tag, `This tag doesn't exist !`);
    assert.ok(!await card.hasTags(tag), `There is already an association !`);

    card.addTags(tag);

    res.json(`Tag is linked to card`);
  } catch (err) {
    _404(err, req, res);
  }
}

//~ ------------------------------- DELETE TAGS BY CARD ID

// ( DELETE http://[adress]/cards/[:cardId]/tags/[:tagId] )
async function deleteAsWithTag(req, res) {
  try {
    const cardId = Number(req.params.cardId);
    const tagId = Number(req.params.tagId);
    assert.ok(
      !isNaN(cardId),
      `Please verify the provided id, it's not a number`
    );
    assert.ok(
      !isNaN(tagId),
      `Please verify the provided id, it's not a number`
    );

    const card = await Card.findOne({
      where: {
        id: cardId
      }
    });
    const tag = await Tag.findOne({
      where: {
        id: tagId
      }
    });

    //existing of card or tag
    assert.ok(card, `This card doesn't exist !`);
    assert.ok(tag, `This tag doesn't exist !`);

    //unlink tag to specific card
    card.removeTags(tag);

    res.json(` The tag " ${tag.name} " is well unlinked ! `);
  } catch (err) {
    _404(err, req, res);
  }
}

//~ -------------------------------------------------- FETCH ALL TAGS BY CARD ID
// (GET http://[adress]/cards/[:id]/tags )
async function fetchAllTagsByCardId(req, res) {
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

    assert.ok(card, `This card doesn't exist !`);

    const allTags = await card.getTags({
      attributes: {
        exclude: ["created_at", "updated_at"]
      }
    });

    res.json(allTags);
  } catch (err) {
    _404(err, req, res);
  }
}

export {
  fetchAllTags,
  fetchAllTagsByCardId,
  fetchOneTag,
  createTag,
  updateTag,
  findOrCreateTagByCardId,
  addTagToCard,
  deleteTag,
  deleteAsWithTag
};

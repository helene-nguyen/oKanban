//~import modules
import * as error from './errorController.js';
import assert from 'assert';

import {
    Tag, Card
} from '../models/index.js';

//~controller
//&=================ALL TAGS
async function fetchAllTags(req, res) {
    try {
        const tags = await Tag.findAll({
            attributes: {
                exclude: ['id','created_at', 'updated_at']
            }, include: { model: Card, as: 'cards', attributes: { exclude: ['id', 'order', 'description', 'user_id', 'list_id', 'created_at', 'updated_at'] } },
            order: ['name', 'ASC']
        });

        res.json(tags);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================CREATE TAG
async function createTag(req, res) {
    try {
        assert.ok(req.body.name, 'Le nom du tag doit être précisé');
    
        Tag.create({ ...req.body});

        res.json(`Le tag ${req.body.name} a bien été crée`);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================ONE TAG
async function fetchOneTag(req, res) {
    try {
        const tagId = Number(req.params.id);

        const tag = await Tag.findByPk(tagId, {
            attributes: {
                exclude: ['id','created_at', 'updated_at']
            }, include: {model: Card, as: 'cards', attributes: { exclude: ['id', 'order', 'description','user_id', 'list_id','created_at', 'updated_at']}}
        })

        res.json(tag);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================UPDATE TAG (PATCH)
async function updateTag(req, res) {
    try {
        await Tag.update(
            // l'ordre est important [values, conditions]
            { ...req.body },
            { where: {...req.params}}
        );

        return res.json(`Les informations du label a bien été mis à jour`);

    } catch (err) {
        error._500(err, req, res);
    }
};
//REVIEW       
//&=================UPSERT TAG (PUT)
async function upsertTag(req, res) {
    try {
        const tag = await Tag.update({
            id:24,
            name: 'try upsert 6'
        }
    );
        //REMOVE 
        res.json(tag);

    } catch (err) {
        error._500(err, req, res);
    }
};
//&=================DELETE TAG
async function deleteTag(req, res) {
    try {
        await Tag.destroy({
            where: {
                ...req.params
            }
        });

        res.json(`Le tag a bien été supprimé !`);

    } catch (err) {
        error._500(err, req, res);
    }
};



export {
    fetchAllTags,
    fetchOneTag,
    createTag,
    updateTag,
    upsertTag,
    deleteTag
};
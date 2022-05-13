//~import modules
import * as error from './errorController.js';

import {
    Tag
} from '../models/index.js';

//~controller
//&=================ALL TAGS
async function fetchAllTags(req, res) {
    try {
        const tags = await Tag.findAll();

        res.json(tags);

    } catch (err) {
        error._500(err, req, res);
    }
};
//&=================ONE TAG
async function fetchOneTag(req, res) {
    try {
        const tag = await Tag.findByPk(14);

        res.json(tag);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================CREATE TAG
async function createTag(req, res) {
    try {
        const tag = await Tag.create({
            name: 'doc',
            color: '#36AE7B'
        });
        //REMOVE 
        console.log(tag);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================UPDATE TAG (PATCH)
async function updateTag(req, res) {
    try {
        const tag = await Tag.update({
            name: `Truc`
        }, {
            where: {
                id: 24
            }
        });
        //REMOVE 
        console.log(tag);

    } catch (err) {
        error._500(err, req, res);
    }
};
//&=================UPSERT TAG (PUT)
async function upsertTag(req, res) {
    try {
        const tag = await Tag.upsert({
            id:24,
            name: 'try upsert 6'
        }
    );
        //REMOVE 
        console.log(tag);

    } catch (err) {
        error._500(err, req, res);
    }
};
//&=================DELETE TAG
async function deleteTag(req, res) {
    try {
        const deleteTag = await Tag.destroy({
            where: {
                id: [26]
            }
        });
        //REMOVE
        console.log(deleteTag);

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
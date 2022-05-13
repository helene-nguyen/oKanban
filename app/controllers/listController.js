//~import modules
import * as error from './errorController.js';

import {
    List
} from '../models/index.js';

//~controller
//&=================ALL LISTS
async function fetchAllLists(req, res) {
    try {
        const lists = await List.findAll({
            include: [{
                association: 'cards',
                include: [{
                    association: 'tags'
                }]
            }],
            order: [
                // je viens ordonner les listes par position croissante
                ['order', 'ASC'],
                // et les cards par position croissante
                ['cards', 'order', 'ASC']
            ]
        });

        res.json(lists);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================CREATE LIST
async function createList(req, res) {
    try {

       /*  const list = req.body; // je récupère ce qui est envoyé par la requête POST

        try {
            // je vérifie que les données envoyées ont la propriété name
            if (!list.name) {
                throw "Le nom de la liste doit être précisé";
            }

            // je vérifie que les données envoyées ont la propriété position
            if(!list.position){
                throw "La position de la liste doit être précisée";
            }

            let newList = List.build({
                name:list.name,position:list.position
            });

            // le .save() vient insérer en BDD notre objet, au retour, il vient mettre à jour l'id de celui-ci
            console.log("avant",newList);
            await newList.save();
            console.log("après",newList);

            res.json(newList); */

        //Et seulement après on peut générér une liste

        let newlist = await List.build({
            title: 'Never going back',
            order: 6,
            description: 'Never giving in',
            user_id: 1
        });

        await newlist.save();

        res.json(newlist);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================ONE LIST
async function fetchOneList(req, res) {
    try {
        /* 
                 // 1. je récupère l'id dans les paramètres de l'url (query string)
                 const listID = req.params.id;

                 // 2. je récupère la liste en BDD via son id
                 const list = await List.findByPk(listID,{
                     include: [
                         {
                             association: "cards",
                             include: [{
                                 association: "tags"
                             }]
                         }
                     ],
                     order:[
                         // les cards par position croissante
                         ["cards","position","ASC"]
                     ]
                 });

                 // 2.1 je vérifie que la liste ne soit pas vide
                 if(!list){
                     res.status(404).json("Impossible to retreive the list with this id");
                 }
                 else{
                     // 3. j'envoie la liste dans la réponse
                     res.json(list); */

        const list = await List.findByPk(2);

        res.json(list);

    } catch (err) {
        error._500(err, req, res);
    }
};

//&=================UPDATE LIST
async function updateList(req, res) {
    try {

        /*  const listID = req.params.id;

            // je viens récupérer la liste en BDD
            const list = await List.findByPk(listID);

            // je vérifie si une liste a été trouvée
            if(!list){
                res.status(404).json("Impossible to retreive the list with this id");
            }
            else{
                if(req.body.name){ // je vérifie si on souhaite modifier le nom
                    list.name = req.body.name;
                }

                if(req.body.position){ // je vérifie si on souhaite modifier la position
                    list.position = req.body.position;
                }

                // je mets à jour en BDD
                await list.save();

                res.json(list); */


        const list = await List.update(
            //values
            {
                title: `I'm a survivor`
            },
            //options
            {
                where: {
                    id: 7 //ici on précide le params
                }
            });

        res.json('OK');

    } catch (err) {
        error._500(err, req, res);
    }
};
//&=================DELETE LIST
async function deleteList(req, res) {
    try {
/* 
        const listID = req.params.id;
        const list = await List.findByPk(listID);

        // je supprime en BDD
        await list.destroy();

        res.json("OK"); */

        const deleteList = await List.destroy({
            where: {
                id: [9, 10]
            }
        });

        console.log(deleteList);

    } catch (err) {
        error._500(err, req, res);
    }
};
//!TEST ZONE
async function updateTest(req, res) {
    try {
        const list = await List.upsert({
            title: `I'm a survivor`,
            // order: 1,
            user_id: 1
        }, {
            where: {
                id: 14
            }
        });

        console.log(list);

    } catch (err) {
        error._500(err, req, res);
    }
};


export {
    fetchAllLists,
    fetchOneList,
    createList,
    updateList,
    deleteList,
    updateTest
};
//~import modules
import {
    _500, _404
} from './errorController.js';
import assert from 'assert';

import {
    Tag,
    Card
} from '../models/index.js';

//~controller
//~ ------------------------------------------------ TAGS
async function fetchAllTags(req, res) {
    try {
        const tags = await Tag.findAll({
            attributes: {
                exclude: ['id', 'created_at', 'updated_at']
            },
            order: ['name']
        });

        res.json(tags);

    } catch (err) {
        _500(err, req, res);
    }
};

//~ ------------------------------------------------ CREATE TAG
async function createTag(req, res) {
    try {
        assert.ok(req.body.name, 'Le nom du tag doit être précisé');

        Tag.create({
            ...req.body
        });

        res.json(`Le tag ${req.body.name} a bien été crée`);

    } catch (err) {
        _404(err, req, res);
    }
};

//~ ------------------------------------------------ ONE TAG
async function fetchOneTag(req, res) {
    try {
        const tagId = Number(req.params.id);
        assert.ok(!isNaN(tagId), `Please verify the provided id, it's not a number`);

        const tag = await Tag.findByPk(tagId, {
            attributes: ['name', 'color']
        });

        assert.ok(tag, `Le tag n'existe pas !`);

        res.json(tag);

    } catch (err) {
        _404(err, req, res);
    }
};

//~ ------------------------------------------------ UPDATE TAG (PATCH)
async function updateTag(req, res) {
    try {
        const tagId = Number(req.params.id);
        assert.ok(!isNaN(tagId), `Please verify the provided id, it's not a number`);
        
        const tag = await Tag.findByPk(tagId, {
            attributes: ['name', 'color']
        });

        //^condition
        assert.ok(tag, `Le tag n'existe pas`)
        assert.ok(req.body.name, 'Le nom du tag doit être précisé');

        await Tag.update(
            // l'ordre est important [values, conditions]
            { ...req.body },
            {where: { ...req.params }}
        );

        return res.json(`Les informations du label a bien été mis à jour`);

    } catch (err) {
        _404(err, req, res);
    }
};
//~ ------------------------------------------------ DELETE TAG
async function deleteTag(req, res) {
    try {
        const tagId = Number(req.params.id);
        assert.ok(!isNaN(tagId), `Please verify the provided id, it's not a number`);
        
        const tag = await Tag.findByPk(tagId, {
            attributes: ['name', 'color']
        });

        //^condition
        assert.ok(tag, `Le tag n'existe pas`)

        await Tag.destroy({
            where: {
                ...req.params
            }
        });

        res.json(`Le tag a bien été supprimé !`);

    } catch (err) {
        _404(err, req, res);
    }
};

// ~ ------------------------------------------------ UPSERT TAG BY CARD ID(PUT)
// PUT http://[adresse]/cards/[:cardId]/tags/[:tagName]
async function addAsWithTag(req, res) {
        try {
            /*   // Une erreur survient si on choisit de partir sur un req.params.id pour le tag
              // en effet notre Import table a pour paramètre ALWAYS pour l'id,
              // on ne peut donc pas décider nous même de la création du tag par l'id
              // c'est pourquoi nous allons faire la recherche par le name du tag
              // on sécurise le type de valeur enregistré dans les placeholders [:tagName] et [:cardId]
              const cardId = Number(req.params.cardId);
              const tagName = (req.params.tagName).toString();

              // isNaN vérifie si une chaine donné est un nombre ou pas (return true ou false)
              // si !isNaN(cardId) vérifie true alors on fait rien sinon on déclenche l'erreur
              assert.ok(!isNaN(cardId), 'Chemin non conforme');

              // On récupère un tag, mais dans le cas ou il vaut null, alors on le transforme
              // en une string qu'on utilisera pour la valeur par défault dans la création de ce tag
              let oneTag = await Tag.findOne({
                  where: {
                      name: tagName
                  }
              })
              oneTag === null ? oneTag = '#FFF' : oneTag;

              const myCard = await Card.findOne({
                  where: {
                      id: cardId
                  }
              });
              // Vérification de l'existance de la carte dans le cas contraire on force l'erreur
              assert.ok(myCard, `La carte n'existe pas`);

              // L'utilisation de findOrCreate() permet de soit trouvé l'instance, soit de la créer,
              //! il est necessaire d'insérer un paramètre "defaults" en cas de création
              await Tag.findOrCreate({
                  where: {
                      name: tagName
                  },
                  defaults: {
                      name: `${tagName}`,
                      color: `${oneTag}`
                  }
              });
               // on récupère le tag qu'on souhaite lié
              const myTag = await Tag.findOne({
                  where: {
                      name: tagName
                  }
              })

              // Sequelize nous met à disposition différentes façon de gérer les liaisons
              // les différentes méthodes : add, remove, set, get, count, has, create
              //* -------->  foo.methode[as](bar)  <--------
              //* -------->  myCard.addTags(myTag)  <--------
              // Dans un premier temps on récupère une carte avec findOne()
              // puis on utilise addTags(), qui aura pour paramètre le tag souhaité
              //! Attention Tags ne représente pas le Model mais l'association !
              myCard.addTags(myTag); */


            const cardId = Number(req.params.cardId);
            const tagId = Number(req.params.tagId);

            assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`);
            assert.ok(!isNaN(tagId), `Please verify the provided id, it's not a number`);

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

            // On vérifie les existances de la carte et du tag
            assert.ok(card, `La carte n'existe pas`);
            assert.ok(tag, `Le tag n'existe pas`);
            assert.ok(!await card.hasTags(tag), `L'association existe déjà`)

                card.addTags(tag);

                res.json(`Le tag a bien été lié`);

            }
            catch (err) {
                _404(err, req, res);
            }
        };

        //~ ------------------------------------------------ DELETE TAGS BY CARD ID
        // Cette fonction permet de supprimé l'association entre le tag et la carte lié
        // ( requête DELETE http://[adress]/cards/[:cardId]/tags/[:tagId] )
        async function deleteAsWithTag(req, res) {
            try {
                // Récupérations des req.params avec une sécurité Number
                const cardId = Number(req.params.cardId);
                const tagId = Number(req.params.tagId);

                // isNaN vérifie si une chaine donné est un nombre ou pas (return true ou false)
                assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`);
                assert.ok(!isNaN(tagId), `Please verify the provided id, it's not a number`);

                // Pour pouvoir delete une associations ils nous faut récupérer 
                // dans notre cas oneCard et oneTag
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

                // On vérifie les existances de la carte et du tag
                assert.ok(card, `La carte n'existe pas`);
                assert.ok(tag, `Le tag n'existe pas`);

                // Utilisation de la méthode remove de sequelize pour dissocié 
                card.removeTags(tag);

                res.json(` Le tag " ${tag.name} " a bien été dissocié ! `)

            } catch (err) {
                _404(err, req, res)
            }
        };

        //~ ------------------------------------------------------------------- FETCH ALL TAGS BY CARD ID
        // Cette fonction permet de retourner tout les tags liés,
        // ayant pour référence l'id de la carte donné dans le placeholder [:id]
        // ( requête GET http://[adress]/cards/[:id]/tags )
        async function fetchAllTagsByCardId(req, res) {

            try {
                // Récupération de l'id
                const cardId = Number(req.params.id);
                // Vérification si c'est un nombre ou non
                assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`);

                const card = await Card.findOne({
                    where: {
                        id: cardId
                    }
                });
                // Si card n'existe pas alors on force l'erreur
                assert.ok(card, `La carte n'existe pas`);

                // on récupère tout les tags lié a la carte trouvé
                const allTags = await card.getTags({
                    attributes: {
                        exclude: ['created_at', 'updated_at']
                    }
                })

                // On affiche avec json notre résultat
                res.json(allTags);

            } catch (err) {
                _404(err, req, res)
            }

        };

        export {
            fetchAllTags,
            fetchAllTagsByCardId,
            fetchOneTag,
            createTag,
            updateTag,
            addAsWithTag,
            deleteTag,
            deleteAsWithTag
        };
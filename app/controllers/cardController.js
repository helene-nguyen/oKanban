// ~ IMPORTATIONS
import {
    Card,
    List
} from '../models/index.js';
import {
    _404,
    _500
} from './errorController.js';
import assert from 'assert';
import {
    isValidHexadecimalColor
} from './utils/utils.js';

// ~ FUNCTIONS
// ~ ------------------------------------------------ FETCH ALL CARDS

// Cette fonction permet de retourner toutes les cartes existantes,
// une fois la requête GET http://[adress]/cards lancé.
async function fetchAllCards(req, res) {

    try {
        // Utilisation de la méthode findAll() de sequelize,
        // avec comme attribut une exclusion regroupant tout les éléments non essentiel 
        // (cela permet un gain significatif en terme de vitesse et mémoire)
        const allCards = await Card.findAll({
            attributes: {
                exclude: ['created_at', 'updated_at']
            }
        });
        // on affiche avec json notre résultat
        res.json(allCards);

    } catch (err) {
        _500(err, req, res);
    }
};

// ~ ------------------------------------------------ CREATE CARD

// Cette fonction permet la création d'une nouvelle carte,
// une fois la requête POST http://[adress]/cards lancé.
async function createCard(req, res) {

    try {
        let {
            title,
            order,
            description,
            color
        } = req.body;
        // L'utilisation de la méthode assert.ok() nous permet de faire facilement des vérifications,
        // en effet si l'assertion est fausse alors on force l'affichage d'une erreur
        // Syntaxe : assert.ok(valeur[, message]) et nécessite une importation (import assert from 'assert';)
        // On répertorie tout les champs obligatoire (NON NULL)
        assert.ok(title && order, `Le nom ou la position de la carte doit être précisé`);
        assert.ok(!isNaN(order), `La position doit être un nombre`);
        assert.ok(description, `La description de la carte doit être précisée`);
        assert.ok(isValidHexadecimalColor(color ? color : color = '#FFF'), `Invalid type: color should be a valid hexadecimal code (string)`);

        // L'utilisation du spread opérateur nous permet de récupéré tout les champs nécessaires,
        // sans avoir besoin de crée d'étape intermédiaire lors de la création d'une carte,
        // et comme on utilise la méthode create() de séquelize, pas besoin de faire save()
        await Card.create({
            ...req.body
        });

        // on affiche avec json notre message
        res.json(`La carte a bien été créée`);

    } catch (err) {
        _404(err, req, res);
    }
};

// ~ ------------------------------------------------ FETCH ONE CARD

// Cette fonction permet de retourne les détails d'une carte demandée
// ayant pour id celle situé sur le placeholder de la requête ainsi
// que ses tags associées
// ( GET http://[adress]/cards/[:id] )
async function fetchOneCard(req, res) {

    try {
        // Récupération de l'id ( Number permet une certaine sécurité )
        const cardId = Number(req.params.id);


        assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`);
        // L'utilisation de la méthode findOne() récupère la première entrée 
        // qui remplit les options de requête, ici on a juste un where "id"
        // comme pour les autres méthodes on exclus tout les éléments non nécessaires
        const card = await Card.findOne({
            where: {
                id: cardId
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            }
        });
        assert.ok(card, `La carte n'existe pas !`);
        // on affiche avec json notre résultat
        res.json(card)

    } catch (err) {
        _404(err, req, res);
    }
};

// ~ ------------------------------------------------ UPDATE CARD
// Cette fonction permet de mettre à jour les informations de la carte
// ayant pour id celle situé sur le placeholder de la requête
// (requête PATCH http://[adress]/cards/[:id] )
async function updateCard(req, res) {

    try {
        let {
            title,
            order,
            description,
            color
        } = req.body;

        const cardId = Number(req.params.id);
        assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`);

        const card = await Card.findOne({
            where: {
                id: cardId
            }
        });

        //^conditions
        //todo Gtn add
        assert.ok(card, `La carte n'existe pas`);
        assert.ok(title && order, `Le nom ou la position de la carte doit être précisé`);
        assert.ok(!isNaN(order), `La position doit être un nombre`);
        assert.ok(description, `La description de la carte doit être précisée`);
        //todo Gtn add 
        assert.ok(isValidHexadecimalColor(color ? color : '#FFF'), `Invalid type: position should be a valid hexadecimal code (string)`);
        // L'utilisation de la méthode update() permet la mise à jours des
        // informations de la carte
        await Card.update(
            // L'utilisation du spread opérateur nous permet de récupérer tout les champs nécessaires,
            // il peut être utilisé sur le req.body ainsi que sur le req.params
            // Attention l'ordre est important [values, conditions]
            {
                ...req.body
            }, {
                where: {
                    ...req.params
                }
            }
        );
        // On affiche avec json notre message
        res.json(`Les informations ont été mis à jour`);

    } catch (err) {
        _404(err, req, res);
    }
};

// ~ ------------------------------------------------ DELETE CARD

// Cette fonction permet de supprimé la carte demandé,
// ayant pour id celle situé sur le placeholder de la requête
// ( requête DELETE http://[adress]/cards/[:id] )
async function deleteCard(req, res) {

    try {
        const cardId = Number(req.params.id);
        //todo Gtn
        assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`);

        const card = await Card.findOne({
            where: {
                id: cardId
            }
        });

        //^conditions
        //todo Gtn add
        assert.ok(card, `La carte n'existe pas`);
        // Utilisation de la méthode destroy() avec sa condition
        await Card.destroy({
            where: {
                ...req.params
            }
        });
        // On affiche avec json notre message
        res.json(`La carte à bien été supprimée !`);

    } catch (err) {
        _404(err, req, res);
    }
};

// ~ ------------------------------------------------ FETCH ALL CARDS BY LIST ID

// Cette fonction permet de retourner toutes les cartes lié,
// ayant pour référence l'id de la liste donné dans le placeholder [:id]
// ( requête GET http://[adress]/lists/[:id]/cards )
async function fetchAllCardsByListId(req, res) {

    try {
        // Récupération de l'id
        const listId = Number(req.params.id);
        // Vérification si c'est un nombre ou non
        assert.ok(!isNaN(listId), `Please verify the provided id, it's not a number`);
        //todo Gtn 
        const fetchOneList = await List.findOne({
            where: {
                id: listId
            }
        });
        // Si fetchOneList n'existe pas alors on force l'erreur
        assert.ok(fetchOneList, `La liste n'existe pas`);

        // on récupère tout les cards lié a la list trouvé
        const allCards = await fetchOneList.getCards()
        // On affiche avec json notre résultat
        res.json(allCards);

    } catch (err) {
        _404(err, req, res);
    }
};

// on export toutes nos fonctions
export {
    fetchAllCards,
    createCard,
    fetchOneCard,
    updateCard,
    deleteCard,
    fetchAllCardsByListId
};
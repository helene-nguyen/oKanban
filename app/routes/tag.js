//~import modules
import {
    Router
} from 'express';
const router = Router();

import {
    fetchAllTags,
    fetchOneTag,
    createTag,
    updateTag,
    deleteTag,
    deleteAsWithTag,
    fetchAllTagsByCardId,
    addAsWithTag
} from '../controllers/tagController.js'

//^================TAG
router.get('/tags', fetchAllTags);
router.post('/tags', createTag);

router.get('/tags/:id', fetchOneTag);
router.patch('/tags/:id',updateTag);
router.delete('/tags/:id', deleteTag);

// router.put('/cards/:cardId/tags/:tagId', addAsWithTag);
router.put('/cards/:cardId/tags/:tagName', addAsWithTag);

router.delete('/cards/:cardId/tags/:tagId', deleteAsWithTag);

router.get('/cards/:id/tags', fetchAllTagsByCardId)

export {
    router
};
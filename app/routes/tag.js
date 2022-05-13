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
    upsertTag,
    deleteTag
} from '../controllers/tagController.js'

//^================TAG
router.get('/tags', fetchAllTags);
router.post('/tags', createTag);

router.get('/tags/:id', fetchOneTag);
router.patch('/tags/:id',updateTag);
router.put('/tags/:id', upsertTag);
router.delete('/tags/:id', deleteTag);

export {
    router
};
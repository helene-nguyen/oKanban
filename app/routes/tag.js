//~import modules
import { Router } from 'express';
const router = Router();

//^================TAG
router.get('/tags', (req, res) => {
    res.json({ title: 'Hello' });
});
router.post('/tags');

router.get('/tags/:id');
router.patch('/tags/:id');
router.delete('/tags/:id');
router.put('/tags/:id');

export { router };
import express from 'express';
import content from './content.service';

const router = express.Router();

router.get('/all', content.defaultService);

router.get('/:id', content.defaultService);

router.put('/:id', content.defaultService);

router.delete('/:id', content.defaultService);

router.post('/', content.defaultService);

export default router;

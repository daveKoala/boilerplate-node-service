import express, { Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import docs from '../../api-docs';

const router = express.Router();

router.get('/spec.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(docs);
});
router.get('/*', swaggerUI.serve, swaggerUI.setup(docs));

export default router;

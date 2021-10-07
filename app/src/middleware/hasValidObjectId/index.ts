import { ValidationError } from '../../lib/customErrors';
import { Request, Response, NextFunction } from 'express';
import ValidObjectId from '../../lib/ObjectId';

export default (idToCheck: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!ValidObjectId(req.params[idToCheck])) {
      throw new ValidationError('Invalid id');
    } else {
      next();
    }
  };
};

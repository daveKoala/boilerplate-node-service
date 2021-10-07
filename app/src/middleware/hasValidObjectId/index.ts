import { ValidationError } from '../../lib/customErrors';
import { Request, Response, NextFunction } from 'express';
import isValidObjectId from '../../lib/isValidObjectId';

export default (idToCheck: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (isValidObjectId(req.params[idToCheck]) !== true) {
      next(new ValidationError('Invalid id'));
    } else {
      next();
    }
  };
};

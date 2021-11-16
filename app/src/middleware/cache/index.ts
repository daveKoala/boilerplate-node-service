import { Request, Response, NextFunction } from 'express';
import { getByKey, makeKey } from '../../lib/cache';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const key = makeKey();

    const cachedDoc = await getByKey(key);
    if (cachedDoc === null) {
      next();
    } else {
      res.status(200).json({ key, cachedDoc });
    }
  } catch (error) {
    next(error);
  }
};

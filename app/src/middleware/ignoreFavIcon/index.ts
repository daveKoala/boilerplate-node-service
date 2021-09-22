import { Request, Response, NextFunction } from 'express';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).send();
  } else {
    next();
  }
};

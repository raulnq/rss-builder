import db from '../../config/database.js';
import { NotFoundError } from '../../middlewares/errorHandler.js';
import { validateUuidv7 } from '../../utils/validation.js';

export const ensureSourceFound = async (req, res, next, sourceId) => {
  validateUuidv7(next, sourceId, 'sourceId');
  const source = await db('sources').where('sourceId', sourceId).first();
  if (!source) {
    return next(new NotFoundError('Source not found'));
  }
  req.source = source;
  next();
};

export const findSource = async (req, res) => {
  res.status(200).json(req.source);
};

export const ensureFeedFound = async (req, res, next, feedId) => {
  validateUuidv7(next, feedId, 'feedId');
  next();
};

import db from '../../config/database.js';
import { NotFoundError } from '../../middlewares/errorHandler.js';
import { validateUuidv7 } from '../../utils/validation.js';

export const ensureFeedFound = async (req, res, next, feedId) => {
  validateUuidv7(next, feedId, 'feedId');
  const feed = await db('feeds').where('feedId', feedId).first();
  if (!feed) {
    return next(new NotFoundError('Feed not found'));
  }
  req.feed = feed;
  next();
};

export const findFeed = async (req, res) => {
  res.status(200).json(req.feed);
};

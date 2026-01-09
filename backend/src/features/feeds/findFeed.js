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
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Get a feed'
  #swagger.description = 'Retrieve a feed by its unique identifier'
  #swagger.security = [{ "clerkAuth": [] }]
  #swagger.parameters['feedId'] = {
    in: 'path',
    description: 'Feed item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Feed found successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/feed'
        }
      }
    }
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  #swagger.responses[404] = {$ref: '#/components/responses/notFoundError'}
   */
  res.status(200).json(req.feed);
};

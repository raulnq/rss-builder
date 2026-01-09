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
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Get a source'
  #swagger.security = [{ "clerkAuth": [] }]
  #swagger.description = 'Retrieve a source by its unique identifier'
  #swagger.parameters['feedId'] = {
    in: 'path',
    description: 'Feed item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.parameters['sourceId'] = {
    in: 'path',
    description: 'Source item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Source found successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/source'
        }
      }
    }
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  #swagger.responses[404] = {$ref: '#/components/responses/notFoundError'}
   */
  res.status(200).json(req.source);
};

export const ensureFeedFound = async (req, res, next, feedId) => {
  validateUuidv7(next, feedId, 'feedId');
  next();
};

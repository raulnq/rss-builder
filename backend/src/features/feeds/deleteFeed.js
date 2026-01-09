import db from '../../config/database.js';

export const deleteFeed = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Delete a feed'
  #swagger.description = 'Delete a feed by its unique identifier'
  #swagger.security = [{ "clerkAuth": [] }]
  #swagger.parameters['feedId'] = {
    in: 'path',
    description: 'Feed item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.responses[204] = {
    description: 'Feed deleted successfully',
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  #swagger.responses[404] = {$ref: '#/components/responses/notFoundError'}
   */
  await db('feeds').where('feedId', req.feed.feedId).del();
  res.status(204).send();
};

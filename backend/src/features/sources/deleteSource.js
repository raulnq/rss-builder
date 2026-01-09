import db from '../../config/database.js';

export const deleteSource = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Delete a source'
  #swagger.description = 'Delete a source by its unique identifier'
  #swagger.security = [{ "clerkAuth": [] }]
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
  #swagger.responses[204] = {
    description: 'Source deleted successfully',
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  #swagger.responses[404] = {$ref: '#/components/responses/notFoundError'}
   */
  await db('sources').where('sourceId', req.source.sourceId).del();
  res.status(204).send();
};

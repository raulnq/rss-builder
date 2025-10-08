import db from '../../config/database.js';

export const deleteSourceEntries = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Delete all entries of a source'
  #swagger.description = 'Delete all entries of a source by its unique identifier'
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
    description: 'Entries deleted successfully',
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  #swagger.responses[404] = {$ref: '#/components/responses/notFoundError'}
   */
  await db('entries').where('sourceId', req.source.sourceId).del();
  res.status(204).send();
};

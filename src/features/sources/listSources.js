import db from '../../config/database.js';

export const listSources = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Get all sources'
  #swagger.description = 'Retrieve all sources for a specific feed'
  #swagger.parameters['feedId'] = {
    in: 'path',
    description: 'Feed item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Successfully retrieved sources',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/sourceList'
        }
      }
    }
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  */
  const { feedId } = req.params;
  const items = await db('sources').select('*').where('feedId', feedId);
  res.json(items);
};

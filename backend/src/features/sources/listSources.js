import db from '../../config/database.js';

export const listSources = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Get all sources'
  #swagger.security = [{ "clerkAuth": [] }]
  #swagger.description = 'Retrieve a paginated list of sources for a specific feed'
  #swagger.parameters['feedId'] = {
    in: 'path',
    description: 'Feed item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.parameters['pageNumber'] = {$ref: '#/components/parameters/pageNumber'}
  #swagger.parameters['pageSize'] = {$ref: '#/components/parameters/pageSize'}
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

  const baseQuery = db('sources').where('feedId', feedId);

  const [{ count: total }] = await baseQuery.clone().count('* as count');
  const items = await baseQuery
    .select('*')
    .limit(req.pagination.pageSize)
    .offset(req.pagination.offset);

  const totalCount = parseInt(total);

  res.status(200).json({
    items,
    pageNumber: req.pagination.pageNumber,
    pageSize: req.pagination.pageSize,
    totalPages: Math.ceil(totalCount / req.pagination.pageSize),
    totalItems: totalCount,
  });
};

import db from '../../config/database.js';

export const listEntries = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Get all entries for a source'
  #swagger.security = [{ "clerkAuth": [] }]
  #swagger.description = 'Retrieve a paginated list of entries for a specific source'
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
  #swagger.parameters['pageNumber'] = {$ref: '#/components/parameters/pageNumber'}
  #swagger.parameters['pageSize'] = {$ref: '#/components/parameters/pageSize'}
  #swagger.responses[200] = {
    description: 'Successfully retrieved entries',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/entryList'
        }
      }
    }
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  #swagger.responses[404] = {$ref: '#/components/responses/notFoundError'}
  */
  const { sourceId } = req.source;

  const baseQuery = db('entries').where('sourceId', sourceId);

  const [{ count: total }] = await baseQuery.clone().count('* as count');
  const items = await baseQuery
    .select('*')
    .orderBy('publishedAt', 'desc')
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

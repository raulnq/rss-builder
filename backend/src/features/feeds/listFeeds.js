import db from '../../config/database.js';
import * as yup from 'yup';

export const listFeedsSchema = yup.object({
  name: yup.string().trim().optional(),
  pageNumber: yup.number().integer().min(1).required(),
  pageSize: yup.number().integer().min(1).max(100).required(),
});

export const listFeeds = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Get all feeds'
  #swagger.description = 'Retrieve a paginated list of feeds with optional filtering by name'
  #swagger.parameters['pageNumber'] = {$ref: '#/components/parameters/pageNumber'}
  #swagger.parameters['pageSize'] = {$ref: '#/components/parameters/pageSize'}
  #swagger.parameters['name'] = {
        in: 'query',
        description: 'Name of the feed',
        required: false,
        type: 'string'
      }
  #swagger.responses[200] = {
    description: 'Successfully retrieved feeds',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/feedList'
        }
      }
    }
  }
  #swagger.responses[400] = {$ref: '#/components/responses/validationError'}
  #swagger.responses[401] = {$ref: '#/components/responses/unauthorizedError'}
  */
  const { name } = req.validatedQuery;
  let baseQuery = db('feeds');
  if (name && name.trim()) {
    baseQuery = baseQuery.where('name', 'ilike', `${name.trim()}%`);
  }

  const [{ count: total }] = await baseQuery.clone().count('* as count');
  const items = await baseQuery
    .select('*')
    .orderBy('createdAt', 'desc')
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

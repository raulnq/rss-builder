import db from '../../config/database.js';
import { v7 as uuidv7 } from 'uuid';
import * as yup from 'yup';

export const addSourceSchema = yup.object({
  name: yup.string().required(),
  url: yup
    .string()
    .url()
    .required()
    .matches(/^https?:\/\/.+/, 'URL must start with http:// or https://'),
});

export const addSource = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Create a new source'
  #swagger.description = 'Create a new source item with a name and URL'
  #swagger.parameters['feedId'] = {
    in: 'path',
    description: 'Feed item unique identifier',
    required: true,
    type: 'string'
  }
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/addSource'
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Source created successfully',
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
  */
  const { feedId } = req.params;
  const source = {
    sourceId: uuidv7(),
    name: req.body.name,
    url: req.body.url,
    syncedAt: null,
    feedId: feedId,
  };

  await db('sources').insert(source);
  res.status(201).json(source);
};

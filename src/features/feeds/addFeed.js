import db from '../../config/database.js';
import { v7 as uuidv7 } from 'uuid';
import * as yup from 'yup';
import crypto from 'node:crypto';

export const addFeedSchema = yup.object({
  name: yup.string().required(),
});

export const addFeed = async (req, res) => {
  /*
  #swagger.tags = ['Feeds']
  #swagger.summary = 'Create a new feed'
  #swagger.description = 'Create a new feed item with a name'
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/addFeed'
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Feed created successfully',
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
  */
  const randomString = crypto.randomBytes(8).toString('hex');
  const feed = {
    feedId: uuidv7(),
    name: req.body.name,
    key: randomString,
    createdAt: new Date(),
  };
  await db('feeds').insert(feed);
  res.status(201).json(feed);
};

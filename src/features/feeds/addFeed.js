import db from '../../config/database.js';
import { v7 as uuidv7 } from 'uuid';
import * as yup from 'yup';
import crypto from 'node:crypto';

export const addFeedSchema = yup.object({
  name: yup.string().required(),
});

export const addFeed = async (req, res) => {
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

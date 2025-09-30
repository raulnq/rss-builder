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

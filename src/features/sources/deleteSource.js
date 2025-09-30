import db from '../../config/database.js';

export const deleteSource = async (req, res) => {
  await db('sources').where('sourceId', req.source.sourceId).del();
  res.status(204).send();
};

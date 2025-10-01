import db from '../../config/database.js';

export const deleteSourceEntries = async (req, res) => {
  await db('entries').where('sourceId', req.source.sourceId).del();
  res.status(204).send();
};

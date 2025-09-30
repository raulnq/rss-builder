import db from '../../config/database.js';

export const listSources = async (req, res) => {
  const { feedId } = req.params;
  const items = await db('sources').select('*').where('feedId', feedId);
  res.json(items);
};

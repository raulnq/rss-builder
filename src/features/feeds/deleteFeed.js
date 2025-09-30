import db from '../../config/database.js';

export const deleteFeed = async (req, res) => {
  await db('feeds').where('feedId', req.feed.feedId).del();
  res.status(204).send();
};

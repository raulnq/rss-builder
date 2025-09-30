import express from 'express';
import { addFeed, addFeedSchema } from './addFeed.js';
import { findFeed, ensureFeedFound } from './findFeed.js';
import { deleteFeed } from './deleteFeed.js';
import { listFeeds, listFeedsSchema } from './listFeeds.js';
import { paginationParam } from '../../middlewares/paginationParam.js';
import { schemaValidator } from '../../middlewares/schemaValidator.js';
const router = express.Router();

router.param('feedId', ensureFeedFound);
router
  .post('/', schemaValidator({ body: addFeedSchema }), addFeed)
  .get('/:feedId', findFeed)
  .delete('/:feedId', deleteFeed)
  .get(
    '/',
    schemaValidator({ query: listFeedsSchema }),
    paginationParam,
    listFeeds
  );

export default router;

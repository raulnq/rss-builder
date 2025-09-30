import express from 'express';
import { addSource, addSourceSchema } from './addSource.js';
import {
  ensureSourceFound,
  ensureFeedFound,
  findSource,
} from './findSource.js';
import { deleteSource } from './deleteSource.js';
import { listSources } from './listSources.js';
import { schemaValidator } from '../../middlewares/schemaValidator.js';

const router = express.Router({ mergeParams: true });

router.param('sourceId', ensureSourceFound);
router.param('feedId', ensureFeedFound);

router
  .post(
    '/:feedId/sources',
    schemaValidator({ body: addSourceSchema }),
    addSource
  )
  .get('/:feedId/sources/:sourceId', findSource)
  .delete('/:feedId/sources/:sourceId', deleteSource)
  .get('/:feedId/sources', listSources);

export default router;

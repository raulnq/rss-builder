import express from 'express';
import { addSource, addSourceSchema } from './addSource.js';
import {
  ensureSourceFound,
  ensureFeedFound,
  findSource,
} from './findSource.js';
import { deleteSource } from './deleteSource.js';
import { deleteSourceEntries } from './deleteSourceEntries.js';
import { listSources } from './listSources.js';
import { listEntries } from './listEntries.js';
import { schemaValidator } from '../../middlewares/schemaValidator.js';
import { paginationParam } from '../../middlewares/paginationParam.js';
import { ClerkAuth } from '../../middlewares/securityHandler.js';

const router = express.Router({ mergeParams: true });

router.param('sourceId', ensureSourceFound);
router.param('feedId', ensureFeedFound);

router
  .post(
    '/:feedId/sources',
    ClerkAuth,
    schemaValidator({ body: addSourceSchema }),
    addSource
  )
  .get('/:feedId/sources/:sourceId', ClerkAuth, findSource)
  .delete('/:feedId/sources/:sourceId', ClerkAuth, deleteSource)
  .get(
    '/:feedId/sources/:sourceId/entries',
    ClerkAuth,
    paginationParam,
    listEntries
  )
  .delete('/:feedId/sources/:sourceId/entries', ClerkAuth, deleteSourceEntries)
  .get('/:feedId/sources', ClerkAuth, paginationParam, listSources);

export default router;

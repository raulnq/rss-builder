import express from 'express';
import { addFeed, addFeedSchema } from './addFeed.js';
import { findFeed, ensureFeedFound } from './findFeed.js';
import { deleteFeed } from './deleteFeed.js';
import { listFeeds, listFeedsSchema } from './listFeeds.js';
import { paginationParam } from '../../middlewares/paginationParam.js';
import { schemaValidator } from '../../middlewares/schemaValidator.js';
import { buildFeed } from './buildFeed.js';
import { ApiKeyAuth, ClerkAuth } from '../../middlewares/securityHandler.js';
const router = express.Router();

router.param('feedId', ensureFeedFound);
router
  .post('/', ClerkAuth, schemaValidator({ body: addFeedSchema }), addFeed)
  .get('/:feedId', ClerkAuth, findFeed)
  .delete('/:feedId', ClerkAuth, deleteFeed)
  .get('/:feedId/rss', ApiKeyAuth, (req, res) => {
    /*
    #swagger.tags = ['Feeds']
    #swagger.summary = 'Get RSS 2.0 feed'
    #swagger.description = 'Returns the aggregated RSS 2.0 feed for a feedId. Optionally filter entries by URL content.'
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.parameters['feedId'] = { in: 'path', required: true, schema: { type: 'string' }, description: 'Feed unique identifier' }
    #swagger.parameters['filter'] = { in: 'query', required: false, schema: { type: 'string' }, description: 'Optional filter to include only entries whose URL contains this value' }
    #swagger.responses[200] = {
      description: 'RSS feed XML',
      content: {
        'application/rss+xml': {
          schema: { $ref: '#/components/@xml/rss' },
          example: `<rss version="2.0">\n  <channel>\n    <title>Example Feed</title>\n    <link>https://example.com</link>\n    <description>Aggregated entries</description>\n    <lastBuildDate>Tue, 08 Oct 2025 12:00:00 GMT</lastBuildDate>\n    <item>\n      <title>Sample item</title>\n      <link>https://example.com/post/1</link>\n      <guid>uuid-1</guid>\n      <pubDate>Tue, 08 Oct 2025 11:30:00 GMT</pubDate>\n      <description>Entry summary</description>\n    </item>\n  </channel>\n</rss>`
        }
      }
    }
    */
    buildFeed(req, res, 'rss');
  })
  .get('/:feedId/atom', ApiKeyAuth, (req, res) => {
    /*
    #swagger.tags = ['Feeds']
    #swagger.summary = 'Get Atom 1.0 feed'
    #swagger.description = 'Returns the aggregated Atom 1.0 feed for a feedId. Optionally filter entries by URL content.'
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.parameters['feedId'] = { in: 'path', required: true, schema: { type: 'string' }, description: 'Feed unique identifier' }
    #swagger.parameters['filter'] = { in: 'query', required: false, schema: { type: 'string' }, description: 'Optional filter to include only entries whose URL contains this value' }
    #swagger.responses[200] = {
      description: 'Atom feed XML',
      content: {
        'application/atom+xml': {
          schema: { $ref: '#/components/@xml/atom' },
          example: `<feed xmlns="http://www.w3.org/2005/Atom">\n  <title>Example Feed</title>\n  <id>tag:example.com,2025:feed:123</id>\n  <updated>2025-10-08T12:00:00Z</updated>\n  <link href="https://example.com" rel="alternate"/>\n  <entry>\n    <title>Sample item</title>\n    <id>tag:example.com,2025:post:1</id>\n    <updated>2025-10-08T11:30:00Z</updated>\n    <summary>Entry summary</summary>\n    <author><name>Author Name</name></author>\n  </entry>\n</feed>`
        }
      }
    }
    */
    buildFeed(req, res, 'atom');
  })
  .get(
    '/',
    ClerkAuth,
    schemaValidator({ query: listFeedsSchema }),
    paginationParam,
    listFeeds
  );

export default router;

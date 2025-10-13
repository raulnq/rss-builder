import db from '../../config/database.js';
import { Feed } from 'feed';

export const buildFeed = async (req, res, format) => {
  const { feedId } = req.params;
  const { filter } = req.query;
  const feed = req.feed;

  let query = db('entries')
    .join('sources', 'entries.sourceId', 'sources.sourceId')
    .where('sources.feedId', feedId)
    .select(
      'entries.entryId',
      'entries.name',
      'entries.url',
      'entries.publishedAt',
      'entries.publisherId',
      'entries.author',
      'sources.name as sourceName'
    );

  if (filter) {
    query = query.where('entries.url', 'like', `%${filter}%`);
  }

  const entries = await query.orderBy('entries.publishedAt', 'desc').limit(100);

  const protocol =
    req.get('x-forwarded-proto') ||
    req.get('x-forwarded-protocol') ||
    req.protocol ||
    'http';

  const host = req.get('x-forwarded-host') || req.get('host') || 'localhost';

  const baseUrl = `${protocol}://${host}`;

  const rssFeed = new Feed({
    title: feed.name,
    description: `RSS Feed aggregation for ${feed.name}`,
    id: `${baseUrl}/api/feeds/${feedId}`,
    link: `${baseUrl}/api/feeds/${feedId}`,
    updated: new Date(),
    generator: 'RSS Builder',
    feedLinks: {
      rss2: `${baseUrl}/api/feeds/${feedId}/rss`,
      atom: `${baseUrl}/api/feeds/${feedId}/atom`,
    },
  });
  entries.forEach(entry => {
    rssFeed.addItem({
      title: entry.name,
      id: entry.url,
      link: entry.url,
      description: `From source: ${entry.sourceName}`,
      author: [{ name: entry.author }],
      published: entry.publishedAt,
      date: entry.publishedAt,
      guid: entry.entryId,
    });
  });

  if (format.toLowerCase() === 'atom') {
    res.set({
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    });
    res.send(rssFeed.atom1());
  } else {
    res.set({
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    });
    res.send(rssFeed.rss2());
  }
};

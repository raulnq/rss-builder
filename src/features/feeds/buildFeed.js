import db from '../../config/database.js';
import { Feed } from 'feed';

export const buildFeed = async (req, res, format) => {
  const { feedId } = req.params;
  const feed = req.feed;

  const entries = await db('entries')
    .join('sources', 'entries.sourceId', 'sources.sourceId')
    .where('sources.feedId', feedId)
    .select(
      'entries.entryId',
      'entries.name',
      'entries.url',
      'entries.publishedAt',
      'entries.publisherId',
      'sources.name as sourceName'
    )
    .orderBy('entries.publishedAt', 'desc')
    .limit(100);

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const rssFeed = new Feed({
    title: feed.name,
    description: `RSS Feed aggregation for ${feed.name}`,
    id: feedId,
    link: `${baseUrl}/api/feeds/${feedId}/${format}`,
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
      id: entry.entryId,
      link: entry.url,
      description: `From source: ${entry.sourceName}`,
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

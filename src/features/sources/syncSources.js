import db from '../../config/database.js';
import { v7 as uuidv7 } from 'uuid';
import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  maxRedirects: 5,
});

const addEntries = async (sourceId, entries) => {
  return db.transaction(async trx => {
    const existingEntries = await trx('entries')
      .select('publisherId')
      .where('sourceId', sourceId);
    const existingPublisherIds = existingEntries.map(
      entry => entry.publisherId
    );
    const newEntries = entries.filter(entry => {
      return !existingPublisherIds.includes(entry.publisherId);
    });
    console.log(`Source ${sourceId} has ${newEntries.length} new entries`);
    if (newEntries.length > 0) {
      await trx('entries').insert(newEntries);
    }
    await trx('sources')
      .where('sourceId', sourceId)
      .update({ syncedAt: new Date() });
  });
};

const syncSource = async source => {
  try {
    console.log(`Syncing source ${source.sourceId}`);
    if (!source.url) {
      throw new Error('Source URL is missing');
    }
    const channelFeed = await parser.parseURL(source.url);
    if (!channelFeed.items || channelFeed.items.length === 0) {
      console.log(`No items found in feed for source ${source.sourceId}`);
      return { success: true };
    }
    const entries = channelFeed.items.map(item => ({
      entryId: uuidv7(),
      name: item.title,
      url: item.link,
      publisherId: item.id,
      publishedAt: new Date(item.isoDate),
      author: item.creator || item.author || null,
      sourceId: source.sourceId,
    }));
    await addEntries(source.sourceId, entries);
    console.log(
      `Successfully synced ${entries.length} entries for source ${source.sourceId}`
    );
    return { success: true };
  } catch (error) {
    console.error(`Error syncing source ${source.sourceId}:`, error);
    return { success: false };
  }
};

export const syncSources = async () => {
  const sources = await db('sources').select('*');
  console.log(`Found ${sources.length} sources to process`);
  if (!sources || sources.length === 0) {
    return;
  }
  let successCount = 0;
  let errorCount = 0;
  for (const source of sources) {
    const result = await syncSource(source);
    if (result.success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
  console.log(`Results: ${successCount} successful, ${errorCount} failed`);
};

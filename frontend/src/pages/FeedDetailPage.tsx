import { useLoaderData, Form, useNavigation, Link } from 'react-router';
import type { Feed, Source } from '../types';

export default function FeedDetailPage() {
  const { feed, sources } = useLoaderData<{
    feed: Feed;
    sources: Source[];
  }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div>
      <Link
        to="/feeds"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        Back to Feeds
      </Link>

      <h2 className="text-2xl font-bold mb-2">{feed.name}</h2>
      <p className="text-gray-500 mb-6">
        Created: {new Date(feed.createdAt).toLocaleDateString()}
      </p>

      {/* Feed URLs */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-medium mb-2">Feed URLs</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-gray-500">RSS:</span>{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">
              {apiUrl}/api/feeds/{feed.feedId}/rss
            </code>
          </p>
          <p>
            <span className="text-gray-500">Atom:</span>{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">
              {apiUrl}/api/feeds/{feed.feedId}/atom
            </code>
          </p>
        </div>
      </div>

      {/* Add Source Form */}
      <h3 className="text-xl font-bold mb-4">Sources</h3>
      <Form method="post" className="flex gap-4 mb-6">
        <input type="hidden" name="intent" value="addSource" />
        <input
          type="text"
          name="name"
          placeholder="Source name"
          required
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <input
          type="url"
          name="url"
          placeholder="RSS feed URL"
          required
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Add Source
        </button>
      </Form>

      {/* Source List */}
      <div className="space-y-4">
        {sources.length === 0 ? (
          <p className="text-gray-500">No sources yet. Add one above!</p>
        ) : (
          sources.map(source => (
            <div
              key={source.sourceId}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <Link
                  to={`/feeds/${feed.feedId}/sources/${source.sourceId}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {source.name}
                </Link>
                <p className="text-sm text-gray-500 truncate max-w-md">
                  {source.url}
                </p>
                {source.syncedAt && (
                  <p className="text-xs text-gray-400">
                    Last synced: {new Date(source.syncedAt).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <Link
                  to={`/feeds/${feed.feedId}/sources/${source.sourceId}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Entries
                </Link>
                <Form method="post">
                  <input type="hidden" name="intent" value="deleteSource" />
                  <input
                    type="hidden"
                    name="sourceId"
                    value={source.sourceId}
                  />
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-800"
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

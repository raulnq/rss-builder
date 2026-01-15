import type { Feed } from '../../types';

const apiUrl = import.meta.env.VITE_API_URL;

export type FeedViewProps = {
  feed: Feed;
};

export default function FeedView({ feed }: FeedViewProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{feed.name}</h2>
      <p className="text-gray-500 mb-6">
        Created: {new Date(feed.createdAt).toLocaleDateString()}
      </p>
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
    </>
  );
}

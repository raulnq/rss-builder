import { useLoaderData, Link } from 'react-router';
import type { Feed, PaginatedResponse } from '../types';

export default function Dashboard() {
  const { feeds } = useLoaderData<{ feeds: PaginatedResponse<Feed> }>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Feeds</h3>
          <p className="text-3xl font-bold mt-2">{feeds.totalItems}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Recent Feeds</h3>
      <div className="bg-white rounded-lg shadow">
        {feeds.items.slice(0, 5).map(feed => (
          <Link
            key={feed.feedId}
            to={`/feeds/${feed.feedId}`}
            className="block p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            <p className="font-medium">{feed.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(feed.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

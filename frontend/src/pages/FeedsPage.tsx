import { useLoaderData, Form, useNavigation, Link } from 'react-router';
import type { Feed, PaginatedResponse } from '../types';

export default function FeedsPage() {
  const { feeds } = useLoaderData<{ feeds: PaginatedResponse<Feed> }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Feeds</h2>

      {/* Create Feed Form */}
      <Form method="post" className="flex gap-4 mb-6">
        <input type="hidden" name="intent" value="create" />
        <input
          type="text"
          name="name"
          placeholder="Feed name"
          required
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Feed'}
        </button>
      </Form>

      {/* Feed List */}
      <div className="space-y-4">
        {feeds.items.map(feed => (
          <div
            key={feed.feedId}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <Link
                to={`/feeds/${feed.feedId}`}
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {feed.name}
              </Link>
              <p className="text-sm text-gray-500">
                Created: {new Date(feed.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Form method="post">
              <input type="hidden" name="intent" value="delete" />
              <input type="hidden" name="feedId" value={feed.feedId} />
              <button
                type="submit"
                className="text-red-600 hover:text-red-800"
                disabled={isSubmitting}
              >
                Delete
              </button>
            </Form>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {feeds.totalItems > 10 && (
        <div className="mt-6 flex justify-center gap-2">
          <span className="text-gray-600">
            Page {feeds.pageNumber} of{' '}
            {Math.ceil(feeds.totalItems / feeds.pageSize)}
          </span>
        </div>
      )}
    </div>
  );
}

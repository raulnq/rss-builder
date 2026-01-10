import { useState, useEffect } from 'react';
import {
  useLoaderData,
  useActionData,
  Form,
  useNavigation,
  Link,
} from 'react-router';
import { toast } from 'react-toastify';
import type { Feed, PaginatedResponse } from '../types';
import type { ProblemDocument } from '../apiClient';

export default function FeedsPage() {
  const { feeds, error } = useLoaderData<{
    feeds: PaginatedResponse<Feed> | null;
    error: ProblemDocument | null;
  }>();
  const actionData = useActionData<{
    error?: ProblemDocument;
    success?: string;
  }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [feedToDelete, setFeedToDelete] = useState<Feed | null>(null);

  useEffect(() => {
    if (error) {
      toast.error(error.detail || error.title);
    }
  }, [error]);

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error.detail || actionData.error.title);
    }
    if (actionData?.success) {
      toast.success(actionData.success);
    }
  }, [actionData]);

  if (!feeds) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Feeds</h2>
        <p className="text-gray-500">
          Unable to load feeds. Please try again later.
        </p>
      </div>
    );
  }

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
            <button
              type="button"
              onClick={() => setFeedToDelete(feed)}
              className="text-red-600 hover:text-red-800"
              disabled={isSubmitting}
            >
              Delete
            </button>
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

      {/* Delete Confirmation Modal */}
      {feedToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Feed</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{feedToDelete.name}"? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFeedToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <Form method="post" onSubmit={() => setFeedToDelete(null)}>
                <input type="hidden" name="intent" value="delete" />
                <input
                  type="hidden"
                  name="feedId"
                  value={feedToDelete.feedId}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

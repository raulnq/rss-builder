import { useEffect } from 'react';
import { useLoaderData, Link, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import type { Source, Entry, PaginatedResponse } from '../types';
import type { ProblemDocument } from '../apiClient';

export default function SourceDetailPage() {
  const { source, entries, error } = useLoaderData<{
    source: Source | null;
    entries: PaginatedResponse<Entry> | null;
    error: ProblemDocument | null;
  }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.detail || error.title);
    }
  }, [error]);

  if (!source) {
    return (
      <div>
        <Link
          to="/feeds"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Feeds
        </Link>
        <h2 className="text-2xl font-bold mb-6">Source</h2>
        <p className="text-gray-500">
          Unable to load source. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link
        to={`/feeds/${source.feedId}`}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Feed
      </Link>

      <h2 className="text-2xl font-bold mb-2">{source.name}</h2>
      <p className="text-sm text-gray-500 mb-2 truncate">{source.url}</p>
      {source.syncedAt && (
        <p className="text-xs text-gray-400 mb-6">
          Last synced: {new Date(source.syncedAt).toLocaleString()}
        </p>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          Entries {entries ? `(${entries.totalItems})` : ''}
        </h3>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {!entries ? (
          <p className="text-gray-500">Unable to load entries.</p>
        ) : entries.items.length === 0 ? (
          <p className="text-gray-500">
            No entries yet. Run the scheduler to sync.
          </p>
        ) : (
          entries.items.map(entry => (
            <div key={entry.entryId} className="bg-white p-4 rounded-lg shadow">
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                {entry.name}
              </a>
              <div className="flex gap-4 mt-1 text-sm text-gray-500">
                {entry.author && <span>By {entry.author}</span>}
                <span>{new Date(entry.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {entries && entries.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {entries.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= entries.totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

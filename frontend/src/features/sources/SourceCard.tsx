import type { Source } from '../../types';
import { Link } from 'react-router';

export type SourceCardProps = {
  source: Source;
  isSubmitting: boolean;
  onDelete: (source: Source) => void;
};

export default function SourceCard({
  source,
  isSubmitting,
  onDelete,
}: SourceCardProps) {
  return (
    <div
      key={source.sourceId}
      className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
    >
      <div>
        <Link
          to={`/feeds/${source.feedId}/sources/${source.sourceId}`}
          className="font-medium text-blue-600 hover:underline"
        >
          {source.name}
        </Link>
        <p className="text-sm text-gray-500 truncate max-w-md">{source.url}</p>
        {source.syncedAt && (
          <p className="text-xs text-gray-400">
            Last synced: {new Date(source.syncedAt).toLocaleString()}
          </p>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <Link
          to={`/feeds/${source.feedId}/sources/${source.sourceId}`}
          className="text-blue-600 hover:text-blue-800"
        >
          View Entries
        </Link>
        <button
          type="button"
          onClick={() => onDelete(source)}
          className="text-red-600 hover:text-red-800"
          disabled={isSubmitting}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

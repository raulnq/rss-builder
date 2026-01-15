import type { Feed } from '../../types';
import { Link } from 'react-router';

export type FeedCardProps = {
  feed: Feed;
  isSubmitting: boolean;
  onDelete: (feed: Feed) => void;
};

export default function FeedCard({
  feed,
  isSubmitting,
  onDelete,
}: FeedCardProps) {
  return (
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
        onClick={() => onDelete(feed)}
        className="text-red-600 hover:text-red-800"
        disabled={isSubmitting}
      >
        Delete
      </button>
    </div>
  );
}

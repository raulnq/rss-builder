import FeedCard from './FeedCard';
import type { Feed, PaginatedResponse } from '../../types';
import PaginationBar from '../../components/PaginationBar';
import { useState } from 'react';
import { Form, useSearchParams } from 'react-router';
import ConfirmationDialog from '../../components/ConfirmationDialog';

export type FeedCardListProps = {
  feeds: PaginatedResponse<Feed>;
  isSubmitting: boolean;
};

export default function FeedCardList({
  feeds,
  isSubmitting,
}: FeedCardListProps) {
  const [feedToDelete, setFeedToDelete] = useState<Feed | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  return (
    <>
      <div className="space-y-4">
        {feeds.items.map(feed => (
          <FeedCard
            key={feed.feedId}
            feed={feed}
            isSubmitting={isSubmitting}
            onDelete={() => setFeedToDelete(feed)}
          />
        ))}
      </div>
      <PaginationBar
        currentPage={currentPage}
        totalPages={feeds.totalPages}
        onPageChange={handlePageChange}
      />
      {feedToDelete && (
        <ConfirmationDialog
          title="Delete Feed"
          message={`Are you sure you want to delete "${feedToDelete.name}"?`}
          onCancel={() => {
            setFeedToDelete(null);
          }}
        >
          <Form method="post" onSubmit={() => setFeedToDelete(null)}>
            <input type="hidden" name="intent" value="delete" />
            <input type="hidden" name="feedId" value={feedToDelete.feedId} />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </button>
          </Form>
        </ConfirmationDialog>
      )}
    </>
  );
}

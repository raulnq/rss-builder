import { useState } from 'react';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import PaginationBar from '../../components/PaginationBar';
import type { Source, PaginatedResponse } from '../../types';
import SourceCard from './SourceCard';
import { Form, useSearchParams } from 'react-router';

export type SourceCardListProps = {
  sources: PaginatedResponse<Source> | null;
  isSubmitting: boolean;
};

export default function SourceCardList({
  sources,
  isSubmitting,
}: SourceCardListProps) {
  const [sourceToDelete, setSourceToDelete] = useState<Source | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page: String(page) }));
  };

  return (
    <>
      <div className="space-y-4">
        {sources?.items.map(source => (
          <SourceCard
            key={source.sourceId}
            source={source}
            isSubmitting={isSubmitting}
            onDelete={() => setSourceToDelete(source)}
          />
        ))}
      </div>
      {sources && sources.totalPages > 1 && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={sources.totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {sourceToDelete && (
        <ConfirmationDialog
          title="Delete Source"
          message={`Are you sure you want to delete "${sourceToDelete.name}"?`}
          onCancel={() => {
            setSourceToDelete(null);
          }}
        >
          <Form method="post" onSubmit={() => setSourceToDelete(null)}>
            <input type="hidden" name="intent" value="deleteSource" />
            <input
              type="hidden"
              name="sourceId"
              value={sourceToDelete.sourceId}
            />
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

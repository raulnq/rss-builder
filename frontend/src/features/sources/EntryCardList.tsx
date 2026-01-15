import { useSearchParams } from 'react-router';
import PaginationBar from '../../components/PaginationBar';
import type { Entry, PaginatedResponse } from '../../types';
import EntryCard from './EntryCard';

export type EntryCardListProps = {
  entries: PaginatedResponse<Entry> | null;
};

export default function EntryCardList({ entries }: EntryCardListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };
  return (
    <>
      <div className="space-y-3">
        {!entries ? (
          <p className="text-gray-500">Unable to load entries.</p>
        ) : entries.items.length === 0 ? (
          <p className="text-gray-500">
            No entries yet. Run the scheduler to sync.
          </p>
        ) : (
          entries.items.map(entry => (
            <EntryCard key={entry.entryId} entry={entry} />
          ))
        )}
      </div>
      {entries && entries.totalPages > 1 && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={entries.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

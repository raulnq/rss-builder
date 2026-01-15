import { useEffect } from 'react';
import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';
import type { Source, Entry, PaginatedResponse } from '../../types';
import type { ProblemDocument } from '../../apiClient';
import BackToButton from '../../components/BackToButton';
import EntryCardList from './EntryCardList';
import ListTitle from '../../components/ListTitle';
import UnableToLoadView from '../../components/UnableToLoadView';
import SourceView from './SourceView';

export default function SourceDetailPage() {
  const { source, entries, error } = useLoaderData<{
    source: Source | null;
    entries: PaginatedResponse<Entry> | null;
    error: ProblemDocument | null;
  }>();

  useEffect(() => {
    if (error) {
      toast.error(error.detail || error.title);
    }
  }, [error]);

  if (!source) {
    return (
      <div>
        <BackToButton text="Back to Feeds" url="/feeds" />
        <UnableToLoadView title="Source" />
      </div>
    );
  }

  return (
    <div>
      <BackToButton text="Back to Feed" url={`/feeds/${source.feedId}`} />

      <SourceView source={source} />

      <ListTitle response={entries} type="Entries" />

      <EntryCardList entries={entries} />
    </div>
  );
}

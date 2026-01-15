import { useEffect } from 'react';
import { useLoaderData, useActionData, useNavigation } from 'react-router';
import { toast } from 'react-toastify';
import type { Feed, Source, PaginatedResponse } from '../../types';
import type { ProblemDocument } from '../../apiClient';
import AddSourceForm from '../sources/AddSourceForm';
import SourceCardList from '../sources/SourceCardList';
import FeedView from './FeedView';
import BackToButton from '../../components/BackToButton';
import ListTitle from '../../components/ListTitle';
import UnableToLoadView from '../../components/UnableToLoadView';

export default function FeedDetailPage() {
  const { feed, sources, error } = useLoaderData<{
    feed: Feed | null;
    sources: PaginatedResponse<Source> | null;
    error: ProblemDocument | null;
  }>();

  const actionData = useActionData<{
    error?: ProblemDocument;
    success?: string;
  }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

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

  if (!feed) {
    return (
      <div>
        <BackToButton text="Back to Feeds" url="/feeds" />
        <UnableToLoadView title="Feed" />
      </div>
    );
  }

  return (
    <div>
      <BackToButton text="Back to Feeds" url="/feeds" />

      <FeedView feed={feed} />

      <ListTitle response={sources} type="Sources" />

      <AddSourceForm isSubmitting={isSubmitting} />

      <SourceCardList sources={sources} isSubmitting={isSubmitting} />
    </div>
  );
}

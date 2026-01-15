import { useEffect } from 'react';
import { useLoaderData, useActionData, useNavigation } from 'react-router';
import { toast } from 'react-toastify';
import type { Feed, PaginatedResponse } from '../../types';
import type { ProblemDocument } from '../../apiClient';
import AddFeedForm from './AddFeedForm';
import FeedCardList from './FeedCardList';
import UnableToLoadView from '../../components/UnableToLoadView';

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
        <UnableToLoadView title="Feeds" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Feeds</h2>

      <AddFeedForm isSubmitting={isSubmitting} />

      <FeedCardList feeds={feeds} isSubmitting={isSubmitting} />
    </div>
  );
}

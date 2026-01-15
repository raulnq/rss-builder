import { createBrowserRouter, redirect } from 'react-router';
import { api, getAuthToken } from './apiClient';

// Layouts
import RootLayout from './components/layout/RootLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';

// Pages
import Dashboard from './pages/Dashboard';
import FeedsPage from './features/feeds/FeedsPage';
import FeedDetailPage from './features/feeds/FeedDetailPage';
import SourceDetailPage from './features/sources/SourceDetailPage';
import SignInPage from './pages/SignInPage';
import ErrorPage from './pages/ErrorPage';

// Types
import type { Feed, Source, Entry, PaginatedResponse } from './types';

// Auth helper for loaders - redirects to sign-in if not authenticated
async function requireAuth() {
  const token = await getAuthToken();
  if (!token) {
    throw redirect('/sign-in');
  }
  return token;
}

export function createRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'sign-in/*',
          element: <SignInPage />,
        },
        {
          element: <ProtectedLayout />,
          loader: requireAuth,
          children: [
            {
              index: true,
              element: <Dashboard />,
              loader: async () => {
                const result = await api.get<PaginatedResponse<Feed>>(
                  '/api/feeds?pageNumber=1&pageSize=10'
                );
                if (!result.ok) {
                  return { feeds: null, error: result.error };
                }
                return { feeds: result.data, error: null };
              },
            },
            {
              path: 'feeds',
              element: <FeedsPage />,
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const page = url.searchParams.get('page') || '1';
                const result = await api.get<PaginatedResponse<Feed>>(
                  `/api/feeds?pageNumber=${page}&pageSize=10`
                );
                if (!result.ok) {
                  return { feeds: null, error: result.error };
                }
                return { feeds: result.data, error: null };
              },
              action: async ({ request }) => {
                const formData = await request.formData();
                const intent = formData.get('intent');

                if (intent === 'create') {
                  const name = formData.get('name') as string;
                  const result = await api.post('/api/feeds', { name });
                  if (!result.ok) {
                    return { error: result.error };
                  }
                  return { success: 'Feed created successfully' };
                }

                if (intent === 'delete') {
                  const feedId = formData.get('feedId') as string;
                  const result = await api.delete(`/api/feeds/${feedId}`);
                  if (!result.ok) {
                    return { error: result.error };
                  }
                  return { success: 'Feed deleted successfully' };
                }

                return null;
              },
            },
            {
              path: 'feeds/:feedId',
              element: <FeedDetailPage />,
              loader: async ({ params, request }) => {
                const url = new URL(request.url);
                const page = url.searchParams.get('page') || '1';
                const [feedResult, sourcesResult] = await Promise.all([
                  api.get<Feed>(`/api/feeds/${params.feedId}`),
                  api.get<PaginatedResponse<Source>>(
                    `/api/feeds/${params.feedId}/sources?pageNumber=${page}&pageSize=10`
                  ),
                ]);
                if (!feedResult.ok) {
                  return { feed: null, sources: null, error: feedResult.error };
                }
                if (!sourcesResult.ok) {
                  return {
                    feed: feedResult.data,
                    sources: null,
                    error: sourcesResult.error,
                  };
                }
                return {
                  feed: feedResult.data,
                  sources: sourcesResult.data,
                  error: null,
                };
              },
              action: async ({ request, params }) => {
                const formData = await request.formData();
                const intent = formData.get('intent');

                if (intent === 'addSource') {
                  const name = formData.get('name') as string;
                  const url = formData.get('url') as string;
                  const result = await api.post(
                    `/api/feeds/${params.feedId}/sources`,
                    { name, url }
                  );
                  if (!result.ok) {
                    return { error: result.error };
                  }
                  return { success: 'Source added successfully' };
                }

                if (intent === 'deleteSource') {
                  const sourceId = formData.get('sourceId') as string;
                  const result = await api.delete(
                    `/api/feeds/${params.feedId}/sources/${sourceId}`
                  );
                  if (!result.ok) {
                    return { error: result.error };
                  }
                  return { success: 'Source deleted successfully' };
                }

                return null;
              },
            },
            {
              path: 'feeds/:feedId/sources/:sourceId',
              element: <SourceDetailPage />,
              loader: async ({ params, request }) => {
                const url = new URL(request.url);
                const page = url.searchParams.get('page') || '1';
                const [sourceResult, entriesResult] = await Promise.all([
                  api.get<Source>(
                    `/api/feeds/${params.feedId}/sources/${params.sourceId}`
                  ),
                  api.get<PaginatedResponse<Entry>>(
                    `/api/feeds/${params.feedId}/sources/${params.sourceId}/entries?pageNumber=${page}&pageSize=10`
                  ),
                ]);
                if (!sourceResult.ok) {
                  return {
                    source: null,
                    entries: null,
                    error: sourceResult.error,
                  };
                }
                if (!entriesResult.ok) {
                  return {
                    source: sourceResult.data,
                    entries: null,
                    error: entriesResult.error,
                  };
                }
                return {
                  source: sourceResult.data,
                  entries: entriesResult.data,
                  error: null,
                };
              },
            },
          ],
        },
      ],
    },
  ]);
}

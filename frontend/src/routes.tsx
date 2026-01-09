import { createBrowserRouter, redirect } from 'react-router';
import { api } from './apiClient';

// Layouts
import RootLayout from './components/layout/RootLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';

// Pages
import Dashboard from './pages/Dashboard';
import FeedsPage from './pages/FeedsPage';
import FeedDetailPage from './pages/FeedDetailPage';
import SourceDetailPage from './pages/SourceDetailPage';
import SignInPage from './pages/SignInPage';
import ErrorPage from './pages/ErrorPage';

// Types
import type { Feed, Source, Entry, PaginatedResponse } from './types';

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
          children: [
            {
              index: true,
              element: <Dashboard />,
              loader: async () => {
                const feeds = await api.get<PaginatedResponse<Feed>>(
                  '/api/feeds?pageNumber=1&pageSize=10'
                );
                return { feeds };
              },
            },
            {
              path: 'feeds',
              element: <FeedsPage />,
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const page = url.searchParams.get('page') || '1';
                const feeds = await api.get<PaginatedResponse<Feed>>(
                  `/api/feeds?pageNumber=${page}&pageSize=10`
                );
                return { feeds };
              },
              action: async ({ request }) => {
                const formData = await request.formData();
                const intent = formData.get('intent');

                if (intent === 'create') {
                  const name = formData.get('name') as string;
                  await api.post('/api/feeds', { name });
                  return redirect('/feeds');
                }

                if (intent === 'delete') {
                  const feedId = formData.get('feedId') as string;
                  await api.delete(`/api/feeds/${feedId}`);
                  return redirect('/feeds');
                }

                return null;
              },
            },
            {
              path: 'feeds/:feedId',
              element: <FeedDetailPage />,
              loader: async ({ params }) => {
                const [feed, sources] = await Promise.all([
                  api.get<Feed>(`/api/feeds/${params.feedId}`),
                  api.get<Source[]>(`/api/feeds/${params.feedId}/sources`),
                ]);
                return { feed, sources };
              },
              action: async ({ request, params }) => {
                const formData = await request.formData();
                const intent = formData.get('intent');

                if (intent === 'addSource') {
                  const name = formData.get('name') as string;
                  const url = formData.get('url') as string;
                  await api.post(`/api/feeds/${params.feedId}/sources`, {
                    name,
                    url,
                  });
                  return redirect(`/feeds/${params.feedId}`);
                }

                if (intent === 'deleteSource') {
                  const sourceId = formData.get('sourceId') as string;
                  await api.delete(
                    `/api/feeds/${params.feedId}/sources/${sourceId}`
                  );
                  return redirect(`/feeds/${params.feedId}`);
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
                const [source, entries] = await Promise.all([
                  api.get<Source>(
                    `/api/feeds/${params.feedId}/sources/${params.sourceId}`
                  ),
                  api.get<PaginatedResponse<Entry>>(
                    `/api/feeds/${params.feedId}/sources/${params.sourceId}/entries?pageNumber=${page}&pageSize=10`
                  ),
                ]);
                return { source, entries };
              },
            },
          ],
        },
      ],
    },
  ]);
}

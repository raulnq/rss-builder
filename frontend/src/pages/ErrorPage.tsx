import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  let title = 'Oops!';
  let message = 'Something went wrong.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = '404 - Not Found';
      message = 'The page you are looking for does not exist.';
    } else if (error.status === 401) {
      title = '401 - Unauthorized';
      message = 'You need to sign in to access this page.';
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

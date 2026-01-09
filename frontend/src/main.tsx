import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import { createRouter } from './routes';
import './index.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
}

export function AuthenticatedApp() {
  // Create router lazily AFTER Clerk is loaded
  // useMemo ensures router is only created once
  const router = useMemo(() => {
    console.log(
      'Creating router NOW (Clerk is loaded, window.Clerk is available)'
    );
    return createRouter();
  }, []);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <ClerkLoading>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <AuthenticatedApp />
      </ClerkLoaded>
    </ClerkProvider>
  </React.StrictMode>
);

import { Outlet } from 'react-router';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function ProtectedLayout() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

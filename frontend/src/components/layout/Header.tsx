import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-gray-900">
          rss-builder
        </Link>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}

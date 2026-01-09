import { NavLink } from 'react-router';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/feeds', label: 'Feeds' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-64px)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

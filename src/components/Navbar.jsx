import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold'
      : 'text-gray-600 hover:text-black transition-colors';

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-900">
          Eventora
        </Link>
        <nav className="space-x-6">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

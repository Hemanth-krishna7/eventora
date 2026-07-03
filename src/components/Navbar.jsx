import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="p-4 border-b border-gray-200 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Eventora</Link>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
        <Link to="/events" className="text-gray-600 hover:text-black">Events</Link>
      </nav>
    </header>
  );
}

export default Navbar;

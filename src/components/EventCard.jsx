import { Link } from 'react-router-dom';
import fallbackImage from '../assets/hero.jpg';
import { formatPrice } from '../utils/format';

function EventCard({ event }) {
  const { id, title, category, date, venue, price, image } = event;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="h-48 w-full overflow-hidden bg-gray-200">
        <img
          src={image || fallbackImage}
          alt={title}
          onError={(e) => {
            if (e.target.src !== fallbackImage) {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }
          }}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 block">
            {category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {title}
          </h3>
          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p>
              <span className="font-medium">Date:</span> {date}
            </p>
            <p>
              <span className="font-medium">Venue:</span> {venue}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          <Link
            to={`/events/${id}`}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-block text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;

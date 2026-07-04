import { useParams, Link } from 'react-router-dom';
import fallbackImage from '../assets/hero.png';
import { formatPrice } from '../utils/format';
import eventsData from '../data/events.json';
import EventCard from '../components/EventCard';

function EventDetails() {
  const { id } = useParams();

  // Find the event matching the ID
  const event = eventsData.find((e) => e.id === id);

  // If the event does not exist, show a clean fallback UI
  if (!event) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-6">
            The event you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/events"
            className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition w-full"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    category,
    date,
    time,
    venue,
    city,
    price,
    image,
    fullDescription,
  } = event;

  // Find related events: same category, excluding current event, up to 3
  const relatedEvents = eventsData
    .filter((e) => e.category === category && e.id !== id)
    .slice(0, 3);

  // Fallback image in case it's missing or empty
  const displayImage = image || fallbackImage;

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Details Panel */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column: Image */}
            <div className="w-full h-64 sm:h-96 lg:h-[450px] rounded-xl overflow-hidden bg-gray-200">
              <img
                src={displayImage}
                alt={title || 'Event image'}
                onError={(e) => {
                  if (e.target.src !== fallbackImage) {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Column: Information */}
            <div className="flex flex-col justify-between text-left">
              <div>
                {/* Category Badge */}
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {category}
                </span>

                {/* Event Title */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {title}
                </h1>

                {/* Quick Information Card */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Quick Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold text-gray-900 block">Date</span>
                      <span>{date}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">Time</span>
                      <span>{time}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">Venue</span>
                      <span>{venue}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">City</span>
                      <span>{city}</span>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Price</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                  to={`/booking/${id}`}
                  className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition text-center flex-grow"
                >
                  Book Now
                </Link>
                <Link
                  to="/events"
                  className="bg-white border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-50 transition text-center flex-grow"
                >
                  Back to Events
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* About This Event Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 text-left mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {fullDescription}
          </p>
        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="text-left">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Related Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default EventDetails;

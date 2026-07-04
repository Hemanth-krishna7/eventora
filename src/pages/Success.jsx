import { useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';

function Success() {
  const location = useLocation();
  const bookingData = location.state;

  // Graceful fallback for direct url access without navigation state
  if (!bookingData) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4 bg-gray-50">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Booking Found</h1>
          <p className="text-gray-600 mb-6">
            You haven't completed any bookings yet. Please browse our events to make a reservation.
          </p>
          <Link
            to="/events"
            className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition w-full"
          >
            Explore Events
          </Link>
        </div>
      </div>
    );
  }

  const { eventName, ticketsCount, totalAmount, customerName } = bookingData;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 max-w-lg w-full text-center space-y-6">
        
        {/* Success Icon Placeholder */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-gray-500">
            Thank you for booking with Eventora. Your tickets are ready.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-left space-y-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Ticket Details
          </h2>
          
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between items-start gap-4">
              <span className="text-gray-500 min-w-[100px]">Event</span>
              <span className="font-bold text-gray-900 text-right leading-tight">
                {eventName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Tickets</span>
              <span className="font-semibold text-gray-900">
                {ticketsCount} {ticketsCount === 1 ? 'Ticket' : 'Tickets'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Attendee</span>
              <span className="font-semibold text-gray-900">{customerName}</span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-gray-900">
              <span className="font-semibold">Total Paid</span>
              <span className="text-xl font-extrabold text-blue-600">
                {formatPrice(totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link
            to="/events"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition text-center flex-grow text-sm"
          >
            Explore More Events
          </Link>
          <Link
            to="/"
            className="bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-50 transition text-center flex-grow text-sm"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Success;

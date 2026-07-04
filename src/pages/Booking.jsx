import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import eventsData from '../data/events.json';
import fallbackImage from '../assets/hero.jpg';
import { formatPrice } from '../utils/format';

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the event matching the ID
  const event = eventsData.find((e) => e.id === id);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tickets, setTickets] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If the event does not exist, display a clean fallback screen
  if (!event) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-6">
            The event you are trying to book does not exist or has been removed.
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

  const { title, date, time, venue, city, price, image } = event;

  // Derived Booking Summary Values (no duplicate state variables)
  const displayImage = image || fallbackImage;
  const isFreeEvent = price === 0;

  // Total price logic
  const totalPriceVal = isFreeEvent ? 0 : price * (tickets || 1);
  const displayTotalPrice = isFreeEvent ? 'Free' : formatPrice(totalPriceVal);
  const displayTicketPrice = isFreeEvent ? 'Free Event' : formatPrice(price);

  // Handlers with instant validation clearing and boundary enforcement
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (val.trim()) {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    // Only accept numeric inputs, max 10 digits
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (val.length === 10) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleTicketsChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      setTickets('');
      setErrors((prev) => ({ ...prev, tickets: 'Ticket quantity is required' }));
      return;
    }

    let parsed = parseInt(val, 10);
    if (isNaN(parsed)) return;

    // Enforce 1-10 range boundaries immediately
    if (parsed < 1) parsed = 1;
    if (parsed > 10) parsed = 10;

    setTickets(parsed);
    setErrors((prev) => ({ ...prev, tickets: '' }));
  };

  const handleTicketsBlur = () => {
    // Standardize empty or boundary input values on blur
    if (tickets === '' || tickets < 1) {
      setTickets(1);
    } else if (tickets > 10) {
      setTickets(10);
    }
    setErrors((prev) => ({ ...prev, tickets: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = {};

    // Validate Name
    if (!name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    // Validate Email
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate Phone
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone Number must contain exactly 10 digits.';
    }

    // Validate Tickets
    if (tickets === '' || isNaN(tickets)) {
      newErrors.tickets = 'Ticket quantity is required.';
    } else if (tickets < 1 || tickets > 10) {
      newErrors.tickets = 'Ticket quantity must be between 1 and 10.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validation success: Disable button and route with state
    setIsSubmitting(true);

    navigate('/booking-success', {
      state: {
        eventName: title,
        ticketsCount: Number(tickets),
        totalAmount: totalPriceVal,
        customerName: name,
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Booking Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

          {/* Left Column: Form (7/12 width) */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 text-left">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Tickets</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={handleNameChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Ticket Quantity */}
              <div>
                <label htmlFor="tickets" className="block text-sm font-semibold text-gray-700 mb-1">
                  Number of Tickets (Max 10)
                </label>
                <input
                  id="tickets"
                  type="number"
                  min="1"
                  max="10"
                  value={tickets}
                  onChange={handleTicketsChange}
                  onBlur={handleTicketsBlur}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-sm"
                />
                {errors.tickets && (
                  <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
                    {errors.tickets}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition text-center flex-grow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
                <Link
                  to={`/events/${id}`}
                  className="bg-white border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-50 transition text-center flex-grow"
                >
                  Back to Event
                </Link>
              </div>

            </form>
          </div>

          {/* Right Column: Booking Summary Card (5/12 width) */}
          <div className="lg:col-span-5 text-left">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 space-y-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                Booking Summary
              </h2>

              {/* Event Image */}
              <div className="h-48 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={displayImage}
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

              {/* Event Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {title}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                  <div>
                    <span className="font-semibold text-gray-900 block">Date</span>
                    {date}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">Time</span>
                    {time}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">Venue</span>
                    {venue}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">City</span>
                    {city}
                  </div>
                </div>
              </div>

              {/* Pricing Math */}
              <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Ticket Price</span>
                  <span className="font-semibold text-gray-900">{displayTicketPrice}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Quantity</span>
                  <span className="font-semibold text-gray-900">{tickets || 0}</span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-gray-900">
                  <span className="text-base font-bold">Total Amount</span>
                  <span className="text-2xl font-extrabold text-blue-600">
                    {displayTotalPrice}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Booking;

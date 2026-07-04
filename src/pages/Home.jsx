import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg';
import eventsData from '../data/events.json';
import EventCard from '../components/EventCard';

function Home() {
  // Display only the first 3 featured events
  const featuredEvents = eventsData.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <div>
              <span className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                Discover Amazing Events
              </span>

              <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
                Find and Book Your Next Great Experience
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-8 text-gray-600">
                Explore outstanding local gatherings, professional tech summits,
                and live concerts. Book tickets and manage your reservations all
                in one simple, elegant platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/events"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700"
                >
                  Explore Events
                </Link>

                <button
                  onClick={() =>
                    document
                      .getElementById('featured-events-section')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition-colors duration-300 hover:bg-gray-50"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full">
              <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
                <img
                  src={heroImage}
                  alt="Professional business conference"
                  loading="eager"
                  className="block h-[260px] w-full object-cover object-center sm:h-[340px] lg:h-[420px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section
        id="featured-events-section"
        className="border-y border-gray-200 bg-white py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-extrabold text-gray-900">
            Featured Events
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
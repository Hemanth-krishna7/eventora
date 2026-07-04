import { useState, useMemo } from 'react';
import eventsData from '../data/events.json';
import EventCard from '../components/EventCard';

function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Generate available categories dynamically from events.json
  const categories = useMemo(() => {
    const cats = eventsData.map((event) => event.category);
    // filter duplicates and prepend 'All'
    return ['All', ...new Set(cats)];
  }, []);

  // Filter events based on search query and category
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.city.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const isFilterActive = searchQuery !== '' || selectedCategory !== 'All';

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-left">
          Explore Events
        </h1>

        {/* Filters Controls Panel */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Search Input */}
            <div className="w-full md:w-96 relative">
              <label htmlFor="search-input" className="sr-only">
                Search events by title, category, city or venue
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Search by title, category, city or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-medium text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                  type="button"
                  aria-label="Clear search query"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Buttons List */}
            <div className="w-full md:w-auto">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2 text-left">
                Filter by Category
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filter Badges & Clear Button */}
          {isFilterActive && (
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500">
                Active Filters:
              </span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Category: {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Search: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold hover:underline transition ml-auto"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600 font-medium">
            {filteredEvents.length === 0 ? (
              <span>No events found</span>
            ) : (
              <span>
                Showing {filteredEvents.length}{' '}
                {filteredEvents.length === 1 ? 'event' : 'events'}
              </span>
            )}
          </p>
        </div>

        {/* Events Grid or Empty State */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100 my-8 max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No events found.
            </h2>
            <p className="text-gray-600 mb-6">
              Try a different keyword or category.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;

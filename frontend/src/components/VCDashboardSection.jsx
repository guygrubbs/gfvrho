import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * VCDashboardSection
 *
 * Showcases how venture capitalists can log in, view startup reports,
 * and track growth. Includes a light/dark mode toggle for demonstration
 * and placeholders for potential search/filter fields.
 */
const VCDashboardSection = () => {
  // Simple light/dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // Search/Filter placeholders
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStageChange = (e) => {
    setFilterStage(e.target.value);
  };

  // Sample handle filter (in reality, you'd pass this to an API call or a local list filtering)
  const handleFilter = () => {
    console.log(`Filtering for stage: ${filterStage}, search: ${searchQuery}`);
  };

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        darkMode ? 'bg-[#003366] text-white' : 'bg-white text-[#003366]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: 'Poppins' }}
        >
          For Venture Capitalists
        </h2>

        {/* Explanation */}
        <p
          className="text-base md:text-lg mb-6 max-w-2xl"
          style={{ fontFamily: 'Open Sans' }}
        >
          Our VC Dashboard gives you instant access to tailored reports, real-time insights,
          and the ability to track progress across multiple startup investments. Quickly assess
          key growth metrics, financial health, and strategic milestones, all in one place.
        </p>

        {/* Toggle Light/Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded font-semibold mb-8 ${
            darkMode
              ? 'bg-[#EFEFEF] text-[#003366]'
              : 'bg-[#00A676] text-white hover:bg-[#008B62]'
          } transition-colors`}
          style={{ fontFamily: 'Open Sans' }}
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>

        {/* Filters and Search */}
        <div
          className={`p-6 rounded mb-6 ${
            darkMode ? 'bg-[#00284a]' : 'bg-[#EFEFEF]'
          }`}
        >
          <h3
            className="text-xl font-semibold mb-4"
            style={{ fontFamily: 'Poppins' }}
          >
            Manage Multiple Startups
          </h3>
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="searchQuery"
                className="font-medium mb-1"
                style={{ fontFamily: 'Poppins' }}
              >
                Search by Startup
              </label>
              <input
                id="searchQuery"
                type="text"
                placeholder="Enter startup name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`rounded px-3 py-2 text-sm ${
                  darkMode
                    ? 'bg-[#003366] border border-white text-white'
                    : 'border border-gray-300 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-[#00A676]`}
                style={{ fontFamily: 'Open Sans' }}
              />
            </div>

            <div className="flex flex-col w-full md:w-48">
              <label
                htmlFor="filterStage"
                className="font-medium mb-1"
                style={{ fontFamily: 'Poppins' }}
              >
                Filter by Stage
              </label>
              <select
                id="filterStage"
                value={filterStage}
                onChange={handleStageChange}
                className={`rounded px-3 py-2 text-sm ${
                  darkMode
                    ? 'bg-[#003366] border border-white text-white'
                    : 'border border-gray-300 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-[#00A676]`}
                style={{ fontFamily: 'Open Sans' }}
              >
                <option value="">All Stages</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b">Series B</option>
                <option value="growth">Growth</option>
              </select>
            </div>

            <button
              onClick={handleFilter}
              className={`px-4 py-2 rounded font-semibold mt-4 md:mt-0 ${
                darkMode
                  ? 'bg-[#EFEFEF] text-[#003366]'
                  : 'bg-[#00A676] text-white hover:bg-[#008B62]'
              } transition-colors`}
              style={{ fontFamily: 'Open Sans' }}
            >
              Apply
            </button>
          </div>
        </div>

        {/* VC Dashboard Login CTA */}
        <div
          className={`p-6 rounded ${
            darkMode ? 'bg-[#00284a]' : 'bg-[#EFEFEF]'
          } flex flex-col md:flex-row items-center justify-between`}
        >
          <div className="mb-4 md:mb-0">
            <h4
              className="text-lg font-semibold"
              style={{ fontFamily: 'Poppins' }}
            >
              Ready to Dive In?
            </h4>
            <p
              className="text-sm"
              style={{ fontFamily: 'Open Sans' }}
            >
              Log in to the VC Dashboard and access comprehensive investment reports instantly.
            </p>
          </div>
          <Link
            to="/dashboard-login"
            className={`px-6 py-2 rounded font-semibold ${
              darkMode
                ? 'bg-[#EFEFEF] text-[#003366]'
                : 'bg-[#00A676] text-white hover:bg-[#008B62]'
            } transition-colors`}
            style={{ fontFamily: 'Open Sans' }}
          >
            VC Dashboard Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VCDashboardSection;

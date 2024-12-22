import React from 'react';

const ProductShowcaseSection = () => {
  const features = [
    {
      id: 1,
      title: 'Startup Phase Assessment',
      description: 'Identify your current stage and get tailored insights to move forward confidently.',
      icon: (
        <svg
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="text-[#00A676]"
        >
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Growth Strategy Reports',
      description: 'Receive in-depth analysis to scale your operations and drive sustained success.',
      icon: (
        <svg
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="text-[#00A676]"
        >
          <path d="M3 3h18M9 3v18M9 14l4 4 8-8" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'VC Dashboard',
      description: 'Venture capitalists can monitor reports, track progress, and stay informed.',
      icon: (
        <svg
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="text-[#00A676]"
        >
          <path d="M9 21V8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v13M12 2v5M5 8h14" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Resources & Templates',
      description: 'Access ready-to-use materials and guidance to refine pitches and grow faster.',
      icon: (
        <svg
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="text-[#00A676]"
        >
          <path d="M6 4v16M10 4v16M2 8h20M2 16h20" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Title */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ fontFamily: 'Poppins', color: '#003366' }}
        >
          What We Offer
        </h2>
        <p
          className="text-base md:text-lg mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: 'Open Sans', color: '#003366' }}
        >
          Explore our tailored solutions that help startups and venture capitalists thrive.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#EFEFEF] rounded-lg p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
            >
              <div className="mb-4 hover:scale-105 transform transition-transform duration-300">
                {feature.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: 'Poppins', color: '#003366' }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm text-gray-700"
                style={{ fontFamily: 'Open Sans' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;

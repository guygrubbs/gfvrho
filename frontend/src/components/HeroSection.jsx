import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handlePrimaryCTA = () => {
    // For example, navigate to a pitch deck submission page
    navigate('/submit-pitch-deck');
  };

  const handleSecondaryCTA = () => {
    // For instance, scroll or navigate to "How It Works" section
    navigate('/#how-it-works');
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Background Video/Animation Placeholder */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="https://via.placeholder.com/1920x1080?text=Loading+Video"
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        {/* Provide a fallback for browsers that do not support video */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay to dim background for text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        <h1
          className="text-3xl md:text-5xl font-bold mb-4 text-white"
          style={{ fontFamily: 'Poppins' }}
        >
          Submit Your Pitch. Unlock Insights. Accelerate Growth.
        </h1>
        <p
          className="text-lg md:text-xl text-white mb-8 max-w-2xl"
          style={{ fontFamily: 'Open Sans' }}
        >
          We provide in-depth startup assessments and investment recommendations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePrimaryCTA}
            className="bg-[#00A676] text-white px-6 py-3 rounded font-semibold hover:bg-[#008B62] transition-colors"
            style={{ fontFamily: 'Open Sans' }}
          >
            Submit Your Pitch Deck
          </button>
          <button
            onClick={handleSecondaryCTA}
            className="bg-white text-[#003366] px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            style={{ fontFamily: 'Open Sans' }}
          >
            Explore Our Process
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

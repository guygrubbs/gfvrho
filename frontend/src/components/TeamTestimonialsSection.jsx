import React from 'react';

/**
 * TeamTestimonialsSection
 * 
 * Showcases success stories, testimonials from startups, and logos
 * of partners or VC firms associated with gfvrho. 
 * Follows gfvrho's style guidelines:
 *   - Colors: Navy (#003366), Light Grey (#EFEFEF), Emerald (#00A676)
 *   - Fonts: Poppins for headings, Open Sans for body text
 */

const TeamTestimonialsSection = () => {
  // Example testimonials data
  const testimonials = [
    {
      id: 1,
      companyName: 'Quantum Peak',
      quote:
        "gfvrho’s in-depth analysis helped us secure our first seed round. Their tailored report clarified our market approach and aligned perfectly with investor expectations.",
      founderName: 'Jane Doe, Founder',
    },
    {
      id: 2,
      companyName: 'GreenTech Start',
      quote:
        "The growth strategy recommendations were spot on, giving us a clear roadmap to scale. gfvrho’s reporting brought invaluable investor confidence.",
      founderName: 'John Smith, CEO',
    },
    {
      id: 3,
      companyName: 'Nova Finance',
      quote:
        "We integrated gfvrho’s data-driven insights into our pitch, resulting in a successful Series A round. Couldn’t be happier with their service.",
      founderName: 'Alice Johnson, CFO',
    },
  ];

  // Example logos for partner VCs or startups
  const partnerLogos = [
    {
      id: 1,
      name: 'Lion Capital',
      imgSrc: 'https://via.placeholder.com/100x50?text=Lion+Capital',
    },
    {
      id: 2,
      name: 'Peak Ventures',
      imgSrc: 'https://via.placeholder.com/100x50?text=Peak+Ventures',
    },
    {
      id: 3,
      name: 'SkyBridge Angels',
      imgSrc: 'https://via.placeholder.com/100x50?text=SkyBridge+Angels',
    },
    {
      id: 4,
      name: 'FutureWave VC',
      imgSrc: 'https://via.placeholder.com/100x50?text=FutureWave+VC',
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
          Success Stories and Partnerships
        </h2>
        <p
          className="max-w-2xl mx-auto text-base md:text-lg mb-12"
          style={{ fontFamily: 'Open Sans', color: '#003366' }}
        >
          Discover how our detailed reports have empowered startups, and see the partners
          who trust us to guide them toward strategic investments.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-[#EFEFEF] rounded shadow p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <p
                className="text-sm mb-4"
                style={{ fontFamily: 'Open Sans', color: '#333' }}
              >
                “{testi.quote}”
              </p>
              <div>
                <h4
                  className="font-semibold text-base"
                  style={{ fontFamily: 'Poppins', color: '#003366' }}
                >
                  {testi.founderName}
                </h4>
                <p
                  className="text-sm text-[#003366]"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  {testi.companyName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="mb-12">
          <h3
            className="text-xl font-bold mb-4"
            style={{ fontFamily: 'Poppins', color: '#003366' }}
          >
            Trusted by Leading VCs &amp; Startups
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {partnerLogos.map((logo) => (
              <div key={logo.id} className="hover:scale-105 transform transition-transform duration-300">
                <img
                  src={logo.imgSrc}
                  alt={`${logo.name} logo`}
                  className="object-contain"
                  style={{ width: '100px', height: '50px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamTestimonialsSection;

import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: 'Submit Pitch Deck',
      description: 'Upload your presentation and business data securely to begin the evaluation process.',
      // You can replace this placeholder SVG with an icon library (e.g., Heroicons or FontAwesome)
      icon: (
        <svg
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="mx-auto text-[#00A676]"
        >
          <path d="M15 10l4.55-4.55a2 2 0 00-2.83-2.83L10 7m-7 5l2.55 2.55a2 2 0 002.83 0L17 7" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Receive a Tailored Report',
      description: 'Our system analyzes your startup’s data, generating a detailed growth and investment report.',
      icon: (
        <svg
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="mx-auto text-[#00A676]"
        >
          <path d="M2 12l9 9 12-12" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Investor Review',
      description: 'Venture capitalists access your report and consider next steps for potential funding.',
      icon: (
        <svg
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="mx-auto text-[#00A676]"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5v-2m0 4v-6a2 2 0 012-2h2m5 0h2a2 2 0 012 2v4" />
        </svg>
      ),
    },
  ];

  const handleGetStarted = () => {
    // Implement your navigation or scroll to next section logic
    console.log('Navigating to Get Started flow...');
  };

  return (
    <section className="w-full bg-[#EFEFEF] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ fontFamily: 'Poppins', color: '#003366' }}
        >
          How It Works
        </h2>
        <p
          className="text-base md:text-lg mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: 'Open Sans', color: '#003366' }}
        >
          Follow these three simple steps to submit your pitch and receive a tailored investment report.
        </p>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded shadow p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 hover:scale-105 transform transition-transform duration-300">
                {step.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: 'Poppins', color: '#003366' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm"
                style={{ fontFamily: 'Open Sans', color: '#333' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <button
            onClick={handleGetStarted}
            className="bg-[#00A676] text-white px-8 py-3 rounded font-semibold hover:bg-[#008B62] transition-colors"
            style={{ fontFamily: 'Open Sans' }}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

import React from 'react';
// If you want real interactive charts, install "react-chartjs-2" and import components:
// import { Line } from 'react-chartjs-2';

// Example placeholder data for a chart
// const arrData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//   datasets: [
//     {
//       label: 'ARR ($K)',
//       data: [50, 65, 80, 90, 120, 150],
//       fill: false,
//       borderColor: '#00A676',
//       tension: 0.1,
//     },
//   ],
// };

const MarketOpportunitySection = () => {
  const handleDownloadReport = () => {
    // Example: trigger a download or navigate to a PDF link
    console.log('Downloading sample report...');
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title and Intro */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-[#003366]"
          style={{ fontFamily: 'Poppins' }}
        >
          Market Opportunity &amp; Financial Reports
        </h2>
        <p
          className="text-base md:text-lg mb-8 max-w-2xl text-[#003366]"
          style={{ fontFamily: 'Open Sans' }}
        >
          Dive into key metrics and financial insights to understand how your startup fares
          in the market, and explore growth potential with targeted data.
        </p>

        {/* Charts / Financial Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Placeholder for ARR/MRR chart */}
          <div className="bg-[#EFEFEF] p-6 rounded shadow flex flex-col items-center justify-center">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: 'Poppins', color: '#003366' }}
            >
              ARR / MRR Trends
            </h3>
            {/* If using react-chartjs-2, uncomment and replace placeholder: */}
            {/* <Line data={arrData} /> */}
            <div className="bg-white w-full h-40 flex items-center justify-center">
              <span
                className="text-gray-400 italic"
                style={{ fontFamily: 'Open Sans' }}
              >
                [ ARR/MRR Chart Placeholder ]
              </span>
            </div>
          </div>

          {/* Placeholder for funding history or other metrics */}
          <div className="bg-[#EFEFEF] p-6 rounded shadow flex flex-col items-center justify-center">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: 'Poppins', color: '#003366' }}
            >
              Funding History
            </h3>
            <div className="bg-white w-full h-40 flex items-center justify-center">
              <span
                className="text-gray-400 italic"
                style={{ fontFamily: 'Open Sans' }}
              >
                [ Funding Chart Placeholder ]
              </span>
            </div>
          </div>
        </div>

        {/* TAM Explanation */}
        <div className="mt-12">
          <h3
            className="text-2xl font-bold mb-2 text-[#003366]"
            style={{ fontFamily: 'Poppins' }}
          >
            Total Addressable Market (TAM)
          </h3>
          <p
            className="text-sm md:text-base mb-6 text-gray-700"
            style={{ fontFamily: 'Open Sans' }}
          >
            Understanding your TAM is crucial for gauging how big your potential customer
            base can be. Our analysis estimates the overall market size, offering insights
            into the competitiveness and scalability of your startup.
          </p>
        </div>

        {/* Downloadable Reports or Links */}
        <div className="flex flex-col sm:flex-row items-center mt-8 bg-[#EFEFEF] p-6 rounded">
          <div className="flex-1 mb-4 sm:mb-0">
            <h4
              className="text-lg font-semibold mb-2 text-[#003366]"
              style={{ fontFamily: 'Poppins' }}
            >
              Sample Investment Report
            </h4>
            <p
              className="text-sm text-gray-700"
              style={{ fontFamily: 'Open Sans' }}
            >
              Download a sample report to see how we break down financial metrics, market
              opportunities, and strategic recommendations.
            </p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="bg-[#00A676] text-white px-6 py-2 rounded font-semibold hover:bg-[#008B62] transition-colors"
            style={{ fontFamily: 'Open Sans' }}
          >
            Download Sample
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketOpportunitySection;

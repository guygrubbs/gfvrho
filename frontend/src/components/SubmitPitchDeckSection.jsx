import React, { useState } from 'react';

/**
 * SubmitPitchDeckSection
 *
 * This component renders a form that allows startups to upload
 * their pitch decks, financials, and provide basic company info.
 * A simple drag-and-drop area is used for file uploads, and
 * a placeholder progress bar is included for demonstration.
 */
const SubmitPitchDeckSection = () => {
  // Basic text fields
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [businessStage, setBusinessStage] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');

  // Drag-and-drop states
  const [pitchDeckFile, setPitchDeckFile] = useState(null);
  const [financialsFile, setFinancialsFile] = useState(null);
  const [isDraggingDeck, setIsDraggingDeck] = useState(false);
  const [isDraggingFinancials, setIsDraggingFinancials] = useState(false);

  // Simple progress indicator (0 - 100)
  const [uploadProgress, setUploadProgress] = useState(0);

  /**
   * Basic simulation of an upload process.
   * In a real scenario, you might do an API call with axios or fetch,
   * updating 'uploadProgress' as the file uploads.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting pitch form...');

    // Reset progress before simulating
    setUploadProgress(0);

    // Simple simulation: increment progress in steps
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        // In a real scenario, you might do:
        //   alert("Your pitch deck and details were successfully uploaded!");
        // Or navigate to a success page
        console.log('Upload simulation complete!');
      }
    }, 200);
  };

  /**
   * Drag event handlers for pitch deck area
   */
  const handleDeckDragOver = (e) => {
    e.preventDefault();
    setIsDraggingDeck(true);
  };

  const handleDeckDragLeave = () => {
    setIsDraggingDeck(false);
  };

  const handleDeckDrop = (e) => {
    e.preventDefault();
    setIsDraggingDeck(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setPitchDeckFile(e.dataTransfer.files[0]);
    }
  };

  /**
   * Drag event handlers for financials area
   */
  const handleFinancialsDragOver = (e) => {
    e.preventDefault();
    setIsDraggingFinancials(true);
  };

  const handleFinancialsDragLeave = () => {
    setIsDraggingFinancials(false);
  };

  const handleFinancialsDrop = (e) => {
    e.preventDefault();
    setIsDraggingFinancials(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFinancialsFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section className="w-full bg-[#EFEFEF] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-[#003366]"
          style={{ fontFamily: 'Poppins' }}
        >
          Get Your Tailored Report
        </h2>
        <p
          className="text-base md:text-lg mb-8 text-[#003366]"
          style={{ fontFamily: 'Open Sans' }}
        >
          Provide your startup information and pitch materials. Our system will analyze
          them and generate a customized report to accelerate your growth.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-6"
        >
          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block mb-1 font-semibold"
              style={{ fontFamily: 'Poppins', color: '#003366' }}
            >
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A676]"
              style={{ fontFamily: 'Open Sans' }}
              required
            />
          </div>

          {/* Industry / Market Focus */}
          <div>
            <label
              htmlFor="industry"
              className="block mb-1 font-semibold"
              style={{ fontFamily: 'Poppins', color: '#003366' }}
            >
              Industry / Market Focus
            </label>
            <input
              id="industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A676]"
              style={{ fontFamily: 'Open Sans' }}
              required
            />
          </div>

          {/* Business Stage */}
          <div>
            <label
              htmlFor="businessStage"
              className="block mb-1 font-semibold"
              style={{ fontFamily: 'Poppins', color: '#003366' }}
            >
              Business Stage
            </label>
            <select
              id="businessStage"
              value={businessStage}
              onChange={(e) => setBusinessStage(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A676]"
              style={{ fontFamily: 'Open Sans' }}
              required
            >
              <option value="">Select a stage...</option>
              <option value="pre-seed">Pre-Seed</option>
              <option value="seed">Seed</option>
              <option value="series-a">Series A</option>
              <option value="series-b">Series B</option>
              <option value="growth">Growth</option>
            </select>
          </div>

          {/* Pitch Deck (Drag-and-Drop) */}
          <div>
            <label
              className="block mb-1 font-semibold"
              style={{ fontFamily: 'Poppins', color: '#003366' }}
            >
              Upload Pitch Deck
            </label>
            <div
              onDragOver={handleDeckDragOver}
              onDragLeave={handleDeckDragLeave}
              onDrop={handleDeckDrop}
              className={`w-full h-32 border-2 border-dashed rounded flex items-center justify-center ${
                isDraggingDeck ? 'border-[#00A676]' : 'border-gray-300'
              }`}
            >
              {pitchDeckFile ? (
                <p className="text-sm" style={{ fontFamily: 'Open Sans' }}>
                  {pitchDeckFile.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
                  Drag &amp; drop or click to browse...
                </p>
              )}
            </div>
          </div>

          {/* Financials (Drag-and-Drop) */}
          <div>
            <label
              className="block mb-1 font-semibold"
              style={{ fontFamily: 'Poppins', color: '#003366' }}
            >
              Upload Financials
            </label>
            <div
              onDragOver={handleFinancialsDragOver}
              onDragLeave={handleFinancialsDragLeave}
              onDrop={handleFinancialsDrop}
              className={`w-full h-32 border-2 border-dashed rounded flex items-center justify-center ${
                isDraggingFinancials ? 'border-[#00A676]' : 'border-gray-300'
              }`}
            >
              {financialsFile ? (
                <p className="text-sm" style={{ fontFamily: 'Open Sans' }}>
                  {financialsFile.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
                  Drag &amp; drop or click to browse...
                </p>
              )}
            </div>
          </div>

          {/* Additional Comments */}
          <div>
            <label
              htmlFor="additionalComments"
              className="block mb-1 font-semibold"
              style={{ fontFamily: 'Poppins', color: '#003366' }}
            >
              Additional Comments
            </label>
            <textarea
              id="additionalComments"
              rows="3"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A676]"
              style={{ fontFamily: 'Open Sans' }}
            />
          </div>

          {/* Progress Bar (optional demonstration) */}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-[#00A676] h-2 rounded"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-[#00A676] text-white px-6 py-2 rounded font-semibold hover:bg-[#008B62] transition-colors"
              style={{ fontFamily: 'Open Sans' }}
            >
              Submit &amp; Get Your Report
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubmitPitchDeckSection;

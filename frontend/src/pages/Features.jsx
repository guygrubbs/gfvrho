// frontend/src/pages/Features.jsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
    {
        title: 'Startup Phase Assessment',
        description: 'Understand your business stage and receive tailored recommendations for growth.',
        icon: '📊',
    },
    {
        title: 'Growth Strategy Reports',
        description: 'Get actionable insights and strategies to scale your startup effectively.',
        icon: '🚀',
    },
    {
        title: 'VC Dashboard',
        description: 'Venture capitalists can track startup performance and access tailored reports.',
        icon: '📈',
    },
    {
        title: 'Resources & Templates',
        description: 'Access valuable resources and templates to guide your startup journey.',
        icon: '📚',
    }
];

const Features = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-12">
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#003366] mb-4">Platform Features</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore the powerful features of our platform designed to empower startups and
                        venture capitalists.
                    </p>
                </section>

                {/* Feature Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 shadow-md rounded-md p-6 text-center hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-[#00A676] mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </section>
            </main>

            {/* Call-to-Action Section */}
            <section className="bg-[#00A676] text-white py-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
                <p className="text-lg mb-6">
                    Join our platform today and unlock insights tailored for your startup or investment needs.
                </p>
                <a
                    href="/submit-pitch"
                    className="bg-white text-[#00A676] font-semibold py-2 px-6 rounded-md hover:bg-gray-100 transition-colors"
                >
                    Submit Your Pitch
                </a>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Features;

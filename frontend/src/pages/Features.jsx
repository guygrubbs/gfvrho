// frontend/src/pages/Features.jsx

import React from 'react';

const featuresData = [
    {
        title: 'Startup Phase Assessment',
        description: 'Evaluate and understand your startup’s current phase to better plan your growth strategy.',
        icon: '🚀',
    },
    {
        title: 'Growth Strategy Reports',
        description: 'Receive tailored recommendations to scale your business efficiently.',
        icon: '📊',
    },
    {
        title: 'VC Dashboard',
        description: 'Access detailed reports and track startup performance in a dedicated dashboard.',
        icon: '📈',
    },
    {
        title: 'Resources & Templates',
        description: 'Download resources, templates, and guidelines to streamline your business processes.',
        icon: '📁',
    },
];

const Features = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Platform Features</h1>
                <p className="text-center text-gray-600 mb-12">
                    Explore the powerful tools and resources designed to help startups and VCs grow.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresData.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="text-4xl text-emerald-500 mb-4 text-center">{feature.icon}</div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">{feature.title}</h2>
                            <p className="text-gray-600 text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

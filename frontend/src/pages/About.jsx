// src/pages/About.jsx

import React from 'react';
import PropTypes from 'prop-types';
import teamData from '../data/teamData';

/**
 * About Page
 * Displays information about the platform and the team.
 */
const About = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* About Section */}
            <section className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg text-gray-600">
                    Welcome to our platform! We are committed to delivering excellence through innovation and collaboration.
                </p>
            </section>

            {/* Team Section */}
            {teamData && teamData.length > 0 && (
                <section>
                    <h2 className="text-3xl font-semibold text-center mb-6">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamData.map((member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-lg shadow-md p-4 text-center"
                            >
                                <img
                                    src={member.image || '/default-avatar.png'}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-gray-500">{member.role}</p>
                                <p className="text-sm text-gray-700 mt-2">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

// Define PropTypes for validation (Not strictly necessary since teamData is imported directly)
About.propTypes = {
    team: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
            bio: PropTypes.string,
            image: PropTypes.string,
        })
    ),
};

export default About;

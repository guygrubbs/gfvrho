// frontend/src/pages/About.jsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            {/* Header Section */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-12">
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#003366] mb-4">About Us</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Our mission is to empower startups with tailored insights and data-driven reports,
                        enabling them to attract the right venture capital and scale effectively.
                    </p>
                </section>

                {/* Company Mission */}
                <section className="my-12">
                    <h2 className="text-2xl font-semibold text-[#00A676] mb-4">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        At GFVRHO, we bridge the gap between visionary startups and forward-thinking investors.
                        Our platform delivers comprehensive market insights, growth strategies, and tailored
                        recommendations to help startups thrive in competitive markets.
                    </p>
                </section>

                {/* Team Section */}
                <section className="my-12">
                    <h2 className="text-2xl font-semibold text-[#00A676] mb-4">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                        <div className="text-center">
                            <img
                                src="/assets/team/member1.jpg"
                                alt="Team Member 1"
                                className="w-32 h-32 rounded-full mx-auto object-cover"
                            />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Jane Doe</h3>
                            <p className="text-sm text-gray-500">CEO & Founder</p>
                        </div>
                        <div className="text-center">
                            <img
                                src="/assets/team/member2.jpg"
                                alt="Team Member 2"
                                className="w-32 h-32 rounded-full mx-auto object-cover"
                            />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">John Smith</h3>
                            <p className="text-sm text-gray-500">CTO</p>
                        </div>
                        <div className="text-center">
                            <img
                                src="/assets/team/member3.jpg"
                                alt="Team Member 3"
                                className="w-32 h-32 rounded-full mx-auto object-cover"
                            />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Emily Johnson</h3>
                            <p className="text-sm text-gray-500">Head of Partnerships</p>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action */}
                <section className="my-12 text-center">
                    <h2 className="text-2xl font-semibold text-[#00A676] mb-4">Join Our Journey</h2>
                    <p className="text-gray-600 mb-6">
                        Whether you're a startup looking for insights or an investor seeking opportunities,
                        GFVRHO is here to support you every step of the way.
                    </p>
                    <a
                        href="/contact"
                        className="bg-[#00A676] hover:bg-[#007A5C] text-white font-semibold py-2 px-6 rounded-md"
                    >
                        Contact Us
                    </a>
                </section>
            </main>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default About;

"use client";
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({
                name: '',
                email: '',
                organization: '',
                phone: '',
                subject: '',
                message: '',
                inquiryType: 'general'
            });
        }, 2000);
    };

    const contactMethods = [
        {
            title: 'Email Support',
            description: 'Get help with technical issues and general inquiries',
            contact: 'support@pixelvision.ai',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: 'from-blue-500 to-cyan-500',
            hours: '24/7 Response'
        },
        {
            title: 'Sales Inquiries',
            description: 'Speak with our sales team about pricing and plans',
            contact: 'sales@pixelvision.ai',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            color: 'from-green-500 to-emerald-500',
            hours: 'Mon-Fri 9AM-6PM PST'
        },
        {
            title: 'Technical Support',
            description: 'Expert help with integration and implementation',
            contact: 'tech@pixelvision.ai',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            color: 'from-purple-500 to-indigo-500',
            hours: '24/7 Support'
        },
        {
            title: 'Partnership',
            description: 'Explore collaboration and partnership opportunities',
            contact: 'partnerships@pixelvision.ai',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'from-orange-500 to-red-500',
            hours: 'Mon-Fri 9AM-5PM PST'
        }
    ];

    const officeLocations = [
        {
            city: 'San Francisco',
            address: '123 Medical AI Plaza, Suite 400',
            zipcode: 'San Francisco, CA 94102',
            phone: '+1 (555) 123-4567',
            type: 'Headquarters',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            city: 'New York',
            address: '456 Healthcare Innovation Center',
            zipcode: 'New York, NY 10001',
            phone: '+1 (555) 987-6543',
            type: 'East Coast Office',
            color: 'from-green-500 to-emerald-500'
        },
        {
            city: 'London',
            address: '789 Medical Technology Hub',
            zipcode: 'London, UK EC1A 1BB',
            phone: '+44 20 7123 4567',
            type: 'European Office',
            color: 'from-purple-500 to-indigo-500'
        }
    ];

    const faqs = [
        {
            question: 'How quickly can I get started with PixelVision?',
            answer: 'You can start using PixelVision immediately after signing up. Our onboarding process takes less than 5 minutes, and you\'ll have access to our full platform right away.'
        },
        {
            question: 'Do you offer custom integration support?',
            answer: 'Yes, we provide comprehensive integration support including custom API development, PACS integration, and workflow optimization for enterprise clients.'
        },
        {
            question: 'What training is available for new users?',
            answer: 'We offer live training sessions, comprehensive documentation, video tutorials, and dedicated customer success managers for enterprise accounts.'
        },
        {
            question: 'Is my medical data secure and compliant?',
            answer: 'Absolutely. PixelVision is HIPAA compliant, uses end-to-end encryption, and follows all major healthcare data protection regulations including GDPR.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-sm opacity-90"></div>
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                PixelVision
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get in touch with our team for support, sales inquiries, or partnership opportunities.
                            We're here to help you transform your medical imaging workflow.
                        </p>
                    </div>

                    {/* Contact Methods Grid */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                How Can We Help?
                            </h2>
                            <p className="text-lg text-gray-600">
                                Choose the best way to reach our specialized teams
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {contactMethods.map((method, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                                        {method.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{method.description}</p>
                                    <div className="space-y-2">
                                        <a href={`mailto:${method.contact}`} className="block text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                            {method.contact}
                                        </a>
                                        <p className="text-xs text-gray-500">{method.hours}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Form and Office Locations */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {/* Contact Form */}
                        <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Send us a Message
                            </h2>

                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you within 24 hours.</span>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                                            Organization
                                        </label>
                                        <input
                                            type="text"
                                            id="organization"
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Hospital or clinic name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                                        Inquiry Type
                                    </label>
                                    <select
                                        id="inquiryType"
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="sales">Sales & Pricing</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="demo">Request Demo</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Brief description of your inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Tell us more about your needs and how we can help..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending Message...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Send Message
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Office Locations */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Our Offices
                            </h2>
                            {officeLocations.map((office, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl p-6 shadow-lg">
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${office.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xl font-bold text-gray-800">{office.city}</h3>
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                                    {office.type}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-1">{office.address}</p>
                                            <p className="text-gray-600 mb-3">{office.zipcode}</p>
                                            <a href={`tel:${office.phone}`} className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                                {office.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Emergency Support */}
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    Emergency Support
                                </h3>
                                <p className="text-red-700 text-sm mb-3">
                                    For critical system issues affecting patient care, contact our emergency support line:
                                </p>
                                <a href="tel:+18005551234" className="text-red-600 font-bold text-lg hover:text-red-700 transition-colors">
                                    +1 (800) 555-1234
                                </a>
                                <p className="text-xs text-red-600 mt-1">Available 24/7</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-lg text-gray-600">
                                Quick answers to common questions about PixelVision
                            </p>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start">
                                        <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed ml-7">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-2xl p-12">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                            Join thousands of healthcare professionals who trust PixelVision for their medical image analysis needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/signup" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Start Free Trial</span>
                            </a>
                            <a href="/demo" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span>Schedule Demo</span>
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-8 mt-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                            <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            PixelVision
                        </span>
                    </div>
                    <p className="text-gray-300 mb-4">
                        Advanced AI-powered medical image classification for better patient outcomes.
                    </p>
                    <div className="flex justify-center space-x-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                        <p>&copy; 2025 PixelVision. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

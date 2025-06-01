export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-sm opacity-90"></div>
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                PixelVision
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            About Medical Image Classification
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Revolutionizing healthcare through advanced AI-powered medical image analysis
                        </p>
                    </div>

                    {/* Main Content Card */}
                    <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl p-8 mb-8">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Our Medical Image Classification platform leverages cutting-edge artificial intelligence
                                to provide accurate and reliable analysis of medical images. We combine advanced deep
                                learning models with intuitive user interfaces to make medical diagnosis more accessible
                                and efficient.
                            </p>

                            {/* Mission and Technology Grid */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl p-6 backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                        Our Mission
                                    </h2>
                                    <p className="text-gray-700">
                                        To democratize medical image analysis by providing healthcare professionals and
                                        researchers with powerful AI tools that enhance diagnostic accuracy and speed up
                                        the decision-making process.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-xl p-6 backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                        Our Technology
                                    </h2>
                                    <p className="text-gray-700">
                                        We utilize state-of-the-art convolutional neural networks and computer vision
                                        techniques trained on extensive medical datasets to ensure high accuracy and
                                        reliability in our classifications.
                                    </p>
                                </div>
                            </div>

                            {/* Key Features Section */}
                            <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-xl p-6 mb-8 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                                    Key Features
                                </h2>
                                <ul className="grid md:grid-cols-2 gap-4">
                                    <li className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">Real-time image analysis</span>
                                    </li>
                                    <li className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">High accuracy predictions</span>
                                    </li>
                                    <li className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">Secure data handling</span>
                                    </li>
                                    <li className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">AI-powered chat assistant</span>
                                    </li>
                                    <li className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">User-friendly interface</span>
                                    </li>
                                    <li className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">Multiple image formats</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Stats Section */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                                        99%+
                                    </div>
                                    <div className="text-gray-600 font-medium">Accuracy Rate</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200/50 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                                        &lt;5s
                                    </div>
                                    <div className="text-gray-600 font-medium">Processing Time</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                                        24/7
                                    </div>
                                    <div className="text-gray-600 font-medium">Availability</div>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="bg-yellow-50/80 border-l-4 border-yellow-400 rounded-xl p-6 mb-8 backdrop-blur-sm">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                                        <p className="text-sm text-yellow-700 leading-relaxed">
                                            This platform is designed for educational and research purposes.
                                            Always consult with qualified healthcare professionals for medical diagnoses and treatment decisions.
                                            Our AI analysis should not replace professional medical judgment.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl p-8 backdrop-blur-sm">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                    Get Started Today
                                </h2>
                                <p className="text-gray-700 mb-6 text-lg">
                                    Join thousands of healthcare professionals and researchers who trust our platform
                                    for accurate medical image analysis.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a href="/signup" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Sign Up Now</span>
                                    </a>
                                    <a href="/" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 backdrop-blur-sm transition-all duration-300 inline-flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v1" />
                                        </svg>
                                        <span>Try Demo</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Features Section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Security & Privacy</h3>
                            <p className="text-gray-600">
                                Your medical data is protected with enterprise-grade encryption and security measures.
                                We never store your images permanently and comply with all healthcare data regulations.
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg p-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Support</h3>
                            <p className="text-gray-600">
                                Our dedicated support team is available around the clock to assist you with any questions
                                or technical issues you may encounter while using our platform.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LandingPage() {
    const instructions = [
        'Click "Select Image": Select this option to begin.',
        'Choose Your Image: Pick the image you want to classify.',
        'Wait for Result: The website will process your image.',
        'See the Diagnosis: Discover the image\'s type and disease status.',
        'Chat with AI: Click "Discuss with AI Assistant" to ask questions about your results.'
    ]

    const features = [
        {
            title: 'Easy Image Upload',
            description: 'Quickly upload your medical images with our intuitive interface.',
            icon: '📤',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Automatic Model Selection',
            description: 'Our AI automatically selects the most appropriate model for your image type.',
            icon: '🤖',
            color: 'from-blue-600 to-blue-800'
        },
        {
            title: 'Accurate Diagnosis',
            description: 'Get precise classification results powered by advanced machine learning.',
            icon: '🎯',
            color: 'from-cyan-500 to-blue-600'
        },
        {
            title: 'AI Chat Assistant',
            description: 'Discuss your results with our intelligent medical assistant.',
            icon: '💬',
            color: 'from-blue-700 to-cyan-700'
        },
        {
            title: 'Secure & Private',
            description: 'Your medical data is protected with enterprise-grade security.',
            icon: '🔒',
            color: 'from-blue-800 to-cyan-800'
        },
        {
            title: 'Fast Processing',
            description: 'Get results in seconds, not hours or days.',
            icon: '⚡',
            color: 'from-cyan-600 to-blue-700'
        }
    ]

    const faqs = [
        {
            question: 'How do I upload an image?',
            answer: 'To upload an image, simply click the "Upload" button, select your image file, and wait for the results.'
        },
        {
            question: 'How does the website choose the model?',
            answer: 'The website selects the model based on the initial image classification, ensuring the most suitable model is used for analysis.'
        },
        {
            question: 'Can I upload multiple images at once?',
            answer: 'Currently, our system supports the upload of one image at a time for accurate analysis.'
        },
        {
            question: 'How long does it take to get the results?',
            answer: 'The processing time may vary depending on the complexity of the image and our server load, but it usually takes just a few moments.'
        },
        {
            question: 'Is my uploaded data secure and private?',
            answer: 'Yes, we prioritize the security and privacy of your data. We do not store or share your uploaded images or personal information.'
        },
        {
            question: 'How can I use the AI chat assistant?',
            answer: 'After receiving your image analysis results, click the "Discuss with AI Assistant" button to open the chat interface. You can then ask questions about your results or general medical inquiries.'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Hero Section */}
            <section className="py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5"></div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="flex items-center justify-center space-x-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                            <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            PixelVision
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                        AI-Powered Medical
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Image Classification</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Transform your medical imaging workflow with advanced AI technology.
                        Get accurate diagnoses, instant results, and intelligent insights for better patient care.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            Start Free Trial
                        </button>
                        <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 backdrop-blur-sm transition-all duration-300">
                            Watch Demo
                        </button>
                    </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>

            {/* Demo Preview */}
            <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-12">
                            See Our AI in Action
                        </h2>
                        <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-4">
                                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 p-4 rounded-xl shadow-lg">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="font-semibold text-gray-700">Classification Complete</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Predicted class: <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Chest X-ray</span></p>
                                        <p className="text-sm text-gray-600">Result: <span className="font-semibold text-green-600">Negative</span></p>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 p-4 rounded-xl backdrop-blur-sm">
                                        <p className="text-sm text-blue-700">💬 AI Assistant: "The chest X-ray shows normal lung fields with no signs of pneumonia or other abnormalities. Would you like me to explain the key features I analyzed?"</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <h4 className="font-semibold mb-2 text-gray-700">Original Image</h4>
                                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-32 rounded-xl flex items-center justify-center border border-gray-200/50 backdrop-blur-sm">
                                            <span className="text-gray-500 text-2xl">🫁</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="font-semibold mb-2 text-gray-700">Segmented Image</h4>
                                        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 h-32 rounded-xl flex items-center justify-center border border-blue-200/50 backdrop-blur-sm">
                                            <span className="text-blue-600 text-2xl">🎯</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            Powerful Features for Medical Professionals
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our advanced AI platform provides everything you need for accurate medical image analysis
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get accurate medical image analysis in just a few simple steps
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {instructions.map((instruction, index) => (
                                <div key={index} className="flex items-start group">
                                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-6 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {index + 1}
                                    </div>
                                    <div className="pt-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 flex-1 shadow-md group-hover:shadow-lg transition-all duration-300">
                                        <p className="text-lg text-gray-700">{instruction}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-sm"></div>
                <div className="container mx-auto relative z-10">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">98.5%</div>
                            <div className="text-blue-100">Accuracy Rate</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
                            <div className="text-blue-100">Images Analyzed</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">2.3s</div>
                            <div className="text-blue-100">Average Processing Time</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
                            <div className="text-blue-100">Healthcare Professionals</div>
                        </div>
                    </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Find answers to common questions about our AI medical imaging platform
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg">
                                    <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-blue-50/50 rounded-xl transition-all duration-300">
                                        <span className="font-semibold text-gray-800">{faq.question}</span>
                                        <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-blue-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-blue-900/90 backdrop-blur-sm"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Transform Your Medical Imaging?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of healthcare professionals who trust our AI for accurate, fast medical image analysis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            Start Your Free Trial
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-800 backdrop-blur-sm transition-all duration-300">
                            Schedule Demo
                        </button>
                    </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-28 h-28 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
                                </div>
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    PixelVision
                                </div>
                            </div>
                            <p className="text-gray-400">
                                Advanced AI-powered medical image classification for better patient outcomes.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-blue-300">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-blue-300">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-blue-300">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-blue-300 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 PixelVision. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

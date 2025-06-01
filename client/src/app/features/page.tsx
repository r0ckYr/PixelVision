export default function FeaturesPage() {
    const coreFeatures = [
        {
            title: 'Real-Time Image Analysis',
            description: 'Upload medical images and receive instant AI-powered analysis with results in under 5 seconds.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: 'from-blue-500 to-cyan-500',
            benefits: ['Sub-5 second processing', 'Multiple format support', 'Batch processing available']
        },
        {
            title: 'High Accuracy Predictions',
            description: 'Our advanced neural networks deliver 99%+ accuracy rates across various medical imaging modalities.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'from-green-500 to-emerald-500',
            benefits: ['99%+ accuracy rate', 'Confidence scoring', 'Validation metrics']
        },
        {
            title: 'Secure Data Handling',
            description: 'Enterprise-grade encryption and HIPAA-compliant security measures protect your sensitive medical data.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            color: 'from-purple-500 to-indigo-500',
            benefits: ['HIPAA compliant', 'End-to-end encryption', 'No permanent storage']
        },
        {
            title: 'AI-Powered Chat Assistant',
            description: 'Get instant answers about your results from our intelligent medical AI assistant.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            color: 'from-orange-500 to-red-500',
            benefits: ['24/7 availability', 'Context-aware responses', 'Medical knowledge base']
        },
        {
            title: 'User-Friendly Interface',
            description: 'Intuitive design makes complex medical AI accessible to healthcare professionals at all levels.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            color: 'from-pink-500 to-rose-500',
            benefits: ['Drag & drop uploads', 'Clean interface', 'Mobile responsive']
        },
        {
            title: 'Multiple Image Formats',
            description: 'Support for DICOM, PNG, JPG, TIFF and other medical imaging formats with automatic optimization.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: 'from-teal-500 to-cyan-500',
            benefits: ['DICOM support', 'Auto-optimization', 'Format conversion']
        }
    ];

    const advancedFeatures = [
        {
            title: 'AI Segmentation Masks',
            description: 'Generate precise segmentation masks highlighting regions of interest with pixel-level accuracy.',
            metrics: ['Pixel-perfect accuracy', 'Real-time generation', 'Multiple ROI support'],
            icon: '🎯'
        },
        {
            title: 'Batch Processing',
            description: 'Process multiple medical images simultaneously for efficient workflow management.',
            metrics: ['Up to 50 images/batch', 'Progress tracking', 'Export results'],
            icon: '📊'
        },
        {
            title: 'Cloud Integration',
            description: 'Seamlessly integrate with your existing PACS and hospital information systems.',
            metrics: ['API access', 'PACS integration', 'HL7 compatibility'],
            icon: '☁️'
        },
        {
            title: 'Performance Analytics',
            description: 'Track usage patterns, accuracy metrics, and system performance over time.',
            metrics: ['Usage analytics', 'Performance metrics', 'Custom reports'],
            icon: '📈'
        }
    ];

    const technicalSpecs = [
        {
            category: 'Processing Power',
            specs: [
                { name: 'GPU Acceleration', value: 'NVIDIA A100' },
                { name: 'Model Architecture', value: 'CNN + Transformer' },
                { name: 'Processing Speed', value: '< 5 seconds' },
                { name: 'Concurrent Users', value: '1000+' }
            ]
        },
        {
            category: 'Security & Compliance',
            specs: [
                { name: 'Encryption', value: 'AES-256' },
                { name: 'Compliance', value: 'HIPAA, GDPR' },
                { name: 'Authentication', value: 'Multi-factor' },
                { name: 'Audit Logs', value: 'Complete' }
            ]
        },
        {
            category: 'Supported Formats',
            specs: [
                { name: 'DICOM', value: 'Full support' },
                { name: 'Image Formats', value: 'PNG, JPG, TIFF' },
                { name: 'Max File Size', value: '500MB' },
                { name: 'Resolution', value: 'Up to 8K' }
            ]
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
                            Platform Features
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover the comprehensive suite of AI-powered medical imaging tools designed to enhance
                            diagnostic accuracy and streamline healthcare workflows
                        </p>
                    </div>

                    {/* Core Features Grid */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                Core Features
                            </h2>
                            <p className="text-lg text-gray-600">
                                Essential capabilities that power your medical image analysis workflow
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {coreFeatures.map((feature, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                                    <div className="space-y-2">
                                        {feature.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-center text-sm">
                                                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-2">
                                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Advanced Features */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                Advanced Capabilities
                            </h2>
                            <p className="text-lg text-gray-600">
                                Professional-grade features for demanding healthcare environments
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {advancedFeatures.map((feature, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 shadow-lg">
                                    <div className="flex items-start space-x-4">
                                        <div className="text-4xl">{feature.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                            <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {feature.metrics.map((metric, idx) => (
                                                    <div key={idx} className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-lg p-3 text-center">
                                                        <span className="text-sm font-medium text-blue-700">{metric}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Technical Specifications */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                Technical Specifications
                            </h2>
                            <p className="text-lg text-gray-600">
                                Detailed technical information about our platform capabilities
                            </p>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {technicalSpecs.map((category, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{category.category}</h3>
                                    <div className="space-y-4">
                                        {category.specs.map((spec, idx) => (
                                            <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200/50 last:border-b-0">
                                                <span className="text-gray-600 font-medium">{spec.name}</span>
                                                <span className="text-gray-800 font-semibold">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Performance Metrics */}
                    <section className="mb-20">
                        <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                    Performance Metrics
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Real-world performance data from our deployed systems
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                                        99.2%
                                    </div>
                                    <div className="text-gray-600 font-medium">Accuracy Rate</div>
                                    <div className="text-xs text-gray-500 mt-1">Across all modalities</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-xl">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                                        3.7s
                                    </div>
                                    <div className="text-gray-600 font-medium">Avg Processing</div>
                                    <div className="text-xs text-gray-500 mt-1">Per image analysis</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/50 rounded-xl">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                        99.9%
                                    </div>
                                    <div className="text-gray-600 font-medium">Uptime</div>
                                    <div className="text-xs text-gray-500 mt-1">System availability</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/50 rounded-xl">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                                        1M+
                                    </div>
                                    <div className="text-gray-600 font-medium">Images Processed</div>
                                    <div className="text-xs text-gray-500 mt-1">Since launch</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Integration & API */}
                    <section className="mb-20">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-2xl p-8">
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                        API & Integration
                                    </h2>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        Seamlessly integrate PixelVision into your existing healthcare infrastructure
                                        with our comprehensive API and integration options.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">RESTful API with comprehensive documentation</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">PACS and HIS system compatibility</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">SDK support for multiple programming languages</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Webhook support for real-time notifications</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">API Example</h3>
                                    <div className="bg-gray-900 rounded-lg p-4 text-sm">
                                        <div className="text-green-400">POST</div>
                                        <div className="text-blue-400">/api/v1/analyze</div>
                                        <div className="text-gray-400 mt-2">
                                            {`{
  "image": "base64_data",
  "format": "DICOM",
  "options": {
    "generate_mask": true,
    "confidence_threshold": 0.8
  }
}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-2xl p-12">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            Ready to Transform Your Medical Imaging Workflow?
                        </h2>
                        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                            Experience the power of AI-driven medical image analysis. Start your free trial today
                            or schedule a personalized demo with our team.
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
        </div>
    );
}

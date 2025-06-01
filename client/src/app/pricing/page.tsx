export default function PricingPage() {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: '/month',
            description: 'Perfect for trying out our AI capabilities',
            features: [
                '5 image analyses per month',
                'Basic AI models',
                'Standard processing speed',
                'Email support',
                'Basic chat assistant'
            ],
            cta: 'Get Started Free',
            popular: false,
            color: 'from-gray-500 to-gray-600'
        },
        {
            name: 'Professional',
            price: '$29',
            period: '/month',
            description: 'Ideal for individual healthcare professionals',
            features: [
                '100 image analyses per month',
                'Advanced AI models',
                'Priority processing',
                'Priority email & chat support',
                'Advanced chat assistant',
                'Image history & analytics',
                'Multiple image formats',
                'API access'
            ],
            cta: 'Start Professional Trial',
            popular: true,
            color: 'from-blue-600 to-cyan-600'
        },
        {
            name: 'Enterprise',
            price: '$99',
            period: '/month',
            description: 'For healthcare institutions and research teams',
            features: [
                'Unlimited image analyses',
                'All AI models & latest updates',
                'Fastest processing speed',
                '24/7 phone & chat support',
                'Custom AI training',
                'Advanced analytics & reporting',
                'Team collaboration tools',
                'Custom integrations',
                'HIPAA compliance',
                'Dedicated account manager'
            ],
            cta: 'Contact Sales',
            popular: false,
            color: 'from-purple-600 to-indigo-600'
        }
    ]

    const faqs = [
        {
            question: 'Can I change my plan at any time?',
            answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
        },
        {
            question: 'Is there a free trial for paid plans?',
            answer: 'Yes, we offer a 14-day free trial for both Professional and Enterprise plans. No credit card required.'
        },
        {
            question: 'What happens if I exceed my monthly limit?',
            answer: 'You can either upgrade your plan or purchase additional analyses at $0.50 per image for Professional and $0.25 for Enterprise.'
        },
        {
            question: 'Do you offer academic discounts?',
            answer: 'Yes, we provide 50% discount for verified academic institutions and research organizations.'
        },
        {
            question: 'Is my data secure and HIPAA compliant?',
            answer: 'Absolutely. All plans include enterprise-grade security, and our Enterprise plan is fully HIPAA compliant.'
        },
        {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Header Section */}
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
                        Choose Your
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Perfect Plan</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Select the plan that best fits your needs. From individual professionals to large healthcare institutions,
                        we have the right solution for you.
                    </p>
                </div>
                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <div key={index} className={`relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-105 ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center">
                                        <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-500 ml-2">{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${plan.popular
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl transform hover:-translate-y-1'
                                    : 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 backdrop-blur-sm'
                                    }`}>
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Comparison */}
            <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            Compare All Features
                        </h2>
                        <p className="text-xl text-gray-600">
                            See what's included in each plan
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200/50">
                                        <th className="text-left p-6 font-semibold text-gray-800">Features</th>
                                        <th className="text-center p-6 font-semibold text-gray-800">Free</th>
                                        <th className="text-center p-6 font-semibold text-blue-600">Professional</th>
                                        <th className="text-center p-6 font-semibold text-purple-600">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200/50">
                                    <tr>
                                        <td className="p-6 font-medium text-gray-800">Monthly Image Analyses</td>
                                        <td className="p-6 text-center text-gray-600">5</td>
                                        <td className="p-6 text-center text-gray-600">100</td>
                                        <td className="p-6 text-center text-gray-600">Unlimited</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="p-6 font-medium text-gray-800">AI Models Access</td>
                                        <td className="p-6 text-center text-gray-600">Basic</td>
                                        <td className="p-6 text-center text-gray-600">Advanced</td>
                                        <td className="p-6 text-center text-gray-600">All + Custom</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-medium text-gray-800">Processing Speed</td>
                                        <td className="p-6 text-center text-gray-600">Standard</td>
                                        <td className="p-6 text-center text-gray-600">Priority</td>
                                        <td className="p-6 text-center text-gray-600">Fastest</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="p-6 font-medium text-gray-800">Support</td>
                                        <td className="p-6 text-center text-gray-600">Email</td>
                                        <td className="p-6 text-center text-gray-600">Priority Email & Chat</td>
                                        <td className="p-6 text-center text-gray-600">24/7 Phone & Chat</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-medium text-gray-800">API Access</td>
                                        <td className="p-6 text-center">
                                            <span className="text-red-500">✕</span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-green-500">✓</span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-green-500">✓</span>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="p-6 font-medium text-gray-800">HIPAA Compliance</td>
                                        <td className="p-6 text-center">
                                            <span className="text-red-500">✕</span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-red-500">✕</span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-green-500">✓</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600">
                            Got questions? We've got answers.
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
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-sm"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of healthcare professionals who trust PixelVision for accurate medical image analysis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            Start Free Trial
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 backdrop-blur-sm transition-all duration-300">
                            Contact Sales
                        </button>
                    </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-28 h-28 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>
        </div>
    )
}

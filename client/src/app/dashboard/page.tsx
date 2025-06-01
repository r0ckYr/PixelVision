'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '../components/ImageUpload'
import ChatInterface from '../components/ChatInterface'

interface ClassificationResult {
    success: boolean
    image_id: number
    predicted_class: string
    result: number
    confidence_score: number
    mask_img: string
    recognition_result_id: number
    processing_time: number
    file_size: number
    image_format: string
    originalImage: string
}

export default function DashboardPage() {
    const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null)

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (response.ok) {
                window.location.href = '/login'
            } else {
                console.error('Logout failed')
                window.location.href = '/login'
            }
        } catch (error) {
            console.error('Logout error:', error)
            window.location.href = '/login'
        }
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const features = [
        {
            title: 'Quick Analysis',
            description: 'Upload and analyze your image in seconds with our advanced AI',
            icon: '🚀',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Accurate Results',
            description: '98.5% accuracy with AI-powered medical image analysis',
            icon: '🎯',
            color: 'from-blue-600 to-blue-800'
        },
        {
            title: 'AI Assistant',
            description: 'Get answers to your medical questions from our intelligent assistant',
            icon: '💬',
            color: 'from-cyan-500 to-blue-600'
        },
        {
            title: 'Secure Processing',
            description: 'Your medical data is protected with enterprise-grade security',
            icon: '🔒',
            color: 'from-blue-700 to-cyan-700'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <div className="container mx-auto py-12 px-6">
                {/* Upload Section */}
                <section className="max-w-4xl mx-auto mb-16">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                Upload Medical Image
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Select your medical image file for AI analysis. Our system supports various formats
                                including DICOM, PNG, JPG, and more.
                            </p>
                        </div>
                        <ImageUpload onResult={setClassificationResult} />
                    </div>
                </section>

                {/* Results Section */}
                {classificationResult && (
                    <section className="max-w-6xl mx-auto mb-16">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                    Analysis Complete
                                </h2>
                                <div className="flex items-center justify-center space-x-2 mb-6">
                                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                                    <span className="text-green-600 font-semibold text-lg">AI Analysis Successful</span>
                                </div>
                            </div>

                            {/* Processing Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {classificationResult.processing_time}s
                                    </div>
                                    <div className="text-sm text-blue-700">Processing Time</div>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {(classificationResult.confidence_score * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-green-700">Confidence</div>
                                </div>
                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        {formatFileSize(classificationResult.file_size)}
                                    </div>
                                    <div className="text-sm text-purple-700">File Size</div>
                                </div>
                                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                        {classificationResult.image_format}
                                    </div>
                                    <div className="text-sm text-orange-700">Format</div>
                                </div>
                            </div>

                            {/* Results Grid */}
                            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                                {/* Left Column - Results */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-xl p-6 backdrop-blur-sm">
                                        <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Image Classification
                                        </h3>
                                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                                            {classificationResult.predicted_class}
                                        </p>
                                        <p className="text-blue-700">AI has identified this image type with high confidence</p>
                                        <div className="mt-4 flex items-center justify-between text-sm">
                                            <span className="text-blue-600">Image ID:</span>
                                            <span className="font-medium">#{classificationResult.image_id}</span>
                                        </div>
                                    </div>

                                    <div className={`rounded-xl p-6 border backdrop-blur-sm ${classificationResult.result > 0.5
                                        ? 'bg-gradient-to-r from-red-50/80 to-pink-50/80 border-red-200/50'
                                        : 'bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-green-200/50'
                                        }`}>
                                        <h3 className={`text-xl font-bold mb-3 flex items-center ${classificationResult.result > 0.5 ? 'text-red-800' : 'text-green-800'
                                            }`}>
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Diagnosis Result
                                        </h3>
                                        <p className={`text-3xl font-bold mb-2 ${classificationResult.result > 0.5 ? 'text-red-600' : 'text-green-600'
                                            }`}>
                                            {classificationResult.result > 0.5 ? 'Positive Detection' : 'Negative Result'}
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Confidence Score:</span>
                                                <span className="font-semibold">
                                                    {(classificationResult.confidence_score * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200/50 rounded-full h-3 backdrop-blur-sm">
                                                <div
                                                    className={`h-3 rounded-full transition-all duration-300 ${classificationResult.result > 0.5 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-green-600'
                                                        }`}
                                                    style={{ width: `${classificationResult.confidence_score * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Result ID:</span>
                                                <span className="font-medium">#{classificationResult.recognition_result_id}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Performance Metrics */}
                                    <div className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 border border-gray-200/50 rounded-xl p-6 backdrop-blur-sm">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            Analysis Metrics
                                        </h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Processing Time:</span>
                                                <span className="font-medium">{classificationResult.processing_time}s</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Image Format:</span>
                                                <span className="font-medium uppercase">{classificationResult.image_format}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">File Size:</span>
                                                <span className="font-medium">{formatFileSize(classificationResult.file_size)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Mask Generated:</span>
                                                <span className={`font-medium ${classificationResult.mask_img ? 'text-green-600' : 'text-gray-500'}`}>
                                                    {classificationResult.mask_img ? 'Yes' : 'No'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Images */}
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Original Image
                                        </h3>
                                        <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100/50 backdrop-blur-sm border border-gray-200/50">
                                            <img
                                                src={classificationResult.originalImage}
                                                alt="Original Medical Image"
                                                className="w-full h-64 object-cover"
                                            />
                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-gray-700">
                                                Original
                                            </div>
                                            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white rounded-lg px-2 py-1 text-xs">
                                                {formatFileSize(classificationResult.file_size)} • {classificationResult.image_format.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Segmentation Preview */}
                                    {classificationResult.mask_img && (
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                                Segmentation Mask
                                            </h3>
                                            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100/50 backdrop-blur-sm border border-gray-200/50">
                                                <img
                                                    src={`data:image/png;base64,${classificationResult.mask_img}`}
                                                    alt="AI Segmentation Mask"
                                                    className="w-full h-64 object-cover"
                                                />
                                                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg px-2 py-1 text-xs font-medium">
                                                    AI Generated
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Chat Interface */}
                            <div className="border-t border-gray-200/50 pt-12">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Medical AI Assistant
                                    </h3>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Have questions about your results? Our AI assistant is here to help explain your
                                        medical image analysis and provide additional insights.
                                    </p>
                                </div>
                                <ChatInterface
                                    diagnosisInfo={{
                                        predictedClass: classificationResult.predicted_class,
                                        result: classificationResult.result > 0.5 ? 'Positive' : 'Negative',
                                        confidence: classificationResult.confidence_score,
                                        processingTime: classificationResult.processing_time
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* Features Section - Shown when no results */}
                {!classificationResult && (
                    <section className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                Why Choose PixelVision?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Experience the power of advanced medical AI with features designed for healthcare professionals
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl text-white mb-4 mx-auto shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                                    <p className="text-gray-600 text-center text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
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
    )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ImageData {
    image: {
        ImageID: number
        FileName: string
        ImageFile: {
            url: string
        }
        UploadDateTime: string
        FileSize: number
        ImageFormat: string
    }
    recognition_result: {
        ResultID: number
        Labels: string
        ConfidenceScores: number
        ProcessedDateTime: string
        ProcessingTime: number
        HasMask: boolean
        MaskImageBase64: string | null
    } | null
}

export default function ImagesPage() {
    const [images, setImages] = useState<ImageData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [deletingImage, setDeletingImage] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
    const [showMaskMode, setShowMaskMode] = useState<{ [key: number]: boolean }>({})

    const toggleMaskMode = (imageId: number) => {
        setShowMaskMode(prev => ({
            ...prev,
            [imageId]: !prev[imageId]
        }))
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async () => {
        try {
            setError(null)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Session expired. Redirecting to login...')
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 2000)
                    return
                } else if (response.status === 403) {
                    throw new Error('Access denied. You don\'t have permission to view images.')
                } else if (response.status >= 500) {
                    throw new Error('Server error. Please try again later.')
                } else {
                    throw new Error(`Failed to load images (${response.status}).`)
                }
            }

            const data = await response.json()
            setImages(data.combined_data || [])
        } catch (error) {
            console.error('Failed to fetch images:', error)
            const errorMessage = error instanceof Error ? error.message : 'Failed to load images.'
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteImage = async (imageId: number, fileName: string) => {
        if (!confirm(`Are you sure you want to delete "${fileName}"? This action cannot be undone.`)) return

        setDeletingImage(imageId)
        setError(null)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/delete/${imageId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Session expired. Please login again.')
                } else if (response.status === 404) {
                    throw new Error('Image not found. It may have already been deleted.')
                } else if (response.status === 403) {
                    throw new Error('Access denied. You don\'t have permission to delete this image.')
                } else if (response.status >= 500) {
                    throw new Error('Server error during deletion. Please try again.')
                } else {
                    throw new Error(`Deletion failed (${response.status}).`)
                }
            }

            await fetchImages() // Refresh the images list
        } catch (error) {
            console.error('Failed to delete image:', error)
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete image.'
            setError(errorMessage)
        } finally {
            setDeletingImage(null)
        }
    }

    const formatFileSize = (bytes?: number): string => {
        if (!bytes) return 'Unknown size'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'Unknown date'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatProcessingTime = (seconds?: number): string => {
        if (!seconds) return 'N/A'
        return `${seconds.toFixed(2)}s`
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                        <div className="absolute inset-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-lg text-gray-700 font-medium">Loading your medical images...</p>
                    <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your data</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
            </header>

            <div className="container mx-auto px-6 py-8">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                        Your Medical Images
                    </h1>
                    <p className="text-xl text-gray-600">
                        View and manage your uploaded medical images
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-400 rounded-lg p-6 mb-8">
                        <div className="flex items-start space-x-3">
                            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <div className="flex-1">
                                <h4 className="text-red-800 font-semibold mb-1">Error</h4>
                                <p className="text-red-700">{error}</p>
                            </div>
                            <button
                                onClick={() => setError(null)}
                                className="text-red-400 hover:text-red-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {images.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-12 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                                No Images Yet
                            </h3>
                            <p className="text-gray-600 mb-8">
                                You haven't uploaded any medical images yet. Start by uploading your first image for AI analysis.
                            </p>
                            <Link
                                href="/dashboard"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Upload Your First Image</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Image Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg p-6 text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                                    {images.length}
                                </div>
                                <div className="text-gray-600">Total Images</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg p-6 text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                                    {images.filter(img => img.recognition_result).length}
                                </div>
                                <div className="text-gray-600">Analyzed</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg p-6 text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                                    {formatFileSize(images.reduce((total, img) => total + (img.image.FileSize || 0), 0))}
                                </div>
                                <div className="text-gray-600">Total Size</div>
                            </div>
                        </div>

                        {/* Images Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {images.map((data) => (
                                <div key={data.image.ImageID} className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <div
                                        className="relative cursor-pointer"
                                        onClick={() => setSelectedImage(data)}
                                    >
                                        <div className="aspect-square overflow-hidden">
                                            {showMaskMode[data.image.ImageID] && data.recognition_result?.MaskImageBase64 ? (
                                                <img
                                                    src={`data:image/png;base64,${data.recognition_result.MaskImageBase64}`}
                                                    alt="Segmentation Mask"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.image.ImageFile.url}`}
                                                    alt={data.image.FileName}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            )}
                                        </div>

                                        {/* Top overlay buttons */}
                                        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                                            {/* Mask toggle button */}
                                            {data.recognition_result?.MaskImageBase64 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        toggleMaskMode(data.image.ImageID)
                                                    }}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all backdrop-blur-sm ${showMaskMode[data.image.ImageID]
                                                        ? 'bg-purple-100/90 text-purple-800 border border-purple-300/50'
                                                        : 'bg-white/90 text-gray-700 border border-white/50 hover:bg-white'
                                                        }`}
                                                    title={showMaskMode[data.image.ImageID] ? 'Show Original' : 'Show Mask'}
                                                >
                                                    {showMaskMode[data.image.ImageID] ? 'Mask' : 'Original'}
                                                </button>
                                            )}

                                            {/* Status badge */}
                                            <div>
                                                {data.recognition_result && data.recognition_result.Labels ? (
                                                    <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${data.recognition_result.ConfidenceScores > 0.5
                                                        ? 'bg-red-100/90 text-red-800 border border-red-200/50'
                                                        : 'bg-green-100/90 text-green-800 border border-green-200/50'
                                                        }`}>
                                                        {data.recognition_result.ConfidenceScores > 0.5 ? 'Positive' : 'Negative'}
                                                    </div>
                                                ) : (
                                                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100/90 text-gray-600 backdrop-blur-sm border border-gray-200/50">
                                                        No Analysis
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                            <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 truncate" title={data.image.FileName}>
                                            {data.image.FileName}
                                        </h3>

                                        {data.recognition_result && data.recognition_result.Labels ? (
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Class:</span>
                                                    <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                                        {data.recognition_result.Labels}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Confidence:</span>
                                                    <span className="text-sm font-medium">
                                                        {(data.recognition_result.ConfidenceScores * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Processing:</span>
                                                    <span className="text-sm font-medium">
                                                        {formatProcessingTime(data.recognition_result.ProcessingTime)}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 mb-4">No analysis available</p>
                                        )}

                                        <div className="text-sm text-gray-500 mb-4">
                                            <div className="flex justify-between">
                                                <span>Size:</span>
                                                <span>{formatFileSize(data.image.FileSize)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Format:</span>
                                                <span>{data.image.ImageFormat}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    deleteImage(data.image.ImageID, data.image.FileName)
                                                }}
                                                disabled={deletingImage === data.image.ImageID}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                                            >
                                                {deletingImage === data.image.ImageID ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Deleting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span>Delete</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Upload Button */}
                        <div className="text-center">
                            <Link
                                href="/dashboard"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center space-x-3"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Upload Another Image</span>
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 max-w-6xl w-full max-h-[95vh] overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200/50">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent truncate">
                                {selectedImage.image.FileName}
                            </h3>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100/50 backdrop-blur-sm rounded-lg transition-all duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(95vh-100px)]">
                            {/* Image Display */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-center bg-gray-50/80 backdrop-blur-sm rounded-lg min-h-96 border border-gray-200/50">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedImage.image.ImageFile.url}`}
                                        alt={selectedImage.image.FileName}
                                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                                    />
                                </div>

                                {/* Mask Image Display */}
                                {selectedImage.recognition_result?.MaskImageBase64 && (
                                    <div>
                                        <h5 className="font-semibold text-gray-800 mb-2">Segmentation Mask</h5>
                                        <div className="flex items-center justify-center bg-gray-50/80 backdrop-blur-sm rounded-lg min-h-64 border border-gray-200/50">
                                            <img
                                                src={`data:image/png;base64,${selectedImage.recognition_result.MaskImageBase64}`}
                                                alt="Segmentation Mask"
                                                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Image Details */}
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Image Details</h4>
                                    <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">File Name:</span>
                                            <span className="font-medium text-right truncate ml-2" title={selectedImage.image.FileName}>
                                                {selectedImage.image.FileName}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">File Size:</span>
                                            <span className="font-medium">{formatFileSize(selectedImage.image.FileSize)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Format:</span>
                                            <span className="font-medium">{selectedImage.image.ImageFormat}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Upload Date:</span>
                                            <span className="font-medium">{formatDate(selectedImage.image.UploadDateTime)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Analysis Results */}
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Analysis Results</h4>
                                    {selectedImage.recognition_result && selectedImage.recognition_result.Labels ? (
                                        <div className="space-y-4">
                                            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-lg p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-gray-600">Predicted Class:</span>
                                                    <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-lg">
                                                        {selectedImage.recognition_result.Labels}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={`border rounded-lg p-4 backdrop-blur-sm ${selectedImage.recognition_result.ConfidenceScores > 0.5
                                                ? 'bg-red-50/80 border-red-200/50'
                                                : 'bg-green-50/80 border-green-200/50'
                                                }`}>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-medium text-gray-600">Diagnosis Result:</span>
                                                        <span className={`font-bold text-lg ${selectedImage.recognition_result.ConfidenceScores > 0.5
                                                            ? 'text-red-700'
                                                            : 'text-green-700'
                                                            }`}>
                                                            {selectedImage.recognition_result.ConfidenceScores > 0.5 ? 'Positive' : 'Negative'}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-sm font-medium text-gray-600">Confidence Score:</span>
                                                            <span className="font-bold">
                                                                {(selectedImage.recognition_result.ConfidenceScores * 100).toFixed(1)}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200/50 rounded-full h-3 backdrop-blur-sm">
                                                            <div
                                                                className={`h-3 rounded-full transition-all duration-300 ${selectedImage.recognition_result.ConfidenceScores > 0.5
                                                                    ? 'bg-gradient-to-r from-red-500 to-red-600'
                                                                    : 'bg-gradient-to-r from-green-500 to-green-600'
                                                                    }`}
                                                                style={{ width: `${selectedImage.recognition_result.ConfidenceScores * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Processing Information */}
                                            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-lg p-4">
                                                <h5 className="font-semibold text-blue-800 mb-2">Processing Information</h5>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-blue-600">Processing Time:</span>
                                                        <span className="font-medium text-blue-800">
                                                            {formatProcessingTime(selectedImage.recognition_result.ProcessingTime)}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-blue-600">Processed Date:</span>
                                                        <span className="font-medium text-blue-800">
                                                            {formatDate(selectedImage.recognition_result.ProcessedDateTime)}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-blue-600">Segmentation Mask:</span>
                                                        <span className={`font-medium ${selectedImage.recognition_result.HasMask ? 'text-green-600' : 'text-gray-600'}`}>
                                                            {selectedImage.recognition_result.HasMask ? 'Available' : 'Not Available'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200/50 rounded-lg p-6 text-center">
                                            <svg className="w-12 h-12 text-yellow-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-yellow-800 font-semibold mb-2">No Analysis Available</p>
                                            <p className="text-yellow-700 text-sm">
                                                This image hasn't been analyzed yet or the analysis data is not available.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="pt-4 border-t border-gray-200/50">
                                    <button
                                        onClick={() => {
                                            deleteImage(selectedImage.image.ImageID, selectedImage.image.FileName)
                                            setSelectedImage(null)
                                        }}
                                        disabled={deletingImage === selectedImage.image.ImageID}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                    >
                                        {deletingImage === selectedImage.image.ImageID ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Deleting Image...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span>Delete Image</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Overlay for Deletion */}
            {deletingImage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4 border border-gray-200/50">
                        <div className="relative w-16 h-16 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-red-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                            <div className="absolute inset-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Deleting Image</h3>
                        <p className="text-gray-600">Removing the image from your gallery...</p>
                    </div>
                </div>
            )}
        </div>
    )
}

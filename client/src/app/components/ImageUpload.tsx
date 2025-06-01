'use client'

import { useState, useRef } from 'react'

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

interface ImageUploadProps {
    onResult: (result: ClassificationResult) => void
}

export default function ImageUpload({ onResult }: ImageUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff']
    const maxFileSize = 10 * 1024 * 1024 // 10MB

    const validateFile = (file: File): string | null => {
        if (!supportedFormats.includes(file.type)) {
            return 'Please select a valid image file (JPG, PNG, WEBP, BMP, TIFF)'
        }
        if (file.size > maxFileSize) {
            return 'File size must be less than 10MB'
        }
        return null
    }

    const handleFileSelection = (file: File) => {
        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            return
        }

        setSelectedFile(file)
        setError(null)

        // Create preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
        const newPreviewUrl = URL.createObjectURL(file)
        setPreviewUrl(newPreviewUrl)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleFileSelection(file)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            handleFileSelection(file)
        }
    }

    const clearSelection = () => {
        setSelectedFile(null)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image file')
            return
        }

        setIsLoading(true)
        setError(null)
        setUploadProgress(0)

        try {
            const formData = new FormData()
            formData.append('ImageFile', selectedFile)

            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval)
                        return 90
                    }
                    return prev + Math.random() * 15
                })
            }, 200)

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/`, {
                method: 'POST',
                headers: {
                    // Don't set Content-Type for FormData - browser will set it with boundary
                },
                body: formData,
                credentials: 'include',
            })

            clearInterval(progressInterval)
            setUploadProgress(100)

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication required. Please login again.')
                } else if (response.status === 403) {
                    throw new Error('Access denied. Please check your permissions.')
                } else if (response.status === 413) {
                    throw new Error('File too large. Please select a smaller image.')
                } else if (response.status === 415) {
                    throw new Error('Unsupported file format. Please use JPG, PNG, or WEBP.')
                } else if (response.status === 429) {
                    throw new Error('Too many requests. Please wait a moment before trying again.')
                } else if (response.status >= 500) {
                    throw new Error('Server error. Please try again later.')
                } else {
                    throw new Error(`Upload failed (${response.status}). Please try again.`)
                }
            }

            const data = await response.json()

            // Check if the response has the expected structure
            if (data.success && data.predicted_class && data.result !== undefined) {
                const originalImageUrl = URL.createObjectURL(selectedFile)

                // Map the backend response to our interface
                const result: ClassificationResult = {
                    success: data.success,
                    image_id: data.image_id,
                    predicted_class: data.predicted_class,
                    result: data.result,
                    confidence_score: data.confidence_score,
                    mask_img: data.mask_img,
                    recognition_result_id: data.recognition_result_id,
                    processing_time: data.processing_time,
                    file_size: data.file_size,
                    image_format: data.image_format,
                    originalImage: originalImageUrl
                }

                onResult(result)

                // Clear the form after successful upload
                setTimeout(() => {
                    clearSelection()
                }, 1000)
            } else {
                throw new Error(data.error || 'Invalid response from server. Please try again.')
            }
        } catch (err) {
            console.error('Upload error:', err)
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during upload.'
            setError(errorMessage)
        } finally {
            setIsLoading(false)
            setUploadProgress(0)
        }
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <div className="space-y-8">
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 backdrop-blur-sm ${dragActive
                    ? 'border-blue-500 bg-blue-50/80 scale-105 shadow-lg'
                    : selectedFile
                        ? 'border-green-400 bg-green-50/80'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/20'
                    } cursor-pointer group`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="space-y-6">
                    {/* Icon */}
                    <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${selectedFile
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-200'
                        : dragActive
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-blue-200 scale-110'
                            : 'bg-gradient-to-r from-gray-400 to-gray-500 group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:scale-105 group-hover:shadow-blue-200'
                        }`}>
                        {selectedFile ? (
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : dragActive ? (
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3 3m0 0l3-3m-3 3V9" />
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        )}
                    </div>

                    {/* Text Content */}
                    <div>
                        <h3 className={`text-xl font-bold ${selectedFile ? 'text-green-700' : dragActive ? 'text-blue-700' : 'text-gray-700'}`}>
                            {selectedFile
                                ? 'Image Ready for Analysis'
                                : dragActive
                                    ? 'Drop your image here'
                                    : 'Upload Medical Image'
                            }
                        </h3>
                        <p className="text-gray-600 mt-2">
                            {selectedFile
                                ? `Selected: ${selectedFile.name}`
                                : 'Drag and drop your medical image here, or click to browse'
                            }
                        </p>
                        <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-blue-700 font-medium">JPG, PNG, WEBP, BMP, TIFF</span>
                            </span>
                            <span className="flex items-center space-x-1 bg-cyan-50 px-3 py-1 rounded-full">
                                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-cyan-700 font-medium">Max 10MB</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* File Preview */}
            {selectedFile && previewUrl && (
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200/50">
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-md"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                                Selected Image
                            </h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p className="flex items-center space-x-2">
                                    <span className="font-medium text-blue-600">File:</span>
                                    <span className="truncate">{selectedFile.name}</span>
                                </p>
                                <p className="flex items-center space-x-2">
                                    <span className="font-medium text-blue-600">Size:</span>
                                    <span>{formatFileSize(selectedFile.size)}</span>
                                </p>
                                <p className="flex items-center space-x-2">
                                    <span className="font-medium text-blue-600">Type:</span>
                                    <span className="uppercase">{selectedFile.type.split('/')[1]}</span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                clearSelection()
                            }}
                            className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all duration-300"
                            title="Remove image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center space-x-3"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analyzing Image...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Start AI Analysis</span>
                        </>
                    )}
                </button>

                {selectedFile && !isLoading && (
                    <button
                        onClick={clearSelection}
                        className="sm:w-auto w-full bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm text-gray-700 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-200/50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Reset</span>
                    </button>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-400 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div className="flex-1">
                            <h4 className="text-red-800 font-semibold mb-1">Upload Error</h4>
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

            {/* Enhanced Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-center max-w-md mx-4 border border-gray-200/50">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            <div className="absolute inset-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                            Analyzing Your Medical Image
                        </h3>
                        <p className="text-gray-600 mb-6">Our advanced AI is processing your image for accurate medical analysis...</p>

                        <div className="bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>

                        <p className="text-sm text-gray-500">
                            {uploadProgress < 30 ? 'Uploading image...' :
                                uploadProgress < 60 ? 'Processing with AI...' :
                                    uploadProgress < 90 ? 'Generating analysis...' :
                                        'Finalizing results...'}
                        </p>

                        <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-gray-500">
                            <div className="text-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <span>Upload</span>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span>AI Analysis</span>
                            </div>
                            <div className="text-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span>Results</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div className="text-sm">
                        <h4 className="font-semibold text-blue-800 mb-1">Privacy & Security</h4>
                        <p className="text-blue-700">
                            Your medical images are processed securely and are never permanently stored on our servers.
                            All data is encrypted during transmission and processing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Icons
const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
)

const EmailIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
)

const EditIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
)

const SaveIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
)

// Notification Component
const Notification = ({ type, message, onClose }: { type: 'success' | 'error' | 'info', message: string, onClose: () => void }) => {
    const bgColor = type === 'success' ? 'bg-emerald-50 border-emerald-200' :
        type === 'error' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'

    const textColor = type === 'success' ? 'text-emerald-800' :
        type === 'error' ? 'text-red-800' :
            'text-blue-800'

    const iconColor = type === 'success' ? 'text-emerald-600' :
        type === 'error' ? 'text-red-600' :
            'text-blue-600'

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className={`fixed top-4 right-4 z-50 ${bgColor} border ${textColor} px-6 py-4 rounded-xl shadow-lg max-w-md`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {type === 'success' && <CheckIcon className={`w-5 h-5 ${iconColor}`} />}
                    {type === 'error' && (
                        <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    {type === 'info' && (
                        <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span className="font-medium">{message}</span>
                </div>
                <button
                    onClick={onClose}
                    className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </motion.div>
    )
}

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: ''
    })
    const [originalData, setOriginalData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        // Fetch current user data
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/`, {
                    credentials: 'include'
                })
                if (response.ok) {
                    const data = await response.json()
                    setFormData(data)
                    setOriginalData(data)
                } else {
                    setNotification({ type: 'error', message: 'Failed to load profile data' })
                }
            } catch (err) {
                console.error('Failed to fetch profile')
                setNotification({ type: 'error', message: 'Failed to load profile data' })
            }
        }

        fetchProfile()
    }, [])

    useEffect(() => {
        // Check for changes
        const changed = JSON.stringify(formData) !== JSON.stringify(originalData)
        setHasChanges(changed)
    }, [formData, originalData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (error) setError('')
        if (success) setSuccess('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess('')

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const successMsg = 'Profile updated successfully!'
                setSuccess(successMsg)
                setNotification({ type: 'success', message: successMsg })
                setOriginalData(formData)
                setIsEditing(false)
            } else {
                const errorMsg = 'Failed to update profile'
                setError(errorMsg)
                setNotification({ type: 'error', message: errorMsg })
            }
        } catch (err) {
            const errorMsg = 'Update failed. Please try again.'
            setError(errorMsg)
            setNotification({ type: 'error', message: errorMsg })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setFormData(originalData)
        setIsEditing(false)
        setError('')
        setSuccess('')
    }

    const inputFields = [
        { name: 'first_name', type: 'text', label: 'First Name', placeholder: 'Enter your first name', icon: UserIcon },
        { name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Enter your last name', icon: UserIcon },
        { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter your username', icon: UserIcon },
        { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email', icon: EmailIcon }
    ]

    const getInitials = () => {
        const first = formData.first_name?.charAt(0)?.toUpperCase() || ''
        const last = formData.last_name?.charAt(0)?.toUpperCase() || ''
        return first + last || formData.username?.charAt(0)?.toUpperCase() || 'U'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
            </div>

            <AnimatePresence>
                {notification && (
                    <Notification
                        type={notification.type}
                        message={notification.message}
                        onClose={() => setNotification(null)}
                    />
                )}
            </AnimatePresence>

            <motion.div
                className="max-w-2xl mx-auto relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg mr-4">
                            P
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">PixelVision</h1>
                            <p className="text-sm text-gray-600">Medical Imaging Platform</p>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h2>
                    <p className="text-gray-600">Manage your account information and preferences</p>
                </motion.div>

                <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <motion.div
                                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl font-bold"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    {getInitials()}
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {formData.first_name && formData.last_name
                                            ? `${formData.first_name} ${formData.last_name}`
                                            : formData.username || 'User'
                                        }
                                    </h3>
                                    <p className="text-blue-100">{formData.email}</p>
                                </div>
                            </div>
                            <motion.button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <EditIcon className="w-4 h-4" />
                                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <div className="space-y-6">
                            {inputFields.map((field, index) => (
                                <motion.div
                                    key={field.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                >
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {field.label}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <field.icon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            value={formData[field.name as keyof typeof formData]}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField(field.name)}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder={field.placeholder}
                                            disabled={!isEditing}
                                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${!isEditing
                                                ? 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'
                                                : focusedField === field.name
                                                    ? 'border-blue-500 bg-blue-50/50 shadow-md'
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center space-x-2"
                                    >
                                        <CheckIcon className="w-4 h-4" />
                                        <span>{success}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Action Buttons */}
                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div
                                        className="flex space-x-4 pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                    >
                                        <motion.button
                                            onClick={handleSubmit}
                                            disabled={isLoading || !hasChanges}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:shadow-lg flex items-center justify-center space-x-2"
                                            whileHover={!isLoading && hasChanges ? { scale: 1.02 } : {}}
                                            whileTap={!isLoading && hasChanges ? { scale: 0.98 } : {}}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Updating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <SaveIcon className="w-5 h-5" />
                                                    <span>Save Changes</span>
                                                </>
                                            )}
                                        </motion.button>
                                        <motion.button
                                            onClick={handleCancel}
                                            disabled={isLoading}
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50"
                                            whileHover={!isLoading ? { scale: 1.02 } : {}}
                                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                                        >
                                            Cancel
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Information */}
                <motion.div
                    className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-600">Account Verified</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <span className="text-gray-600">Secure Connection</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

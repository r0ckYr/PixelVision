'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// Icons
const EyeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
)

const EyeOffIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className={`fixed top-4 right-4 z-50 ${bgColor} border ${textColor} px-6 py-4 rounded-xl shadow-lg max-w-md`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {type === 'success' && <CheckIcon className="w-5 h-5 text-emerald-600" />}
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

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
    const [showPassword, setShowPassword] = useState({ password1: false, password2: false })
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (formData.password1 !== formData.password2) {
            setError('Passwords do not match')
            setNotification({ type: 'error', message: 'Passwords do not match' })
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            })

            if (response.ok) {
                setNotification({ type: 'success', message: 'Account created successfully! Redirecting...' })
                setTimeout(() => {
                    window.location.href = '/dashboard'
                }, 1500)
            } else {
                const data = await response.json()
                const errorMsg = data.error || 'Registration failed'
                setError(errorMsg)
                setNotification({ type: 'error', message: errorMsg })
            }
        } catch (err) {
            const errorMsg = 'Registration failed. Please try again.'
            setError(errorMsg)
            setNotification({ type: 'error', message: errorMsg })
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        if (error) setError('')
    }

    const inputFields = [
        { name: 'username', type: 'text', label: 'Username', placeholder: 'Choose a username', icon: '👤' },
        { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email', icon: '✉️' },
        { name: 'password1', type: 'password', label: 'Password', placeholder: 'Create a strong password', icon: '🔒' },
        { name: 'password2', type: 'password', label: 'Confirm Password', placeholder: 'Confirm your password', icon: '🔒' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
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
                className="w-full max-w-md relative z-10"
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
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                            P
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 ml-3">PixelVision</h1>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-600">Join the future of medical imaging analysis</p>
                </motion.div>

                {/* Form */}
                <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
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
                                        <span className="text-gray-400 text-lg">{field.icon}</span>
                                    </div>
                                    <input
                                        name={field.name}
                                        type={field.type === 'password' && showPassword[field.name as keyof typeof showPassword] ? 'text' : field.type}
                                        required
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField(field.name)}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder={field.placeholder}
                                        className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${focusedField === field.name
                                            ? 'border-blue-500 bg-blue-50/50 shadow-md'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    />
                                    {field.type === 'password' && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(prev => ({
                                                ...prev,
                                                [field.name]: !prev[field.name as keyof typeof showPassword]
                                            }))}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword[field.name as keyof typeof showPassword] ?
                                                <EyeOffIcon className="w-5 h-5" /> :
                                                <EyeIcon className="w-5 h-5" />
                                            }
                                        </button>
                                    )}
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
                        </AnimatePresence>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:shadow-lg transform hover:scale-[1.02] disabled:hover:scale-100"
                            whileHover={!isLoading ? { scale: 1.02 } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <span className="flex items-center justify-center space-x-2">
                                    <span>Create Account</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            )}
                        </motion.button>
                    </div>

                    {/* Footer */}
                    <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Terms */}
                <motion.p
                    className="text-center text-xs text-gray-500 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    By creating an account, you agree to our{' '}
                    <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </motion.p>
            </motion.div>
        </div>
    )
}

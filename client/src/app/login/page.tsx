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

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            })

            if (response.ok) {
                setNotification({ type: 'success', message: 'Login successful! Redirecting...' })
                setTimeout(() => {
                    window.location.href = '/dashboard'
                }, 1500)
            } else {
                const data = await response.json()
                const errorMsg = data.error || 'Invalid credentials'
                setError(errorMsg)
                setNotification({ type: 'error', message: errorMsg })
            }
        } catch (err) {
            const errorMsg = 'Login failed. Please try again.'
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
        { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter your username', icon: '👤' },
        { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password', icon: '🔒' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
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
                        <motion.div
                            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            P
                        </motion.div>
                        <h1 className="text-2xl font-bold text-gray-900 ml-3">PixelVision</h1>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to continue your medical imaging analysis</p>
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
                                        type={field.type === 'password' && showPassword ? 'text' : field.type}
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
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ?
                                                <EyeOffIcon className="w-5 h-5" /> :
                                                <EyeIcon className="w-5 h-5" />
                                            }
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {/* Forgot Password Link */}
                        <motion.div
                            className="text-right"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors hover:underline">
                                Forgot password?
                            </Link>
                        </motion.div>

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
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <span className="flex items-center justify-center space-x-2">
                                    <span>Sign In</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                </span>
                            )}
                        </motion.button>
                    </div>

                    {/* Divider */}
                    <motion.div
                        className="mt-8 flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">or continue with</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </motion.div>

                    {/* Social Login Options */}
                    <motion.div
                        className="mt-6 space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <motion.button
                            type="button"
                            className="w-full flex items-center justify-center space-x-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="font-medium text-gray-700">Continue with Google</span>
                        </motion.button>

                        <motion.button
                            type="button"
                            className="w-full flex items-center justify-center space-x-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="font-medium text-gray-700">Continue with Facebook</span>
                        </motion.button>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Security Notice */}
                <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Your information is protected with enterprise-grade security</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

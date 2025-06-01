'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface UserProfile {
    id: string
    email: string
    firstName: string
    lastName: string
    profilePicture?: string
}

export default function Navbar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const userData = await response.json()
                setUser(userData)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout/`, {
                method: 'POST',
                credentials: 'include'
            })
            setUser(null)
            setIsUserMenuOpen(false)
            window.location.href = '/'
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const publicNavLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/features', label: 'Features' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/contact', label: 'Contact' }
    ]

    const authenticatedNavLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/images', label: 'Images' },
        { href: '/profile', label: 'Profile' }
    ]

    const userMenuItems = [
        { href: '/profile', label: 'Profile', icon: '👤' },
    ]

    if (loading) {
        return (
            <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg animate-pulse"></div>
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    PixelVision
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    // Unauthenticated Navbar
    if (!user) {
        return (
            <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-all duration-300">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
                                </div>
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    PixelVision
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation - Public */}
                        <div className="hidden md:flex items-center space-x-1">
                            {publicNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${pathname === link.href
                                        ? 'text-blue-600 bg-blue-50/80 shadow-sm'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-3">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-300"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-600 hover:text-blue-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu - Public */}
                    {isMenuOpen && (
                        <div className="md:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-sm">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {publicNavLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block px-3 py-2 rounded-lg transition-all duration-300 ${pathname === link.href
                                            ? 'text-blue-600 bg-blue-50 font-medium'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="border-t border-gray-200/50 pt-4 mt-4 space-y-2">
                                    <Link
                                        href="/login"
                                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block px-3 py-2 mt-2 text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-medium text-center shadow-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        )
    }

    // Authenticated Navbar
    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex items-center space-x-3 hover:scale-105 transition-all duration-300">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                                <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
                            </div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                PixelVision
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Authenticated */}
                    <div className="hidden md:flex items-center space-x-1">
                        {authenticatedNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${pathname === link.href
                                    ? 'text-blue-600 bg-blue-50/80 shadow-sm'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50/50 transition-all duration-300 border border-transparent hover:border-blue-200/50"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                                    {user.profilePicture ? (
                                        <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                                    )}
                                </div>
                                <div className="hidden md:block text-left">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user.firstName} {user.lastName}
                                    </div>
                                    <div className="text-xs text-blue-600/70 truncate max-w-32">
                                        {user.email}
                                    </div>
                                </div>
                                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-200/50">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                                {user.profilePicture ? (
                                                    <img src={user.profilePicture} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                                                ) : (
                                                    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-xs text-blue-600/70">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {userMenuItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <span>{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}

                                    <div className="border-t border-gray-200/50 mt-2 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 transition-colors rounded-lg"
                                        >
                                            <span>🚪</span>
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-600 hover:text-blue-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu - Authenticated */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-sm">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {authenticatedNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-3 py-2 rounded-lg transition-all duration-300 ${pathname === link.href
                                        ? 'text-blue-600 bg-blue-50 font-medium'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="border-t border-gray-200/50 pt-4 mt-4">
                                <div className="px-3 py-2 mb-2">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                                            {user.profilePicture ? (
                                                <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                                            ) : (
                                                `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.firstName} {user.lastName}
                                            </div>
                                            <div className="text-xs text-blue-600/70">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {userMenuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 w-full px-3 py-2 mt-2 text-red-600 hover:bg-red-50/50 rounded-lg transition-all duration-300"
                                >
                                    <span>🚪</span>
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Click outside to close dropdowns */}
            {(isUserMenuOpen || isMenuOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsUserMenuOpen(false)
                        setIsMenuOpen(false)
                    }}
                />
            )}
        </nav>
    )
}

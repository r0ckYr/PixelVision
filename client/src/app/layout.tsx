import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Medical Image Classification',
    description: 'Accurate Image Classification and Disease Diagnosis using AI',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50`}>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    )
}

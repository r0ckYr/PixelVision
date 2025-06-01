'use client'

import { useState, useRef, useEffect } from 'react'

interface ChatInterfaceProps {
    diagnosisInfo: {
        predictedClass: string
        result: string
        confidence: number
        processingTime: number
    }
}

interface Message {
    text: string
    sender: 'user' | 'assistant'
    timestamp: Date
}

export default function ChatInterface({ diagnosisInfo }: ChatInterfaceProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            text: 'Hello! I\'m your AI Medical Assistant. I can help answer questions about your medical scan results. What would you like to know?',
            sender: 'assistant',
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [error, setError] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen && messages.length === 1) {
            const contextMessage = `Based on your medical scan analysis:
            
📋 **Image Classification:** ${diagnosisInfo.predictedClass}
🔬 **Diagnosis Result:** ${diagnosisInfo.result}
📊 **Confidence Score:** ${(diagnosisInfo.confidence * 100).toFixed(1)}%
⏱️ **Processing Time:** ${diagnosisInfo.processingTime}s

I'm here to help you understand these results better. You can ask me about:
• What these results mean
• Treatment recommendations
• Follow-up steps
• Any concerns you might have

How can I assist you today?`

            setMessages(prev => [...prev, {
                text: contextMessage,
                sender: 'assistant',
                timestamp: new Date()
            }])
        }
    }, [isOpen, diagnosisInfo])

    const createPrompt = (userMessage: string) => {
        const systemPrompt = `You are a medical AI assistant for image classification results. Be concise, helpful, and professional.

CLASSIFICATION RESULTS:
• Diagnosis: ${diagnosisInfo.predictedClass}
• Result: ${diagnosisInfo.result}
• Confidence: ${(diagnosisInfo.confidence * 100).toFixed(1)}%
• Processing Time: ${diagnosisInfo.processingTime}s

RESPONSE GUIDELINES:
- Keep answers SHORT (2-3 sentences max)
- Use simple, non-technical language
- Be direct and to the point
- Always end with "Consult your doctor for medical advice"
- Focus only on what's asked
- Avoid lengthy explanations unless specifically requested

USER QUESTION: ${userMessage}

BRIEF ANSWER:`

        return systemPrompt
    }

    const sendMessage = async () => {
        if (!inputValue.trim() || isTyping) return

        const userMessage = inputValue.trim()
        setInputValue('')
        setError('')

        // Add user message immediately
        setMessages(prev => [...prev, {
            text: userMessage,
            sender: 'user',
            timestamp: new Date()
        }])
        setIsTyping(true)

        try {
            // Create the full prompt with context
            const fullPrompt = createPrompt(userMessage)

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: fullPrompt, // Send the full prompt instead of just the user message
                    context: {
                        predictedClass: diagnosisInfo.predictedClass,
                        result: diagnosisInfo.result,
                        confidence: diagnosisInfo.confidence,
                        processingTime: diagnosisInfo.processingTime
                    }
                }),
                credentials: 'include',
            })

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication required. Please login again.')
                } else if (response.status === 403) {
                    throw new Error('Access denied. Please check your permissions.')
                } else if (response.status === 429) {
                    throw new Error('Too many requests. Please wait a moment before trying again.')
                } else {
                    throw new Error('Failed to get response from AI assistant.')
                }
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let assistantMessage = ''

            if (reader) {
                // Add empty assistant message for streaming
                setMessages(prev => [...prev, {
                    text: '',
                    sender: 'assistant',
                    timestamp: new Date()
                }])

                try {
                    while (true) {
                        const { done, value } = await reader.read()
                        if (done) break

                        const chunk = decoder.decode(value, { stream: true })
                        const lines = chunk.split('\n')

                        for (const line of lines) {
                            if (line.trim()) {
                                try {
                                    const data = JSON.parse(line)
                                    if (data.chunk) {
                                        assistantMessage += data.chunk
                                        setMessages(prev => {
                                            const newMessages = [...prev]
                                            newMessages[newMessages.length - 1] = {
                                                text: assistantMessage,
                                                sender: 'assistant',
                                                timestamp: new Date()
                                            }
                                            return newMessages
                                        })
                                    } else if (data.error) {
                                        throw new Error(data.error)
                                    }
                                } catch (parseError) {
                                    // If it's not JSON, it might be plain text
                                    if (line.trim() !== '') {
                                        assistantMessage += line
                                        setMessages(prev => {
                                            const newMessages = [...prev]
                                            newMessages[newMessages.length - 1] = {
                                                text: assistantMessage,
                                                sender: 'assistant',
                                                timestamp: new Date()
                                            }
                                            return newMessages
                                        })
                                    }
                                }
                            }
                        }
                    }
                } finally {
                    reader.releaseLock()
                }
            }

            // If no content was received, show error
            if (!assistantMessage.trim()) {
                throw new Error('No response received from AI assistant.')
            }

        } catch (error) {
            console.error('Chat error:', error)
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.'
            setError(errorMessage)

            setMessages(prev => [...prev, {
                text: `I apologize, but I encountered an error: ${errorMessage}. Please try again or contact support if the issue persists.`,
                sender: 'assistant',
                timestamp: new Date()
            }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const quickQuestions = [
        "What does this diagnosis mean?",
        "Should I be concerned about these results?",
        "What are the next steps?",
        "Are there any treatment options?"
    ]

    const handleQuickQuestion = (question: string) => {
        setInputValue(question)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>Chat with AI Assistant</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden border border-gray-200/50">
                        {/* Enhanced Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">AI Medical Assistant</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <p className="text-blue-100 text-sm">Online & Ready to Help</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="text-right mr-4">
                                    <p className="text-sm text-blue-100">Analysis Results</p>
                                    <p className="text-xs text-blue-200">{diagnosisInfo.predictedClass}</p>
                                    <p className="text-xs text-blue-200">{(diagnosisInfo.confidence * 100).toFixed(1)}% confidence</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 p-2 hover:bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-300"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-blue-50/30 to-white/50 backdrop-blur-sm space-y-6">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-start space-x-3 max-w-4xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${message.sender === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600'
                                            : 'bg-gradient-to-r from-green-500 to-emerald-600'
                                            }`}>
                                            {message.sender === 'user' ? (
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div
                                            className={`px-6 py-4 rounded-2xl shadow-sm backdrop-blur-sm ${message.sender === 'user'
                                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-md'
                                                : 'bg-white/80 text-gray-800 border border-gray-200/50 rounded-bl-md'
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                                            <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm text-gray-600 px-6 py-4 rounded-2xl rounded-bl-md border border-gray-200/50 shadow-sm flex items-center space-x-3">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">AI is analyzing your question...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        {messages.length <= 2 && (
                            <div className="px-6 py-4 bg-blue-50/50 backdrop-blur-sm border-t border-gray-200/50">
                                <p className="text-sm text-gray-600 mb-3 font-medium">Quick questions to get started:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickQuestion(question)}
                                            className="bg-white/80 backdrop-blur-sm hover:bg-blue-50/80 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-lg text-sm border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <div className="px-6 py-3 bg-red-50/80 backdrop-blur-sm border-t border-red-200/50">
                                <div className="flex items-center space-x-2 text-red-700">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Enhanced Input */}
                        <div className="p-6 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
                            <div className="flex items-end space-x-4">
                                <div className="flex-1 relative">
                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything about your medical results..."
                                        className="w-full px-4 py-3 border border-gray-300/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 text-sm bg-white/80"
                                        rows={2}
                                        disabled={isTyping}
                                    />
                                </div>
                                <button
                                    onClick={sendMessage}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center space-x-2"
                                >
                                    {isTyping ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Press Enter to send, Shift+Enter for new line</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

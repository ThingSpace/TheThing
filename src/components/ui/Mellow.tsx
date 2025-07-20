'use client'

import { useState, useRef, useEffect } from 'react'
import { trpc } from '../../utils/trpc'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

type Message = {
    role: 'assistant' | 'user'
    content: string
}

export default function MellowChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Start a conversation with Mellow...' }
    ])
    const [sessionId, setSessionId] = useState<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const [hasMounted, setHasMounted] = useState(false)
    const [showDisclaimer, setShowDisclaimer] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    // tRPC hooks
    const createSession = trpc.mellow.createSession.useMutation({
        onSuccess: (id: string) => setSessionId(id)
    })
    const sendMessage = trpc.mellow.sendMessage.useMutation()
    const [historyEnabled, setHistoryEnabled] = useState(false)
    const getHistory = trpc.mellow.getHistory.useQuery(sessionId ? { sessionId } : { sessionId: '' }, {
        enabled: !!sessionId && historyEnabled,
        retry: false
    })

    // Utility function to extract HTTP status from tRPC errors
    function extractHttpStatus(error: unknown): number | undefined {
        if (
            error &&
            typeof error === 'object' &&
            error !== null &&
            'data' in error &&
            typeof (error as Record<string, unknown>).data === 'object' &&
            (error as Record<string, unknown>).data !== null
        ) {
            return (error as { data: { httpStatus?: number } }).data.httpStatus;
        }
        return undefined;
    }

    // Handle history fetch errors (ignore 404)
    useEffect(() => {
        const httpStatus = extractHttpStatus(getHistory.error);
        if (getHistory.error && httpStatus !== 404) {
            // Optionally log or handle other errors
        }
    }, [getHistory.error])

    // Enable history fetch after session is created
    useEffect(() => {
        if (sessionId) setHistoryEnabled(true)
    }, [sessionId])

    // Update messages when getHistory.data changes
    useEffect(() => {
        if (getHistory.data?.messages) {
            setMessages(getHistory.data.messages as Message[])
        }
    }, [getHistory.data])

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isOpen])

    // Create session on open if not exists
    useEffect(() => {
        if (isOpen && !sessionId && createSession.status === 'idle') {
            createSession.mutate()
        }
    }, [isOpen, sessionId, createSession])

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        const trimmed = input.trim()
        if (!trimmed || loading || !sessionId) return
        setMessages(prev => [
            ...prev.filter((m, i) => i !== 0 || m.role !== 'assistant'),
            { role: 'user', content: trimmed }
        ])
        setInput('')
        setLoading(true)
        try {
            const data = (await sendMessage.mutateAsync({
                sessionId,
                message: trimmed
            })) as { response?: string }
            setMessages(prev => [...prev, { role: 'assistant', content: data?.response || '(No response)' }])
        } catch {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }
            ])
        } finally {
            setLoading(false)
        }
    }

    if (!hasMounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Chat Pill Button - Hidden on Mobile when modal is open */}
            <motion.button
                onClick={toggleChat}
                className={`fixed bottom-6 left-6 md:left-6 pointer-events-auto z-[9999] ${
                    isOpen ? 'hidden md:block' : 'block'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center gap-3 bg-gray-900 border-2 border-white rounded-full px-4 py-3 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <Image
                            src="https://mymellow.space/logo.png"
                            alt="Mellow Logo"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                        />
                    </div>
                    <span className="text-white font-mono text-sm font-medium pr-2">Chat w/ Mellow</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                </div>
            </motion.button>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 pointer-events-auto z-[9998] bg-black/20 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
                            onClick={toggleChat}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 100 }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                                duration: 0.4
                            }}
                            className="fixed inset-0 md:inset-auto md:bottom-24 md:left-6 pointer-events-auto z-[9999]"
                        >
                            <div className="w-full h-full md:w-[500px] md:h-[600px] bg-clouds-pattern border-0 md:border-2 border-white rounded-none md:rounded-3xl shadow-2xl flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                            <Image
                                                src="https://mymellow.space/logo.png"
                                                alt="Mellow Logo"
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 object-contain"
                                            />
                                        </div>
                                        <h2 className="text-black font-mono text-lg md:text-xl font-bold">
                                            Mellow Chat
                                        </h2>
                                    </div>
                                    <button onClick={toggleChat} className="text-red transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Subtitle */}
                                <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-700">
                                    <p className="text-gray font-mono text-xs md:text-sm">
                                        Your AI-Powered Mental Health Companion for Athing
                                    </p>
                                </div>

                                {/* Chat Area */}
                                <div className="flex-1 p-4 md:p-6 bg-white/60 overflow-hidden">
                                    <div
                                        className="flex flex-col gap-3 md:gap-4 flex-1 overflow-y-auto pr-2"
                                        style={{ maxHeight: '100%' }}
                                    >
                                        {messages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={
                                                    msg.role === 'user'
                                                        ? 'self-end bg-blue-100 text-black px-3 md:px-4 py-2 rounded-2xl max-w-[85%] md:max-w-[80%] font-mono text-sm'
                                                        : 'self-start bg-gray-200 text-gray-800 px-3 md:px-4 py-2 rounded-2xl max-w-[85%] md:max-w-[80%] font-mono text-sm'
                                                }
                                            >
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </div>
                                        ))}
                                        {loading && (
                                            <div className="self-start text-gray-500 font-mono text-xs">
                                                Mellow is typing...
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-4 md:p-6 border-t border-gray-700">
                                    {/* Disclaimer Toggle */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-800 font-mono text-xs">Disclaimer</span>
                                        <button
                                            onClick={() => setShowDisclaimer(prev => !prev)}
                                            className="text-xs font-mono text-blue-500 hover:underline"
                                        >
                                            {showDisclaimer ? 'Hide' : 'Show'}
                                        </button>
                                    </div>

                                    {/* Disclaimer */}
                                    {showDisclaimer && (
                                        <p className="text-gray-800 font-mono text-xs mb-3 md:mb-4">
                                            * Mellow is NOT a replacement for professional mental health care.
                                            <br />
                                            Always consult qualified mental health professionals for serious concerns.
                                        </p>
                                    )}

                                    {/* Input Area */}
                                    <form className="relative" onSubmit={handleSend} autoComplete="off">
                                        <div className="border-2 border-gray-600 rounded-2xl p-3 md:p-4 flex items-center gap-2 md:gap-3 bg-white/80">
                                            <input
                                                type="text"
                                                placeholder="Start typing...."
                                                className="flex-1 bg-transparent text-black font-mono placeholder-gray-900 outline-none text-sm"
                                                value={input}
                                                onChange={handleInputChange}
                                                disabled={loading}
                                                autoFocus={isOpen}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter' && !e.shiftKey) handleSend(e)
                                                }}
                                            />
                                            <button
                                                type="submit"
                                                className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                                                disabled={loading || !input.trim()}
                                                aria-label="Send"
                                            >
                                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

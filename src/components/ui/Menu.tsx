import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import { setCookie } from 'nookies'
import { allowPagesDisplayAtom, currentPageAtom, menuOpenAtom, showSettingsModalAtom } from '@utils/store'
import { useAtom } from 'jotai'
import {
    Home,
    BookOpen,
    Lock,
    UserCircle,
    Settings,
    LogOut,
    X,
    Scale,
    ChevronDown,
    ChevronUp,
    Info,
    Shield,
    HelpCircle,
    BarChart2,
    UserPlus
} from 'lucide-react'
import { trpc } from '@utils/trpc'
import { FaDiscord } from 'react-icons/fa'

const legalItems = [
    { href: '/legal', label: 'Legal Hub' },
    { href: '/legal/acceptable-use', label: 'Acceptable Use' },
    { href: '/legal/data-retention', label: 'Data Retention' },
    { href: '/legal/cookie-policy', label: 'Cookie Policy' },
    { href: '/legal/accessibility', label: 'Accessibility' },
    { href: '/legal/privacy-policy', label: 'Privacy Policy' },
    { href: '/legal/terms-of-service', label: 'Terms of Service' },
    { href: '/legal/dmca', label: 'DMCA Policy' },
    { href: '/legal/license', label: 'MIT License' }
]

const publicItems = [
    { href: '/about', label: 'About', icon: <Info className="h-5 w-5" /> },
    { href: '/stats', label: 'Statistics', icon: <BarChart2 className="h-5 w-5" /> },
    { href: '/resources', label: 'Resources', icon: <UserPlus className="h-5 w-5" /> },
    { href: 'https://discord.gg/C3ZuXPP7Hc', label: 'Discord', icon: <FaDiscord className="h-5 w-5" /> },
    { href: '/rules', label: 'Guidelines', icon: <Shield className="h-5 w-5" /> },
    { href: '/help', label: "FAQ's", icon: <HelpCircle className="h-5 w-5" /> }
]

export const Menu = () => {
    const router = useRouter()

    const [, setShowPage] = useAtom(currentPageAtom)
    const [, setAllowPagesDisplay] = useAtom(allowPagesDisplayAtom)
    const [, setShowSettingsModal] = useAtom(showSettingsModalAtom)
    const [menuOpen, setMenuOpen] = useAtom(menuOpenAtom)

    const { data: user } = trpc.user.me.useQuery(undefined, {
        retry: false,
        refetchOnWindowFocus: false
    })

    const [isLegalOpen, setIsLegalOpen] = React.useState(false)
    const [isPublicOpen, setIsPublicOpen] = React.useState(false)

    return (
        <AnimatePresence>
            {menuOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[998] bg-black"
                        onClick={() => setMenuOpen(false)}
                    />
                    <motion.div
                        className="fixed right-0 top-0 z-[999] flex h-full w-[300px] flex-col bg-white p-5 font-spacemono text-black shadow-xl"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        className="flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                    >
                                        <Image
                                            src="/logo.png"
                                            alt="A Thing Logo"
                                            className="h-8 w-8"
                                            width={32}
                                            height={32}
                                            priority
                                        />
                                        <span className="text-xl font-bold">A Thing</span>
                                    </motion.div>
                                </div>
                                {user && <p className="text-sm text-gray-600">Welcome to your space!</p>}
                            </div>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="rounded-full p-2 hover:bg-gray-100"
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <nav className="mt-4 flex-1 overflow-y-auto">
                            <ul className="space-y-2">
                                <li className="lg:hidden">
                                    <button
                                        onClick={() => {
                                            setShowPage(0)
                                            setMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                                    >
                                        <Home className="h-5 w-5" />
                                        Notes
                                    </button>
                                </li>
                                <li className="lg:hidden">
                                    <button
                                        onClick={() => {
                                            setShowPage(1)
                                            setMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                                    >
                                        <BookOpen className="h-5 w-5" />
                                        Journals
                                    </button>
                                </li>
                                <li className="lg:hidden">
                                    <button
                                        onClick={() => {
                                            setShowPage(2)
                                            setMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                                    >
                                        <Lock className="h-5 w-5" />
                                        Private
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => {
                                            redirect('/profile')
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                                    >
                                        <UserCircle className="h-5 w-5" />
                                        Profile
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => {
                                            setAllowPagesDisplay(false)
                                            setShowSettingsModal(true)
                                            setMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                                    >
                                        <Settings className="h-5 w-5" />
                                        Settings
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => setIsPublicOpen(!isPublicOpen)}
                                        className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Info className="h-5 w-5" />
                                            More Information
                                        </div>
                                        {isPublicOpen ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {isPublicOpen && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-11"
                                            >
                                                {publicItems.map(item => (
                                                    <li key={item.href}>
                                                        <Link
                                                            href={item.href}
                                                            className="flex items-center gap-2 py-2 hover:text-gray-600"
                                                            onClick={() => setMenuOpen(false)}
                                                        >
                                                            {item.icon}
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>

                                <li>
                                    <button
                                        onClick={() => setIsLegalOpen(!isLegalOpen)}
                                        className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Scale className="h-5 w-5" />
                                            Legal Stuff
                                        </div>
                                        {isLegalOpen ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {isLegalOpen && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-11"
                                            >
                                                {legalItems.map(item => (
                                                    <li key={item.href}>
                                                        <Link
                                                            href={item.href}
                                                            className="block py-2 hover:text-gray-600"
                                                            onClick={() => setMenuOpen(false)}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>

                                {/* Logout button at the bottom */}
                                <li>
                                    <button
                                        onClick={() => {
                                            setCookie(null, 'token', '', {
                                                maxAge: -1,
                                                path: '/'
                                            })
                                            router.refresh()
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

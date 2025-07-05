'use client'
import React from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@components/ui/Button'

const tabContent = {
    welcome: {
        title: 'Express Yourself, Anonymously',
        description:
            'A digital sanctuary where you can share your thoughts, feelings, and experiences without judgment. Write quick notes or deeper reflections, all while maintaining complete anonymity.'
    },
    about: {
        title: "HERE'S A THING",
        description:
            'Your safe space for authentic self expression. Share fleeting thoughts in quick notes, or dive deep with private journals. Whether you want to vent, reflect, or connect with others who understand - this is your space to be yourself.\n\nNo judgments. No traces. Just pure, unfiltered expression.'
    },
    privacy: {
        title: 'How safe is A Thing?',
        description:
            "We believe privacy isn't just a feature it's a fundamental right. That's why we're:\n\n• 100% Open Source - verify our code yourself\n• End-to-end encrypted - your private journals stay private\n• No personal data collection - we don't even want to know who you are\n• Fully deletable - remove your account and data anytime"
    }
}

import Image from 'next/image'
const Layout = () => {
    const [tabState, setTabState] = React.useState(0)
    const router = useRouter()

    return (
        <AnimatePresence>
            <motion.div
                key="main"
                className={`flex h-screen w-screen flex-col items-center justify-center bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono font-semibold text-black`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="z-[10] flex w-full flex-col">
                    <div className="flex w-full flex-col text-center">
                        <AnimatePresence mode="wait">
                            {tabState === 0 ? (
                                <motion.div
                                    key={1}
                                    className="relative flex w-full flex-col items-center justify-evenly border-2 border-black bg-white p-5 lg:flex-row"
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="m-5 flex flex-col items-center justify-center space-y-6">
                                        <Image
                                            src="/logo.png"
                                            alt="A Thing Logo"
                                            className="h-[200px] w-[200px] object-contain"
                                            width={200}
                                            height={200}
                                            priority
                                        />
                                        <h1 className="text-4xl font-bold">{tabContent.welcome.title}</h1>
                                        <p className="font-regular prose text-gray-600">
                                            {tabContent.welcome.description}
                                        </p>
                                        <div className="flex flex-row gap-5">
                                            <Button width="fit" onClick={() => setTabState(1)}>
                                                Tell Me More
                                            </Button>
                                            <Button
                                                width="fit"
                                                styles="opposite"
                                                onClick={() => router.push('/auth/signup')}
                                            >
                                                Get Started
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : tabState === 1 ? (
                                <motion.div
                                    key={2}
                                    className="relative flex w-full flex-col items-start justify-evenly border-2 border-black bg-white p-8 text-start lg:flex-row lg:items-center"
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <button
                                        onClick={() => setTabState(0)}
                                        className="absolute left-4 top-4 text-gray-600 hover:text-black"
                                    >
                                        ← Back
                                    </button>
                                    <div className="flex w-full flex-col space-y-6 lg:w-2/3">
                                        <h1 className="text-4xl font-bold">{tabContent.about.title}</h1>
                                        <div className="prose max-w-none">
                                            {tabContent.about.description.split('\n\n').map((paragraph, index) => (
                                                <p key={index} className="text-gray-600">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            <Button width="fit" onClick={() => setTabState(2)}>
                                                How Safe Is It?
                                            </Button>
                                            <Button width="fit" styles="opposite" onClick={() => setTabState(0)}>
                                                ← Previous
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : tabState === 2 ? (
                                <motion.div
                                    key={3}
                                    className="relative flex w-full flex-col border-2 border-black bg-white p-8 text-start"
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <button
                                        onClick={() => setTabState(1)}
                                        className="absolute left-4 top-4 text-gray-600 hover:text-black"
                                    >
                                        ← Back
                                    </button>
                                    <div className="flex flex-col space-y-6">
                                        <h1 className="text-4xl font-bold">{tabContent.privacy.title}</h1>
                                        <div className="prose max-w-none">
                                            {tabContent.privacy.description.split('\n\n').map((paragraph, index) => (
                                                <p key={index} className="whitespace-pre-line text-gray-600">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            <Button width="fit" onClick={() => router.push('/auth/signup')}>
                                                Get Started
                                            </Button>
                                            <Button width="fit" styles="opposite" onClick={() => setTabState(1)}>
                                                ← Previous
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Layout

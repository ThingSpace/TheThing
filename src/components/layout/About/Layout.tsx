'use client'
import React from 'react'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { IoArrowBack } from 'react-icons/io5'
import { formatNumber } from '@utils/client.util'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const AboutSections = {
    vision: {
        title: 'Our Vision',
        content:
            'A Thing was created with a simple yet powerful vision: to provide a safe, secure, and anonymous space for everyone to express themselves freely. In a world where mental health and personal struggles often go unaddressed, we believe in the importance of having a platform where voices can be heard without judgment.'
    },
    values: {
        title: 'Our Values',
        content:
            'Privacy First: Your anonymity is our priority.\nTransparency: Open-source and community-driven.\nSafe Space: Zero tolerance for hate or harassment.\nAccessibility: Free and open for everyone.',
        list: true
    },
    impact: {
        title: 'Our Impact',
        stats: [
            { label: 'Anonymous Users', value: '10k+' },
            { label: 'Daily Notes', value: '5k+' },
            { label: 'Private Journals', value: '50k+' },
            { label: 'Countries Reached', value: '100+' }
        ]
    },
    team: {
        title: 'Behind A Thing',
        content:
            "We're a small team of developers, designers, and mental health advocates who believe in the power of anonymous self-expression. Our project is supported by an amazing open-source community that helps us grow and improve every day."
    }
}

type AboutPageProps = {
    stats: {
        userCount: number
        notesCount: number
        journalsCount: number
        countriesCount: number
    }
}

const AboutPage = ({ stats }: AboutPageProps) => {
    const router = useRouter()

    // Update the impact section to use real stats
    const impactStats = [
        { label: 'Anonymous Users', value: formatNumber(stats.userCount) },
        { label: 'Daily Notes', value: formatNumber(stats.notesCount) },
        { label: 'Private Journals', value: formatNumber(stats.journalsCount) },
        { label: 'Countries Reached', value: formatNumber(stats.countriesCount) }
    ]

    return (
        <motion.div
            className="flex min-h-screen w-screen flex-col items-center justify-start bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className="absolute left-5 top-5 cursor-pointer rounded-full bg-white p-2"
                onClick={() => router.back()}
            >
                <IoArrowBack className="h-10 w-10 p-2 text-black" />
            </div>

            <div className="flex w-full max-w-4xl flex-col gap-8">
                <div className="flex flex-col gap-4 rounded-lg border-2 border-dashed bg-white p-8 hover:border-black">
                    <h1 className="text-4xl font-bold">About A Thing</h1>
                    <p className="text-lg font-normal text-gray-700">{AboutSections.vision.content}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <motion.div
                        className="flex flex-col gap-4 rounded-lg border-2 border-dashed bg-white p-8 hover:border-black"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold">{AboutSections.values.title}</h2>
                        <ul className="flex flex-col gap-2">
                            {AboutSections.values.content.split('\n').map((value, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-black"></span>
                                    <span className="font-normal text-gray-700">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="flex flex-col gap-6 rounded-lg border-2 border-dashed bg-white p-8 hover:border-black"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <h2 className="text-2xl font-bold">{AboutSections.impact.title}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {impactStats.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold">{stat.value}</span>
                                    <span className="text-sm text-gray-600">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="flex flex-col gap-4 rounded-lg border-2 border-dashed bg-white p-8 hover:border-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold">{AboutSections.team.title}</h2>
                    <p className="font-normal text-gray-700">{AboutSections.team.content}</p>
                    <div className="mt-4 flex flex-wrap gap-4">
                        <a
                            href="https://github.com/ThingSpace/TheThing"
                            className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                            <FaGithub />
                            <span>Find us on Github</span>
                        </a>
                        <a
                            href="https://twitter.com/theathingapp"
                            className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                            <FaTwitter />
                            <span>Find us on Twitter</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default AboutPage

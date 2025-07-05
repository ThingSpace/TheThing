'use client'
import React from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/navigation'
import { IoArrowBack } from 'react-icons/io5'

type Resource = {
    name: string
    description: string
    website: string
    type?: string
    phone?: string
    sms?: string
    hours?: string
}

type ResourcesDataType = {
    [key: string]: {
        title: string
        description: string
        resources: Resource[]
    }
}

const ResourcesData: ResourcesDataType = {
    crisis: {
        title: 'Crisis Support',
        description: "Immediate help is available 24/7. You're not alone.",
        resources: [
            {
                name: 'International Association for Suicide Prevention',
                description: 'Global suicide prevention resources and crisis centers',
                website: 'https://www.iasp.info/resources/Crisis_Centres/',
                hours: '24/7'
            },
            {
                name: 'Crisis Text Line',
                description: 'Free, confidential crisis support via text',
                sms: 'Text HOME to 741741',
                website: 'https://www.crisistextline.org',
                hours: '24/7'
            },
            {
                name: 'National Suicide Prevention Lifeline (US)',
                description: 'Free and confidential emotional support',
                phone: '988',
                website: 'https://suicidepreventionlifeline.org',
                hours: '24/7'
            },
            {
                name: 'Samaritans (UK)',
                description: 'Emotional support for anyone in distress',
                phone: '116 123',
                website: 'https://www.samaritans.org',
                hours: '24/7'
            },
            {
                name: 'Lifeline (Australia)',
                description: 'Crisis support and suicide prevention',
                phone: '13 11 14',
                website: 'https://www.lifeline.org.au',
                hours: '24/7'
            }
        ]
    },
    mentalHealth: {
        title: 'Mental Health Support',
        description: 'Professional resources and counseling services.',
        resources: [
            {
                name: 'BetterHelp',
                description: 'Online therapy and counseling platform',
                website: 'https://www.betterhelp.com',
                type: 'Online Therapy'
            },
            {
                name: 'Headspace',
                description: 'Meditation and mindfulness app',
                website: 'https://www.headspace.com',
                type: 'Mental Wellness App'
            },
            {
                name: 'NAMI (National Alliance on Mental Illness)',
                description: 'Mental health advocacy and support',
                website: 'https://www.nami.org',
                type: 'Organization'
            },
            {
                name: 'Mind (UK)',
                description: 'Mental health charity with resources and support',
                website: 'https://www.mind.org.uk',
                type: 'Organization'
            },
            {
                name: 'Beyond Blue (Australia)',
                description: 'Mental health support and information',
                website: 'https://www.beyondblue.org.au',
                type: 'Organization'
            }
        ]
    },
    community: {
        title: 'Community Support',
        description: 'Connect with others who understand.',
        resources: [
            {
                name: 'Reddit Mental Health Communities',
                description: 'Supportive communities like r/mentalhealth, r/depression, r/anxiety',
                website: 'https://www.reddit.com/r/mentalhealth',
                type: 'Online Community'
            },
            {
                name: '7 Cups',
                description: 'Free emotional support and active listening',
                website: 'https://www.7cups.com',
                type: 'Peer Support'
            },
            {
                name: 'Mental Health America',
                description: 'Local community mental health resources',
                website: 'https://www.mhanational.org',
                type: 'Community Resources'
            },
            {
                name: 'Support Groups Central',
                description: 'Find local and online support groups',
                website: 'https://www.supportgroupscentral.com',
                type: 'Support Groups'
            }
        ]
    },
    selfCare: {
        title: 'Self-Care & Wellness',
        description: 'Tools and resources for daily mental wellness.',
        resources: [
            {
                name: 'Calm',
                description: 'Meditation, sleep stories, and relaxation',
                website: 'https://www.calm.com',
                type: 'Wellness App'
            },
            {
                name: 'Insight Timer',
                description: 'Free meditation and mindfulness app',
                website: 'https://insighttimer.com',
                type: 'Meditation App'
            },
            {
                name: 'Sanvello',
                description: 'Anxiety and mood tracking with coping tools',
                website: 'https://www.sanvello.com',
                type: 'Mental Health App'
            },
            {
                name: 'MindShift',
                description: 'Anxiety relief and thought management',
                website: 'https://www.anxietycanada.com/resources/mindshift-app/',
                type: 'Mental Health App'
            }
        ]
    }
}

const ResourcesPage = () => {
    const router = useRouter()

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
                <div className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black">
                    <h1 className="text-4xl font-bold">Resources</h1>
                    <p className="text-lg text-gray-700">
                        If you&apos;re struggling, help is available worldwide. These resources provide support across
                        different countries and regions. In an emergency, always call your local emergency services
                        first (911 in US/Canada, 999 in UK, 000 in Australia, 112 in EU).
                    </p>
                </div>

                {Object.entries(ResourcesData).map(([key, category]) => (
                    <motion.div
                        key={key}
                        className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold">{category.title}</h2>
                        <p className="text-gray-600">{category.description}</p>
                        <div className="grid gap-6 md:grid-cols-2">
                            {category.resources.map((resource, index) => (
                                <div key={index} className="flex flex-col gap-2 rounded-lg border p-4">
                                    <h3 className="font-bold">{resource.name}</h3>
                                    <p className="text-sm text-gray-600">{resource.description}</p>
                                    {resource.phone && (
                                        <p className="text-sm">
                                            <span className="font-bold">Call:</span>{' '}
                                            <a href={`tel:${resource.phone}`} className="text-blue-600 hover:underline">
                                                {resource.phone}
                                            </a>
                                        </p>
                                    )}
                                    {resource.sms && (
                                        <p className="text-sm">
                                            <span className="font-bold">Text:</span> {resource.sms}
                                        </p>
                                    )}
                                    {resource.website && (
                                        <a
                                            href={resource.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Visit Website
                                        </a>
                                    )}
                                    {resource.hours && (
                                        <p className="text-sm text-gray-500">Available: {resource.hours}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <div className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black">
                    <h2 className="text-2xl font-bold">Disclaimer</h2>
                    <p className="text-gray-700">
                        These resources are provided for informational purposes only. A Thing is not a crisis service or
                        mental health provider. In an emergency, always contact your local emergency services or visit
                        the nearest emergency room.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default ResourcesPage

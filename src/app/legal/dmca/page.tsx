'use client'
import React from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/navigation'
import { IoArrowBack } from 'react-icons/io5'

const DMCAPage = () => {
    const router = useRouter()

    return (
        <motion.div
            className="flex min-h-screen w-screen flex-col items-center justify-center bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono font-semibold text-black"
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
            <div className="flex w-full max-w-3xl flex-col gap-5 border-2 bg-white p-5 hover:border-black">
                <h1 className="text-4xl font-bold">DMCA Policy</h1>
                <div className="flex flex-col gap-6">
                    <section className="flex flex-col gap-3">
                        <p className="font-normal">
                            A Thing respects intellectual property rights and expects its users to do the same. We
                            respond to notices of alleged copyright infringement in accordance with the Digital
                            Millennium Copyright Act (DMCA).
                        </p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold">Filing a DMCA Notice</h2>
                        <p className="font-normal">To submit a DMCA notice, please provide:</p>
                        <ul className="list-decimal pl-6 font-normal">
                            <li>A physical or electronic signature of the copyright owner or authorized agent</li>
                            <li>Clear identification of the copyrighted work claimed to be infringed</li>
                            <li>Clear identification of the material that you claim is infringing</li>
                            <li>Your contact information (address, telephone number, email)</li>
                            <li>
                                A statement that you have a good faith belief that use of the material is not authorized
                            </li>
                            <li>
                                A statement that the information in your notice is accurate and that you are the
                                copyright owner or authorized to act on behalf of the owner
                            </li>
                        </ul>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold">Counter-Notice Procedure</h2>
                        <p className="font-normal">
                            If you believe your content was wrongly removed, you may submit a counter-notice containing:
                        </p>
                        <ul className="list-decimal pl-6 font-normal">
                            <li>Your physical or electronic signature</li>
                            <li>Clear identification of the material removed</li>
                            <li>
                                A statement under penalty of perjury that you have a good faith belief the material was
                                removed by mistake
                            </li>
                            <li>Your contact information and consent to local federal court jurisdiction</li>
                        </ul>
                    </section>

                    <section className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold">Submission</h2>
                        <p className="font-normal">Submit DMCA notices through:</p>
                        <ul className="list-disc pl-6 font-normal">
                            <li>
                                Email:{' '}
                                <a href="mailto:dmca@athing.space" className="text-blue-600 hover:underline">
                                    dmca@athing.space
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/ThingSpace/TheThing/issues"
                                    className="text-blue-600 hover:underline"
                                >
                                    GitHub Issues
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </motion.div>
    )
}

export default DMCAPage

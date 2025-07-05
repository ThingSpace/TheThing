'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { IoArrowBack } from 'react-icons/io5'

const PrivacyPolicyPage = () => {
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
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
                <div className="flex flex-col gap-4">
                    <p className="font-normal">
                        At A Thing, your privacy is a top priority. This Privacy Policy outlines how we handle
                        information when you use our platform.
                    </p>
                    <h2 className="text-xl font-bold">Information We Do Not Collect</h2>
                    <p className="font-normal">
                        We are committed to anonymity. We do not collect, store, or process any personally identifiable
                        information (PII) that could be used to identify you, such as your name, email address, IP
                        address, or location. When you create an account, we generate a unique, anonymous username. We
                        do not link this username to any real-world identity.
                    </p>
                    <h2 className="text-xl font-bold">User-Generated Content</h2>
                    <p className="font-normal">
                        Any notes or journal entries you create are stored on our servers. You have full control over
                        the visibility of this content (public or private). We do not monitor or review your private
                        content. Public content is visible to other users of the platform.
                    </p>
                    <h2 className="text-xl font-bold">Data Deletion</h2>
                    <p className="font-normal">
                        You have the right to delete your account at any time. When you delete your account, all
                        associated notes and journal entries are permanently removed from our servers. This action is
                        irreversible.
                    </p>
                    <h2 className="text-xl font-bold">Open Source Transparency</h2>
                    <p className="font-normal">
                        A Thing is an open-source project. This means our source code is publicly available for review.
                        We encourage users and developers to inspect our code to verify our privacy practices and ensure
                        that we adhere to our commitment to anonymity and data security.
                    </p>
                    <h2 className="text-xl font-bold">Changes to This Policy</h2>
                    <p className="font-normal">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                        the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically
                        for any changes.
                    </p>
                    <p className="font-normal">This policy was last updated on June 18, 2025.</p>
                </div>
            </div>
        </motion.div>
    )
}

export default PrivacyPolicyPage

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { IoArrowBack } from 'react-icons/io5'

const LicensePage = () => {
    const router = useRouter()
    const currentYear = new Date().getFullYear()

    return (
        <motion.div
            className="flex min-h-screen w-screen flex-col items-center justify-center bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono text-black"
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
            <div className="flex w-full max-w-3xl flex-col gap-5 border-2 bg-white p-8 hover:border-black">
                <h1 className="text-4xl font-bold">MIT License</h1>
                <div className="flex flex-col gap-6 font-mono">
                    <p className="text-sm">Copyright (c) {currentYear} ByteBrush Studios</p>

                    <p className="whitespace-pre-line text-sm">
                        Permission is hereby granted, free of charge, to any person obtaining a copy of this software
                        and associated documentation files (the &quot;Software&quot;), to deal in the Software without
                        restriction, including without limitation the rights to use, copy, modify, merge, publish,
                        distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
                        Software is furnished to do so, subject to the following conditions:
                        <br />
                        <br />
                        The above copyright notice and this permission notice shall be included in all copies or
                        substantial portions of the Software.
                        <br />
                        <br />
                        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                        INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
                        AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                        DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                    </p>

                    <div className="mt-4 flex flex-col gap-2">
                        <a
                            href="https://github.com/ThingSpace/TheThing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            View on GitHub →
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default LicensePage

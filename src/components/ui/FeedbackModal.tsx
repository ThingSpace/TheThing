import { showFeedbackModalAtom, showToastAtom, toastIntentAtom, toastMessageAtom } from '@utils/store'
import { trpc } from '@utils/trpc'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { BiMailSend, BiUserVoice } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize'

const FeedbackModalAnimations = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    },
    transition: {
        duration: 0.5
    }
}

export const FeedbackModal = () => {
    const [, setShowFeedback] = useAtom(showFeedbackModalAtom)
    const [text, setText] = useState('')

    //TRPC
    const feedback = trpc.user.feedback.useMutation()

    // Toast
    const [, setDisplayToast] = useAtom(showToastAtom)
    const [, setToastIntent] = useAtom(toastIntentAtom)
    const [, setToastMessage] = useAtom(toastMessageAtom)

    async function handleFeedbackSubmit() {
        if (text.length < 20) {
            setToastIntent('error')
            setToastMessage('At least 20 characters are required.')
            setDisplayToast(true)
            return
        }

        try {
            await feedback.mutateAsync({
                text
            })
            setToastIntent('success')
            setToastMessage('Thank You! Your voice is now heard.')
            setDisplayToast(true)
            setShowFeedback(false)
        } catch {
            setToastIntent('error')
            setToastMessage('There was an error sending your feedback.')
            setDisplayToast(true)
        }
    }

    return (
        <motion.div
            className="fixed left-0 top-0 z-[1200] flex min-h-screen w-screen items-center justify-center font-spacemono backdrop-blur-md bg-black/20"
            initial={FeedbackModalAnimations.hidden}
            animate={FeedbackModalAnimations.visible}
            exit={FeedbackModalAnimations.hidden}
            transition={FeedbackModalAnimations.transition}
        >
            <div className="flex min-h-[350px] w-[340px] flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-white/95 shadow-2xl">
                <div className="mb-2 flex">
                    <BiUserVoice className="h-10 w-10 text-blue-600" />
                </div>
                <div className="my-2 flex flex-col justify-center w-full px-4">
                    <h1 className="text-center text-2xl font-semibold mb-2">Your opinion matters!</h1>
                    <TextareaAutosize
                        value={text}
                        onChange={e => {
                            if (e.target.value.length <= 1000) {
                                setText(e.target.value)
                            } else {
                                setToastIntent('error')
                                setToastMessage('Feedback must be less than 1000 characters long')
                                setDisplayToast(true)
                            }
                        }}
                        maxRows={6}
                        className="my-2 min-h-[100px] w-full resize-none rounded-lg border-2 border-black-400 bg-blue-50 p-3 text-base text-black placeholder:text-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Want a cool new feature? Found a bug? Let me know!"
                        autoFocus
                    />
                </div>
                <div className="my-2 flex flex-row items-center justify-center gap-5">
                    <button
                        className="flex items-center justify-center rounded-full border-2 border-gray-300 bg-white p-3 duration-200 hover:border-gray-400"
                        onClick={() => {
                            setShowFeedback(false)
                        }}
                    >
                        <GrFormClose className="h-6 w-6" />
                    </button>

                    <button
                        className="flex items-center justify-center rounded-full border-2 border-blue-500 bg-blue-500 p-3 text-white duration-200 hover:bg-blue-600"
                        onClick={() => {
                            handleFeedbackSubmit()
                        }}
                    >
                        <BiMailSend className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

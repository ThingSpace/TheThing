import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import TextareaAutosize from 'react-textarea-autosize'

// Atoms
import {
    showJournalModalAtom,
    showToastAtom,
    toastIntentAtom,
    toastMessageAtom,
    showCustomizationModalAtom,
    allowPagesDisplayAtom,
    selectedCustomizationAtom
} from '@utils/store'
import React, { useState } from 'react'
import { trpc } from '@utils/trpc'
import { handleError } from '@utils/client.util'
import { IoClose } from 'react-icons/io5'

export const AddJournalBox = () => {
    const [, setShowAddJournalModal] = useAtom(showJournalModalAtom)
    const [, setToastIntent] = useAtom(toastIntentAtom)
    const [, setToastMessage] = useAtom(toastMessageAtom)
    const [, setShowToast] = useAtom(showToastAtom)
    const [, setShowCustomizationModal] = useAtom(showCustomizationModalAtom)
    const [, setAllowPagesDisplay] = useAtom(allowPagesDisplayAtom)
    const [selectedTheme, setSelectedTheme] = useAtom(selectedCustomizationAtom)

    const [isPrivate, setIsPrivate] = useState(false)
    const [titleText, setTitleText] = useState('')

    //trpc
    const createJournalMutation = trpc.journals.create.useMutation()
    const utils = trpc.useContext()

    async function handleCreateJournal() {
        try {
            await createJournalMutation.mutateAsync({
                title: titleText,
                isPrivate,
                themeId: selectedTheme
            })
            utils.journals.getJournalsByUserId.refetch()
            setSelectedTheme(0)
            setToastIntent('success')
            setToastMessage('Your new journal has been created!')
            setShowToast(true)
            setShowAddJournalModal(false)
        } catch (err) {
            const message = await handleError(err)
            setToastIntent('error')
            setToastMessage(message)
            setShowToast(true)
        }
    }

    return (
        <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative flex w-full max-w-2xl flex-col rounded-xl bg-white p-8 shadow-2xl md:p-12">
                <button
                    className="absolute right-4 top-4 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowAddJournalModal(false)}
                    aria-label="Close"
                >
                    <IoClose className="h-6 w-6" />
                </button>
                <h1 className="mb-6 text-2xl font-bold text-center">Create a New Journal</h1>
                <div className="mb-6 flex flex-col gap-2">
                    <label htmlFor="journal-title" className="text-sm font-semibold">
                        Title
                    </label>
                    <TextareaAutosize
                        id="journal-title"
                        value={titleText}
                        onChange={e => {
                            if (e.target.value.length < 50) {
                                setTitleText(e.target.value)
                            } else {
                                setToastIntent('error')
                                setToastMessage('Hey! Title can only contain 50 characters.')
                                setShowToast(true)
                            }
                        }}
                        className="min-h-[48px] w-full resize-none rounded border border-gray-300 bg-white p-3 text-lg placeholder-gray-400 focus:border-black focus:outline-none focus:ring-0"
                        placeholder="Write your amazing title..."
                        maxRows={7}
                        maxLength={50}
                        minLength={10}
                    />
                </div>
                <div className="mt-4 flex flex-row justify-center gap-4">
                    <button
                        className="rounded border-2 border-gray-300 bg-white px-6 py-2 text-black transition-colors duration-200 hover:border-black hover:bg-black hover:text-white"
                        onClick={handleCreateJournal}
                    >
                        Create
                    </button>
                    <button
                        className={
                            `rounded border-2 border-gray-300 px-6 py-2 duration-200 hover:border-black ` +
                            (isPrivate ? 'text-gray-900 bg-gray-100' : 'text-pink-600 bg-white')
                        }
                        onClick={() => setIsPrivate(!isPrivate)}
                    >
                        {isPrivate ? 'Private' : 'Public'}
                    </button>
                    <button
                        className="rounded border-2 border-gray-300 bg-white px-6 py-2 text-black duration-200 hover:border-black hover:bg-black hover:text-white"
                        onClick={() => {
                            setAllowPagesDisplay(false)
                            setShowCustomizationModal(true)
                        }}
                    >
                        Theme
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

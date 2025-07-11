'use client'

import React, { useRef } from 'react'

import { trpc } from '@utils/trpc'
import { handleError, loadZxcvbn } from '@utils/client.util'
import { zxcvbn, zxcvbnOptions, type ZxcvbnResult } from '@zxcvbn-ts/core'
import { z } from 'zod'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import HCaptcha from '@hcaptcha/react-hcaptcha'

// Components
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { StrengthBar } from '@components/ui/StrengthBar'
import { Loading } from '@components/ui/Loading'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Toast } from '@components/ui/Toast'

// PNG
import { showToastAtom, toastIntentAtom, toastMessageAtom } from '@utils/store'
import { useAtom } from 'jotai'

const SignupPage = () => {
    const [pageLoad, setPageLoad] = React.useState(false)
    const [pwdStrength, setPwdStrength] = React.useState<ZxcvbnResult>(zxcvbn(''))
    const [showPage, setShowPage] = React.useState(0)
    const router = useRouter()
    const captchaRef = useRef(null)

    // Required Toast State
    const [displayToast, setDisplayToast] = useAtom(showToastAtom)
    const [, setToastMessage] = useAtom(toastMessageAtom)
    const [, setToastIntent] = useAtom(toastIntentAtom)

    //TRPC
    const mutation = trpc.user.signup.useMutation()

    const signupSchema = z.object({
        password: z
            .string()
            .trim()
            .min(8)
            .max(30)
            .refine(() => pwdStrength.score >= 3, {
                message: 'Password is too weak'
            }),
        acceptTerms: z.boolean().refine(v => v, {
            message: 'You must accept the terms and conditions'
        }),
        token: z.string()
    })

    const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            password: '',
            acceptTerms: false,
            token: ''
        },
        validationSchema: toFormikValidationSchema(signupSchema),
        onSubmit: async (values, actions) => {
            try {
                actions.setSubmitting(true)
                await mutation.mutateAsync({
                    password: values.password,
                    acceptTerms: values.acceptTerms,
                    token: values.token
                })
                setShowPage(1)
            } catch (err) {
                const errorMessage = await handleError(err)
                setToastIntent('error')
                setToastMessage(errorMessage)
                setDisplayToast(true)
            }
        }
    })

    const onCaptchError = () => {
        setToastIntent('error')
        setToastMessage('There was an error with the captcha! Please Refresh the page and try again.')
        setDisplayToast(true)
    }

    const onCaptchaExpire = () => {
        setToastIntent('error')
        setToastMessage('The captcha has expired! Please Refresh the page and try again.')
        setDisplayToast(true)
    }

    React.useEffect(() => {
        if (!pageLoad) {
            loadOptions()
            const keydownHandler = (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    handleSubmit()
                }
            }
            document.addEventListener('keydown', keydownHandler)
            setPageLoad(true)
            return () => {
                document.removeEventListener('keydown', keydownHandler)
            }
        }
        // Only run on mount, handleSubmit and pageLoad are stable from useFormik/useState
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const results = zxcvbn(values.password)
        setPwdStrength(results)
    }, [values.password])

    // Removed duplicate useEffect for keydown cleanup; handled in the first useEffect above.

    async function loadOptions(): Promise<void> {
        const options = await loadZxcvbn()
        zxcvbnOptions.setOptions(options)
        return Promise.resolve()
    }

    return (
        <main className="min-w-screen flex h-screen flex-col items-center justify-center overflow-hidden font-spacemono">
            <div className="flex">
                <AnimatePresence>{mutation.status === 'pending' && <Loading />}</AnimatePresence>
            </div>
            <AnimatePresence>
                {showPage === 0 ? (
                    <motion.div
                        className="flex min-w-[250px] flex-col p-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="my-2 text-4xl font-bold">Sign Up</h1>
                        <Input
                            label="Password"
                            type="password"
                            intent="default"
                            id="password"
                            fullWidth={true}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <StrengthBar strength={pwdStrength.score} />
                        <Input
                            label="I accept the terms and conditions."
                            type="checkbox"
                            intent="default"
                            id="acceptTerms"
                            checked={values.acceptTerms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <HCaptcha
                            sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
                            onVerify={token => {
                                setFieldValue('token', token)
                            }}
                            onError={onCaptchError}
                            onExpire={onCaptchaExpire}
                            ref={captchaRef}
                        />
                        <Button
                            letterSpaced={true}
                            disabled={isSubmitting || Object.keys(errors).length > 0}
                            type="submit"
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Signup
                        </Button>
                        <div
                            className="my-2 cursor-pointer place-self-center text-center text-sm font-bold transition-all duration-300 hover:underline"
                            onClick={() => {
                                router.replace('/auth/login')
                            }}
                        >
                            Login
                        </div>
                    </motion.div>
                ) : showPage === 1 ? (
                    <motion.div
                        className="flex min-w-[250px] flex-col p-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="my-2 text-center text-4xl font-black text-red-600">Write It Down!</h1>
                        <p className="prose my-2 text-center">
                            Hey! <b className="text-black">please write down</b> your <b>Password</b> and your assigned
                            Username: <b className="text-black">{mutation.data?.username}</b>. If you forget your
                            password you can attempt to recover your account{' '}
                            <a href="/recover" className="underline">
                                here
                            </a>
                            , but we do ask some skill testing questions to ensure you are the rightful owner of the
                            account. Please do not lose your password!!!!!!
                        </p>
                        <Button
                            styles="danger"
                            letterSpaced={true}
                            type="button"
                            onClick={() => {
                                router.push(`/auth/login?username=${mutation.data?.username}`)
                            }}
                        >
                            I agree, Login
                        </Button>
                    </motion.div>
                ) : null}
                {displayToast ? <Toast key="toastKey" /> : null}
            </AnimatePresence>
        </main>
    )
}

export default SignupPage

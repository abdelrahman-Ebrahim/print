"use client"

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import './contact-animations.css'
import { getRecaptchaToken } from '../RecaptchaProvider'



interface FormData {
    name: string
    phone: string
    email: string
    message: string
}

interface FormErrors {
    name: string
    phone: string
    email: string
    message: string
}

interface ApiResponse {
    status: boolean
    show_message: boolean
    message: string
    code: number
    data: null | any
}

const Contact = () => {
    const t = useTranslations("Contact")
    const v = useTranslations("validation")
    const locale = useLocale()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        phone: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [apiMessage, setApiMessage] = useState('')
    const [showApiMessage, setShowApiMessage] = useState(false)

    const validateForm = (): boolean => {
        let isValid = true
        const newErrors: FormErrors = {
            name: '',
            phone: '',
            email: '',
            message: ''
        }

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = v('nameRequired')
            isValid = false
        } else if (formData.name.length > 100) {
            newErrors.name = v('nameMaxLength')
            isValid = false
        }

        // Phone validation (optional)
        if (formData.phone && !/^\+?[1-9]\d{0,14}$/.test(formData.phone)) {
            newErrors.phone = v('phoneInvalid')
            isValid = false
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = v('emailRequired')
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = v('emailInvalid')
            isValid = false
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = v('messageRequired')
            isValid = false
        } else if (formData.message.length > 500) {
            newErrors.message = v('messageMaxLength')
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))

        // Clear error when user types
        if (errors[id as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }))
        }
    }

    const clearMessages = () => {
        setSubmitSuccess(false)
        setSubmitError('')
        setApiMessage('')
        setShowApiMessage(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        clearMessages() // Clear all previous messages

        try {
            // Get reCAPTCHA token with detailed logging
            console.group('reCAPTCHA Process')
            let token: string
            try {
                console.log('Starting reCAPTCHA token generation...')
                token = await getRecaptchaToken('contact_us')
                console.log('Token generation successful')
                console.log('Full token (for debugging):', token)
            } catch (recaptchaError) {
                console.error('reCAPTCHA error details:', recaptchaError)
                setSubmitError('Failed to verify you are human. Please refresh the page and try again.')
                return
            } finally {
                console.groupEnd()
            }

            // Prepare form data with trimming
            const submissionData = {
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                message: formData.message.trim(),
                recaptchaToken: token
            }

            console.group('API Submission')
            console.log('Submitting form with data:', submissionData)
            console.log('Headers:', {
                'Content-Type': 'application/json',
                'Accept-Language': locale === 'ar' ? 'ar-SA' : 'en-US'
            })

            const response = await fetch('/api/frontend/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': locale === 'ar' ? 'ar-SA' : 'en-US'
                },
                body: JSON.stringify(submissionData)
            })

            const data: ApiResponse = await response.json()
            console.log('Full API response:', data)

            // Always display the API message if show_message is true
            if (data.show_message && data.message) {
                setApiMessage(data.message)
                setShowApiMessage(true)
            }

            if (response.ok && data.status) {
                console.log('Submission successful')
                setSubmitSuccess(true)
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: ''
                })
            } else {
                console.error('Backend validation failed')

                // If no API message to show, use fallback error
                if (!data.show_message || !data.message) {
                    setSubmitError('Failed to submit form. Please try again.')
                }

                console.error('Backend error details:', {
                    status: data.status,
                    message: data.message,
                    code: data.code,
                    httpStatus: response.status
                })
            }
            console.groupEnd()
        } catch (error) {
            console.group('Submission Error')
            console.error('Error details:', error)
            setSubmitError(
                error instanceof Error ? error.message : 'An unknown error occurred'
            )
            console.groupEnd()
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section
            id='contact'
            className='general-container py-8 flex-center bg-[#F9FAFB] w-full lg:py-10 xlg:!py-20 contact-container'
        >
            <div className='flex flex-col items-center gap-6 w-full lg:flex-row lg:justify-between contact-float'>
                <div className={`flex flex-col items-center gap-4 lg:items-start`}>
                    <h6 className='text-[#7745A2] text-sm font-semibold uppercase'>{t('title')}</h6>
                    <h2
                        className={`text-black font-semibold text-center text-[22px] leading-[26px] lg:text-[28px] xlg:!leading-[45px] xlg:!text-[36px] ${locale === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}
                        data-text={`${t('heading1')} ${t('heading2')}`}
                    >
                        {t('heading1')} <br /> {t('heading2')}
                    </h2>

                    {/* Email Contact Info */}
                    <div className='pt-6 flex items-center flex-col lg:flex-row gap-3 lg:gap-5 contact-info-item'>
                        <div className='w-[48px] h-[48px] rounded-full flex-center bg-[#7745A21A] contact-icon'>
                            <Image src={"/mail.svg"} alt={t('emailAlt')} width={24} height={24} />
                        </div>
                        <p className='text-[#707070] font-medium'>{t('email')}</p>
                        <p className='block text-[#7745A2] font-bold uppercase cursor-pointer lg:hidden'>
                            {t('sayHello')}
                        </p>
                    </div>

                    {/* Phone Contact Info */}
                    <div className='pt-6 flex items-center flex-col lg:flex-row gap-3 lg:gap-5 contact-info-item'>
                        <div className='w-[48px] h-[48px] rounded-full flex-center bg-[#7745A21A] contact-icon'>
                            <Image src={"/mobile.svg"} alt={t('phoneAlt')} width={24} height={24} />
                        </div>
                        <p className='text-[#707070] font-medium'>{t('phone')}</p>
                        <p className='block text-[#7745A2] font-bold uppercase cursor-pointer lg:hidden'>
                            {t('callNow')}
                        </p>
                    </div>
                </div>

                <div className={`flex-1 w-[359px] max-[375px]:w-[310px] md:w-[567px] lg:w-[500px] xl:w-fit max-w-[809px] ${locale === 'ar'
                    ? 'lg:pe-5 xl:pe-10 xlg:!pe-[96px]'
                    : 'lg:ps-5 xl:ps-10 xlg:!ps-[96px]'
                    }`}>
                    <form onSubmit={handleSubmit} className='p-12 rounded-[24px] bg-white shadow-form flex flex-col form-container'>

                        {/* API Message Display (Success) */}
                        {showApiMessage && submitSuccess && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm font-medium">{apiMessage}</p>
                                </div>
                            </div>
                        )}

                        {/* API Message Display (Error) */}
                        {showApiMessage && !submitSuccess && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm font-medium">{apiMessage}</p>
                                </div>
                            </div>
                        )}

                        {/* Fallback Success Message (when API doesn't provide show_message) */}
                        {submitSuccess && !showApiMessage && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm font-medium">{t('submitSuccess')}</p>
                                </div>
                            </div>
                        )}

                        {/* Fallback Error Message (when API doesn't provide show_message) */}
                        {submitError && !showApiMessage && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm font-medium">{submitError}</p>
                                </div>
                            </div>
                        )}

                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-6 w-full'>
                                {/* Name and Phone Row */}
                                <div className='flex flex-col items-center gap-6 lg:flex-row w-full form-element'>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label htmlFor="name" className='text-black font-semibold text-sm form-label'>
                                            {t('formName')}
                                        </label>
                                        <input
                                            id='name'
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t('namePlaceholder')}
                                            className={`rounded-[6px] border ${errors.name ? 'border-red-500' : 'border-[#E5E7EB]'} bg-white px-[17px] pt-[13.5px] pb-[14px] form-input`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label htmlFor="phone" className='text-black font-semibold text-sm form-label'>
                                            {t('formPhone')}
                                        </label>
                                        <input
                                            id='phone'
                                            type="text"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={t('phonePlaceholder')}
                                            className={`rounded-[6px] border ${errors.phone ? 'border-red-500' : 'border-[#E5E7EB]'} bg-white px-[17px] pt-[13.5px] pb-[14px] form-input`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className='w-full flex flex-col gap-2 form-element'>
                                    <label htmlFor="email" className='text-black font-semibold text-sm form-label'>
                                        {t('formEmail')}
                                    </label>
                                    <input
                                        id='email'
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t('emailPlaceholder')}
                                        className={`rounded-[6px] border ${errors.email ? 'border-red-500' : 'border-[#E5E7EB]'} bg-white px-[17px] pt-[13.5px] pb-[14px] form-input`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>

                                {/* Message Field */}
                                <div className='w-full flex flex-col gap-2 form-element'>
                                    <label htmlFor="message" className='text-black font-semibold text-sm form-label'>
                                        {t('formMessage')}
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('messagePlaceholder')}
                                        rows={4}
                                        className={`rounded-[6px] border ${errors.message ? 'border-red-500' : 'border-[#E5E7EB]'} bg-white px-[17px] pt-[13.5px] pb-[14px] form-input resize-none`}
                                    />
                                    {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className='bg-[#ECECEC] py-[2.73px] ps-[2.73px] pe-[10.91px] rounded-[49.47px] shadow-item w-fit self-center lg:py-[3.95px] lg:pe-[15.79px] lg:ps-[3.95px] lg:rounded-[71.6px] lg:self-start submit-button-container form-element'>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex items-center gap-[6.37px] lg:gap-[9.21px] cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <div className={`bg-[#7745A2] px-[29.02px] py-[9.09px] rounded-[18.19px] shadow-button lg:px-[42px] lg:py-[13.16px] lg:rounded-[26.23px] submit-button ${locale === "ar" ? "order-2" : "order-1"}`}>
                                        <p className='font-medium text-white text-[10.91px] lg:text-base'>
                                            {isSubmitting ? t('sending') : t('sendButton')}
                                        </p>
                                    </div>
                                    <Image
                                        src={"/arrowRightThick.svg"}
                                        alt={t('arrowAlt')}
                                        width={24}
                                        height={24}
                                        className={`w-[14px] h-[14px] lg:w-[24px] lg:h-[24px] arrow-icon ${locale === 'ar' ? 'transform rotate-180 order-1' : 'order-2'}`}
                                    />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
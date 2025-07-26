"use client"

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import './contact-animations.css'

const Contact = () => {
    const t = useTranslations("Contact")
    const v = useTranslations("validation")
    const locale = useLocale()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const validateForm = () => {
        let isValid = true
        const newErrors = {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
        // Clear error when user types
        if (errors[id as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/public/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': locale === 'ar' ? 'ar-SA' : 'en-US'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSubmitSuccess(true)
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: ''
                })
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to submit form')
            }
        } catch (error) {
            console.error('Submission error:', error)
            // You might want to show an error message to the user here
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

                <div className={`flex-1 w-[359px] max-[375px]:w-[310px] md:w-[567px] lg:w-[500px] xl:w-fit max-w-[809px] ${locale === 'ar' ? 'lg:pe-5 xl:pe-10 xlg:!pe-[96px]' : 'lg:ps-5 xl:ps-10 xlg:!ps-[96px]'
                    }`}>
                    <form onSubmit={handleSubmit} className='p-12 rounded-[24px] bg-white shadow-form flex flex-col form-container'>
                        {submitSuccess && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                                {t('submitSuccess')}
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
                                        name="message"
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('messagePlaceholder')}
                                        rows={4}
                                        className={`rounded-[6px] border ${errors.message ? 'border-red-500' : 'border-[#E5E7EB]'} bg-white px-[17px] pt-[13.5px] pb-[14px] form-input resize-none`}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className='bg-[#ECECEC] py-[2.73px] ps-[2.73px] pe-[10.91px] rounded-[49.47px] shadow-item w-fit self-center lg:py-[3.95px] lg:pe-[15.79px] lg:ps-[3.95px] lg:rounded-[71.6px] lg:self-start submit-button-container form-element'>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex items-center gap-[6.37px] lg:gap-[9.21px] cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''} ${isSubmitting ? 'opacity-50' : ''}`}
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
                                        className={`w-[14px] h-[14px] lg:w-[24px] lg:h-[24px] arrow-icon ${locale === 'ar' ? 'transform rotate-180 order-1' : 'order-2'
                                            }`}
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
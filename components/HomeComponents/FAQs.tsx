"use client"
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

const FAQs = () => {
    const t = useTranslations("FAQs")
    const locale = useLocale()

    const faqs = [
        {
            question: t('q1'),
            answer: t('a1')
        },
        {
            question: t('q2'),
            answer: t('a2')
        },
        {
            question: t('q3'),
            answer: t('a3')
        },
        {
            question: t('q4'),
            answer: t('a4')
        },
        {
            question: t('q5'),
            answer: t('a5')
        },
        {
            question: t('q6'),
            answer: t('a6')
        }
    ]

    return (
        <section
            id='faqs'
            className='general-container py-8 flex-center flex-col gap-8 lg:py-10 xlg:!py-20'
        >
            <div className='flex-center flex-col gap-3 lg:gap-12'>
                <div className='flex-center flex-col gap-2'>
                    <h6 className='text-[#7745A2] font-semibold text-xs lg:text-sm'>{t('sectionTitle')}</h6>
                    <h4 className='font-bold text-center text-[28px] lg:text-[32px] xlg:!text-[36px]'>
                        {t('mainTitle1')} <span className='text-[#7745A2]'>{t('mainTitle2')}</span>
                    </h4>
                    <p className='text-[#51564E] opacity-80 text-base lg:text-lg lg:text-[#7745A2]'>
                        {t('subtitle')}
                    </p>
                </div>

                <div className='w-full grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-2 xlg:!grid-cols-3'>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`min-w-[340px] max-[375px]:min-w-[310px] flex flex-col gap-2 lg:gap-4 ${locale === 'ar' ? 'text-right' : 'text-left'
                                }`}
                        >
                            <p className='text-[#7745A2] font-semibold text-[20px] max-[375px]:text-base'>
                                {faq.question}
                            </p>
                            <p className='text-[#51564E] font-medium max-[375px]:text-xs'>
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQs
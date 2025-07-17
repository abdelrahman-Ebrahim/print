'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

const About = () => {
    const t = useTranslations("About")
    return (
        <section id="about" className='general-container flex-center flex-col py-8 lg:py-10 lg:px-6 xlg:!py-20'>
            <div className='flex-center flex-col gap-6 py-[2px]'>
                <h6 className='text-[#7745A2] font-semibold uppercase text-xs lg:text-sm'>{t('section')}</h6>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col items-center gap-3'>
                        <h2 className='text-black font-medium text-center text-[28px] lg:text-[36px]'>{t("headline")}</h2>
                        <p className='text-[#7745A2] text-center max-w-[680px] text-base lg:text-[20px]'>{t("intro")}</p>
                    </div>
                    <p className='text-[#707070] text-center text-base lg:text-[22px]'>
                        {t('desc1')}
                        <br/> <br/>
                        {t('desc2')}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About
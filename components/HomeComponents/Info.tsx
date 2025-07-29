'use client'
import { useTranslations } from 'next-intl'
import React, { useState, useEffect, useRef } from 'react'

const Info = () => {
    const t = useTranslations("Info")
    const sectionRef = useRef<HTMLElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Counter values (as strings to preserve formatting)
    const [agentsCount, setAgentsCount] = useState("0")
    const [citiesCount, setCitiesCount] = useState("0")
    const [documentsCount, setDocumentsCount] = useState("0")
    const [usersCount, setUsersCount] = useState("0")

    // Target values with their abbreviations
    const targets = [
        { value: 500, suffix: "", setter: setAgentsCount },
        { value: 40, suffix: "", setter: setCitiesCount },
        { value: 1.2, suffix: "M", setter: setDocumentsCount },
        { value: 200, suffix: "K", setter: setUsersCount }
    ]

    // Animation duration in milliseconds
    const duration = 1000

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true)
                        animateCounters()
                    }
                })
            },
            { threshold: 0.5 } // Trigger when 50% of element is visible
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [hasAnimated])

    const animateCounters = () => {
        let startTime: number | null = null

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / duration, 1)

            targets.forEach(target => {
                const currentValue = progress * target.value
                // For values less than 1 (like 0.5), show decimal, otherwise show integer
                const displayValue = target.value < 1 ?
                    currentValue.toFixed(1) :
                    Math.floor(currentValue).toString()
                target.setter(`${displayValue}${target.suffix}`)
            })

            if (progress < 1) {
                requestAnimationFrame(step)
            } else {
                // Ensure we end exactly at the target values
                setAgentsCount("500")
                setCitiesCount("40")
                setDocumentsCount("1.2M")
                setUsersCount("200K")
            }
        }

        requestAnimationFrame(step)
    }

    return (
        <section
            id='info'
            ref={sectionRef}
            className='general-container flex-center py-8 lg:py-10 lg:px-6 xlg:!py-20'
        >
            <div className='rounded-[18px] w-full py-8 px-8 shadow-info grid grid-cols-2 lg:grid-cols-4 gap-9 xlg:rounded-[36.28px] xlg:py-[47.77px] xlg:px-[97.95px] xlg:gap-[134.83px] max-w-[1920px] xlg:mx-auto'>
                <div className='flex flex-col items-center xlg:gap-[7.42px]'>
                    <p className='font-medium text-black text-[32px] xlg:text-[40px] text-nowrap max-[425px]:text-[22px]'>
                        {agentsCount}<span className='text-[#7745A2]'>+</span>
                    </p>
                    <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px]'>{t('agents')}</p>
                </div>
                <div className='flex flex-col items-center xlg:gap-[7.42px]'>
                    <p className='font-medium text-black text-[32px] xlg:text-[40px] text-nowrap max-[425px]:text-[22px]'>
                        {citiesCount}<span className='text-[#7745A2]'>+</span>
                    </p>
                    <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px] '>{t('cities')}</p>
                </div>
                <div className='flex flex-col items-center xlg:gap-[7.42px]'>
                    <p className='font-medium text-black text-[32px] xlg:text-[40px] text-nowrap max-[425px]:text-[22px]'>
                        {documentsCount}<span className='text-[#7745A2]'>+</span>
                    </p>
                    {/* Switching Text */}
                    <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px] text-nowrap hidden lg:flex'>{t('documents')}</p>
                    <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px] flex lg:hidden'>{t('files')}</p>
                </div>
                <div className='flex flex-col items-center xlg:gap-[7.42px]'>
                    <p className='font-medium text-black text-[32px] xlg:text-[40px] text-nowrap max-[425px]:text-[22px]'>
                        {usersCount}<span className='text-[#7745A2]'>+</span>
                    </p>
                    <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px]'>{t('users')}</p>
                </div>
            </div>
        </section>
    )
}

export default Info
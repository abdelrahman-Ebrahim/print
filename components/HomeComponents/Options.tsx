"use client"
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

const Options = () => {
    const t = useTranslations("Options")
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in')
                    }
                })
            },
            { threshold: 0.2 }
        )

        const section = sectionRef.current as HTMLElement | null
        if (section) {
            const textDiv = section.querySelector('.text-content')
            const imageDiv = section.querySelector('.image-content')

            if (textDiv) observer.observe(textDiv)
            if (imageDiv) observer.observe(imageDiv)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <style jsx>{`
                .text-content, .image-content {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s ease;
                }
                
                .fade-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                
                .shake-phone {
                    animation: shake 3s ease-in-out infinite;
                    transition: transform 0.3s ease;
                }
                
                .shake-phone:hover {
                    transform: scale(1.05) rotate(2deg);
                    filter: drop-shadow(0 10px 20px rgba(119, 69, 162, 0.3));
                }
                
                .hover-text {
                    transition: all 0.3s ease;
                }
                
                .hover-text:hover {
                    color: #7745A2;
                    transform: translateY(-2px);
                }
                
                @keyframes shake {
                    0%, 100% { 
                        transform: translateX(0px) rotate(0deg); 
                    }
                    25% { 
                        transform: translateX(-4px) rotate(-5deg); 
                    }
                    50% { 
                        transform: translateX(4px) rotate(5deg); 
                    }
                    75% { 
                        transform: translateX(-2px) rotate(-01deg); 
                    }
                }
            `}</style>

            <section
                ref={sectionRef}
                className="general-container flex-center py-8 bg-[url('/dotsBg.png')] lg:h-[400px] xl:h-[480px] xlg:!h-[704px] lg:py-10 xlg:!py-20"
            >
                <div className='flex flex-col gap-4 items-center justify-between w-full lg:flex-row lg:gap-0'>
                    <div className='text-content flex flex-col gap-9'>
                        <div className='flex flex-col gap-8 lg:w-[544px]'>
                            <div className='flex flex-col gap-4'>
                                <h2 className='hover-text font-bold text-[28px] text-center leading-[38px] lg:text-start lg:text-[32px] xlg:leading-[49px] xlg:!text-[40px]'>
                                    {t('title1')} <br className='hidden lg:block' />
                                    {t('title2')} <br />
                                    <span className='text-[#7745A2]'>{t('title3')}</span>
                                </h2>
                                <p className='hover-text text-black font-medium text-base text-center lg:text-start xlg:!text-[18px]'>
                                    {t('description1')} <br className='hidden lg:block' />
                                    {t('description2')} <br className='hidden lg:block' />
                                    {t('description3')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='image-content shake-phone'>
                        <Image
                            src={"/iPhoneGroup.svg"}
                            alt={t('imageAlt')}
                            width={646.64}
                            height={591.76}
                            className='w-[271.48px] h-[248.44px] lg:w-[340px] lg:h-[300px] xl:w-[420px] xl:h-[370px] xlg:!w-[646.64px] xlg:!h-[591.76px]'
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Options
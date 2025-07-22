"use client"
import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

const FAQs = () => {
    const t = useTranslations("FAQs")
    const locale = useLocale()
    const [isVisible, setIsVisible] = useState(false)
    const [titleHovered, setTitleHovered] = useState(false)
    const [subtitleHovered, setSubtitleHovered] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 }
        )

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const faqs = [
        { question: t('q1'), answer: t('a1') },
        { question: t('q2'), answer: t('a2') },
        { question: t('q3'), answer: t('a3') },
        { question: t('q4'), answer: t('a4') },
        { question: t('q5'), answer: t('a5') },
        { question: t('q6'), answer: t('a6') },
    ]

    // Anime-style question mark configurations
    const questionMarks = [
        // Top area
        { size: '120px', left: '5%', top: '10%', rotate: '15deg', opacity: '0.08', delay: '0s' },
        { size: '140px', left: '90%', top: '15%', rotate: '-20deg', opacity: '0.1', delay: '0.5s' },
        { size: '100px', left: '15%', top: '5%', rotate: '25deg', opacity: '0.07', delay: '0.8s' },

        // Middle left
        { size: '110px', left: '3%', top: '35%', rotate: '30deg', opacity: '0.09', delay: '1.2s' },
        { size: '80px', left: '8%', top: '50%', rotate: '-15deg', opacity: '0.06', delay: '1.5s' },
        { size: '90px', left: '12%', top: '65%', rotate: '10deg', opacity: '0.07', delay: '0.9s' },

        // Middle right
        { size: '130px', left: '88%', top: '40%', rotate: '-25deg', opacity: '0.11', delay: '0.3s' },
        { size: '95px', left: '92%', top: '55%', rotate: '10deg', opacity: '0.08', delay: '1s' },
        { size: '105px', left: '85%', top: '70%', rotate: '-10deg', opacity: '0.09', delay: '1.3s' },
    ]

    return (
        <section
            ref={sectionRef}
            id='faqs'
            className='general-container py-8 w-full flex-center flex-col gap-8 lg:py-10 xlg:!py-20 relative overflow-hidden'
        >
            {/* Anime-style Bulky Question Marks */}
            {isVisible && (
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {questionMarks.map((mark, index) => (
                        <div
                            key={index}
                            className="absolute font-black text-[#7745A2] animate-float-anime"
                            style={{
                                fontSize: mark.size,
                                left: mark.left,
                                top: mark.top,
                                transform: `rotate(${mark.rotate})`,
                                opacity: mark.opacity,
                                filter: 'drop-shadow(0 4px 8px rgba(119, 69, 162, 0.3))',
                                animationDelay: mark.delay,
                                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                textShadow: `
                                    3px 3px 0 #fff,
                                    -1px -1px 0 #fff,  
                                    1px -1px 0 #fff,
                                    -1px 1px 0 #fff,
                                    1px 1px 0 #fff,
                                    2px 2px 5px rgba(0,0,0,0.1)
                                `,
                                zIndex: 0,
                                lineHeight: '1',
                                willChange: 'transform'
                            }}
                        >
                            ?
                        </div>
                    ))}
                </div>
            )}

            {/* Existing Content (unchanged) */}
            <div className='flex-center flex-col gap-2 w-full relative z-10'>
                <div className="relative">
                    <h6 className={`text-[#7745A2] font-semibold uppercase text-xs lg:text-sm transition-all duration-1000 ${isVisible
                        ? 'opacity-100 translate-y-0 tracking-wider'
                        : 'opacity-0 translate-y-4 tracking-normal'
                        }`}>
                        {t('sectionTitle')}
                    </h6>
                    <div className={`absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#7745A2] to-transparent transition-all duration-1000 delay-300 ${isVisible
                        ? 'w-full -translate-x-1/2 opacity-100'
                        : 'w-0 -translate-x-1/2 opacity-0'
                        }`}></div>
                </div>

                <h4
                    className={`w-full font-bold text-center text-[28px] lg:text-[32px] xlg:!text-[36px] cursor-pointer relative overflow-hidden transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${titleHovered ? 'scale-105' : ''}`}
                    onMouseEnter={() => setTitleHovered(true)}
                    onMouseLeave={() => setTitleHovered(false)}
                >
                    <span className={`inline-block transition-all text-center duration-500 ${titleHovered ? 'text-[#5a3472] transform -rotate-1' : ''}`}>
                        {t('mainTitle1')}
                    </span>{' '}
                    <span className={`text-[#7745A2] inline-block transition-all duration-500 ${titleHovered ? 'transform rotate-1 scale-110 ms-2' : ''}`}>
                        {t('mainTitle2')}
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#7745A2]/5 via-[#7745A2]/10 to-[#7745A2]/5 rounded-lg transition-all duration-500 -z-10 ${titleHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}></div>
                    {titleHovered && (
                        <>
                            <div className="absolute -top-2 -right-2 w-2 h-2 bg-[#7745A2] rounded-full animate-ping"></div>
                            <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-[#7745A2] rounded-full animate-ping delay-200"></div>
                        </>
                    )}
                </h4>

                <div
                    className={`text-[#51564E] text-base lg:text-lg lg:text-[#7745A2] cursor-pointer relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${subtitleHovered ? 'scale-102 text-[#7745A2]' : 'opacity-80'}`}
                    onMouseEnter={() => setSubtitleHovered(true)}
                    onMouseLeave={() => setSubtitleHovered(false)}
                >
                    <p className={`transition-all duration-300 text-center ${subtitleHovered ? 'tracking-wide' : ''}`}>
                        {t('subtitle')}
                    </p>
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#7745A2] to-purple-400 transition-all duration-300 ${subtitleHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                </div>
            </div>

            <div className={`w-full grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-2 xlg:!grid-cols-3 z-10`}>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`
                            min-[375px]:min-w-[340px] flex flex-col gap-2 lg:gap-4 p-6 rounded-xl cursor-pointer
                            transform transition-all duration-700 ease-out
                            bg-gradient-to-br from-white via-[#F9F7FC] to-white
                            border border-[#eee]
                            hover:scale-[1.05] hover:-rotate-[0.8deg]
                            hover:shadow-[0_12px_32px_rgba(119,69,162,0.2)]
                            hover:border-[#d9c9f1]
                            hover:bg-gradient-to-br hover:from-[#fefcff] hover:via-[#F6F3FC] hover:to-[#fefcff]
                            group
                            ${locale === 'ar' ? 'text-right' : 'text-left'}
                            ${isVisible
                                ? `opacity-100 translate-y-0 animate-card-slide-in`
                                : 'opacity-0 translate-y-8'
                            }
                        `}
                        style={{
                            animationDelay: `${600 + index * 150}ms`,
                            animationFillMode: 'both'
                        }}
                    >
                        <p className='text-[#7745A2] font-semibold text-[20px] max-[375px]:text-base transition-all duration-300 group-hover:text-[#5a3472] group-hover:scale-105'>
                            {faq.question}
                        </p>
                        <p className='text-[#51564E] font-medium max-[375px]:text-xs transition-all duration-300 group-hover:text-[#444] leading-relaxed'>
                            {faq.answer}
                        </p>
                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#7745A2] to-purple-400 rounded-b-xl transition-all duration-300 group-hover:w-full w-0"></div>
                    </div>
                ))}
            </div>

            {/* Enhanced Anime Floating Animation */}
            <style jsx>{`
                @keyframes float-anime {
                    0%, 100% { 
                        transform: translateY(0) rotate(var(--rotation)) scale(1);
                        text-shadow: 
                            3px 3px 0 #fff,
                            -1px -1px 0 #fff,  
                            1px -1px 0 #fff,
                            -1px 1px 0 #fff,
                            1px 1px 0 #fff,
                            2px 2px 5px rgba(0,0,0,0.1);
                    }
                    25% { 
                        transform: translateY(-12px) rotate(calc(var(--rotation) + 5deg)) scale(1.1);
                        text-shadow: 
                            4px 4px 0 #fff,
                            -2px -2px 0 #fff,  
                            2px -2px 0 #fff,
                            -2px 2px 0 #fff,
                            2px 2px 0 #fff,
                            3px 3px 8px rgba(0,0,0,0.15);
                    }
                    50% { 
                        transform: translateY(-20px) rotate(var(--rotation)) scale(1.15);
                        text-shadow: 
                            5px 5px 0 #fff,
                            -3px -3px 0 #fff,  
                            3px -3px 0 #fff,
                            -3px 3px 0 #fff,
                            3px 3px 0 #fff,
                            4px 4px 10px rgba(0,0,0,0.2);
                    }
                    75% { 
                        transform: translateY(-12px) rotate(calc(var(--rotation) - 5deg)) scale(1.1);
                        text-shadow: 
                            4px 4px 0 #fff,
                            -2px -2px 0 #fff,  
                            2px -2px 0 #fff,
                            -2px 2px 0 #fff,
                            2px 2px 0 #fff,
                            3px 3px 8px rgba(0,0,0,0.15);
                    }
                }
                
                .animate-float-anime {
                    animation: float-anime 8s ease-in-out infinite;
                }
            `}</style>
        </section>
    )
}

export default FAQs
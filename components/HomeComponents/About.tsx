'use client'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState, useRef } from 'react'

const About = () => {
    const t = useTranslations("About")
    const [isVisible, setIsVisible] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                })
            }
        }

        const section = sectionRef.current
        if (section) {
            section.addEventListener('mousemove', handleMouseMove)
            return () => section.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            id="about"
            className='general-container flex-center flex-col py-8 lg:py-10 lg:px-6 xlg:!py-20 relative overflow-hidden'
        >
            {/* Interactive background with mouse tracking */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient background that follows mouse */}
                <div
                    className="absolute w-96 h-96 bg-gradient-radial from-[#7745A2]/5 via-[#7745A2]/2 to-transparent rounded-full blur-3xl transition-all duration-700 ease-out"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                        opacity: isVisible ? 1 : 0
                    }}
                />

                {/* Animated geometric shapes */}
                {isVisible && (
                    <>
                        {/* Floating geometric elements */}
                        <div className="absolute top-[10%] left-[8%] w-4 h-4 border-2 border-[#7745A2]/20 rotate-45 animate-spin"
                            style={{ animationDuration: '8s' }}></div>
                        <div className="absolute top-[20%] right-[12%] w-6 h-6 bg-[#7745A2]/10 rounded-full animate-bounce delay-300"></div>
                        <div className="absolute bottom-[25%] left-[15%] w-5 h-5 border-2 border-[#7745A2]/15 animate-pulse"></div>
                        <div className="absolute bottom-[15%] right-[10%] w-3 h-3 bg-[#7745A2]/20 rotate-45 animate-bounce delay-700"></div>

                        {/* Animated lines */}
                        <div className="absolute top-[30%] left-[5%] w-16 h-0.5 bg-gradient-to-r from-[#7745A2]/30 to-transparent"
                            style={{ animation: 'slideIn 2s ease-out' }}></div>
                        <div className="absolute bottom-[40%] right-[8%] w-12 h-0.5 bg-gradient-to-l from-[#7745A2]/25 to-transparent"
                            style={{ animation: 'slideIn 2.5s ease-out' }}></div>
                    </>
                )}
            </div>

            <div className='flex-center flex-col gap-6 py-[2px] relative z-10'>
                {/* Section label with enhanced animation */}
                <div className="relative">
                    <h6 className={`text-[#7745A2] font-semibold uppercase text-xs lg:text-sm transition-all duration-1000 ${isVisible
                            ? 'opacity-100 translate-y-0 tracking-wider'
                            : 'opacity-0 translate-y-4 tracking-normal'
                        }`}>
                        {t('section')}
                    </h6>
                    {/* Animated underline */}
                    <div className={`absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#7745A2] to-transparent transition-all duration-1000 delay-300 ${isVisible ? 'w-full -translate-x-1/2 opacity-100' : 'w-0 -translate-x-1/2 opacity-0'
                        }`}></div>
                </div>

                <div className='flex flex-col gap-8'>
                    {/* Main headline with letter animation */}
                    <div className='flex flex-col items-center gap-3'>
                        <h2 className={`text-black font-medium text-center text-[28px] lg:text-[36px] transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}>
                            <span className="inline-block hover:text-[#7745A2] hover:scale-110 transition-all duration-300 cursor-default">
                                {t("headline")}
                            </span>
                        </h2>

                        {/* Intro text with gradient animation */}
                        <div className="relative overflow-hidden">
                            <p className={`text-[#7745A2] text-center max-w-[680px] text-base lg:text-[20px] transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                {t("intro")}
                            </p>
                            {/* Shimmer effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-transform duration-1000 ${isVisible ? 'translate-x-full' : '-translate-x-full'
                                }`}></div>
                        </div>
                    </div>

                    {/* Description with typewriter-style animation */}
                    <div className="relative">
                        <p className={`text-[#707070] text-center text-base lg:text-[22px] leading-relaxed transition-all duration-1200 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                            <span className="inline-block hover:text-[#7745A2] transition-colors duration-300">
                                {t('desc1')}
                            </span>
                            <br /> <br />
                            <span className="inline-block hover:text-[#7745A2] transition-colors duration-300">
                                {t('desc2')}
                            </span>
                        </p>

                        {/* Decorative elements around text */}
                        <div className={`absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#7745A2]/20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}></div>
                        <div className={`absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#7745A2]/20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}></div>
                    </div>
                </div>

                {/* Floating accent elements */}
                {isVisible && (
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-0 w-2 h-16 bg-gradient-to-b from-transparent via-[#7745A2]/20 to-transparent"
                            style={{ animation: 'slideUp 3s ease-in-out infinite' }}></div>
                        <div className="absolute top-1/2 right-0 w-2 h-12 bg-gradient-to-b from-transparent via-[#7745A2]/15 to-transparent"
                            style={{ animation: 'slideUp 3s ease-in-out infinite 1.5s' }}></div>
                    </div>
                )}
            </div>

            {/* Custom animations */}
            <style jsx>{`
                @keyframes slideIn {
                    0% { width: 0; opacity: 0; }
                    50% { opacity: 1; }
                    100% { width: 4rem; opacity: 0.3; }
                }
                
                @keyframes slideUp {
                    0%, 100% { transform: translateY(20px); opacity: 0; }
                    50% { transform: translateY(-20px); opacity: 1; }
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>
        </section>
    )
}

export default About
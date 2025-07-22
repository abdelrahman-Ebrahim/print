"use client"
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Hero = () => {
    const t = useTranslations("Hero")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section
            id='hero'
            className='general-container flex-center w-full mt-[85px] bg-[#7745A20A] lg:pt-20 pb-10 xlg:mt-0 xlg:!pt-[128px] xlg:pb-[80px] relative overflow-hidden'
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-[#7745A2]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-[#7745A2]/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

                {/* Enhanced Floating Particles - More visible and numerous */}
                {mounted && (
                    <>
                        {/* Left side particles - visible in text area */}
                        <div className="absolute top-[15%] left-[5%] w-3 h-3 bg-[#7745A2]/60 rounded-full animate-bounce delay-0 shadow-lg"></div>
                        <div className="absolute top-[25%] left-[15%] w-2 h-2 bg-[#7745A2]/70 rounded-full animate-bounce delay-500 shadow-md"></div>
                        <div className="absolute top-[45%] left-[8%] w-2.5 h-2.5 bg-[#7745A2]/50 rounded-full animate-bounce delay-1200 shadow-lg"></div>
                        <div className="absolute top-[65%] left-[12%] w-1.5 h-1.5 bg-[#7745A2]/80 rounded-full animate-bounce delay-800 shadow-sm"></div>
                        <div className="absolute top-[80%] left-[6%] w-2 h-2 bg-[#7745A2]/65 rounded-full animate-bounce delay-300 shadow-md"></div>

                        {/* Top area particles */}
                        <div className="absolute top-[8%] left-[25%] w-1.5 h-1.5 bg-[#7745A2]/70 rounded-full animate-bounce delay-600 shadow-sm"></div>
                        <div className="absolute top-[12%] left-[45%] w-2 h-2 bg-[#7745A2]/55 rounded-full animate-bounce delay-1100 shadow-md"></div>
                        <div className="absolute top-[18%] left-[60%] w-1 h-1 bg-[#7745A2]/75 rounded-full animate-bounce delay-400 shadow-sm"></div>

                        {/* Right side particles - around image but visible */}
                        <div className="absolute top-[20%] right-[5%] w-2 h-2 bg-[#7745A2]/65 rounded-full animate-bounce delay-700 shadow-md"></div>
                        <div className="absolute top-[40%] right-[8%] w-1.5 h-1.5 bg-[#7745A2]/80 rounded-full animate-bounce delay-200 shadow-sm"></div>
                        <div className="absolute top-[60%] right-[12%] w-2.5 h-2.5 bg-[#7745A2]/50 rounded-full animate-bounce delay-900 shadow-lg"></div>
                        <div className="absolute top-[75%] right-[6%] w-1 h-1 bg-[#7745A2]/70 rounded-full animate-bounce delay-1000 shadow-sm"></div>

                        {/* Bottom area particles */}
                        <div className="absolute bottom-[15%] left-[30%] w-2 h-2 bg-[#7745A2]/60 rounded-full animate-bounce delay-1300 shadow-md"></div>
                        <div className="absolute bottom-[10%] left-[50%] w-1.5 h-1.5 bg-[#7745A2]/75 rounded-full animate-bounce delay-150 shadow-sm"></div>
                        <div className="absolute bottom-[8%] right-[25%] w-2.5 h-2.5 bg-[#7745A2]/45 rounded-full animate-bounce delay-850 shadow-lg"></div>

                        {/* Additional floating elements for more life */}
                        <div className="absolute top-[30%] left-[20%] w-4 h-0.5 bg-gradient-to-r from-[#7745A2]/40 to-transparent rounded-full rotate-45" style={{ animation: 'float 4s ease-in-out infinite' }}></div>
                        <div className="absolute top-[70%] right-[15%] w-3 h-0.5 bg-gradient-to-l from-[#7745A2]/50 to-transparent rounded-full -rotate-45" style={{ animation: 'float 3s ease-in-out infinite 1s' }}></div>

                        {/* Pulsing rings */}
                        <div className="absolute top-[35%] left-[10%] w-6 h-6 border border-[#7745A2]/30 rounded-full animate-ping"></div>
                        <div className="absolute bottom-[25%] right-[10%] w-8 h-8 border border-[#7745A2]/20 rounded-full animate-ping delay-700"></div>
                    </>
                )}
            </div>

            <div className='flex flex-col items-center lg:items-start gap-4 lg:flex-row w-full xlg:gap-8 xlg:w-[1376px] relative z-10'>
                {/* Text Content with Staggered Animation */}
                <div className={`py-8 pb-0 flex flex-col gap-4 lg:py-10 lg:px-6 xlg:gap-6 xlg:!py-20 xlg:!px-12 transition-all duration-1000 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}>
                    <div className='flex flex-col gap-4 xlg:gap-9'>
                        <div className='flex flex-col gap-4 text-center lg:text-start'>
                            <h1 className={`font-semibold text-[30px] text-black leading-[38px] lg:text-[45px] lg:leading-[62px] xlg:text-[50px] transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                                }`}>
                                <span className="inline-block hover:text-[#7745A2] transition-colors duration-300">
                                    {t("title1")}
                                </span><br />
                                <span className="inline-block hover:text-[#7745A2] transition-colors duration-300">
                                    {t("title2")} - {t("title3")}
                                </span> <br />
                                <span className='text-[#7745A2] inline-block hover:scale-105 transition-transform duration-300'>
                                    {t("title4")}
                                </span>
                                <span className={`block text-[15px] font-medium leading-[28px] lg:hidden transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                                    }`}>
                                    {t("subtitleMobile")}
                                </span>
                            </h1>
                            <p className={`text-[#707070] text-base xlg:text-[18px] transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                                }`}>
                                <span className='hidden lg:flex'>{t("subtitleDesktop1")}</span>
                                {t("subtitleDesktop2")}
                            </p>
                        </div>

                        {/* App Store Buttons with Hover Effects */}
                        <div className={`flex items-center justify-center gap-[8.71px] lg:justify-start xlg:gap-[13px] transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                            }`}>
                            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                <Image
                                    src={"/app-store.svg"}
                                    alt={t("appStoreAlt")}
                                    width={190.97}
                                    height={63.66}
                                    className='w-[128px] h-[42.67px] lg:w-[155px] lg:h-[53px] xlg:w-[190.97px] xlg:h-[63.66px] transition-all duration-300 group-hover:brightness-110'
                                />
                            </div>
                            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                <Image
                                    src={"/play-store.svg"}
                                    alt={t("playStoreAlt")}
                                    width={214.84}
                                    height={63.66}
                                    className='w-[144px] h-[42.67px] lg:w-[196px] lg:h-[53px] xlg:w-[214.84px] xlg:h-[63.66px] transition-all duration-300 group-hover:brightness-110'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Image with Enhanced Animations */}
                <div className={`flex flex-center w-full transition-all duration-1200 delay-300 ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}>
                    <div className='w-full h-full relative lg:mt-[60px] xl:mt-0 group'>
                        {/* Multiple layered background effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#7745A2]/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#7745A2]/3 to-[#7745A2]/8 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>

                        {/* Animated phone container with multiple effects */}
                        <div className="relative"
                            style={{
                                animation: mounted ? 'phoneFloat 6s ease-in-out infinite' : 'none'
                            }}>

                            {/* Rotating gradient border */}
                            <div className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: 'conic-gradient(from 0deg, transparent, #7745A2/20, transparent, #7745A2/10, transparent)',
                                    animation: mounted ? 'rotate 8s linear infinite' : 'none'
                                }}>
                            </div>

                            {/* Phone image with enhanced animations */}
                            <Image
                                src={"/hero.png"}
                                alt={t("imageAlt")}
                                width={570}
                                height={564}
                                className='w-full h-full xlg:!h-[564px] lg:scale-150 xl:scale-125 overflow-hidden transition-all duration-700 group-hover:scale-110 lg:group-hover:scale-[1.55] xl:group-hover:scale-[1.3] group-hover:rotate-1 relative z-10'
                                style={{
                                    filter: 'drop-shadow(0 25px 50px rgba(119, 69, 162, 0.15))',
                                    animation: mounted ? 'phonePulse 4s ease-in-out infinite' : 'none'
                                }}
                            />

                            {/* Animated light rays */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                                <div className="absolute inset-0"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(119, 69, 162, 0.1) 0%, transparent 70%)',
                                        animation: mounted ? 'pulse 3s ease-in-out infinite' : 'none'
                                    }}>
                                </div>
                            </div>
                        </div>

                        {/* Orbiting particles around phone */}
                        {mounted && (
                            <div className="absolute inset-0">
                                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#7745A2]/50 rounded-full"
                                    style={{ animation: 'orbit 10s linear infinite' }}>
                                </div>
                                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#7745A2]/40 rounded-full"
                                    style={{ animation: 'orbit 12s linear infinite reverse' }}>
                                </div>
                                <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-[#7745A2]/60 rounded-full"
                                    style={{ animation: 'orbit 8s linear infinite' }}>
                                </div>
                            </div>
                        )}

                        {/* Enhanced Fast Service Badge */}
                        <div className={`absolute rounded-full bg-white flex items-center gap-[7.26px] shadow-hero py-[5.13px] ps-[5.13px] pe-[15.4px] right-0 top-20 md:right-[180px] md:top-[180px] lg:-right-14 xl:right-0 lg:top-10 xl:top-[95px] xl:py-[7.26px] xl:ps-[7.26px] xl:pe-[21.78px] transition-all duration-1000 delay-700 hover:scale-110 hover:shadow-lg cursor-pointer group/badge ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                            }`}
                            style={{
                                animation: mounted ? 'float 3s ease-in-out infinite' : 'none'
                            }}>
                            <div className='rounded-full bg-[#7745A2] w-[23.09px] h-[23.09px] flex items-center justify-center xl:w-[32.67px] xl:h-[32.67px] transition-transform duration-300 group-hover/badge:rotate-12'>
                                <Image src={"/rocket.svg"} alt='rocket' width={21.78} height={21.78} className='w-[15.4px] h-[15.4px] xl:w-[21.78px] xl:h-[21.78px]' />
                            </div>
                            <p className='text-black font-medium text-[12.26px] xl:text-[14.52px]'>{t("fastService")}</p>
                        </div>

                        {/* Enhanced Easy Upload Badge */}
                        <div className={`absolute rounded-full bg-white py-[5.13px] ps-[5.13px] pe-[15.4px] flex items-center gap-[7.26px] shadow-hero left-10 bottom-[100px] md:left-[180px] md:bottom-[180px] lg:left-0 lg:bottom-14 xl:left-[45px] xl:bottom-[125px] xl:py-[7.26px] xl:ps-[7.26px] xl:pe-[21.78px] transition-all duration-1000 delay-900 hover:scale-110 hover:shadow-lg cursor-pointer group/badge ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                            }`}
                            style={{
                                animation: mounted ? 'float 3s ease-in-out infinite 1.5s' : 'none'
                            }}>
                            <div className='rounded-full bg-[#7745A2] w-[23.09px] h-[23.09px] flex items-center justify-center xl:w-[32.67px] xl:h-[32.67px] transition-transform duration-300 group-hover/badge:-rotate-12'>
                                <Image src={"/white-upload.svg"} alt='upload' width={21.78} height={21.78} className='w-[15.4px] h-[15.4px] xl:w-[21.78px] xl:h-[21.78px]' />
                            </div>
                            <p className='text-black font-medium text-[12.26px] xl:text-[14.52px]'>{t("easyUpload")}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for additional animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes phoneFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-8px) rotate(0.5deg); }
                    50% { transform: translateY(-5px) rotate(0deg); }
                    75% { transform: translateY(-12px) rotate(-0.5deg); }
                }
                
                @keyframes phonePulse {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 25px 50px rgba(119, 69, 162, 0.15)); }
                    50% { transform: scale(1.02); filter: drop-shadow(0 30px 60px rgba(119, 69, 162, 0.25)); }
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes orbit {
                    0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
                }
            `}</style>
        </section>
    )
}

export default Hero
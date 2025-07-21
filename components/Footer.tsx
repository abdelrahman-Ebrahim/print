"use client"
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Footer = () => {
    const t = useTranslations("Footer")
    const locale = useLocale()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const socialIcons = [
        { src: "/xIcon.svg", alt: "X", name: "X" },
        { src: "/facebookIcon.svg", alt: "Facebook", name: "Facebook" },
        { src: "/instagramIcon.svg", alt: "Instagram", name: "Instagram" },
        { src: "/linkedinIcon.svg", alt: "LinkedIn", name: "LinkedIn" },
        { src: "/snapchatIcon.svg", alt: "Snapchat", name: "Snapchat" }
    ]

    return (
        <footer className='general-container bg-white py-8 lg:py-4 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-4 -right-4 w-48 h-48 bg-gradient-to-br from-[#7745A2]/5 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-gradient-to-tr from-[#7745A2]/3 to-transparent rounded-full blur-2xl"></div>

                {/* Floating Particles */}
                {mounted && (
                    <>
                        <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-[#7745A2]/30 rounded-full animate-bounce delay-0"></div>
                        <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 bg-[#7745A2]/40 rounded-full animate-bounce delay-700"></div>
                        <div className="absolute bottom-[20%] left-[20%] w-1 h-1 bg-[#7745A2]/50 rounded-full animate-bounce delay-1000"></div>
                        <div className="absolute bottom-[40%] right-[25%] w-2.5 h-2.5 bg-[#7745A2]/25 rounded-full animate-bounce delay-300"></div>
                    </>
                )}
            </div>

            <div className={`pb-5 flex flex-col gap-5 relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className='flex flex-col gap-[20px] lg:flex-row lg:gap-0 items-center justify-between'>
                    {/* Left Section - Logo and Social Icons */}
                    <div className={`flex flex-col items-center gap-6 lg:items-start transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className={`flex flex-col items-center gap-[18.5px] lg:gap-3 lg:items-start`}>
                            {/* Enhanced Logo */}
                            <div className="group cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
                                <div className="relative overflow-hidden rounded-lg p-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-indigo-50 group-hover:shadow-lg group-hover:shadow-purple-200/30">
                                    <Image
                                        src={"/logo.svg"}
                                        alt={"Logo"}
                                        width={100.22}
                                        height={67.35}
                                        className="transition-all duration-300 group-hover:brightness-110"
                                    />
                                    {/* Subtle glow effect */}
                                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: 'radial-gradient(circle, rgba(119, 69, 162, 0.1) 0%, transparent 70%)'
                                        }}>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Social Icons */}
                            <div className='flex items-center gap-5'>
                                {socialIcons.map((icon, index) => (
                                    <div
                                        key={index}
                                        className="group cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
                                        style={{
                                            animation: mounted ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                                        }}
                                    >
                                        <div className="relative p-2 rounded-full transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-50 group-hover:to-indigo-50 group-hover:shadow-md group-hover:shadow-purple-200/40">
                                            <Image
                                                src={icon.src}
                                                alt={icon.alt}
                                                width={20}
                                                height={20}
                                                className="transition-all duration-300 group-hover:brightness-110 group-hover:rotate-12"
                                            />
                                            {/* Hover ring effect */}
                                            <div className="absolute inset-0 rounded-full border-2 border-[#7745A2]/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description with fade-in effect */}
                        <p className={`text-[#141219] text-sm text-center lg:text-[18px] lg:text-start transition-all duration-1000 delay-400 hover:text-[#7745A2] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                            {t('description1')} <br /> {t('description2')}
                        </p>
                    </div>

                    {/* Right Section - App Store Buttons and Copyright */}
                    <div className={`flex flex-col justify-center items-center gap-6 lg:self-end transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        {/* Enhanced App Store Buttons */}
                        <div className='flex items-center gap-[9.22px] lg:gap-[10.91px]'>
                            {/* App Store Button */}
                            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95">
                                <div className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-200/30">
                                    <Image
                                        src={"/app-store.svg"}
                                        alt={t('appStoreAlt')}
                                        width={160.22}
                                        height={53.41}
                                        className='w-[135.45px] h-[45.15px] lg:w-[160.22px] lg:h-[53.41px] transition-all duration-300 group-hover:brightness-110'
                                    />
                                    {/* Shimmer effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                                </div>
                            </div>

                            {/* Play Store Button */}
                            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95">
                                <div className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-200/30">
                                    <Image
                                        src={"/play-store.svg"}
                                        alt={t('playStoreAlt')}
                                        width={180.25}
                                        height={53.41}
                                        className='w-[152.38px] h-[45.15px] lg:w-[180.25px] lg:h-[53.41px] transition-all duration-300 group-hover:brightness-110'
                                    />
                                    {/* Shimmer effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                                </div>
                            </div>
                        </div>

                        {/* Copyright with hover effect */}
                        <p className={`text-[#141219] text-sm text-center lg:text-[18px] transition-all duration-300 hover:text-[#7745A2] cursor-default`}>
                            {t('copyright')}
                        </p>
                    </div>
                </div>

                {/* Enhanced Divider */}
                <div className="relative w-[90%] self-center">
                    <hr className='text-[#0000001A] w-full transition-all duration-300' />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7745A2]/20 to-transparent h-px opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Enhanced Links Section */}
                <div className={`flex-center gap-10 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <Link
                        href={`/${locale}/terms&conditions`}
                        className='group relative underline text-sm text-[#141219] lg:text-[18px] transition-all duration-300 hover:text-[#7745A2] hover:scale-105 active:scale-95'
                    >
                        <span className="relative z-10">{t('terms')}</span>
                        {/* Hover background effect */}
                        <div className="absolute inset-0 -m-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        {/* Animated underline */}
                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#7745A2] w-0 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                    <Link
                        href={`/${locale}/privacypolicy`}
                        className='group relative underline text-sm text-[#141219] lg:text-[18px] transition-all duration-300 hover:text-[#7745A2] hover:scale-105 active:scale-95'
                    >
                        <span className="relative z-10">{t('privacy')}</span>
                        {/* Hover background effect */}
                        <div className="absolute inset-0 -m-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        {/* Animated underline */}
                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#7745A2] w-0 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                </div>
            </div>

            {/* Custom CSS for fade up animation*/}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </footer>
    )
}

export default Footer
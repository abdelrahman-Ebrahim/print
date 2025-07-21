"use client"
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/navigation'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useLocale, useTranslations } from 'next-intl'

type Feature = {
    id: number
    title: string
    description: string
    icon: string
    image: string
}

const Features = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
    const [imageKey, setImageKey] = useState<number>(0)
    const [isVisible, setIsVisible] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const sectionRef = useRef<HTMLElement>(null)
    const t = useTranslations("Features")
    const locale = useLocale();

    const features: Feature[] = [
        {
            id: 1,
            title: t("feature1_title"),
            description: t("feature1_desc"),
            icon: "/file-upload.svg",
            image: "/feature1.svg"
        },
        {
            id: 2,
            title: t("feature2_title"),
            description: t("feature2_desc"),
            icon: "/settings.svg",
            image: "/feature2.svg"
        },
        {
            id: 3,
            title: t('feature3_title'),
            description: t('feature3_desc'),
            icon: "/store.svg",
            image: "/feature3.svg"
        },
        {
            id: 4,
            title: t('feature4_title'),
            description: t('feature4_desc'),
            icon: "/package.svg",
            image: "/feature4.svg"
        }
    ]

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

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex)
        setImageKey(prev => prev + 1)
    }

    const handleFeatureClick = (index: number) => {
        setActiveIndex(index)
        setImageKey(prev => prev + 1)
    }

    const isBeginning = activeIndex === 0
    const isEnd = activeIndex === features.length - 1

    return (
        <>
            <style jsx>{`
                @keyframes spin-clockwise {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes spin-counter-clockwise {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                
                @keyframes spin-slow-clockwise {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes glow-pulse {
                    0%, 100% { box-shadow: 0 0 20px rgba(119, 69, 162, 0.3); }
                    50% { box-shadow: 0 0 30px rgba(119, 69, 162, 0.5); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                
                @keyframes orbit-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.2); }
                }
                
                @keyframes fadeInFromTop {
                    0% { 
                        opacity: 0; 
                        transform: translateY(-20px) scale(0.95); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0px) scale(1); 
                    }
                }
                
                @keyframes slideIn {
                    0% { width: 0; opacity: 0; }
                    50% { opacity: 1; }
                    100% { width: 4rem; opacity: 0.3; }
                }
                
                @keyframes slideUp {
                    0%, 100% { transform: translateY(20px); opacity: 0; }
                    50% { transform: translateY(-20px); opacity: 1; }
                }
                
                .image-fade-in {
                    animation: fadeInFromTop 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                
                .gear-outer {
                    animation: spin-clockwise 18s linear infinite;
                }
                
                .gear-middle {
                    animation: spin-counter-clockwise 12s linear infinite;
                }
                
                .gear-inner {
                    animation: spin-slow-clockwise 22s linear infinite;
                }
                
                .gear-outer > div:nth-child(3) > div {
                    animation: orbit-pulse 3s ease-in-out infinite;
                }
                
                .gear-middle > div:nth-child(3) > div,
                .gear-middle > div:nth-child(4) > div {
                    animation: orbit-pulse 2.5s ease-in-out infinite;
                }
                
                .gear-inner > div:nth-child(4) > div {
                    animation: orbit-pulse 2s ease-in-out infinite;
                }
                
                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }
                
                .card-hover:hover {
                    transform: translateY(-4px) scale(1.01);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .card-hover:hover .icon-container {
                    animation: glow-pulse 2s ease-in-out infinite;
                    transform: scale(1.1);
                }
                
                .card-hover:hover .shimmer-effect {
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(119, 69, 162, 0.1),
                        transparent
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.5s ease-in-out infinite;
                }
                
                .card-hover {
                    position: relative;
                    overflow: hidden;
                }
                
                .card-hover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(119, 69, 162, 0.05),
                        transparent
                    );
                    transition: left 0.5s;
                    z-index: 1;
                }
                
                .card-hover:hover::before {
                    left: 100%;
                }
                
                .icon-container {
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 2;
                }
                
                .text-content {
                    position: relative;
                    z-index: 2;
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>

            <section
                ref={sectionRef}
                id='features'
                className='general-container py-8 gap-[10px] w-full flex flex-col items-center justify-center lg:gap-[45px] lg:py-10 xlg:!py-20 overflow-hidden relative'
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

                {/* Section header with underline animation */}
                <div className="relative z-10">
                    <h6 className={`text-[#7745A2] uppercase font-semibold text-sm transition-all duration-1000 ${isVisible
                        ? 'opacity-100 translate-y-0 tracking-wider'
                        : 'opacity-0 translate-y-4 tracking-normal'
                        }`}
                    >
                        {t('section')}
                    </h6>
                    {/* Animated underline */}
                    <div className={`absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#7745A2] to-transparent transition-all duration-1000 delay-300 ${isVisible ? 'w-full -translate-x-1/2 opacity-100' : 'w-0 -translate-x-1/2 opacity-0'
                        }`}></div>
                </div>

                <div className={`flex flex-col items-center gap-4 w-full lg:gap-20 xl:gap-[186px] lg:flex-row lg:justify-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {/* Mobile/Tablet Swiper */}
                    <div className='w-full lg:hidden order-2'>
                        <div className='flex items-center'>
                            {/* Arrow with disabled state */}
                            <div className={`features-swiper-button-prev w-8 h-8 flex items-center justify-center mr-2 transition-all duration-300 hover:scale-110 ${isBeginning ? 'opacity-40 text-[#353566]' : 'text-[#7745A2] hover:text-[#5a3180]'}`}>
                                {locale === "ar" ? <FaChevronRight className='w-6 h-6' /> : <FaChevronLeft className='w-6 h-6' />}
                            </div>

                            {/* Swiper Container */}
                            <div className='flex-1 overflow-hidden'>
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={32}
                                    centeredSlides={false}
                                    navigation={{
                                        nextEl: '.features-swiper-button-next',
                                        prevEl: '.features-swiper-button-prev',
                                    }}
                                    modules={[Navigation]}
                                    onSlideChange={handleSlideChange}
                                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                                    initialSlide={activeIndex}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 3,
                                            spaceBetween: 16,
                                        }
                                    }}
                                    className="!overflow-visible"
                                    watchSlidesProgress={true}
                                    watchOverflow={false}
                                >
                                    {features.map((feature, index) => (
                                        <SwiperSlide key={feature.id} className='!w-[calc(50%-16px)] md:!w-[calc(33.33%-10.67px)]'>
                                            <div
                                                onClick={() => handleFeatureClick(index)}
                                                className={`card-hover flex-center flex-col w-[124.66px] h-[167.52px] md:w-full rounded-[12.71px] p-[9.65px] cursor-pointer transition-all duration-300 mx-auto ${activeIndex === index
                                                    ? 'bg-[#7745A214] shadow-lg shadow-[#7745A2]/20'
                                                    : 'hover:bg-[#7745A208] hover:shadow-md'
                                                    }`}
                                            >
                                                <div className='shimmer-effect absolute inset-0 rounded-[12.71px]'></div>
                                                <div className='icon-container flex-center w-[56.48px] h-[56.48px] rounded-tr-[28.09px] rounded-br-[49.15px] rounded-tl-[52.31px] rounded-bl-[66.71px] p-[0.88px] border-[0.88px] border-[#E5E7EB] bg-[#7745A21A]'>
                                                    <Image src={feature.icon} alt={feature.title} width={28.24} height={28.24} className='transition-transform duration-300' />
                                                </div>
                                                <div className='text-content'>
                                                    <p className='font-semibold text-xs text-black text-center pt-[11.3px] transition-colors duration-300'>{feature.title}</p>
                                                    <p className='text-[10px] text-[#4B5563] text-center pt-[5.65px] transition-colors duration-300'>{feature.description}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/*Arrow with disabled state */}
                            <div className={`features-swiper-button-next w-8 h-8 flex items-center justify-center ml-2 transition-all duration-300 hover:scale-110 ${isEnd ? 'opacity-40 text-[#353566]' : 'text-[#7745A2] hover:text-[#5a3180]'}`}>
                                {locale === "ar" ? <FaChevronLeft className='w-6 h-6' /> : <FaChevronRight className='w-6 h-6' />}
                            </div>
                        </div>

                        {/* Dots Navigation */}
                        <div className='flex items-center justify-center gap-[5px] mt-4'>
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        handleFeatureClick(index)
                                        swiperInstance?.slideTo(index)
                                    }}
                                    className={`w-[11px] h-[11px] rounded-full transition-all duration-300 hover:scale-110 ${activeIndex === index
                                        ? 'bg-[#7745A2] scale-125 shadow-lg shadow-[#7745A2]/30'
                                        : 'border-[0.8px] border-[#A3A3A3] hover:bg-[#7745A220] hover:border-[#7745A2]'
                                        }`}
                                    aria-label={`"feature" ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop Cards Column */}
                    <div className='hidden lg:flex flex-col items-center gap-[21.07px] order-2 lg:order-1'>
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                onClick={() => handleFeatureClick(index)}
                                className={`card-hover flex-center flex-col w-[272.97px] rounded-[15.8px] py-[21.07px] px-[14.04px] cursor-pointer transition-all duration-300 ${activeIndex === index
                                    ? 'bg-[#7745A214] shadow-lg shadow-[#7745A2]/20 scale-105'
                                    : 'hover:bg-[#7745A208] hover:shadow-md'
                                    }`}
                            >
                                <div className='shimmer-effect absolute inset-0 rounded-[15.8px]'></div>
                                <div className='icon-container flex-center w-[70.22px] h-[70.22px] rounded-tr-[28.09px] rounded-br-[49.15px] rounded-tl-[52.31px] rounded-bl-[66.71px] p-[0.88px] border-[0.88px] border-[#E5E7EB] bg-[#7745A21A]'>
                                    <Image src={feature.icon} alt={feature.title} width={35.11} height={35.11} className='transition-transform duration-300' />
                                </div>
                                <div className='text-content'>
                                    <p className='font-semibold text-[17.55px] text-black text-center pt-[14.04px] transition-colors duration-300'>{feature.title}</p>
                                    <p className='text-sm text-[#4B5563] text-center pt-[7.02px] transition-colors duration-300'>{feature.description}</p>
                                </div>
                            </div>
                        ))}

                        {/* Dots Navigation */}
                        <div className='flex items-center gap-[5px]'>
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleFeatureClick(index)}
                                    className={`w-[11px] h-[11px] rounded-full transition-all duration-300 hover:scale-110 ${activeIndex === index
                                        ? 'bg-[#7745A2] scale-125 shadow-lg shadow-[#7745A2]/30'
                                        : 'border-[0.8px] border-[#A3A3A3] hover:bg-[#7745A220] hover:border-[#7745A2]'
                                        }`}
                                    aria-label={`"feature" ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Image with Animated Radial Circles */}
                    <div className={`self-center relative w-[357.22px] flex-center order-1 lg:order-2 lg:w-[545.37px] transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                    >
                        <div className='float-animation relative z-10'>
                            <Image
                                key={imageKey}
                                src={features[activeIndex].image}
                                alt={features[activeIndex].title}
                                width={284.2}
                                height={591.76}
                                className="image-fade-in relative w-[186.15px] h-[387.61px] lg:w-[284.2px] lg:h-[591.76px] scale-[130%] lg:scale-110 xl:scale-[130%] opacity-100"
                            />
                        </div>

                        {/* Animated Radial Circles - Behind Image */}
                        <div className='absolute inset-0 flex-center z-0'>
                            {/* Outer Circle - Clockwise */}
                            <div className='gear-outer w-[357.22px] h-[357.22px] lg:w-[450px] lg:h-[450px] xl:w-[545.37px] xl:h-[545.37px] rounded-full flex-center relative'>
                                {/* Outer ring with subtle pattern */}
                                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#7745A2]/10 via-[#7745A2]/15 to-[#7745A2]/10'></div>
                                <div className='absolute inset-2 rounded-full bg-gradient-to-l from-[#7745A2]/5 via-transparent to-[#7745A2]/5'></div>

                                {/* Outer decorative elements */}
                                <div className='absolute w-1 h-8 bg-[#7745A2]/25 rounded-full' style={{ top: '10px', left: '50%', transform: 'translateX(-50%)' }}></div>
                                <div className='absolute w-1 h-8 bg-[#7745A2]/25 rounded-full' style={{ bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}></div>
                                <div className='absolute w-8 h-1 bg-[#7745A2]/25 rounded-full' style={{ top: '50%', left: '10px', transform: 'translateY(-50%)' }}></div>
                                <div className='absolute w-8 h-1 bg-[#7745A2]/25 rounded-full' style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}></div>

                                {/* Outer orbit dots - 8 elements */}
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className='absolute w-3 h-3 bg-[#7745A2]/40 rounded-full'
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-170px)`,
                                            animationDelay: `${i * 0.2}s`
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-[#7745A2]/60 rounded-full animate-ping"></div>
                                    </div>
                                ))}

                                {/* Middle Circle - Counter-clockwise */}
                                <div className='gear-middle w-[316.38px] h-[316.38px] lg:w-[380px] lg:h-[380px] xl:w-[483.01px] xl:h-[483.01px] rounded-full flex-center relative'>
                                    {/* Middle ring with pattern */}
                                    <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#7745A2]/15 via-[#7745A2]/20 to-[#7745A2]/15'></div>
                                    <div className='absolute inset-3 rounded-full bg-gradient-to-l from-[#7745A2]/8 via-transparent to-[#7745A2]/8'></div>

                                    {/* Middle decorative lines */}
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className='absolute w-0.5 h-12 bg-[#7745A2]/30 rounded-full'
                                            style={{
                                                top: '15px',
                                                left: '50%',
                                                transform: `translateX(-50%) rotate(${i * 60}deg)`,
                                                transformOrigin: '50% 143px'
                                            }}
                                        />
                                    ))}

                                    {/* Middle orbit elements - 6 elements */}
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className='absolute w-2.5 h-2.5 bg-[#7745A2]/50 rounded-full'
                                            style={{
                                                top: '50%',
                                                left: '50%',
                                                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-140px)`,
                                                animationDelay: `${i * 0.25}s`
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-[#7745A2]/70 rounded-full animate-ping"></div>
                                        </div>
                                    ))}

                                    {/* Inner Circle - Slow clockwise */}
                                    <div className='gear-inner w-[275.96px] h-[275.96px] lg:w-[320px] lg:h-[320px] xl:w-[421.31px] xl:h-[421.31px] rounded-full relative flex-center'>
                                        {/* Inner ring with pattern */}
                                        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#7745A2]/20 via-[#7745A2]/25 to-[#7745A2]/20'></div>
                                        <div className='absolute inset-4 rounded-full bg-gradient-to-l from-[#7745A2]/10 via-transparent to-[#7745A2]/10'></div>

                                        {/* Inner decorative spokes */}
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className='absolute w-0.5 h-20 bg-[#7745A2]/25 rounded-full'
                                                style={{
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: `translate(-50%, -50%) rotate(${i * 90}deg)`
                                                }}
                                            />
                                        ))}

                                        {/* Inner orbit dots - 4 elements */}
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className='absolute w-2 h-2 bg-[#7745A2]/60 rounded-full'
                                                style={{
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-110px)`,
                                                    animationDelay: `${i * 0.3}s`
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-[#7745A2]/80 rounded-full animate-ping"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
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
            </section>
        </>
    )
}

export default Features
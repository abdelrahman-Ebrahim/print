"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/navigation'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

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
    const t = useTranslations("Features")

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

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex)
    }

    const isBeginning = activeIndex === 0
    const isEnd = activeIndex === features.length - 1

    return (
        <section id='features' className='general-container py-8 gap-[10px] w-full flex flex-col items-center justify-center lg:gap-[45px] lg:py-10 xlg:!py-20 overflow-x-hidden'>
            <h6 className='text-[#7745A2] uppercase font-semibold text-sm'>{t('section')}</h6>
            <div className='flex flex-col items-center gap-4 w-full lg:gap-20 xl:gap-[186px] lg:flex-row lg:justify-center'>
                {/* Mobile/Tablet Swiper */}
                <div className='w-full lg:hidden order-2'>
                    <div className='flex items-center'>
                        {/* Left Arrow with disabled state */}
                        <div className={`features-swiper-button-prev w-8 h-8 flex items-center justify-center mr-2 ${isBeginning ? 'opacity-40 text-[#353566]' : 'text-[#7745A2]'}`}>
                            <FaChevronLeft className='w-6 h-6' />
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
                                            onClick={() => setActiveIndex(index)}
                                            className={`flex-center flex-col w-[124.66px] h-[167.52px] md:w-full rounded-[12.71px] p-[9.65px] cursor-pointer transition-all duration-300 mx-auto ${activeIndex === index
                                                ? 'bg-[#7745A214] shadow-md'
                                                : 'hover:bg-[#7745A208]'
                                                }`}
                                        >
                                            <div className='flex-center w-[56.48px] h-[56.48px] rounded-tr-[28.09px] rounded-br-[49.15px] rounded-tl-[52.31px] rounded-bl-[66.71px] p-[0.88px] border-[0.88px] border-[#E5E7EB] bg-[#7745A21A]'>
                                                <Image src={feature.icon} alt={feature.title} width={28.24} height={28.24} />
                                            </div>
                                            <p className='font-semibold text-xs text-black text-center pt-[11.3px]'>{feature.title}</p>
                                            <p className='text-[10px] text-[#4B5563] text-center pt-[5.65px]'>{feature.description}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Right Arrow with disabled state */}
                        <div className={`features-swiper-button-next w-8 h-8 flex items-center justify-center ml-2 ${isEnd ? 'opacity-40 text-[#353566]' : 'text-[#7745A2]'}`}>
                            <FaChevronRight className='w-6 h-6' />
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className='flex items-center justify-center gap-[5px] mt-4'>
                        {features.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveIndex(index)
                                    swiperInstance?.slideTo(index)
                                }}
                                className={`w-[11px] h-[11px] rounded-full transition-all duration-300 ${activeIndex === index
                                    ? 'bg-[#7745A2] scale-125'
                                    : 'border-[0.8px] border-[#A3A3A3] hover:bg-[#7745A220]'
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
                            onClick={() => setActiveIndex(index)}
                            className={`flex-center flex-col w-[272.97px] rounded-[15.8px] py-[21.07px] px-[14.04px] cursor-pointer transition-all duration-300 ${activeIndex === index
                                ? 'bg-[#7745A214] shadow-md'
                                : 'hover:bg-[#7745A208]'
                                }`}
                        >
                            <div className='flex-center w-[70.22px] h-[70.22px] rounded-tr-[28.09px] rounded-br-[49.15px] rounded-tl-[52.31px] rounded-bl-[66.71px] p-[0.88px] border-[0.88px] border-[#E5E7EB] bg-[#7745A21A]'>
                                <Image src={feature.icon} alt={feature.title} width={35.11} height={35.11} />
                            </div>
                            <p className='font-semibold text-[17.55px] text-black text-center pt-[14.04px]'>{feature.title}</p>
                            <p className='text-sm text-[#4B5563] text-center pt-[7.02px]'>{feature.description}</p>
                        </div>
                    ))}

                    {/* Dots Navigation */}
                    <div className='flex items-center gap-[5px]'>
                        {features.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-[11px] h-[11px] rounded-full transition-all duration-300 ${activeIndex === index
                                    ? 'bg-[#7745A2] scale-125'
                                    : 'border-[0.8px] border-[#A3A3A3] hover:bg-[#7745A220]'
                                    }`}
                                aria-label={`"feature" ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Image with Radial Circles */}
                <div className='self-center relative w-[357.22px] flex-center order-1 lg:order-2 lg:w-[545.37px]'>
                    <Image
                        src={features[activeIndex].image}
                        alt={features[activeIndex].title}
                        width={284.2}
                        height={591.76}
                        className="relative z-10 transition-opacity duration-500 w-[186.15px] h-[387.61px] lg:w-[284.2px] lg:h-[591.76px] scale-[130%] lg:scale-110 xl:scale-[130%]"
                    />

                    <div className='absolute inset-0 flex-center'>
                        <div className='w-[357.22px] h-[357.22px] lg:w-[450px] lg:h-[450px] xl:w-[545.37px] xl:h-[545.37px] bg-[#7745A21A] rounded-full flex-center animate-pulse-slow'>
                            <div className='w-[316.38px] h-[316.38px] lg:w-[380px] lg:h-[380px] xl:w-[483.01px] xl:h-[483.01px] bg-[#7745A21A] rounded-full flex-center'>
                                <div className='w-[275.96px] h-[275.96px] lg:w-[320px] lg:h-[320px] xl:w-[421.31px] xl:h-[421.31px] bg-[#7745A21A] rounded-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
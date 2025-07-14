"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const Features = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const features = [
        {
            id: 1,
            title: "Upload files in seconds",
            description: "Select from your phone.",
            icon: "/file-upload.svg",
            image: "/feature1.svg"
        },
        {
            id: 2,
            title: "Set your print options",
            description: "Adjust settings to fit your needs.",
            icon: "/settings.svg",
            image: "/feature2.svg"
        },
        {
            id: 3,
            title: "Find nearby agents instantly",
            description: "Compare and pick the best price.",
            icon: "/store.svg",
            image: "/feature3.svg"
        },
        {
            id: 4,
            title: "Choose Delivery or pickup",
            description: "We'll bring it or you collect.",
            icon: "/package.svg",
            image: "/feature4.svg"
        }
    ]

    return (
        <section className='general-container py-20 flex-col gap-[45px] w-full hidden lg:flex lg:items-center lg:justify-center'>
            <h6 className='text-[#7745A2] uppercase font-semibold text-sm'>features</h6>
            <div className='flex items-start gap-[186px]'>
                {/* Cards Column */}
                <div className='flex flex-col items-center gap-[21.07px]'>
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
                                aria-label={`Show feature ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Image with Radial Circles */}
                <div className='self-center relative w-[545.37px] flex-center'>
                    {/* Phone Image - changes based on activeIndex */}
                    <Image
                        src={features[activeIndex].image}
                        alt={`feature-${activeIndex + 1}`}
                        width={284.2}
                        height={591.76}
                        className="relative z-10 transition-opacity duration-500"
                    />

                    {/* Radial circles - animation could be added here */}
                    <div className='absolute inset-0 flex-center'>
                        <div className='w-[75%] h-[75%] bg-[#7745A21A] rounded-full flex-center animate-pulse-slow'>
                            <div className='w-[88.6%] h-[88.6%] bg-[#7745A21A] rounded-full flex-center'>
                                <div className='w-[88.6%] h-[88.6%] bg-[#7745A21A] rounded-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
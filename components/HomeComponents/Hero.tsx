import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <section className='general-container pt-[128px] pb-[80px] bg-[#7745A20A]'>
            <div className='flex items-start gap-8'>
                <div className='py-20 px-12 flex flex-col gap-6'>
                    <div className='flex flex-col gap-9'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='font-semibold text-[50px] text-black leading-[62px]'>Print Anywhere, <br /> Anytime - Direct <br /> <span className='text-[#7745A2]'>from Your Phone</span> </h1>
                            <p className='text-[#707070] text-[18px]'>The Easiest Way to Print Documents in Saudi Arabia, Get your documents printed, customized, and delivered all from your phone. Connect with trusted printing agents near you in seconds.</p>
                        </div>
                        <div className='flex items-center gap-[13px]'>
                            <Image src={"/app-store.svg"} alt='appStore' width={190.97} height={63.66} className='cursor-pointer'/>
                            <Image src={"/play-store.svg"} alt='appStore' width={214.84} height={63.66} className='cursor-pointer'/>
                        </div>
                    </div>
                </div>
                <div className='flex w-full'>
                    <Image src={"/iphonez.svg"} alt='iphone16' width={569.96} height={563.27} className='w-full h-[563.27px]'/>
                </div>
            </div>
        </section>
    )
}

export default Hero
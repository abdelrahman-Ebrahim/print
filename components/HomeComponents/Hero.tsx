import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <section className='general-container flex-center w-full mt-[85px] bg-[#7745A20A] lg:pt-20 pb-10 xlg:mt-0 xlg:!pt-[128px] xlg:pb-[80px]'>
            <div className='flex flex-col items-start gap-4 lg:flex-row w-full xlg:gap-8 xlg:w-[1376px]'>
                <div className='py-8 flex flex-col gap-4 lg:py-10 lg:px-6 xlg:gap-6 xlg:py-20 xlg:px-12'>
                    <div className='flex flex-col gap-4 xlg:gap-9'>
                        <div className='flex flex-col gap-4 text-center lg:text-start'>
                            <h1 className='font-semibold text-[30px] text-black leading-[38px] lg:text-[45px] lg:leading-[62px] xlg:text-[50px]'>Print Anywhere, <br /> Anytime - Direct <br /> <span className='text-[#7745A2]'>from Your Phone</span> <span className='block text-[15px] font-medium leading-[28px] lg:hidden'>The Easiest Way to Print Documents in <br /> Saudi Arabia</span> </h1>
                            <p className='text-[#707070] text-base xlg:text-[18px]'> <span className='hidden lg:flex'>The Easiest Way to Print Documents in Saudi Arabia,</span>  Get your documents printed, customized, and delivered all from your phone. Connect with trusted printing agents near you in seconds.</p>
                        </div>
                        <div className='flex items-center justify-center gap-[8.71px] lg:justify-start xlg:gap-[13px]'>
                            <Image src={"/app-store.svg"} alt='appStore' width={190.97} height={63.66} className='cursor-pointer w-[128px] h-[42.67px] lg:w-[155px] lg:h-[53px] xlg:w-[190.97px] xlg:h-[63.66px]'/>
                            <Image src={"/play-store.svg"} alt='appStore' width={214.84} height={63.66} className='cursor-pointer w-[144px] h-[42.67px] lg:w-[196px] lg:h-[53px] xlg:w-[214.84px] xlg:h-[63.66px]'/>
                        </div>
                    </div>
                </div>
                <div className='flex w-full py-8 lg:py-0'>
                    <Image src={"/iphonez.svg"} alt='iphone16' width={569.96} height={563.27} className='w-full h-[329.69px] xlg:h-[563.27px]'/>
                </div>
            </div>
        </section>
    )
}

export default Hero
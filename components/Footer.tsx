import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='general-container bg-white py-8 lg:py-4'>
            <div className='pb-5 flex flex-col gap-5'>
                <div className='flex flex-col gap-[20px] lg:flex-row lg:gap-0 items-center justify-between'>
                    <div className='flex flex-col items-center lg:items-start gap-6'>
                        <div className='flex flex-col items-center gap-[18.5px] lg:gap-3 lg:items-start '>
                            <Image src={"/logo.svg"} alt='logo' width={100.22} height={67.35} />
                            <div className='flex items-center gap-5'>
                                <Image src={"/xIcon.svg"} alt='X' width={20} height={20} />
                                <Image src={"/facebookIcon.svg"} alt='facebook' width={20} height={20} />
                                <Image src={"/instagramIcon.svg"} alt='instagram' width={20} height={20} />
                                <Image src={"/linkedinIcon.svg"} alt='linkedin' width={20} height={20} />
                                <Image src={"/snapchatIcon.svg"} alt='snapchat' width={20} height={20} />
                            </div>
                        </div>
                        <p className='text-[#141219] text-sm text-center lg:text-start lg:text-[18px]'>Get your documents printed, customized, <br /> and delivered all from your phone.</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-6 lg:self-end'>
                        <div className='flex items-center gap-[9.22px] lg:gap-[10.91px]'>
                            <Image src={"/app-store.svg"} alt='appStore' width={160.22} height={53.41} className='cursor-pointer w-[135.45px] h-[45.15px] lg:w-[160.22px] lg:h-[53.41px]' />
                            <Image src={"/play-store.svg"} alt='appStore' width={180.25} height={53.41} className='cursor-pointer w-[152.38px] h-[45.15px] lg:w-[180.25px] lg:h-[53.41px]' />
                        </div>
                        <p className='text-[#141219] text-sm text-center lg:text-[18px] lg:text-start'>©Print.sa 2025 All Rights Reserved.</p>
                    </div>
                </div>
                <hr className='text-[#0000001A] w-[90%] self-center ' />
                <div className='flex-center gap-10'>
                    <Link href={"/terms&conditions"} className='underline text-sm text-[#141219] lg:text-[18px]'>Terms & Condition</Link>
                    <Link href={"/privacypolicy"} className='underline text-sm text-[#141219] lg:text-[18px]'>Privacy policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
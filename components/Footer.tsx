import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='general-container py-4 hidden lg:block'>
            <div className='pb-5 flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col items-start gap-4'>
                        <div className='flex flex-col gap-3'>
                            <Image src={"/logo.svg"} alt='logo' width={100.22} height={67.35} />
                            <div className='flex items-center gap-5'>
                                <Image src={"/xIcon.svg"} alt='X' width={20} height={20} />
                                <Image src={"/facebookIcon.svg"} alt='facebook' width={20} height={20} />
                                <Image src={"/instagramIcon.svg"} alt='instagram' width={20} height={20} />
                                <Image src={"/linkedinIcon.svg"} alt='linkedin' width={20} height={20} />
                                <Image src={"/snapchatIcon.svg"} alt='snapchat' width={20} height={20} />
                            </div>
                        </div>
                        <p className='text-[#141219] text-[18px]'>Get your documents printed, customized, <br /> and delivered all from your phone.</p>
                    </div>
                    <div className='flex flex-col gap-6 self-end'>
                        <div className='flex items-center gap-[10.91px]'>
                            <Image src={"/app-store.svg"} alt='appStore' width={160.22} height={53.41} className='cursor-pointer' />
                            <Image src={"/play-store.svg"} alt='appStore' width={180.25} height={53.41} className='cursor-pointer' />
                        </div>
                        <p className='text-[#141219] text-[18px]'>©Print.sa 2025 All Rights Reserved.</p>
                    </div>
                </div>
                <hr className='text-[#0000001A] w-[90%] self-center ' />
                <div className='flex-center gap-10'>
                    <Link href={"/"} className='underline text-[18px] text-[#141219]'>Terms & Condition</Link>
                    <Link href={"/"} className='underline text-[18px] text-[#141219]'>Privacy policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
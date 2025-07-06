import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <header className='py-5 fixed top-0 left-0 z-50 bg-white shadow-navbar w-full flex items-center justify-center'>
            <nav className='px-[128px] w-[1536px] max-w-[1536px]'>
                <div className='flex items-center justify-between gap-6'>
                    <Image src={"/logo.svg"} alt='logo' width={87.38} height={58.72} />
                    <ul className='flex items-center'>
                        <li className='px-2 py-[2px]'> <Link href={"/"} className='text-[#7745A2] font-medium'>Home</Link> </li>
                        <li className='px-2 py-[2px]'> <Link href={"/"} className='text-black font-medium'>About</Link> </li>
                        <li className='px-2 py-[2px]'> <Link href={"/"} className='text-black font-medium'>Features</Link> </li>
                        <li className='px-2 py-[2px]'> <Link href={"/"} className='text-black font-medium'>FAQs</Link> </li>
                        <li className='px-2 py-[2px]'> <Link href={"/"} className='text-black font-medium'>Contact</Link> </li>
                    </ul>
                    <div className='flex items-center gap-6'>
                        <div className='rounded-[71.6px] pe-[15.79px] ps-[3.95px] py-[3.95px] flex items-center gap-[2.63px] bg-[#ECECEC] shadow-item'>
                            <button className='flex items-center gap-[9.21px] cursor-pointer'>
                                <div className='rounded-[26.32px] p-[13.16px] bg-[#7745A2] shadow-button'>
                                    <p className='font-medium text-white'>Join as a service provider</p>
                                </div>
                                <Image src={"/long-arrow-right.svg"} alt='arrow' width={26.2} height={20.89} />
                            </button>
                        </div>
                        <div className='flex items-center justify-center px-[13px] py-3 rounded-[24.48px] w-[48.97px] h-[48.97px] bg-[#E8E8E8] border border-[#7745A2]'>
                            <p className='text-black font-medium uppercase cursor-pointer'>ar</p>
                        </div>
                    </div>
                </div>

            </nav>
        </header>
    )
}

export default Navbar
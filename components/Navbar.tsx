"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { href: "/", text: "Home", isActive: true },
        { href: "/", text: "About" },
        { href: "/", text: "Features" },
        { href: "/", text: "FAQs" },
        { href: "/", text: "Contact" }
    ]

    return (
        <header className={`py-4 lg:py-5 fixed top-0 left-0 z-50 w-full flex items-center justify-center transition-all duration-300 ${isScrolled ? 'bg-white shadow-navbar' : 'bg-white/90 backdrop-blur-sm'}`}>
            <nav className='px-4 w-full max-w-[1536px] lg:px-20 xl:px-[128px]'>
                <div className='flex items-center justify-between gap-6'>
                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt='logo'
                            width={87.38}
                            height={58.72}
                            className='w-[78.84px] h-[52.98px] lg:w-[87.38px] lg:h-[58.72px]'
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center gap-10'>
                        <ul className='flex items-center gap-2'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className={`px-3 py-1.5 rounded-lg font-medium text-sm xl:text-base transition-colors ${item.isActive ? 'text-[#7745A2]' : 'text-black hover:text-[#7745A2]'}`}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Desktop Join & Profile */}
                    <div className='items-center gap-6 hidden lg:flex'>
                        <div className='rounded-full py-[3.95px] ps-[3.95px] pe-[15.79px] flex items-center gap-[2.95px] bg-[#ECECEC] shadow-item'>
                            <button className='flex items-center gap-[9.21px] cursor-pointer group'>
                                <div className='rounded-full p-[13.16px] bg-[#7745A2] shadow-button group-hover:bg-[#6a3d92] transition-colors'>
                                    <p className='font-medium text-sm text-white xl:text-base'>Join as a service provider</p>
                                </div>
                                <Image
                                    src="/long-arrow-right.svg"
                                    alt='arrow'
                                    width={26.2}
                                    height={20.89}
                                    className='group-hover:translate-x-1 transition-transform'
                                />
                            </button>
                        </div>
                        <div className='flex items-center justify-center p-3 rounded-full w-12 h-12 bg-[#E8E8E8] border border-[#7745A2] hover:bg-[#E0E0E0] transition-colors cursor-pointer'>
                            <p className='text-black font-medium uppercase text-sm xl:text-base'>ar</p>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className='lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <Image
                            src={"/burgerIcon.svg"}
                            alt='menu toggle'
                            width={32}
                            height={32}
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 h-fit pb-10 rounded-b-2xl bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex justify-between items-center py-2 px-5 border-b-2 border-[#E2E8F0]">
                        <Link href="/" onClick={closeMenu}>
                            <Image
                                src="/logo.svg"
                                alt='logo'
                                width={87.38}
                                height={58.72}
                                className='w-[60px] h-auto'
                            />
                        </Link>
                        <button
                            onClick={closeMenu}
                            className="size-12 flex items-center justify-center"
                        >
                            <Image src="/close-icon.svg" alt="close" width={24} height={24} />
                        </button>
                    </div>

                    <div className="pt-2">
                        <ul className="flex flex-col gap-4">
                            {navItems.map((item, index) => (
                                <li key={index} className="px-4">
                                    <Link
                                        href={item.href}
                                        className={`font-semibold ${item.isActive ? 'text-[#7745A2]' : 'text-black'}`}
                                        onClick={closeMenu}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}

                            {/* Join & Profile Buttons */}
                            <div className="mx-auto">
                                <div className='rounded-full py-[3.95px] ps-[3.95px] pe-[15.79px] flex items-center gap-[2.95px] bg-[#ECECEC] shadow-item w-fit'>
                                    <button className='flex items-center gap-[9.21px] cursor-pointer group'>
                                        <div className='rounded-full p-[13.16px] bg-[#7745A2] shadow-button group-hover:bg-[#6a3d92] transition-colors'>
                                            <p className='font-medium text-sm text-white xl:text-base'>Join as a service provider</p>
                                        </div>
                                        <Image
                                            src="/long-arrow-right.svg"
                                            alt='arrow'
                                            width={26.2}
                                            height={20.89}
                                            className='group-hover:translate-x-1 transition-transform'
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="px-4">
                                <div className='flex items-center justify-center p-3 rounded-full w-12 h-12 bg-[#E8E8E8] border border-[#7745A2] hover:bg-[#E0E0E0] transition-colors cursor-pointer mx-auto'>
                                    <p className='text-black font-medium uppercase'>ar</p>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
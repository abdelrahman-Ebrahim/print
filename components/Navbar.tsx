"use client"
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'

// Type definitions
type NavItem = {
    id: string
    text: string
    isActive?: boolean
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const locale = useLocale()
    const t = useTranslations("Navbar")
    const router = useRouter()
    const pathname = usePathname()
    const navbarRef = useRef<HTMLElement>(null)

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = (): void => {
        setIsMenuOpen(false)
    }

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Function to switch language
    const switchLanguage = (): void => {
        const newLocale = locale === "en" ? "ar" : "en"
        localStorage.setItem("last_locale", newLocale)

        const currentPath = window.location.pathname
        const pathWithoutLocale = currentPath.split("/").slice(2).join("/")
        const searchParams = new URLSearchParams(window.location.search)
        const newPath = `/${newLocale}/${pathWithoutLocale}${searchParams.toString() ? `?${searchParams.toString()}` : ""
            }`

        router.replace(newPath, { scroll: false })
    }

    // Function to handle smooth scrolling with navbar offset
    const scrollToSection = (sectionId: string): void => {
        if (pathname !== `/${locale}`) {
            router.push(`/${locale}#${sectionId}`)
            return
        }

        const section = document.getElementById(sectionId)
        if (section) {
            closeMenu()

            // Calculate navbar height and scroll position
            const navbarHeight = navbarRef.current?.offsetHeight || 0
            const sectionPosition = section.offsetTop - navbarHeight

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            })
        }
    }

    const navItems: NavItem[] = [
        { id: "hero", text: t("home"), isActive: true },
        { id: "about", text: t("about") },
        { id: "features", text: t("features") },
        { id: "faqs", text: t("faqs") },
        { id: "contact", text: t("contact") }
    ]

    return (
        <header
            ref={navbarRef}
            className={`py-4 lg:py-5 fixed top-0 left-0 z-50 w-full flex items-center justify-center transition-all duration-300 ${isScrolled ? 'bg-white shadow-navbar' : 'bg-white/90 backdrop-blur-sm'
                }`}
        >
            <nav className='px-4 w-full max-w-[1536px] lg:px-20 xl:px-[128px]'>
                <div className='flex items-center justify-between gap-6'>
                    {/* Logo - scrolls to top */}
                    <button
                        onClick={() => scrollToSection('hero')}
                        className="cursor-pointer"
                        aria-label="Scroll to top"
                    >
                        <Image
                            src="/logo.svg"
                            alt='logo'
                            width={87.38}
                            height={58.72}
                            className='w-[78.84px] h-[52.98px] lg:w-[87.38px] lg:h-[58.72px]'
                            priority
                        />
                    </button>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center gap-10'>
                        <ul className='flex items-center gap-2'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`px-3 py-1.5 rounded-lg font-medium text-sm xl:text-base transition-colors cursor-pointer ${item.isActive ? 'text-[#7745A2]' : 'text-black hover:text-[#7745A2]'
                                            }`}
                                        aria-label={`Scroll to ${item.text}`}
                                    >
                                        {String(item.text)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop Join & Profile */}
                    <div className='items-center gap-6 hidden lg:flex'>
                        <div className='rounded-full py-[3.95px] ps-[3.95px] pe-[15.79px] flex items-center gap-[2.95px] bg-[#ECECEC] shadow-item'>
                            <button
                                className='flex items-center gap-[9.21px] cursor-pointer group'
                                aria-label="Join"
                            >
                                <div className='rounded-full p-[13.16px] bg-[#7745A2] shadow-button group-hover:bg-[#6a3d92] transition-colors'>
                                    <p className='font-medium text-sm text-white xl:text-base'>
                                        {t("join")}
                                    </p>
                                </div>
                                <Image
                                    src="/long-arrow-right.svg"
                                    alt='arrow'
                                    width={26.2}
                                    height={20.89}
                                    className={`group-hover:translate-x-1 transition-transform ${locale === 'ar' ? 'transform rotate-180' : ''
                                        }`}
                                />
                            </button>
                        </div>
                        <button
                            onClick={switchLanguage}
                            className='flex items-center justify-center p-3 rounded-full w-12 h-12 bg-[#E8E8E8] border border-[#7745A2] hover:bg-[#E0E0E0] transition-colors cursor-pointer'
                            aria-label="Change language"
                        >
                            <p className='text-black font-medium uppercase text-sm xl:text-base'>
                                {locale === 'en' ? 'AR' : 'EN'}
                            </p>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className='lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <Image
                            src={"/burgerIcon.svg"}
                            alt={"menu"}
                            width={32}
                            height={32}
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 h-fit pb-10 rounded-b-2xl bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                >
                    <div className="flex justify-between items-center py-2 px-5 border-b-2 border-[#E2E8F0]">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="cursor-pointer"
                            aria-label="Scroll to top"
                        >
                            <Image
                                src="/logo.svg"
                                alt='logo'
                                width={87.38}
                                height={58.72}
                                className='w-[60px] h-auto'
                            />
                        </button>
                        <button
                            onClick={closeMenu}
                            className="size-12 flex items-center justify-center"
                            aria-label="Close menu"
                        >
                            <Image src="/close-icon.svg" alt={"close"} width={24} height={24} />
                        </button>
                    </div>

                    <div className="pt-2">
                        <ul className="flex flex-col gap-4">
                            {navItems.map((item, index) => (
                                <li key={index} className="px-4">
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`font-semibold ${item.isActive ? 'text-[#7745A2]' : 'text-black'
                                            }`}
                                        aria-label={`Scroll to ${item.text}`}
                                    >
                                        {String(item.text)}
                                    </button>
                                </li>
                            ))}

                            {/* Join & Profile Buttons */}
                            <div className="mx-auto">
                                <div className='rounded-full py-[3.95px] ps-[3.95px] pe-[15.79px] flex items-center gap-[2.95px] bg-[#ECECEC] shadow-item w-fit'>
                                    <button
                                        className='flex items-center gap-[9.21px] cursor-pointer group'
                                        aria-label="Join"
                                    >
                                        <div className='rounded-full p-[13.16px] bg-[#7745A2] shadow-button group-hover:bg-[#6a3d92] transition-colors'>
                                            <p className='font-medium text-sm text-white xl:text-base'>
                                                {t("join")}
                                            </p>
                                        </div>
                                        <Image
                                            src="/long-arrow-right.svg"
                                            alt='arrow'
                                            width={26.2}
                                            height={20.89}
                                            className={`group-hover:translate-x-1 transition-transform ${locale === 'ar' ? 'transform rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="px-4">
                                <button
                                    onClick={() => {
                                        switchLanguage()
                                        closeMenu()
                                    }}
                                    className='flex items-center justify-center p-3 rounded-full w-12 h-12 bg-[#E8E8E8] border border-[#7745A2] hover:bg-[#E0E0E0] transition-colors cursor-pointer mx-auto'
                                    aria-label="Change language"
                                >
                                    <p className='text-black font-medium uppercase'>
                                        {locale === 'en' ? 'AR' : 'EN'}
                                    </p>
                                </button>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
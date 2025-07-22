"use client"
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'

// Type definitions
type NavItem = {
    id: string
    text: string
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const [activeSection, setActiveSection] = useState<string>('hero')
    const locale = useLocale()
    const t = useTranslations("Navbar")
    const router = useRouter()
    const pathname = usePathname()
    const navbarRef = useRef<HTMLElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

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

    // Set up Intersection Observer to track which section is in view
    useEffect(() => {
        const sections = ['hero', 'about', 'features', 'faqs', 'contact']

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            }
        )

        sections.forEach(section => {
            const element = document.getElementById(section)
            if (element) {
                observerRef.current?.observe(element)
            }
        })

        return () => {
            if (observerRef.current) {
                sections.forEach(section => {
                    const element = document.getElementById(section)
                    if (element) {
                        observerRef.current?.unobserve(element)
                    }
                })
            }
        }
    }, [pathname, locale])

    const switchLanguage = (): void => {
        const newLocale = locale === "en" ? "ar" : "en"
        localStorage.setItem("last_locale", newLocale)

        const currentPath = window.location.pathname
        const pathWithoutLocale = currentPath.split("/").slice(2).join("/")
        const searchParams = new URLSearchParams(window.location.search)
        const newPath = `/${newLocale}/${pathWithoutLocale}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

        router.replace(newPath, { scroll: false })
    }

    const scrollToSection = (sectionId: string): void => {
        setActiveSection(sectionId)

        if (pathname !== `/${locale}`) {
            router.push(`/${locale}#${sectionId}`)
            return
        }

        const section = document.getElementById(sectionId)
        if (section) {
            closeMenu()

            const navbarHeight = navbarRef.current?.offsetHeight || 0
            const sectionPosition = section.offsetTop - navbarHeight

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            })
        }
    }

    const navItems: NavItem[] = [
        { id: "hero", text: t("home") },
        { id: "about", text: t("about") },
        { id: "features", text: t("features") },
        { id: "faqs", text: t("faqs") },
        { id: "contact", text: t("contact") }
    ]

    return (
        <header
            ref={navbarRef}
            className={`py-4 lg:py-5 fixed top-0 left-0 z-50 w-full flex items-center justify-center transition-all duration-500 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-navbar shadow-black/5'
                    : 'bg-white/90 backdrop-blur-sm'
                }`}
        >
            <nav className='px-4 w-full max-w-[1536px] lg:px-20 xl:px-[128px]'>
                <div className='flex items-center justify-between gap-6'>
                    {/* Enhanced Logo */}
                    <button
                        onClick={() => scrollToSection('hero')}
                        className="cursor-pointer group transition-all duration-300 hover:scale-105 active:scale-95"
                        aria-label="Scroll to top"
                    >
                        <div className="relative overflow-hidden rounded-lg p-1 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-indigo-50 group-hover:shadow-lg group-hover:shadow-purple-200/30">
                            <Image
                                src="/logo.svg"
                                alt='logo'
                                width={87.38}
                                height={58.72}
                                className='w-[78.84px] h-[52.98px] lg:w-[87.38px] lg:h-[58.72px] transition-all duration-300 group-hover:brightness-110'
                                priority
                            />
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center gap-10'>
                        <ul className='flex items-center gap-2'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`px-3 py-1.5 rounded-lg font-medium text-sm xl:text-base transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${activeSection === item.id ? 'text-[#7745A2]' : 'text-black hover:text-[#7745A2]'
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
                        <div className='rounded-full py-[3.95px] ps-[3.95px] pe-[15.79px] flex items-center gap-[2.95px] bg-[#ECECEC] shadow-item transition-all duration-300 hover:scale-105'>
                            <Link href={`/${locale}/serviceprovider`}
                                className='flex items-center gap-[9.21px] cursor-pointer group'
                                aria-label="Join"
                            >
                                <div className='rounded-full p-[13.16px] bg-[#7745A2] shadow-button group-hover:bg-[#6a3d92] transition-all duration-300 group-hover:scale-105'>
                                    <p className='font-medium text-sm text-white xl:text-base'>
                                        {t("join")}
                                    </p>
                                </div>
                                <Image
                                    src="/long-arrow-right.svg"
                                    alt='arrow'
                                    width={26.2}
                                    height={20.89}
                                    className={`group-hover:scale-110 transition-all duration-300 ${locale === 'ar' ? 'transform rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'
                                        }`}
                                />
                            </Link>
                        </div>
                        <button
                            onClick={switchLanguage}
                            className='flex items-center justify-center p-3 rounded-full w-12 h-12 bg-[#E8E8E8] border border-[#7745A2] hover:bg-[#E0E0E0] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95'
                            aria-label="Change language"
                        >
                            <p className='text-black font-medium uppercase text-sm xl:text-base'>
                                {locale === 'en' ? 'AR' : 'EN'}
                            </p>
                        </button>
                    </div>

                    {/* Enhanced Mobile Menu Button */}
                    <button
                        className='lg:hidden p-3 rounded-full hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 hover:shadow-lg hover:shadow-purple-200/30 transition-all duration-300 hover:scale-110 active:scale-95 group'
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <Image
                            src={"/burgerIcon.svg"}
                            alt={"menu"}
                            width={32}
                            height={32}
                            className="transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110"
                        />
                    </button>
                </div>

                {/* Enhanced Mobile Menu */}
                <div
                    className={`fixed inset-0 h-fit pb-10 rounded-b-2xl bg-white/95 backdrop-blur-md z-40 lg:hidden transition-all duration-500 ease-out shadow-2xl shadow-black/20 ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                        }`}
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                >
                    <div className="flex justify-between items-center py-2 px-5 border-b-2 border-gradient-to-r from-purple-200 to-indigo-200 bg-gradient-to-r">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="cursor-pointer group transition-all duration-300 hover:scale-105 active:scale-95"
                            aria-label="Scroll to top"
                        >
                            <div className="p-1 rounded-lg transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-indigo-50">
                                <Image
                                    src="/logo.svg"
                                    alt='logo'
                                    width={87.38}
                                    height={58.72}
                                    className='w-[60px] h-auto transition-all duration-300 group-hover:brightness-110'
                                />
                            </div>
                        </button>
                        <button
                            onClick={closeMenu}
                            className="size-12 flex items-center justify-center rounded-full hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 hover:shadow-lg hover:shadow-red-200/30 transition-all duration-300 hover:scale-110 active:scale-95 group"
                            aria-label="Close menu"
                        >
                            <Image
                                src="/close-icon.svg"
                                alt={"close"}
                                width={24}
                                height={24}
                                className="transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
                            />
                        </button>
                    </div>

                    <div className="pt-2">
                        <ul className="flex flex-col gap-2">
                            {navItems.map((item, index) => (
                                <li key={index} className="px-4">
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative w-full text-left p-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md overflow-hidden group ${activeSection === item.id
                                                ? 'text-white bg-gradient-to-r from-[#7745A2] to-[#9B59B6] shadow-lg shadow-purple-300/40'
                                                : 'text-black hover:text-[#7745A2] hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:shadow-purple-200/30'
                                            }`}
                                        aria-label={`Scroll to ${item.text}`}
                                    >
                                        <span className="relative z-10">
                                            {String(item.text)}
                                        </span>
                                        {activeSection !== item.id && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#7745A2]/10 to-[#9B59B6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        )}
                                    </button>
                                </li>
                            ))}

                            {/* Enhanced Mobile Join Button */}
                            <div className="mx-auto mt-4 group">
                                <div className='rounded-full py-[3.95px] ps-[3.95px] pe-[15.79px] flex items-center gap-[2.95px] bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg shadow-gray-300/40 group-hover:shadow-xl group-hover:shadow-purple-300/50 transition-all duration-300 group-hover:scale-105 w-fit'>
                                    <Link href={`/${locale}/serviceprovider`}
                                        className='flex items-center gap-[9.21px] cursor-pointer group/mobile-button'
                                        aria-label="Join"
                                    >
                                        <div className='rounded-full p-[13.16px] bg-gradient-to-r from-[#7745A2] to-[#9B59B6] shadow-lg shadow-purple-400/40 group-hover/mobile-button:shadow-xl group-hover/mobile-button:shadow-purple-400/60 group-hover/mobile-button:scale-105 transition-all duration-300'>
                                            <p className='font-medium text-sm text-white xl:text-base group-hover/mobile-button:text-gray-100 transition-colors duration-300'>
                                                {t("join")}
                                            </p>
                                        </div>
                                        <Image
                                            src="/long-arrow-right.svg"
                                            alt='arrow'
                                            width={26.2}
                                            height={20.89}
                                            className={`group-hover/mobile-button:scale-110 transition-all duration-300 ${locale === 'ar' ? 'transform rotate-180 group-hover/mobile-button:-translate-x-2' : 'group-hover/mobile-button:translate-x-2'
                                                }`}
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Enhanced Mobile Language Switch */}
                            <div className="px-4 mt-4">
                                <button
                                    onClick={() => {
                                        switchLanguage()
                                        closeMenu()
                                    }}
                                    className='relative flex items-center justify-center p-3 rounded-full w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-[#7745A2] hover:border-[#9B59B6] hover:bg-gradient-to-br hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer group hover:scale-110 hover:shadow-lg hover:shadow-purple-300/40 active:scale-95 mx-auto'
                                    aria-label="Change language"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <p className='relative z-10 text-black font-medium uppercase group-hover:text-[#7745A2] transition-colors duration-300'>
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
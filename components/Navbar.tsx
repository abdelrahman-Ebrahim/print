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
        // Check if there's a hash in the URL when the component mounts or pathname changes
        const handleHashScroll = () => {
            if (pathname === `/${locale}` && window.location.hash) {
                const sectionId = window.location.hash.substring(1)
                setTimeout(() => {
                    scrollToSectionWithOffset(sectionId)
                }, 100) // Small delay to ensure the page is rendered
            }
        }

        handleHashScroll()

        // Also handle hash changes without page reload
        const handleHashChange = () => {
            handleHashScroll()
        }

        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [pathname, locale])

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

    // Click outside the mobile navbar to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                navbarRef.current &&
                !navbarRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

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
        closeMenu(); // Close menu immediately when any section is clicked

        if (pathname !== `/${locale}`) {
            // Navigate to the landing page with the section hash
            router.push(`/${locale}#${sectionId}`)
            return
        }

        // Handle scroll on the same page
        scrollToSectionWithOffset(sectionId)
    }

    const scrollToSectionWithOffset = (sectionId: string) => {
        const section = document.getElementById(sectionId)
        if (section) {
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
            className={`py-[10.64px] lg:py-5 fixed top-0 left-0 z-50 w-full flex items-center justify-center bg-white transition-all duration-500 shadow-mobile-navbar lg:shadow-navbar`}
        >
            <nav className='px-4 w-full max-w-[1536px] lg:px-20 xl:px-[128px]'>
                <div className='flex items-center justify-between gap-6'>
                    {/* Enhanced Logo */}
                    <button
                        onClick={() => scrollToSection('hero')}
                        className="cursor-pointer group hidden lg:block"
                        aria-label="Scroll to top"
                    >
                        <div className="relative overflow-hidden rounded-lg p-1">
                            <Image
                                src="/logo.svg"
                                alt='logo'
                                width={87.38}
                                height={58.72}
                                className='w-[78.84px] h-[52.98px] lg:w-[87.38px] lg:h-[58.72px]'
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
                        <div className='rounded-full py-[3.95px] ps-[3.95px] pe-[15.79px] flex items-center gap-[2.95px] bg-[#ECECEC] shadow-item transition-all duration-300 hover:scale-[102%]'>
                            <Link href={`/${locale}/serviceprovider`}
                                className='flex items-center gap-[9.21px] cursor-pointer group'
                                aria-label="Join"
                            >
                                <div className='rounded-full p-[13.16px] bg-[#7745A2] shadow-button group-hover:bg-[#6a3d92] transition-all duration-300 group-hover:scale-[102%]'>
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

                    {/* New Mobile Navbar Design */}
                    <div className='flex items-center justify-between w-full lg:hidden'>
                        <div className='flex items-center gap-[14px]'>
                            {/* Enhanced Mobile Menu Button Small Screen */}
                            <button
                                className='lg:hidden rounded-full hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 hover:shadow-lg hover:shadow-purple-200/30 transition-all duration-300 hover:scale-110 active:scale-95 group'
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                            >
                                <Image
                                    src={isMenuOpen ? "/close-icon.svg" : "/burgerIcon.svg"}
                                    alt={isMenuOpen ? "close" : "menu"}
                                    width={32}
                                    height={32}
                                    className="transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                                />
                            </button>
                            {/* Navbar Logo Small Screens */}
                            <Image
                                src="/logo.svg"
                                alt='logo'
                                width={57.62}
                                height={38.72}
                                className='lg:hidden'
                            />
                        </div>

                        {/* Language Switcher Button Small Screen */}
                        <button
                            onClick={() => {
                                switchLanguage()
                                closeMenu()
                            }}
                            className='relative flex items-center justify-center py-[9.8px] px-[10.62px] rounded-full w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 border-[0.82px] border-[#7745A2] hover:border-[#9B59B6] hover:bg-gradient-to-br hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer group hover:scale-110 hover:shadow-lg hover:shadow-purple-300/40 active:scale-95'
                            aria-label="Change language"
                        >
                            <p className='relative z-10 text-black font-medium text-[13.07px] uppercase'>
                                {locale === 'en' ? 'AR' : 'EN'}
                            </p>
                        </button>
                    </div>
                </div>

                {/* Enhanced Mobile Menu - Now drops down from bottom of navbar */}
                <div
                    className={`lg:hidden bg-white transition-all duration-500 ease-out overflow-hidden ${isMenuOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                >
                    <div className="py-8">
                        <ul className="flex flex-col gap-4">
                            {navItems.map((item, index) => (
                                <li key={index} className="">
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative w-full text-left rounded-xl font-semibold h-[28px] transition-all duration-300 overflow-hidden group ${activeSection === item.id
                                            ? 'text-[#7745A2]'
                                            : 'text-black hover:text-[#7745A2] '
                                            }`}
                                        aria-label={`Scroll to ${item.text}`}
                                    >
                                        <span className="relative z-10 px-[6px] cursor-pointer">
                                            {String(item.text)}
                                        </span>
                                        {activeSection !== item.id && (
                                            <div className="absolute inset-0duration-300"></div>
                                        )}
                                    </button>
                                </li>
                            ))}

                            {/* Enhanced Mobile Join Button */}
                            <div className="mt-2 group">
                                <div onClick={closeMenu} className='rounded-full py-[3.95px] ps-[3.95px] pe-[15.79px] flex items-center gap-[2.95px] bg-[#ECECEC] shadow-join-button transition-all duration-300 w-fit'>
                                    <Link href={`/${locale}/serviceprovider`}
                                        className='flex items-center gap-[9.21px] cursor-pointer group/mobile-button'
                                        aria-label="Join"
                                    >
                                        <div className='rounded-full p-[13.16px] bg-gradient-to-r from-[#7745A2] to-[#9B59B6] shadow-lg transition-all duration-300'>
                                            <p className='font-medium text-sm text-white xl:text-base group-hover/mobile-button:text-gray-100 transition-colors duration-300'>
                                                {t("join")}
                                            </p>
                                        </div>
                                        <Image
                                            src="/long-arrow-right.svg"
                                            alt='arrow'
                                            width={26.2}
                                            height={20.89}
                                            className={`transition-all duration-300 ${locale === 'ar' ? 'transform rotate-180 group-hover/mobile-button:-translate-x-2' : 'group-hover/mobile-button:translate-x-2'
                                                }`}
                                        />
                                    </Link>
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
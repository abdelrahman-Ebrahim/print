'use client'
import { useTranslations } from 'next-intl'
import React, { useState, useEffect, useRef } from 'react'

const Info = () => {
    const t = useTranslations("Info")
    const sectionRef = useRef<HTMLElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    // Counter values (as strings to preserve formatting)
    const [agentsCount, setAgentsCount] = useState("0")
    const [citiesCount, setCitiesCount] = useState("0")
    const [documentsCount, setDocumentsCount] = useState("0")
    const [usersCount, setUsersCount] = useState("0")

    // Target values with their abbreviations
    const targets = [
        { value: 500, suffix: "", setter: setAgentsCount },
        { value: 40, suffix: "", setter: setCitiesCount },
        { value: 1.2, suffix: "M", setter: setDocumentsCount },
        { value: 200, suffix: "K", setter: setUsersCount }
    ]

    // Animation duration in milliseconds
    const duration = 1000

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        if (!hasAnimated) {
                            setHasAnimated(true)
                            animateCounters()
                        }
                    }
                })
            },
            { threshold: 0.5 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [hasAnimated])

    const animateCounters = () => {
        let startTime: number | null = null

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / duration, 1)

            targets.forEach(target => {
                const currentValue = progress * target.value
                const displayValue = target.value < 1 ?
                    currentValue.toFixed(1) :
                    Math.floor(currentValue).toString()
                target.setter(`${displayValue}${target.suffix}`)
            })

            if (progress < 1) {
                requestAnimationFrame(step)
            } else {
                setAgentsCount("500")
                setCitiesCount("40")
                setDocumentsCount("1.2M")
                setUsersCount("200K")
            }
        }

        requestAnimationFrame(step)
    }

    // Card data with unique colors and darker shades
    const cardData = [
        {
            count: agentsCount,
            label: t('agents'),
            color: '#FF6B6B',
            bgColor: 'rgba(255, 107, 107, 0.1)',
            darkColor: '#FF4444',
            shadowColor: 'rgba(255, 107, 107, 0.3)'
        },
        {
            count: citiesCount,
            label: t('cities'),
            color: '#4ECDC4',
            bgColor: 'rgba(78, 205, 196, 0.1)',
            darkColor: '#3BAAA4',
            shadowColor: 'rgba(78, 205, 196, 0.3)'
        },
        {
            count: documentsCount,
            label: t('documents'),
            labelMobile: t('files'),
            color: '#45B7D1',
            bgColor: 'rgba(69, 183, 209, 0.1)',
            darkColor: '#3A9BC1',
            shadowColor: 'rgba(69, 183, 209, 0.3)'
        },
        {
            count: usersCount,
            label: t('users'),
            color: '#96CEB4',
            bgColor: 'rgba(150, 206, 180, 0.1)',
            darkColor: '#7BB899',
            shadowColor: 'rgba(150, 206, 180, 0.3)'
        }
    ]

    return (
        <section
            id='info'
            ref={sectionRef}
            className='general-container flex-center py-8 lg:py-10 lg:px-6 xlg:!py-20 relative overflow-hidden'
        >
            {/* Enhanced background animations with floating dots */}
            <div className="absolute inset-0 pointer-events-none">
                {isVisible && (
                    <>
                        {/* Original gentle floating particles */}
                        <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-[#7745A2]/20 rounded-full animate-pulse"
                            style={{ animationDuration: '4s', animationDelay: '0s' }}></div>
                        <div className="absolute top-[25%] right-[12%] w-1.5 h-1.5 bg-[#7745A2]/15 rounded-full animate-pulse"
                            style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
                        <div className="absolute bottom-[20%] left-[15%] w-2.5 h-2.5 bg-[#7745A2]/10 rounded-full animate-pulse"
                            style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                        <div className="absolute bottom-[30%] right-[8%] w-1 h-1 bg-[#7745A2]/25 rounded-full animate-pulse"
                            style={{ animationDuration: '3s', animationDelay: '1.5s' }}></div>

                        {/* Additional animated dots in whitespace areas */}
                        <div className="absolute top-[40%] left-[5%] w-3 h-3 bg-gradient-to-r from-[#FF6B6B]/20 to-[#4ECDC4]/20 rounded-full"
                            style={{ animation: 'floatDot 8s ease-in-out infinite', animationDelay: '0s' }}></div>
                        <div className="absolute top-[60%] right-[6%] w-2 h-2 bg-gradient-to-r from-[#45B7D1]/20 to-[#96CEB4]/20 rounded-full"
                            style={{ animation: 'floatDot 6s ease-in-out infinite', animationDelay: '2s' }}></div>
                        <div className="absolute top-[10%] left-[50%] w-1.5 h-1.5 bg-[#7745A2]/30 rounded-full"
                            style={{ animation: 'floatDot 7s ease-in-out infinite', animationDelay: '1s' }}></div>
                        <div className="absolute bottom-[10%] right-[45%] w-2.5 h-2.5 bg-gradient-to-r from-[#FF6B6B]/15 to-[#45B7D1]/15 rounded-full"
                            style={{ animation: 'floatDot 9s ease-in-out infinite', animationDelay: '3s' }}></div>

                        {/* Geometric shapes */}
                        <div className="absolute top-[35%] right-[20%] w-4 h-1 bg-[#7745A2]/15 rounded-full"
                            style={{ animation: 'rotateFloat 10s linear infinite', animationDelay: '1s' }}></div>
                        <div className="absolute bottom-[35%] left-[25%] w-1 h-4 bg-gradient-to-b from-[#4ECDC4]/20 to-transparent rounded-full"
                            style={{ animation: 'rotateFloat 12s linear infinite reverse', animationDelay: '2s' }}></div>
                    </>
                )}
            </div>

            <div className='rounded-[18px] w-full py-8 px-8 shadow-info grid grid-cols-2 lg:grid-cols-4 gap-9 xlg:rounded-[36.28px] xlg:py-[47.77px] xlg:px-[97.95px] xlg:gap-[134.83px] max-w-[1920px] xlg:mx-auto relative'>
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className='flex flex-col items-center xlg:gap-[7.42px] relative cursor-pointer transition-all duration-300 hover:scale-105'
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Card container with overflow hidden */}
                        <div className={`relative w-full h-full overflow-hidden rounded-xl transition-all duration-500 ${hoveredCard === index ? 'shadow-xl' : 'shadow-sm'
                            }`}
                            style={{
                                boxShadow: hoveredCard === index
                                    ? `0 20px 40px ${card.shadowColor}, 0 10px 20px ${card.shadowColor}`
                                    : 'inherit'
                            }}>
                            {/* Radial fill background effect */}
                            <div
                                className={`absolute inset-0 rounded-xl transition-all duration-700 ease-out ${hoveredCard === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{
                                    background: `radial-gradient(circle at center, ${card.bgColor} 0%, ${card.color}20 50%, transparent 100%)`,
                                    transform: hoveredCard === index ? 'scale(1.1)' : 'scale(0.8)',
                                    animation: hoveredCard === index ? 'radialFill 0.7s ease-out forwards' : 'none'
                                }}
                            />

                            {/* Card content */}
                            <div className="relative z-10 flex flex-col items-center xlg:gap-[7.42px] p-4">
                                {/* Number with bouncing plus and decorative elements */}
                                <div className="relative">
                                    {/* Bouncing decorative dots */}
                                    {hoveredCard === index && (
                                        <>
                                            <div
                                                className="absolute -top-2 -left-2 w-1.5 h-1.5 rounded-full"
                                                style={{
                                                    backgroundColor: card.darkColor,
                                                    animation: 'bounceDot 0.8s ease-in-out infinite',
                                                    animationDelay: '0s'
                                                }}
                                            />
                                            <div
                                                className="absolute -top-3 right-0 w-1 h-1 rounded-full"
                                                style={{
                                                    backgroundColor: card.darkColor,
                                                    animation: 'bounceDot 0.8s ease-in-out infinite',
                                                    animationDelay: '0.2s'
                                                }}
                                            />
                                            <div
                                                className="absolute -bottom-2 -right-3 w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: card.darkColor,
                                                    animation: 'bounceDot 0.8s ease-in-out infinite',
                                                    animationDelay: '0.4s'
                                                }}
                                            />
                                        </>
                                    )}

                                    <p className='font-medium text-black text-[32px] xlg:text-[40px] transition-colors duration-300 relative'>
                                        {card.count}
                                        <span
                                            className={`text-[#7745A2] inline-block transition-all duration-300 ${hoveredCard === index ? 'animate-bounce' : ''
                                                }`}
                                            style={{
                                                color: hoveredCard === index ? card.color : '#7745A2',
                                                animationDuration: hoveredCard === index ? '0.6s' : 'none'
                                            }}
                                        >
                                            +
                                        </span>

                                        {/* Bouncing mini elements around the number */}
                                        {hoveredCard === index && (
                                            <>
                                                <span
                                                    className="absolute -top-1 right-2 text-xs opacity-70"
                                                    style={{
                                                        color: card.darkColor,
                                                        animation: 'bounceElement 1s ease-in-out infinite',
                                                        animationDelay: '0.1s'
                                                    }}
                                                >
                                                    ✨
                                                </span>
                                                <span
                                                    className="absolute bottom-0 -left-3 text-sm opacity-60"
                                                    style={{
                                                        color: card.darkColor,
                                                        animation: 'bounceElement 1s ease-in-out infinite',
                                                        animationDelay: '0.3s'
                                                    }}
                                                >
                                                    •
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>

                                {/* Label with subtle bounce */}
                                <div className={`text-center transition-all duration-300 ${hoveredCard === index ? 'transform scale-105' : ''
                                    }`}>
                                    {index === 2 ? (
                                        <>
                                            <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px] text-nowrap hidden lg:flex transition-all duration-300'
                                                style={{
                                                    color: hoveredCard === index ? card.color : '#514F6E',
                                                    textShadow: hoveredCard === index ? `0 0 10px ${card.shadowColor}` : 'none'
                                                }}>
                                                {card.label}
                                            </p>
                                            <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px] flex lg:hidden transition-all duration-300'
                                                style={{
                                                    color: hoveredCard === index ? card.color : '#514F6E',
                                                    textShadow: hoveredCard === index ? `0 0 10px ${card.shadowColor}` : 'none'
                                                }}>
                                                {card.labelMobile}
                                            </p>
                                        </>
                                    ) : (
                                        <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px] transition-all duration-300'
                                            style={{
                                                color: hoveredCard === index ? card.color : '#514F6E',
                                                textShadow: hoveredCard === index ? `0 0 10px ${card.shadowColor}` : 'none'
                                            }}>
                                            {card.label}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Enhanced border glow */}
                            <div
                                className={`absolute inset-0 rounded-xl border-2 transition-all duration-500 ${hoveredCard === index ? 'opacity-60' : 'opacity-0'
                                    }`}
                                style={{
                                    borderColor: hoveredCard === index ? card.color : 'transparent',
                                    boxShadow: hoveredCard === index ? `inset 0 0 20px ${card.bgColor}` : 'none'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Enhanced custom CSS animations */}
            <style jsx>{`
                @keyframes cardPulse {
                    0%, 100% { 
                        transform: scale(1);
                        opacity: 0.3;
                    }
                    50% { 
                        transform: scale(1.1);
                        opacity: 0.6;
                    }
                }

                @keyframes floatDot {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.3;
                    }
                    25% { 
                        transform: translateY(-10px) rotate(90deg);
                        opacity: 0.8;
                    }
                    50% { 
                        transform: translateY(-5px) rotate(180deg);
                        opacity: 0.6;
                    }
                    75% { 
                        transform: translateY(-15px) rotate(270deg);
                        opacity: 0.9;
                    }
                }

                @keyframes rotateFloat {
                    0% { 
                        transform: rotate(0deg) translateY(0px);
                        opacity: 0.2;
                    }
                    50% { 
                        transform: rotate(180deg) translateY(-10px);
                        opacity: 0.8;
                    }
                    100% { 
                        transform: rotate(360deg) translateY(0px);
                        opacity: 0.2;
                    }
                }

                @keyframes radialFill {
                    0% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes bounceDot {
                    0%, 100% { 
                        transform: translateY(0px) scale(1);
                        opacity: 0.7;
                    }
                    50% { 
                        transform: translateY(-8px) scale(1.2);
                        opacity: 1;
                    }
                }

                @keyframes bounceElement {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg) scale(1);
                        opacity: 0.6;
                    }
                    25% { 
                        transform: translateY(-4px) rotate(10deg) scale(1.1);
                        opacity: 0.9;
                    }
                    75% { 
                        transform: translateY(-2px) rotate(-5deg) scale(0.9);
                        opacity: 0.8;
                    }
                }
            `}</style>
        </section>
    )
}

export default Info
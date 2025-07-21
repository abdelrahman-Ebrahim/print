'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface SplashScreenProps {
    children: React.ReactNode;
}

export default function SplashScreen({ children }: SplashScreenProps) {
    const [showSplash, setShowSplash] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations("SplashScreen");
    const locale = useLocale();
    const isRTL = locale === 'ar';

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (!hasVisited) {
            setShowSplash(true);
            sessionStorage.setItem('hasVisited', 'true');
        }
        setIsLoading(false);
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    if (isLoading) return null;

    return (
        <>
            <AnimatePresence mode="wait">
                {showSplash && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed inset-0 z-[9999999999] flex items-center justify-center overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e4b99 100%)'
                        }}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        {/* Animated Film Grain Overlay */}
                        <motion.div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Multiple Layered Background Effects */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        >
                            <motion.div
                                className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/20 blur-xl md:blur-3xl rounded-full"
                                animate={{
                                    scale: [1, 1.4, 1.2, 1.6, 1],
                                    x: [-50, 50, -30, 40, -50],
                                    y: [-30, 40, -20, 50, -30],
                                    rotate: [0, 90, 180, 270, 360]
                                }}
                                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-gradient-to-tl from-indigo-500/25 to-cyan-500/15 blur-lg md:blur-2xl rounded-full"
                                animate={{
                                    scale: [1.2, 1, 1.5, 1.1, 1.2],
                                    x: [30, -40, 20, -50, 30],
                                    y: [20, -30, 40, -20, 20]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            />
                            <motion.div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-gradient-radial from-white/5 to-transparent blur-md md:blur-xl rounded-full"
                                animate={{
                                    scale: [0.8, 1.2, 0.9, 1.3, 0.8],
                                    opacity: [0.1, 0.3, 0.2, 0.4, 0.1]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </motion.div>

                        {/* Cinematic Letterbox Bars */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
                            className="absolute top-0 left-0 w-full h-8 md:h-16 bg-black origin-top"
                        />
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
                            className="absolute bottom-0 left-0 w-full h-8 md:h-16 bg-black origin-bottom"
                        />

                        {/* Side Panel Effects */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 0.6 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent origin-left"
                        />
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 0.6 }}
                            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                            className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent origin-right"
                        />

                        {/* Main Content Container */}
                        <div className="relative z-10 text-center text-white px-4 md:px-8 w-full max-w-4xl mx-auto">
                            {/* Enhanced Animated Logo with Larger Glow */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.3, y: 100 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                    delay: 0.8,
                                    duration: 1.2,
                                    type: 'spring',
                                    bounce: 0.3,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="mb-6 md:mb-12 flex justify-center"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -8, 0, -12, 0, -6, 0],
                                        rotate: [0, 2, -1, 3, -2, 1, 0],
                                        scale: [1, 1.02, 1, 1.03, 1, 1.01, 1]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 6,
                                        ease: 'easeInOut',
                                        times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1]
                                    }}
                                    className="relative"
                                >
                                    <motion.div
                                        className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-xl md:blur-3xl rounded-full"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    <Image
                                        src="/logo.svg"
                                        alt="Print Logo"
                                        width={220}
                                        height={220}
                                        className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 drop-shadow-2xl relative z-10 filter brightness-110"
                                        priority
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full"
                                        animate={{ opacity: [0, 0.6, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Enhanced Title with RTL Support */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 tracking-wider">
                                    {isRTL ? (
                                        <motion.span
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 1.3,
                                                duration: 0.8,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                            className="inline-block"
                                            style={{
                                                textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(138,43,226,0.3)'
                                            }}
                                        >
                                            {t("welcomeMessage")}
                                        </motion.span>
                                    ) : (
                                        t("welcomeMessage").split("").map((char, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 1.3 + index * 0.05,
                                                    duration: 0.6,
                                                    ease: [0.25, 0.46, 0.45, 0.94]
                                                }}
                                                className="inline-block"
                                                style={{
                                                    textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(138,43,226,0.3)'
                                                }}
                                            >
                                                {char === " " ? "\u00A0" : char}
                                            </motion.span>
                                        ))
                                    )}
                                </motion.h1>
                            </motion.div>

                            <motion.p
                                className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 font-light tracking-wide"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.2, duration: 0.8, ease: 'easeOut' }}
                                style={{
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                                }}
                            >
                                {t("premium")}
                            </motion.p>

                            {/* Enhanced Button with Advanced Hover Effects */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.6, duration: 0.6, type: 'spring', bounce: 0.2 }}
                            >
                                <motion.button
                                    onClick={handleSplashComplete}
                                    className="group relative px-8 py-3 md:px-12 md:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold text-base md:text-lg transition-all duration-500 transform overflow-hidden shadow-2xl cursor-pointer"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 0 30px 8px rgba(138,43,226,0.4), 0 0 60px 12px rgba(75,0,130,0.2)'
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Button Background Layers */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <motion.span
                                        className="absolute inset-0 bg-white"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                        style={{ opacity: 0.1 }}
                                    />

                                    {/* Ripple Effect */}
                                    <motion.span
                                        className="absolute inset-0 rounded-full"
                                        whileHover={{
                                            background: [
                                                'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
                                                'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
                                                'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)'
                                            ]
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />

                                    <span className="relative z-10 tracking-wider">{t("experience")}</span>

                                    {/* Glow particles */}
                                    <motion.span
                                        className="absolute -top-1 -left-1 w-2 h-2 bg-white/60 rounded-full"
                                        animate={{
                                            scale: [0, 1, 0],
                                            x: [0, 40, 80],
                                            y: [0, -10, 20]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    />
                                    <motion.span
                                        className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-purple-300/80 rounded-full"
                                        animate={{
                                            scale: [0, 1, 0],
                                            x: [0, -30, -60],
                                            y: [0, 15, -25]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: 0.5
                                        }}
                                    />
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Corner Accent Lines */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.7 }}
                            transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                            className="absolute top-8 left-8 w-12 h-12 md:w-16 md:h-16 border-l-2 border-t-2 border-white/50"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.7 }}
                            transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                            className="absolute bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 border-r-2 border-b-2 border-white/50"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {children}
        </>
    );
}
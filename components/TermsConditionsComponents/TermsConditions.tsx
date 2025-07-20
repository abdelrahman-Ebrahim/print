"use client"
import { useTranslations } from 'next-intl';
import React from 'react';

export default function TermsConditions() {
    const t = useTranslations("Terms")

    return (
        <div className="min-h-screen bg-white flex justify-center py-8 pt-20 lg:pt-32 px-2">
            <div className="general-container xlg:mx-auto xlg:max-w-[1920px]">
                <h1 className="text-x font-semibold text-[#7745A2] mb-8 tracking-wide uppercase">{t("title")}</h1>

                {/* Section: The general terms and conditions */}
                <h2 className="text-2xl font-bold text-[#7745A2] mb-2">{t("subtitle1")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("term1")}</li>
                    <li>{t("term2")}</li>
                    <li>{t("term3")}</li>
                </ul>

                {/* Section: The legal usage */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("legalUsage")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("usage1")}</li>
                    <li>{t("usage2")}</li>
                    <li>{t("usage3")}</li>
                    <li>{t("usage4")}</li>
                    <li>{t("usage5")}</li>
                    <li>{t("usage6")}</li>
                    <li>{t("usage7")}</li>
                    <li>{t("usage8")}</li>
                    <li>{t("usage9")}</li>
                    <li>{t("usage10")}</li>
                    <li>{t("usage11")}</li>
                    <li>{t("usage12")}</li>
                    <li>{t("usage13")}</li>
                    <li>{t("usage14")}</li>
                </ul>

                {/* Section: The content */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("content")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("contentSub")}</li>
                    <ul className="list-disc pl-8 text-gray-700 mb-2">
                        <li>{t("content1")}</li>
                        <li>{t("content2")}</li>
                        <li>{t("content3")}</li>
                        <li>{t("content4")}</li>
                        <li>{t("content5")}</li>
                        <li>{t("content6")}</li>
                        <li>{t("content7")}</li>
                        <li>{t("content8")}</li>
                        <li>{t("content9")}</li>
                        <li>{t("content10")}</li>
                    </ul>
                    <li>{t("content11")}</li>
                    <li>{t("content12")}</li>
                    <li>{t("content13")}</li>
                    <li>{t("content14")}</li>
                    <li>{t("content15")}</li>
                </ul>

                {/* Section: Electronic website for others */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("electronicWeb")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("electronic1")}</li>
                </ul>

                {/* Section: Intellectual property */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("intellectualProperty")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("intellectual1")}</li>
                    <li>{t("intellectual2")}</li>
                </ul>

                {/* Section: The responsibility in joining the Print platform */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("responsibility")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("responsibility1")}</li>
                </ul>

                {/* Section: Privacy */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("privacy")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("privacy1")}</li>
                    <li>{t("privacy2")}</li>
                    <li>{t("privacy3")}</li>
                </ul>

                {/* Section: Compensations */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("compensations")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("compensation1")}</li>
                </ul>

                {/* Section: Termination */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("terminations")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("termination1")}</li>
                </ul>

                {/* Section: Providing website */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("providingWeb")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("providing1")}</li>
                    <li>{t("providing2")}</li>
                </ul>

                {/* Section: General */}
                <h2 className="text-xl font-bold text-[#7745A2] mb-2">{t("general")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("general1")}</li>
                    <li>{t("general2")}</li>
                    <li>{t("general3")}</li>
                    <li>{t("general4")}</li>
                </ul>

                {/* Section: The special terms and conditions */}
                <h2 className="text-2xl font-bold text-[#7745A2] mb-2 mt-8">{t("conditions")}</h2>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                    <li>{t("condition1")}</li>
                    <li>{t("condition2")}</li>
                    <li>{t("condition3")}</li>
                    <li>{t("condition4")}</li>
                    <li>{t("condition5")}</li>
                    <li>{t("condition6")}</li>
                    <li>{t("condition7")}</li>
                    <li>{t("condition8")}</li>
                    <ul className="list-disc pl-8 text-gray-700 mb-2">
                        <li>{t("condition9")}</li>
                        <li>{t("condition10")}</li>
                        <li>{t("condition11")}</li>
                        <li>{t("condition12")}</li>
                    </ul>
                    <li>{t("condition13")}</li>
                    <li>{t("condition14")}</li>
                    <li>{t("condition15")}</li>
                    <li>{t("condition16")}</li>
                    <li>{t("condition17")}</li>
                    <li>{t("condition18")}</li>
                    <li>{t("condition19")}</li>
                    <li>{t("condition20")}</li>
                    <li>{t("condition21")}</li>
                    <li>{t("condition22")}</li>
                    <li>{t("condition23")}</li>
                </ul>
            </div>
        </div>
    );
}
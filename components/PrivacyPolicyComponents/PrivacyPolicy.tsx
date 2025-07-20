"use client"
import { useTranslations } from 'next-intl'
import React from 'react'

export default function PrivacyPolicy() {
    const t = useTranslations("PrivacyPolicy")
    return (
        <div className="pb-10 pt-20 min-h-screen lg:pt-32">
            <div className="general-container xlg:mx-auto xlg:max-w-[1920px] bg-white">
                <h4 className="text-[#7745A2] font-bold text-xs tracking-widest mb-4 uppercase">{t("title")}</h4>
                <ul className="bg-[#FBF0DA] rounded-lg p-6 mb-8 list-none">
                    <li className="text-[#73510D] mb-2 flex items-start">
                        <span className="text-lg mr-2">•</span>
                        <span className="text-[#73510D]">{t("info1")}</span>
                    </li>
                    <li className="text-[#73510D] flex items-start">
                        <span className="text-lg mr-2">•</span>
                        <span className="text-[#73510D]">{t("info2")}</span>
                    </li>
                </ul>
                <h2 className="text-[#7745A2] font-bold text-xl mb-4">{t("subtitle1")}</h2>
                <ul className="mb-8 pl-6 list-disc text-gray-700">
                    <li className="mb-3">
                        {t("policy1")}
                    </li>
                    <li className="mb-3">
                        {t("policy2")}
                    </li>
                    <li className="mb-3">
                        {t("policy3")}
                    </li>
                </ul>
                <h2 className="text-[#7745A2] font-bold text-lg mb-4">{t("subtitle2")}</h2>
                <ul className="mb-8 pl-6 list-disc text-gray-700">
                    <li>
                        {t("policy4")}
                    </li>
                </ul>
                <h2 className="text-[#7745A2] font-bold text-lg mb-4">{t("subtitle3")}</h2>
                <ul className="mb-8 pl-6 list-disc text-gray-700">
                    <li className="mb-3">
                        {t("policy5")}
                    </li>
                    <li className="mb-3">
                        {t("policy6")}
                    </li>
                    <li className="mb-3">
                        {t("policy7")}
                    </li>
                </ul>
                <h2 className="text-[#7745A2] font-bold text-lg mb-4">{t("subtitle4")}</h2>
                <ul className="mb-8 pl-6 list-disc text-gray-700">
                    <li className="mb-3">
                        {t("policy8")}
                    </li>
                    <li className="mb-3">
                        {t("policy9")}
                    </li>
                    <li className="mb-3">
                        {t("policy10")}
                    </li>
                </ul>
            </div>
        </div>
    )
}
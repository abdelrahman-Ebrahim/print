"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { IoSend } from "react-icons/io5";

const countries = [
    { value: "", label: "Choose your country..." },
    { value: "sa", label: "Saudi Arabia" },
    { value: "eg", label: "Egypt" },
    { value: "ae", label: "UAE" },
    // يمكن إضافة المزيد
];

const cities = [
    { value: "", label: "Choose your city..." },
    { value: "riyadh", label: "Riyadh" },
    { value: "jeddah", label: "Jeddah" },
    { value: "cairo", label: "Cairo" },
    // يمكن إضافة المزيد
];

const Form = () => {
    const t = useTranslations("ServiceProviderForm");
    const locale = useLocale();
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        commercial: "",
        country: "",
        city: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="mx-auto mt-10 max-w-6xl">
            <div className="text-center mb-6">
                <div className="text-[14px] text-[#7745A2] font-semibold mb-2">
                    {t("applyNow")}
                </div>
                <h2 className="text-xl md:text-[32px] font-bold mb-2 px-[4px]">
                    {t("title1")}
                    <br />
                    {t("title2")}
                </h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
                <div className="flex flex-wrap -mx-3">
                    {/* Name */}
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            {t("name")}
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder={t("namePlaceholder")}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none focus:border-purple-600"
                            required
                        />
                    </div>
                    {/* Contact Number */}
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            {t("contact")}
                        </label>
                        <input
                            type="text"
                            name="contact"
                            placeholder={t("contactPlaceholder")}
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none focus:border-purple-600"
                            required
                        />
                    </div>
                    {/* Email Address */}
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            {t("email")}
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder={t("emailPlaceholder")}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none focus:border-purple-600"
                            required
                        />
                    </div>
                    {/* Commercial Name */}
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            {t("commercial")}
                        </label>
                        <input
                            type="text"
                            name="commercial"
                            placeholder={t("commercialPlaceholder")}
                            value={formData.commercial}
                            onChange={handleChange}
                            className="w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none focus:border-purple-600"
                            required
                        />
                    </div>
                    {/* Country */}
                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="block text-sm font-semibold mb-2">
                            {t("country")}
                        </label>
                        <div className="relative">
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                onFocus={() => setIsCountryOpen(true)}
                                onBlur={() => setIsCountryOpen(false)}
                                className="w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none focus:border-purple-600 appearance-none transition-shadow duration-200 focus:shadow-lg"
                                required
                                style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                    appearance: "none",
                                }}
                            >
                                <option value="">{t("countryPlaceholder")}</option>
                                {countries
                                    .filter((c) => c.value)
                                    .map((c) => (
                                        <option key={c.value} value={c.value}>
                                            {t(`country_${c.value}`)}
                                        </option>
                                    ))}
                            </select>
                            <span
                                className={`pointer-events-none absolute ${locale === "ar" ? "left-5" : "right-5"
                                    } top-1/2 -translate-y-1/2`}
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        transition: "transform 0.2s",
                                        transform: isCountryOpen ? "rotate(180deg)" : "none",
                                    }}
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="9.5"
                                        stroke="#1A2134"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                    <path
                                        d="M7.5 10l3.5 3 3.5-3"
                                        stroke="#1A2134"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    {/* City */}
                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="block text-sm font-semibold mb-2">
                            {t("city")}
                        </label>
                        <div className="relative">
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                onFocus={() => setIsCityOpen(true)}
                                onBlur={() => setIsCityOpen(false)}
                                className="w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none focus:border-purple-600 appearance-none transition-shadow duration-200 focus:shadow-lg"
                                required
                                style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                    appearance: "none",
                                }}
                            >
                                <option value="">{t("cityPlaceholder")}</option>
                                {cities
                                    .filter((c) => c.value)
                                    .map((c) => (
                                        <option key={c.value} value={c.value}>
                                            {t(`city_${c.value}`)}
                                        </option>
                                    ))}
                            </select>
                            <span
                                className={`pointer-events-none absolute ${locale === "ar" ? "left-5" : "right-5"
                                    } top-1/2 -translate-y-1/2`}
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        transition: "transform 0.2s",
                                        transform: isCityOpen ? "rotate(180deg)" : "none",
                                    }}
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="9.5"
                                        stroke="#1A2134"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                    <path
                                        d="M7.5 10l3.5 3 3.5-3"
                                        stroke="#1A2134"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    {/* Password */}
                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="block text-sm font-semibold mb-2">
                            {t("password")}
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder={
                                formData.password === "" && !showPassword
                                    ? "******"
                                    : showPassword
                                        ? t("passwordPlaceholder")
                                        : ""
                            }
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none focus:border-purple-600 pr-12 pl-4"
                            required
                        />
                        <button
                            type="button"
                            className={`absolute ${locale === "ar" ? "left-6" : "right-6"
                                } top-[70%] -translate-y-1/2 text-black text-2xl focus:outline-none`}
                            onClick={() => setShowPassword((v) => !v)}
                            tabIndex={-1}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="block text-sm font-semibold mb-2">
                            {t("confirmPassword")}
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder={
                                formData.confirmPassword === "" && !showConfirmPassword
                                    ? "******"
                                    : showConfirmPassword
                                        ? t("confirmPasswordPlaceholder")
                                        : ""
                            }
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none focus:border-purple-600 pr-12 pl-4"
                            required
                        />
                        <button
                            type="button"
                            className={`absolute ${locale === "ar" ? "left-6" : "right-6"
                                } top-[70%] -translate-y-1/2 text-black text-2xl focus:outline-none`}
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                </div>
                <div className="flex items-center mt-4 bg-[#ECECEC] p-1 rounded-full w-[175px] gap-2 ">
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-full bg-[#7745A2] px-8 py-2 text-base font-semibold text-white shadow-md hover:bg-purple-800 transition-all duration-200"
                    >
                        {t("submit")}
                        <span className="inline-block"></span>
                    </button>
                    <IoSend
                        className={`text-2xl ${locale === "ar" ? "rtl-flip" : ""}`}
                        style={locale === "ar" ? { transform: "scaleX(-1)" } : {}}
                    />
                </div>
            </form>
        </div>
    );
};

export default Form;
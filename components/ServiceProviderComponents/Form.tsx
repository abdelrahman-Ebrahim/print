"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { IoSend } from "react-icons/io5";
import axios from "axios";

const countries = [
    { id: 1, value: "sa", label: "Saudi Arabia" },
    { id: 2, value: "eg", label: "Egypt" },
    { id: 3, value: "ae", label: "UAE" },
];

const cities = [
    { id: 1, value: "riyadh", label: "Riyadh", countryId: 1 },
    { id: 2, value: "jeddah", label: "Jeddah", countryId: 1 },
    { id: 3, value: "cairo", label: "Cairo", countryId: 2 },
    { id: 4, value: "dubai", label: "Dubai", countryId: 3 },
];

type FormData = {
    name: string;
    mobile: string;
    email: string;
    commercial_name: string;
    country: number;
    city: number;
    password: string;
    confirmPassword: string;
};

type FormErrors = {
    name?: string;
    mobile?: string;
    email?: string;
    commercial_name?: string;
    country?: string;
    city?: string;
    password?: string;
    confirmPassword?: string;
    api?: string;
};

const Form = () => {
    const t = useTranslations("ServiceProviderForm");
    const locale = useLocale();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        mobile: "",
        email: "",
        commercial_name: "",
        country: 0,
        city: 0,
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [filteredCities, setFilteredCities] = useState(cities);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const newData = { ...prev, [name]: value };

            // Filter cities when country changes
            if (name === "country") {
                const selectedCountry = Number(value);
                const newCities = selectedCountry
                    ? cities.filter((city) => city.countryId === selectedCountry)
                    : cities;
                setFilteredCities(newCities);

                // Reset city if it's not available in the new country
                if (selectedCountry && newData.city) {
                    const cityExists = newCities.some((c) => c.id === newData.city);
                    if (!cityExists) {
                        newData.city = 0;
                    }
                }
            }

            return newData;
        });

        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const phoneRegex = /^\+?\d{1,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,64}$/;

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = t("errors.nameRequired");
        }

        // Mobile validation
        if (!formData.mobile.trim()) {
            newErrors.mobile = t("errors.mobileRequired");
        } else if (!phoneRegex.test(formData.mobile)) {
            newErrors.mobile = t("errors.mobileInvalid");
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = t("errors.emailRequired");
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = t("errors.emailInvalid");
        }

        // Commercial name validation
        if (!formData.commercial_name.trim()) {
            newErrors.commercial_name = t("errors.commercialNameRequired");
        }

        // Country validation
        if (!formData.country) {
            newErrors.country = t("errors.countryRequired");
        }

        // City validation
        if (!formData.city) {
            newErrors.city = t("errors.cityRequired");
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = t("errors.passwordRequired");
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = t("errors.passwordInvalid");
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t("errors.confirmPasswordRequired");
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t("errors.passwordsDontMatch");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors((prev) => ({ ...prev, api: undefined }));
        setSuccessMessage(null); // إخفاء رسالة النجاح القديمة

        try {
            const response = await axios.post(
                "/api/service-provider/signup",
                {
                    name: formData.name,
                    mobile: formData.mobile,
                    mobile_code: "+966",
                    email: formData.email,
                    password: formData.password,
                    commercial_name: formData.commercial_name,
                    country: formData.country,
                    city: formData.city,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-Language": locale === "ar" ? "ar-SA" : "en-US",
                    },
                }
            );

            const data = response.data;

            if (!data.status) {
                if (data.message) {
                    setErrors((prev) => ({ ...prev, api: data.message }));
                } else {
                    setErrors((prev) => ({ ...prev, api: t("errors.submissionFailed") }));
                }
            } else {
                setSuccessMessage(t("successMessage")); // أضف رسالة النجاح من الترجمة أو نص ثابت
                setFormData({
                    name: "",
                    mobile: "",
                    email: "",
                    commercial_name: "",
                    country: 0,
                    city: 0,
                    password: "",
                    confirmPassword: "",
                });
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            setErrors((prev) => ({
                ...prev,
                api: t("errors.networkError"),
            }));
        } finally {
            setIsSubmitting(false);
        }
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
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex flex-col gap-2">
                        {successMessage}
                    </div>
                )}
                {errors.api && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex flex-col gap-2">
                        {errors.api}
                    </div>
                )}

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
                            className={`w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none ${errors.name ? "border-red-500" : "focus:border-purple-600"
                                }`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Mobile Number */}
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            {t("mobile")}
                        </label>
                        <input
                            type="text"
                            name="mobile"
                            placeholder={t("mobilePlaceholder")}
                            value={formData.mobile}
                            onChange={handleChange}
                            className={`w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none ${errors.mobile ? "border-red-500" : "focus:border-purple-600"
                                }`}
                        />
                        {errors.mobile && (
                            <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                        )}
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
                            className={`w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none ${errors.email ? "border-red-500" : "focus:border-purple-600"
                                }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Commercial Name */}
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            {t("commercialName")}
                        </label>
                        <input
                            type="text"
                            name="commercial_name"
                            placeholder={t("commercialNamePlaceholder")}
                            value={formData.commercial_name}
                            onChange={handleChange}
                            className={`w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none ${errors.commercial_name ? "border-red-500" : "focus:border-purple-600"
                                }`}
                        />
                        {errors.commercial_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.commercial_name}</p>
                        )}
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
                                className={`w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none appearance-none transition-shadow duration-200 ${errors.country ? "border-red-500" : "focus:border-purple-600 focus:shadow-lg"
                                    }`}
                                style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                    appearance: "none",
                                }}
                            >
                                <option value={0}>{t("countryPlaceholder")}</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={c.id}>
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
                        {errors.country && (
                            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                        )}
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
                                className={`w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none appearance-none transition-shadow duration-200 ${errors.city ? "border-red-500" : "focus:border-purple-600 focus:shadow-lg"
                                    }`}
                                style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                    appearance: "none",
                                }}
                                disabled={!formData.country}
                            >
                                <option value={0}>{t("cityPlaceholder")}</option>
                                {filteredCities.map((c) => (
                                    <option key={c.id} value={c.id}>
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
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                        )}
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
                            className={`w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none pr-12 pl-4 ${errors.password ? "border-red-500" : "focus:border-purple-600"
                                }`}
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
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
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
                            className={`w-full border-[#E5E7EB] border rounded-[6px] px-4 py-2 focus:outline-none pr-12 pl-4 ${errors.confirmPassword ? "border-red-500" : "focus:border-purple-600"
                                }`}
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
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center mt-4 bg-[#ECECEC] p-1 rounded-full w-[175px] gap-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center gap-2 rounded-full bg-[#7745A2] px-8 py-2 text-base font-semibold text-white shadow-md hover:bg-purple-800 transition-all duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {isSubmitting ? t("submitting") : t("submit")}
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
"use client";
import { useState, useCallback, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import "./form-animations.css";
import { getRecaptchaToken } from '../RecaptchaProvider';
import PhoneInput from '../IntlTelInputField';
import { fetchCountries, getCitiesForCountry, mapCountriesToFormFormat } from "@/utils/countryApi";


// Keep the original cities structure for now, will be filtered by country
type City = {
    id: number;
    value: string;
    label: string;
    countryId: number;
};

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

interface ApiResponse {
    status: boolean;
    show_message: boolean;
    message: string;
    code: number;
    data: null | any;
}

const Form = () => {
    const t = useTranslations("ServiceProviderForm");
    const locale = useLocale();

    // State for dynamic countries
    const [countries, setCountries] = useState<Array<{
        id: number;
        value: string;
        label: string;
        code: string;
        has_university: boolean;
    }>>([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    // const [cities, setCities] = useState<City[]>([]);

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
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [apiMessage, setApiMessage] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [showApiMessage, setShowApiMessage] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // New state to track success
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [touched, setTouched] = useState({
        name: false,
        mobile: false,
        email: false,
        commercial_name: false,
        country: false,
        city: false,
        password: false,
        confirmPassword: false,
    });

    // Load countries on component mount
    useEffect(() => {
        const loadCountries = async () => {
            setIsLoadingCountries(true);
            try {
                const fetchedCountries = await fetchCountries(locale);
                const mappedCountries = mapCountriesToFormFormat(fetchedCountries);
                setCountries(mappedCountries);
            } catch (error) {
                console.error('Failed to load countries:', error);
                // Fallback countries are already handled in fetchCountries
            } finally {
                setIsLoadingCountries(false);
            }
        };

        loadCountries();
    }, [locale]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const newData = { ...prev, [name]: value };

            if (name === "country") {
                const selectedCountry = Number(value);
                const newCities = selectedCountry
                    ? getCitiesForCountry(selectedCountry)
                    : [];
                setFilteredCities(newCities);

                if (selectedCountry && newData.city) {
                    const cityExists = newCities.some((c) => c.id === newData.city);
                    if (!cityExists) {
                        newData.city = 0;
                    }
                }
            }

            return newData;
        });

        // Mark field as touched
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Memoized phone change handler
    const handlePhoneChange = useCallback((phoneValue: string) => {
        setFormData(prev => ({
            ...prev,
            mobile: phoneValue
        }));

        // Mark phone as touched
        setTouched(prev => ({
            ...prev,
            mobile: true
        }));

        // Clear phone error when user types
        if (errors.mobile) {
            setErrors(prev => ({
                ...prev,
                mobile: undefined
            }));
        }
    }, [errors.mobile]);

    // Memoized phone validation handler
    const handlePhoneValidation = useCallback((isValid: boolean) => {
        setIsPhoneValid(isValid);
    }, []);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,64}$/;

        if (!formData.name.trim()) {
            newErrors.name = t("errors.nameRequired");
        }

        // Phone validation - now using the intl-tel-input validation
        if (formData.mobile && !isPhoneValid) {
            newErrors.mobile = t("errors.mobileInvalid");
        }

        if (!formData.email.trim()) {
            newErrors.email = t("errors.emailRequired");
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = t("errors.emailInvalid");
        }

        if (!formData.commercial_name.trim()) {
            newErrors.commercial_name = t("errors.commercialNameRequired");
        }

        if (!formData.country) {
            newErrors.country = t("errors.countryRequired");
        }

        if (!formData.city) {
            newErrors.city = t("errors.cityRequired");
        }

        if (!formData.password) {
            newErrors.password = t("errors.passwordRequired");
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = t("errors.passwordInvalid");
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t("errors.confirmPasswordRequired");
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t("errors.passwordsDontMatch");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearMessages = () => {
        setApiMessage('');
        setSubmitError('');
        setShowApiMessage(false);
        setIsSuccess(false); // Reset success state
        setErrors((prev) => ({ ...prev, api: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({
            name: true,
            mobile: true,
            email: true,
            commercial_name: true,
            country: true,
            city: true,
            password: true,
            confirmPassword: true,
        });

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        clearMessages();

        try {
            const token = await getRecaptchaToken('service_provider_signup');

            // Get the selected country's phone code
            const selectedCountry = countries.find(c => c.id === formData.country);
            const countryCode = selectedCountry ? `+${selectedCountry.code}` : "+966";

            const submissionData = {
                name: formData.name.trim(),
                mobile: formData.mobile.trim(),
                mobile_code: countryCode,
                email: formData.email.trim(),
                password: formData.password,
                commercial_name: formData.commercial_name.trim(),
                country: formData.country,
                city: formData.city,
                recaptchaToken: token
            };

            const response = await axios.post(
                "/api/frontend/service-provider/signup",
                submissionData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-Language": locale === "ar" ? "ar-SA" : "en-US",
                    },
                }
            );

            const data: ApiResponse = response.data;

            // Always show API message if available
            if (data.message) {
                setApiMessage(data.message);
                setShowApiMessage(true);
                setIsSuccess(data.status); // Set success state based on API response
            }

            if (data.status) {
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
                setTouched({
                    name: false,
                    mobile: false,
                    email: false,
                    commercial_name: false,
                    country: false,
                    city: false,
                    password: false,
                    confirmPassword: false,
                });
                setFilteredCities([]);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                setApiMessage(error.response.data.message);
                setShowApiMessage(true);
                setIsSuccess(false); // Ensure it's marked as error
            } else {
                setSubmitError(
                    error instanceof Error ? error.message : t("errors.networkError")
                );
            }
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
                {showApiMessage && (
                    <div className={`mb-6 p-4 rounded-lg flex flex-col gap-2 ${isSuccess
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                        {apiMessage}
                    </div>
                )}

                {submitError && !showApiMessage && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex flex-col gap-2">
                        {submitError}
                    </div>
                )}

                <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("name")}
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder={t("namePlaceholder")}
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-input w-full px-4 py-2 ${errors.name ? "border-red-500" : ""
                                }`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Updated Mobile Input using PhoneInput component */}
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <PhoneInput
                            value={formData.mobile}
                            onChange={handlePhoneChange}
                            onValidationChange={handlePhoneValidation}
                            label={t("mobile")}
                            placeholder={t("mobilePlaceholder")}
                            initialCountry="sa"
                            error={errors.mobile}
                            touched={touched.mobile}
                            additionalClasses="!pt-2 !pb-2"
                        />
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("email")}
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder={t("emailPlaceholder")}
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input w-full px-4 py-2 ${errors.email ? "border-red-500" : ""
                                }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("commercialName")}
                        </label>
                        <input
                            type="text"
                            name="commercial_name"
                            placeholder={t("commercialNamePlaceholder")}
                            value={formData.commercial_name}
                            onChange={handleChange}
                            className={`form-input w-full px-4 py-2 ${errors.commercial_name ? "border-red-500" : ""
                                }`}
                        />
                        {errors.commercial_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.commercial_name}</p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("country")}
                        </label>
                        <div className="relative">
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                onFocus={() => setIsCountryOpen(true)}
                                onBlur={() => setIsCountryOpen(false)}
                                className={`form-select w-full px-4 py-2 appearance-none ${errors.country ? "border-red-500" : ""
                                    }`}
                                style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                    appearance: "none",
                                }}
                                disabled={isLoadingCountries}
                            >
                                <option value={0}>
                                    {isLoadingCountries ? "Loading countries..." : t("countryPlaceholder")}
                                </option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.label}
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

                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("city")}
                        </label>
                        <div className="relative">
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                onFocus={() => setIsCityOpen(true)}
                                onBlur={() => setIsCityOpen(false)}
                                className={`form-select w-full px-4 py-2 appearance-none ${errors.city ? "border-red-500" : ""
                                    }`}
                                style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                    appearance: "none",
                                }}
                                disabled={!formData.country}
                            >
                                <option value={0}>{t("cityPlaceholder")}</option>
                                {filteredCities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.label}
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

                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="form-label block text-sm font-semibold mb-2">
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
                            className={`form-input w-full px-4 py-2 pr-12 ${errors.password ? "border-red-500" : ""
                                }`}
                        />
                        <button
                            type="button"
                            className={`password-toggle absolute ${locale === "ar" ? "left-6" : "right-6"
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

                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="form-label block text-sm font-semibold mb-2">
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
                            className={`form-input w-full px-4 py-2 pr-12 ${errors.confirmPassword ? "border-red-500" : ""
                                }`}
                        />
                        <button
                            type="button"
                            className={`password-toggle absolute ${locale === "ar" ? "left-6" : "right-6"
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

                <div className="submit-button-container flex items-center mt-4 bg-[#ECECEC] p-1 rounded-full w-[175px] gap-2 cursor-pointer">
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoadingCountries}
                        className={`submit-button flex items-center gap-2 rounded-full bg-[#7745A2] px-8 py-2 text-base font-semibold text-white shadow-md transition-all duration-200 cursor-pointer ${(isSubmitting || isLoadingCountries) ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {isSubmitting ? t("submitting") : t("submit")}
                        <span className="inline-block"></span>
                    </button>
                    <IoSend
                        className={`arrow-icon text-2xl ${locale === "ar" ? "rtl-flip" : ""}`}
                        style={locale === "ar" ? { transform: "scaleX(-1)" } : {}}
                    />
                </div>
            </form>
        </div>
    );
};

export default Form;
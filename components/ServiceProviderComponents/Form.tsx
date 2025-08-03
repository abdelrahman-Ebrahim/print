"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import "./form-animations.css";
import { getRecaptchaToken } from '../RecaptchaProvider';
import PhoneInput from '../IntlTelInputField';
import {
    fetchCountries,
    fetchCitiesForCountry,
    mapCountriesToFormFormat,
    mapCitiesToFormFormat,
    type FormattedCity
} from "@/utils/countryApi";

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

interface DropdownOption {
    id: number;
    label: string;
    value: string;
}

interface SearchableDropdownProps {
    options: DropdownOption[];
    value: number;
    onChange: (value: number) => void;
    placeholder: string;
    error?: string;
    disabled?: boolean;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    t: ReturnType<typeof useTranslations>;
}

const SearchableDropdown = ({
    options,
    value,
    onChange,
    placeholder,
    error,
    disabled,
    isOpen,
    onToggle,
    onClose,
    t
}: SearchableDropdownProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Filter options based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions(options);
        }
    }, [searchTerm, options]);

    // Reset search when dropdown closes
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm("");
        } else if (searchInputRef.current) {
            // Focus search input when dropdown opens
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 0);
        }
    }, [isOpen]);

    // Handle clicks outside dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const selectedOption = options.find(option => option.id === value);

    const handleOptionClick = (optionValue: number) => {
        onChange(optionValue);
        onClose();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className={`form-select w-full px-4 py-2 cursor-pointer flex items-center justify-between ${error ? "border-red-500" : ""
                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={disabled ? undefined : onToggle}
            >
                <span className={selectedOption ? "text-black" : "text-gray-400"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className="pointer-events-none">
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            transition: "transform 0.2s",
                            transform: isOpen ? "rotate(180deg)" : "none",
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

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-200">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={`${t("search")} ${placeholder.toLowerCase()}...`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[0.1px] focus:ring-[#7745A2] focus:border-[0.1px] focus:border-[#7745A2]"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Options List */}
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`px-4 py-3 cursor-pointer transition-colors ${option.id === value ? "bg-[#7745A2] text-white hover:bg-[#7745A2]" : " hover:bg-gray-100"
                                        }`}
                                    onClick={() => handleOptionClick(option.id)}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-gray-500 text-center">
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const Form = () => {
    const t = useTranslations("ServiceProviderForm");
    const locale = useLocale();

    // State for dynamic countries and cities
    const [countries, setCountries] = useState<Array<{
        id: number;
        value: string;
        label: string;
        code: string;
        has_university: boolean;
    }>>([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(false);

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
    const [filteredCities, setFilteredCities] = useState<FormattedCity[]>([]);
    const [apiMessage, setApiMessage] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [showApiMessage, setShowApiMessage] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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

                // Set the first country as default if available
                if (mappedCountries.length > 0) {
                    const firstCountry = mappedCountries[0];
                    setFormData(prev => ({ ...prev, country: firstCountry.id }));

                    // Load cities for the first country
                    setIsLoadingCities(true);
                    try {
                        const fetchedCities = await fetchCitiesForCountry(firstCountry.id, locale);
                        const mappedCities = mapCitiesToFormFormat(fetchedCities, firstCountry.id);
                        setFilteredCities(mappedCities);

                        // Set the first city as default if available
                        if (mappedCities.length > 0) {
                            setFormData(prev => ({ ...prev, city: mappedCities[0].id }));
                        }
                    } catch (error) {
                        console.error('Failed to load cities for default country:', firstCountry.id, error);
                        setFilteredCities([]);
                    } finally {
                        setIsLoadingCities(false);
                    }
                }
            } catch (error) {
                console.error('Failed to load countries:', error);
            } finally {
                setIsLoadingCountries(false);
            }
        };

        loadCountries();
    }, [locale]);

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const newData = { ...prev, [name]: value };

            // Reset city when country changes
            if (name === "country") {
                newData.city = 0;
            }

            return newData;
        });

        // Handle country change - fetch cities for the selected country
        if (name === "country") {
            const selectedCountry = Number(value);

            if (selectedCountry) {
                setIsLoadingCities(true);
                setFilteredCities([]); // Clear current cities

                try {
                    const fetchedCities = await fetchCitiesForCountry(selectedCountry, locale);
                    const mappedCities = mapCitiesToFormFormat(fetchedCities, selectedCountry);
                    setFilteredCities(mappedCities);

                    // Set the first city as default for the newly selected country
                    if (mappedCities.length > 0) {
                        setFormData(prev => ({ ...prev, city: mappedCities[0].id }));
                    }
                } catch (error) {
                    console.error('Failed to load cities for country:', selectedCountry, error);
                    setFilteredCities([]);
                } finally {
                    setIsLoadingCities(false);
                }
            } else {
                setFilteredCities([]);
                setIsLoadingCities(false);
            }
        }

        // Mark field as touched
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Handle country dropdown change
    const handleCountryChange = async (countryId: number) => {
        setFormData(prev => ({
            ...prev,
            country: countryId,
            city: 0 // Reset city when country changes
        }));

        // Mark as touched
        setTouched(prev => ({
            ...prev,
            country: true
        }));

        // Clear country error
        if (errors.country) {
            setErrors(prev => ({
                ...prev,
                country: undefined
            }));
        }

        // Load cities for selected country
        if (countryId) {
            setIsLoadingCities(true);
            setFilteredCities([]);

            try {
                const fetchedCities = await fetchCitiesForCountry(countryId, locale);
                const mappedCities = mapCitiesToFormFormat(fetchedCities, countryId);
                setFilteredCities(mappedCities);

                // Set the first city as default for the newly selected country
                if (mappedCities.length > 0) {
                    setFormData(prev => ({ ...prev, city: mappedCities[0].id }));
                }
            } catch (error) {
                console.error('Failed to load cities for country:', countryId, error);
                setFilteredCities([]);
            } finally {
                setIsLoadingCities(false);
            }
        } else {
            setFilteredCities([]);
        }
    };

    // Handle city dropdown change
    const handleCityChange = (cityId: number) => {
        setFormData(prev => ({
            ...prev,
            city: cityId
        }));

        // Mark as touched
        setTouched(prev => ({
            ...prev,
            city: true
        }));

        // Clear city error
        if (errors.city) {
            setErrors(prev => ({
                ...prev,
                city: undefined
            }));
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
        setIsSuccess(false);
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
                setIsSuccess(data.status);
            }

            if (data.status) {
                // Reset form to initial state with defaults
                const firstCountry = countries.length > 0 ? countries[0] : null;
                const firstCity = filteredCities.length > 0 ? filteredCities[0] : null;

                setFormData({
                    name: "",
                    mobile: "",
                    email: "",
                    commercial_name: "",
                    country: firstCountry ? firstCountry.id : 0,
                    city: firstCity ? firstCity.id : 0,
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
                // Don't clear filtered cities if we have defaults
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                setApiMessage(error.response.data.message);
                setShowApiMessage(true);
                setIsSuccess(false);
            } else {
                setSubmitError(
                    error instanceof Error ? error.message : t("errors.networkError")
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Convert data for dropdown components
    const countryOptions = countries.map(country => ({
        id: country.id,
        label: country.label,
        value: country.value
    }));

    const cityOptions = filteredCities.map(city => ({
        id: city.id,
        label: city.label,
        value: city.value
    }));

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

                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("country")}
                        </label>
                        <SearchableDropdown
                            options={countryOptions}
                            value={formData.country}
                            onChange={handleCountryChange}
                            placeholder={t("country")}
                            error={errors.country}
                            disabled={isLoadingCountries}
                            isOpen={isCountryOpen}
                            onToggle={() => setIsCountryOpen(!isCountryOpen)}
                            onClose={() => setIsCountryOpen(false)}
                            t={t}
                        />
                        {errors.country && (
                            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("city")}
                        </label>
                        <SearchableDropdown
                            options={cityOptions}
                            value={formData.city}
                            onChange={handleCityChange}
                            placeholder={t("city")}
                            error={errors.city}
                            disabled={!formData.country || isLoadingCities}
                            isOpen={isCityOpen}
                            onToggle={() => setIsCityOpen(!isCityOpen)}
                            onClose={() => setIsCityOpen(false)}
                            t={t}
                        />
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("password")}
                        </label>
                        <div className="relative">
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
                                className={`form-input w-full px-4 py-2 pe-12 relative ${errors.password ? "border-red-500" : ""
                                    }`}
                            />
                            <button
                                type="button"
                                className={`password-toggle absolute ${locale === "ar" ? "left-6" : "right-6"
                                    } top-1/2 -translate-y-1/2 text-black text-2xl focus:outline-none`}
                                onClick={() => setShowPassword((v) => !v)}
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 relative">
                        <label className="form-label block text-sm font-semibold mb-2">
                            {t("confirmPassword")}
                        </label>
                        <div className="relative">
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
                                className={`form-input  w-full px-4 py-2 pe-12 ${errors.confirmPassword ? "border-red-500" : ""
                                    }`}
                            />
                            <button
                                type="button"
                                className={`password-toggle absolute ${locale === "ar" ? "left-6" : "right-6"
                                    } top-1/2 -translate-y-1/2 text-black text-2xl focus:outline-none`}
                                onClick={() => setShowConfirmPassword((v) => !v)}
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>
                </div>

                <div className="submit-button-container flex items-center mt-4 bg-[#ECECEC] p-1 rounded-full w-[175px] gap-2 cursor-pointer">
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoadingCountries || isLoadingCities}
                        className={`submit-button flex items-center gap-2 rounded-full bg-[#7745A2] px-8 py-2 text-base font-semibold text-white shadow-md transition-all duration-200 cursor-pointer text-nowrap ${(isSubmitting || isLoadingCountries || isLoadingCities) ? "opacity-70 cursor-not-allowed" : ""
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
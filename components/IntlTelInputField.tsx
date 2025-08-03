"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import "intl-tel-input/styles";
import { useLocale } from "next-intl";
import ar from 'intl-tel-input/i18n/ar';
import type { IntlTelInputRef } from "intl-tel-input/reactWithUtils";

const IntlTelInput = dynamic(() => import("intl-tel-input/reactWithUtils"), {
    ssr: false,
    loading: () => <div className="h-[40px] border rounded-lg animate-pulse bg-gray-100"></div>
});

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    onValidationChange?: (isValid: boolean) => void;
    label?: string;
    initialCountry?: string;
    error?: string;
    touched?: boolean;
    placeholder?: string;
    additionalClasses?: string;
}

const PhoneInput = ({
    value = "",
    onChange,
    onValidationChange,
    label = "Phone number",
    initialCountry = "sa",
    error,
    touched,
    placeholder = "",
    additionalClasses,
}: PhoneInputProps) => {
    const telInputRef = useRef<IntlTelInputRef>(null);
    const [isClient, setIsClient] = useState(false);
    const [internalError, setInternalError] = useState<string>("");
    const locale = useLocale();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const getRequiredMessage = () => {
        return locale === "ar" ? "رقم الجوال مطلوب" : "Phone is required";
    };

    const checkIfEmpty = useCallback(() => {
        if (telInputRef.current) {
            try {
                const instance = telInputRef.current.getInstance();
                if (instance) {
                    const fullNumber = instance.getNumber();
                    const countryData = instance.getSelectedCountryData();

                    // Check if there's only country code but no actual number
                    if (fullNumber && countryData) {
                        const countryCode = countryData.dialCode;
                        const numberWithoutCountryCode = fullNumber.replace(`+${countryCode}`, '').replace(/\s+/g, '').replace(/[^\d]/g, '');

                        return numberWithoutCountryCode.length === 0;
                    }

                    // If no full number, check if there's any input
                    return !fullNumber || fullNumber.trim().length === 0;
                }
            } catch (error) {
                console.error("Error checking if phone number is empty:", error);
            }
        }
        return true; // Consider empty if we can't determine
    }, []);

    const handleChange = useCallback(() => {
        if (telInputRef.current) {
            try {
                const instance = telInputRef.current.getInstance();
                if (instance) {
                    const fullNumber = instance.getNumber()?.replace(/\s+/g, "") || "";

                    // Check if phone is empty (only country code)
                    const isEmpty = checkIfEmpty();

                    if (isEmpty && touched) {
                        setInternalError(getRequiredMessage());
                    } else {
                        setInternalError("");
                    }

                    return fullNumber;
                }
            } catch (error) {
                console.error("Error getting phone number:", error);
            }
        }
        return value;
    }, [value, checkIfEmpty, touched, locale]);

    const handleValidationChange = useCallback((valid: boolean) => {
        // Also check our custom validation
        const isEmpty = checkIfEmpty();
        const finalValid = valid && !isEmpty;

        onValidationChange?.(finalValid);
    }, [onValidationChange, checkIfEmpty]);

    const handleNumberChange = useCallback(() => {
        const newValue = handleChange();
        if (newValue !== undefined && newValue !== value) {
            onChange(newValue);
        }
    }, [handleChange, onChange, value]);

    // Handle blur event to trigger validation when user leaves the field
    const handleBlur = useCallback(() => {
        const isEmpty = checkIfEmpty();
        if (isEmpty) {
            setInternalError(getRequiredMessage());
        }
    }, [checkIfEmpty, locale]);

    if (!isClient) {
        return (
            <div className="flex flex-col justify-start items-start w-full gap-2">
                <label className="text-black font-semibold text-sm">
                    {label}
                </label>
                <div className="h-[40px] border rounded-lg animate-pulse bg-gray-100 w-full"></div>
            </div>
        );
    }

    // Use internal error if present, otherwise use external error
    const displayError = internalError || error;
    const hasError = touched && displayError;

    return (
        <div className="flex flex-col justify-start items-start w-full gap-2 form-element">
            <label
                htmlFor="phone-input"
                className="text-black font-semibold text-sm form-label"
            >
                {label}
            </label>
            <div className="relative w-full">
                <div className={`form-input ${hasError ? "!border-[#FB7185]" : ""}`}>
                    <IntlTelInput
                        ref={telInputRef}
                        initialValue={value}
                        onChangeNumber={handleNumberChange}
                        onChangeValidity={handleValidationChange}
                        onChangeErrorCode={() => { }} // Empty handler to satisfy the prop requirement
                        initOptions={{
                            initialCountry: initialCountry,
                            separateDialCode: true,
                            nationalMode: false,
                            i18n: locale === "ar" ? ar : undefined,
                            dropdownContainer: document.body,
                        }}
                        inputProps={{
                            id: "phone-input",
                            className: `border-none w-full h-auto focus:outline-none placeholder:text-[#525252] bg-transparent px-[17px] pt-[13.5px] pb-[14px] ${locale === "ar" ? "text-right" : "text-left"
                                } ${additionalClasses}`,
                            dir: locale === "ar" ? "ltr" : "ltr",
                            placeholder: placeholder,
                            onBlur: handleBlur
                        }}
                    />
                </div>
                {hasError && (
                    <p className="text-red-500 text-xs mt-1">{displayError}</p>
                )}
            </div>
        </div>
    );
};

export default PhoneInput;
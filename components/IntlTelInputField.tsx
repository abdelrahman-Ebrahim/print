"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import "intl-tel-input/styles";
import { useLocale } from "next-intl";
import ar from 'intl-tel-input/i18n/ar';
import type { IntlTelInputRef } from "intl-tel-input/reactWithUtils";

// Define proper types for the IntlTelInput instance
interface IntlTelInputInstance {
    getNumber(): string;
    isValidNumber(): boolean;
    getValidationError(): number;
}

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
    const locale = useLocale();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = useCallback(() => {
        if (telInputRef.current) {
            try {
                const instance = telInputRef.current.getInstance();
                if (instance) {
                    const fullNumber = instance.getNumber()?.replace(/\s+/g, "") || "";
                    return fullNumber;
                }
            } catch (error) {
                console.error("Error getting phone number:", error);
            }
        }
        return value;
    }, [value]);

    const handleValidationChange = useCallback((valid: boolean) => {
        onValidationChange?.(valid);
    }, [onValidationChange]);

    const handleNumberChange = useCallback(() => {
        const newValue = handleChange();
        if (newValue !== undefined && newValue !== value) {
            onChange(newValue);
        }
    }, [handleChange, onChange, value]);

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

    return (
        <div className="flex flex-col justify-start items-start w-full gap-2 form-element">
            <label
                htmlFor="phone-input"
                className="text-black font-semibold text-sm form-label"
            >
                {label}
            </label>
            <div className="relative w-full">
                <div className={`form-input ${touched && error ? "!border-[#FB7185]" : ""}`}>
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
                            placeholder: placeholder
                        }}
                    />
                </div>
                {touched && error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
            </div>
        </div>
    );
};

export default PhoneInput;
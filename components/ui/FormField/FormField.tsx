"use client";

import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";

interface FormFieldProps {
	name: string;
	inputType: HTMLInputTypeAttribute;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	showError: boolean;
	error: string;
}

export default function FormField({
	name,
	inputType,
	label,
	value,
	onChange,
	onBlur,
	showError,
	error,
}: FormFieldProps) {
	const labelClasses = cn(
		"text-[12px] font-bold -tracking-[0.21px] text-black capitalize",
		{
			"text-input-outline-error-color": showError && error,
		}
	);
	const inputFieldClasses = cn(
		"outline-input-outline-color h-14 rounded-lg px-6 text-[14px] -tracking-[0.25px] outline-1 focus:outline-input-outline-active-color focus:outline-1",
		{
			"outline-input-outline-error-color outline-2": showError && error,
		}
	);

	const errorClasses = cn(
		"text-[12px] -tracking-[0.21px] text-input-outline-error-color font-medium"
	);

	return (
		<div className="flex flex-col gap-y-2.25">
			<label htmlFor={name} className={labelClasses}>
				{label}
			</label>
			<input
				type={inputType}
				id={name}
				name={name}
				className={inputFieldClasses}
				onChange={onChange}
				value={value}
				onBlur={onBlur}
			/>
			{showError && error && <span className={errorClasses}>{error}</span>}
		</div>
	);
}

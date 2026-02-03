"use client";

import { cn } from "@/lib/utils";

type FormFieldInputType = "text" | "email";

interface FormFieldProps {
	inputType: FormFieldInputType;
	name: string;
	label: string;
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	error?: string;
	showError?: boolean;
}

export default function FormField({
	inputType,
	name,
	label,
	value,
	onChange,
	onBlur,
	showError,
	error,
	placeholder,
}: FormFieldProps) {
	const labelClasses = cn(
		"text-[12px] font-bold -tracking-[0.21px] text-black",
		{
			"text-input-outline-error-color": showError && error,
		}
	);
	const inputFieldClasses = cn(
		"outline-input-outline-color h-14 rounded-lg px-6 text-[14px] -tracking-[0.25px] outline-1 focus:outline-input-outline-active-color focus:outline-1 placeholder:text-[14px] placeholder:font-bold placeholder:text-black/40",
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
				placeholder={placeholder}
			/>
			{showError && error && <span className={errorClasses}>{error}</span>}
		</div>
	);
}

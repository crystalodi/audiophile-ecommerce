"use client";

import FormField from "@/components/ui/FormField";
import { cn } from "@/lib/utils";
import { FormValidator } from "@/lib/validation";
import { forwardRef, useMemo, useState } from "react";

const CheckoutForm = forwardRef<HTMLFormElement>((props, ref) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		address: "",
		zipCode: "",
		city: "",
		country: "",
		paymentMethod: "",
		eMoneyNumber: "",
		eMoneyPin: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
		{}
	);

	const validator = useMemo(() => {
		return new FormValidator()
			.addRule("name", { required: true })
			.addRule("email", {
				required: true,
				pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			})
			.addRule("phoneNumber", {
				required: true,
				pattern: /^\+\d{1,4} \d{3}-\d{3}-\d{4}$/,
				displayName: "Phone Number",
			})
			.addRule("address", {
				required: true,
			})
			.addRule("zipCode", {
				required: true,
				maxLength: 5,
				pattern: /^\d{5}$/,
				displayName: "ZIP Code",
			})
			.addRule("city", { required: true })
			.addRule("country", { required: true })
			.addRule("paymentMethod", { required: true });
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const fieldName = e.target.name;
		setTouchedFields(previous => ({
			...previous,
			[fieldName]: true,
		}));

		const error = validator.validate(
			fieldName,
			formData[fieldName as keyof typeof formData]
		);
		setErrors(previous => ({
			...previous,
			[fieldName]: error,
		}));
	};

	const handleFormValidation = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const legendClasses = cn(
		"text-audiophile-orange mb-4 text-[13px] leading-[25px] font-bold tracking-[0.93px] uppercase"
	);

	return (
		<form noValidate ref={ref} onSubmit={handleFormValidation}>
			<div className="flex flex-col gap-y-8">
				<fieldset>
					<legend className={legendClasses}>Billing Details</legend>
					<div className="flex flex-col gap-y-6">
						<FormField
							name="name"
							inputType="text"
							label="name"
							onChange={handleChange}
							value={formData.name}
							onBlur={handleBlur}
							error={errors.name}
							showError={touchedFields.name}
						/>
						<FormField
							name="email"
							inputType="email"
							label="email"
							onChange={handleChange}
							value={formData.email}
							onBlur={handleBlur}
							error={errors.email}
							showError={touchedFields.email}
						/>
						<FormField
							name="phoneNumber"
							inputType="text"
							label="phone number"
							onChange={handleChange}
							value={formData.phoneNumber}
							onBlur={handleBlur}
							error={errors.phoneNumber}
							showError={touchedFields.phoneNumber}
						/>
					</div>
				</fieldset>
				<fieldset>
					<legend className={legendClasses}>Shipping info</legend>
					<div className="flex flex-col gap-y-6">
						<FormField
							name="address"
							inputType="text"
							label="your address"
							onChange={handleChange}
							value={formData.address}
							onBlur={handleBlur}
							error={errors.address}
							showError={touchedFields.address}
						/>
						<FormField
							name="zipCode"
							inputType="text"
							label="ZIP Code"
							onChange={handleChange}
							value={formData.zipCode}
							onBlur={handleBlur}
							error={errors.zipCode}
							showError={touchedFields.zipCode}
						/>
						<FormField
							name="city"
							inputType="text"
							label="city"
							onChange={handleChange}
							value={formData.city}
							onBlur={handleBlur}
							error={errors.city}
							showError={touchedFields.city}
						/>
						<FormField
							name="country"
							inputType="text"
							label="country"
							onChange={handleChange}
							value={formData.country}
							onBlur={handleBlur}
							error={errors.country}
							showError={touchedFields.country}
						/>
					</div>
				</fieldset>
				<fieldset>
					<legend className={legendClasses}>payment details</legend>
				</fieldset>
			</div>
		</form>
	);
});

CheckoutForm.displayName = "CheckoutForm";
export default CheckoutForm;

"use client";

import FormField from "@/components/ui/FormField";
import RadioGroup from "@/components/ui/RadioGroup";
import { cn } from "@/lib/utils";
import { FormValidator } from "@/lib/validation";
import { useMemo, useState } from "react";
import CashOnDeliveryIcon from "@/public/icon-cash-on-delivery.svg";

interface CheckoutFormProps {
	ref?: React.Ref<HTMLFormElement>;
}

export default function CheckoutForm({ ref }: CheckoutFormProps) {
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
				pattern: /^\+\d{1,4}\d{3}-\d{3}-\d{4}$/,
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
			.addRule("paymentMethod", {
				required: true,
				displayName: "Payment Method",
			})
			.addRule("eMoneyPin", {
				requiredWhen: {
					field: "paymentMethod",
					value: "E-MONEY",
					condition: "equals",
				},
				displayName: "e-Money Pin",
				pattern: /^\d{4}$/,
				maxLength: 4,
			})
			.addRule("eMoneyNumber", {
				requiredWhen: {
					field: "paymentMethod",
					value: "E-MONEY",
					condition: "equals",
				},
				displayName: "e-Money Number",
				pattern: /^\d{9}$/,
				maxLength: 9,
			});
	}, []);

	const clearDependentFields = (parentField: string, parentValue: string) => {
		const dependencies: Record<
			string,
			{ condition: string; fields: string[] }
		> = {
			paymentMethod: {
				condition: "E-MONEY",
				fields: ["eMoneyNumber", "eMoneyPin"],
			},
		};

		const dependency = dependencies[parentField];
		if (!dependency) return;

		if (parentValue !== dependency.condition) {
			setFormData(prev => {
				const newFormData = { ...prev };
				dependency.fields.forEach(field => {
					newFormData[field as keyof typeof newFormData] = "";
				});
				return newFormData;
			});

			setErrors(prev => {
				const newErrors = { ...prev };
				dependency.fields.forEach(field => {
					delete newErrors[field];
				});
				return newErrors;
			});

			setTouchedFields(prev => {
				const newTouched = { ...prev };
				dependency.fields.forEach(field => {
					delete newTouched[field];
				});
				return newTouched;
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});

		clearDependentFields(name, value);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const fieldName = e.target.name;
		setTouchedFields(previous => ({
			...previous,
			[fieldName]: true,
		}));

		const error = validator.validate(
			fieldName,
			formData[fieldName as keyof typeof formData],
			formData
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

	const formGroupContainerClasses = cn(
		"grid grid-cols-1 gap-x-4 gap-y-6 xl:grid-cols-2"
	);

	return (
		<form noValidate ref={ref} onSubmit={handleFormValidation} method="post">
			<div className="flex flex-col gap-y-8">
				<fieldset>
					<legend className={legendClasses}>Billing Details</legend>
					<div className={formGroupContainerClasses}>
						<FormField
							name="name"
							inputType="text"
							label="Name"
							onChange={handleChange}
							value={formData.name}
							onBlur={handleBlur}
							error={errors.name}
							showError={touchedFields.name}
							placeholder="Alexei Ward"
						/>
						<FormField
							name="email"
							inputType="email"
							label="Email"
							onChange={handleChange}
							value={formData.email}
							onBlur={handleBlur}
							error={errors.email}
							showError={touchedFields.email}
							placeholder="alexeiward@email.com"
						/>
						<FormField
							name="phoneNumber"
							inputType="text"
							label="Phone Number"
							onChange={handleChange}
							value={formData.phoneNumber}
							onBlur={handleBlur}
							error={errors.phoneNumber}
							showError={touchedFields.phoneNumber}
							placeholder="+1 202 555-0136"
						/>
					</div>
				</fieldset>
				<fieldset>
					<legend className={legendClasses}>Shipping info</legend>
					<div className={formGroupContainerClasses}>
						<div className="xl:col-span-2">
							<FormField
								name="address"
								inputType="text"
								label="Your Address"
								onChange={handleChange}
								value={formData.address}
								onBlur={handleBlur}
								error={errors.address}
								showError={touchedFields.address}
								placeholder="1137 Williams Avenue"
							/>
						</div>
						<FormField
							name="zipCode"
							inputType="text"
							label="ZIP Code"
							onChange={handleChange}
							value={formData.zipCode}
							onBlur={handleBlur}
							error={errors.zipCode}
							showError={touchedFields.zipCode}
							placeholder="10001"
						/>
						<FormField
							name="city"
							inputType="text"
							label="City"
							onChange={handleChange}
							value={formData.city}
							onBlur={handleBlur}
							error={errors.city}
							showError={touchedFields.city}
							placeholder="New York City"
						/>
						<FormField
							name="country"
							inputType="text"
							label="Country"
							onChange={handleChange}
							value={formData.country}
							onBlur={handleBlur}
							error={errors.country}
							showError={touchedFields.country}
							placeholder="United States"
						/>
					</div>
				</fieldset>
				<fieldset>
					<legend className={legendClasses}>payment details</legend>
					<div className={formGroupContainerClasses}>
						<div className="xl:col-span-2">
							<RadioGroup
								name="paymentMethod"
								label="Payment Method"
								options={[
									{ label: "e-Money", value: "E-MONEY" },
									{ label: "Cash on Delivery", value: "CASH" },
								]}
								value={formData.paymentMethod}
								onBlur={handleBlur}
								onChange={handleChange}
								error={errors.paymentMethod}
								showError={touchedFields.paymentMethod}
							/>
						</div>
						{formData.paymentMethod === "E-MONEY" && (
							<>
								<FormField
									name="eMoneyNumber"
									inputType="text"
									label="e-Money Number"
									onChange={handleChange}
									value={formData.eMoneyNumber}
									onBlur={handleBlur}
									error={errors.eMoneyNumber}
									showError={touchedFields.eMoneyNumber}
									placeholder="238521993"
								/>
								<FormField
									name="eMoneyPin"
									inputType="text"
									label="e-Money Pin"
									onChange={handleChange}
									value={formData.eMoneyPin}
									onBlur={handleBlur}
									error={errors.eMoneyPin}
									showError={touchedFields.eMoneyPin}
									placeholder="6891"
								/>
							</>
						)}
						{formData.paymentMethod === "CASH" && (
							<div className="mt-[30px] xl:col-span-2">
								<div className="flex items-start gap-x-8">
									<div className="my-3">
										<CashOnDeliveryIcon
											className="fill-audiophile-orange"
											width={48}
											height={48}
										/>
									</div>
									<p className="body-text text-black/50">
										The 'Cash on Delivery' option enables you to pay in cash
										when our delivery courier arrives at your residence. Just
										make sure your address is correct so that your order will
										not be cancelled.
									</p>
								</div>
							</div>
						)}
					</div>
				</fieldset>
			</div>
		</form>
	);
}

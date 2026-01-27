export interface ValidationRule {
	required?: boolean;
	pattern?: RegExp;
	minLength?: number;
	maxLength?: number;
	custom?: (value: string) => string | null;
	displayName?: string;
	requiredWhen?: {
		field: string;
		value: string | string[];
		condition?: "equals" | "notEquals" | "includes" | "notIncludes";
	};
}

export class FormValidator {
	private rules: Record<string, ValidationRule> = {};

	addRule(fieldName: string, rule: ValidationRule) {
		this.rules[fieldName] = rule;
		return this;
	}

	private isConditionallyRequired(
		rule: ValidationRule,
		allFormData: Record<string, string>
	): boolean {
		if (!rule.requiredWhen) return false;

		const {
			field,
			value: expectedValue,
			condition = "equals",
		} = rule.requiredWhen;
		const actualValue = allFormData[field] || "";

		switch (condition) {
			case "equals":
				if (Array.isArray(expectedValue)) {
					return expectedValue.includes(actualValue);
				}
				return actualValue === expectedValue;

			case "notEquals":
				if (Array.isArray(expectedValue)) {
					return !expectedValue.includes(actualValue);
				}
				return actualValue !== expectedValue;

			case "includes":
				if (Array.isArray(expectedValue)) {
					return expectedValue.some(val => actualValue.includes(val));
				}
				return actualValue.includes(expectedValue);

			case "notIncludes":
				if (Array.isArray(expectedValue)) {
					return !expectedValue.some(val => actualValue.includes(val));
				}
				return !actualValue.includes(expectedValue);

			default:
				return false;
		}
	}

	validate(
		fieldName: string,
		value: string,
		allFormData?: Record<string, string>
	): string {
		const rule = this.rules[fieldName];
		if (!rule) return "";

		const displayName =
			rule.displayName
				?.trim()
				.split(/\s+/)
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ") ?? fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

		const isRequired =
			rule.required ||
			(allFormData && this.isConditionallyRequired(rule, allFormData));

		if (isRequired && !value.trim()) {
			return `${displayName} is required.`;
		}

		if (!value.trim() && !isRequired) return "";

		if (
			(rule.pattern && !rule.pattern.test(value)) ||
			(rule.minLength && value.length < rule.minLength) ||
			(rule.maxLength && value.length > rule.maxLength)
		) {
			return `Wrong format`;
		}

		if (rule.custom) {
			const customError = rule.custom(value);
			if (customError) return customError;
		}

		return "";
	}

	validateAll(formData: Record<string, string>): Record<string, string> {
		const errors: Record<string, string> = {};

		Object.entries(formData).forEach(([fieldName, value]) => {
			const error = this.validate(fieldName, value, formData);
			if (error) errors[fieldName] = error;
		});

		return errors;
	}
}

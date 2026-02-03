import { cn } from "@/lib/utils";

interface RadioGroupProps {
	name: string;
	label: string;
	options: Array<{
		value: string;
		label: string;
	}>;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	showError: boolean;
	error: string;
}

export default function RadioGroup({
	name,
	label,
	options,
	value: selectedValue,
	onChange,
	onBlur,
	showError,
	error,
}: RadioGroupProps) {
	const legendClasses = cn(
		"text-[12px] font-bold -tracking-[0.21px] text-black mb-[17px]",
		{
			"text-input-outline-error-color": showError && error && !selectedValue,
		}
	);
	const radioButtonContainerClasses = cn(
		"flex items-center outline-input-outline-color outline-1 rounded-lg h-14 px-4 has-checked:outline-audiophile-orange gap-x-4 focus:has-checked:outline-audiophile-orange focus:has-checked:outline-1 hover:cursor-pointer",
		{
			"outline-input-outline-error-color outline-2":
				showError && error && !selectedValue,
		}
	);
	const radioButtonInputClasses = cn(
		"box-content h-2.5 w-2.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-input-outline-color outline-none checked:bg-audiophile-orange"
	);
	const errorClasses = cn(
		"text-[12px] -tracking-[0.21px] text-input-outline-error-color font-medium"
	);

	return (
		<div className="flex flex-col gap-y-2.5">
			<fieldset>
				<legend className={legendClasses}>{label}</legend>
				<div className="flex flex-col gap-y-4">
					{options.map(({ value, label }) => (
						<label className={radioButtonContainerClasses} key={value}>
							<input
								className={radioButtonInputClasses}
								type="radio"
								value={value}
								name={name}
								checked={value === selectedValue}
								onChange={onChange}
								onBlur={onBlur}
							/>
							<span className="text-[14px] font-bold -tracking-[0.25px]">
								{label}
							</span>
						</label>
					))}
				</div>
			</fieldset>
			{showError && error && !selectedValue && (
				<span className={errorClasses}>{error}</span>
			)}
		</div>
	);
}

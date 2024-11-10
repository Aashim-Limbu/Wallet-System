"use client"
export const Select = <T extends { [key: string]: string }>({
	options,
	label,
	name,
	keyField,
	valueField,
}: {
	name: string;
	label: string;
	options: T[];
	keyField: keyof T;
	valueField: keyof T;
}) => {
	return (
		<>
			<label
				htmlFor={name}
				className="block text-sm leading-6 font-semibold text-gray-900"
			>
				{label}
			</label>
			<select
				id={name}
				name={name}
				className="mt-2 tracking-tighter text-zinc-600 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			>
				<option value="" disabled>
					---Please Select your Bank---
				</option>
				{options.map((item) => (
					<option key={item[keyField]} value={item[valueField]}>
						{item[keyField]}
					</option>
				))}
			</select>
		</>
	);
};

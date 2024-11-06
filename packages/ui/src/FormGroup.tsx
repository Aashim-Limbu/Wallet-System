import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
type GroupType = {
	label?: string;
	type: "email" | "password" | "text";
	error?: string;
	name: string;
	placeholder?: string;
};
function FormGroup({ label, type, error, name, placeholder }: GroupType) {
	return (
		<div>
			<label
				htmlFor={name}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{label}
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<input
					id={name}
					name={name}
					type={type}
					placeholder={placeholder}
					aria-invalid={error ? "true" : "false"}
					aria-describedby={`${error}-error`}
					className={`block w-full rounded-md border-0 py-1.5 sm:text-sm sm:leading-6 ${
						error
							? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 pr-10"
							: "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
					}`}
				/>
				{error && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<ExclamationCircleIcon
							aria-hidden="true"
							className="h-5 w-5 text-red-500"
						/>
					</div>
				)}
			</div>
			{error && (
				<p id="email-error" className="mt-2 text-sm text-red-600">
					{error}
				</p>
			)}
		</div>
	);
}

export default FormGroup;

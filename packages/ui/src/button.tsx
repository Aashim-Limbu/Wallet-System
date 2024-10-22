import { ButtonHTMLAttributes, ReactNode } from "react";
type ButtonTypes = "primary" | "secondary";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant: ButtonTypes;
	className: string;
}
function Button({ children, className, variant, ...props }: ButtonProps) {
	const styles = {
		primary: `bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
		secondary: `bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`,
	};
	return (
		<>
			<button
				type="button"
				{...props}
				className={`rounded-md  px-2.5 py-1.5 text-sm font-semibold  shadow-sm  ${styles[variant]} ${className}`}
			>
				{children}
			</button>
		</>
	);
}

export default Button;

import { ReactNode } from "react";

export default function TransferLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<div className="h-full w-full prose prose-base max-w-none ">
				<h1 className="text-indigo-600 m-0 tracking-tight" >Transfer</h1>
				<div>{children}</div>
			</div>
		</>
	);
}

import NavBar from "@repo/ui/nav-bar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="w-full bg-white shadow-md">
				<NavBar />
			</div>
			<div className="w-full flex-1">
				<div className="container mx-auto h-full">{children}</div>
			</div>
		</>
	);
}

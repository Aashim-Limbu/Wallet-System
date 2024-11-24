import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./redux-provicer";
import SessionProviders from "./session-provider";
import { Noto_Sans_Georgian } from "next/font/google";

export const georgian = Noto_Sans_Georgian({
	subsets: ["latin"],
	style: ["normal"],
	weight: ["100", "900"],
	variable: "--font-georgian",
});
const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

//prose prose-base max-w-none

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${georgian.variable} ${geistSans.variable} antialiased`}
			>
				<SessionProviders>
					<ReduxProvider>{children}</ReduxProvider>
				</SessionProviders>
			</body>
		</html>
	);
}

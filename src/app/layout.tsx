import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "CF Blog",
	description: "A blog running on Cloudflare Workers and D1",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<header className="border-b border-neutral-200 bg-white/80">
					<nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4">
						<Link href="/" className="font-semibold text-neutral-950 hover:underline">CF Blog</Link>
						<div className="flex items-center gap-4 text-sm text-neutral-600">
							<Link href="/" className="hover:text-neutral-950 hover:underline">首页</Link>
							<Link href="/admin" className="hover:text-neutral-950 hover:underline">后台</Link>
						</div>
					</nav>
				</header>
				{children}
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getSiteConfig } from "@/lib/site";

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
	const site = getSiteConfig()
	return (
		<html lang="zh-CN">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<header className="border-b border-neutral-200 bg-white/80">
					<nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4">
						<Link href="/" className="font-semibold text-neutral-950 hover:underline">{site.title}</Link>
						<div className="flex items-center gap-4 text-sm text-neutral-600">
							<Link href="/" className="hover:text-neutral-950 hover:underline">首页</Link>
							<Link href="/admin" className="hover:text-neutral-950 hover:underline">后台</Link>
						</div>
					</nav>
				</header>
				{children}
				<footer className="border-t border-neutral-200 bg-white/70">
					<div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
						<p>© 2026 - {site.author}. All rights reserved.</p>
						<p>Powered by <a className="font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-950" href="https://github.com/0031400/cf-blog" target="_blank" rel="noreferrer">CF-BLOG</a></p>
					</div>
				</footer>
			</body>
		</html>
	);
}

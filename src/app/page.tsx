import { getPublishedPosts } from "@/lib/posts";
import Link from "next/link";
export const dynamic = "force-dynamic"
export default async function Home() {
	const posts = await getPublishedPosts()
	return (
		<main className="mx-auto min-h-[calc(100vh-57px)] w-full max-w-3xl px-5 py-10">
			<header className="mb-10 border-b border-neutral-300 pb-6">
				<p className="mb-2 text-sm text-neutral-500">Cloudflare Workers Blog</p>
				<h1 className="text-4xl font-semibold tracking-normal text-neutral-900">CF BLOG</h1>
			</header>
			{posts.length === 0 ? (<p className="rounded border border-neutral-100 bg-white text-neutral-600">暂无文章</p>) : (
				<ul className="space-y-4">
					{posts.map((post) => (
						<li key={post.id} className="border-b border-neutral-200 pb-5">
							<Link className="text-xl font-semibold text-neutral-950 hover:underline" href={`/posts/${post.slug}`}>{post.title}</Link>
							<p className="mt-2 leading-7 text-neutral-600">{post.excerpt}</p>
							{post.published_at ? <time className="mt-3 block text-sm text-neutral-500">{post.published_at}</time> : null}
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
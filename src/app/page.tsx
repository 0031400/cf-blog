import { getPublishedPosts } from "@/lib/posts";
import { getSiteConfig } from "@/lib/site";
import Link from "next/link";
type PageProps = {
	searchParams: Promise<{ page?: string }>
}
export default async function Home({ searchParams }: PageProps) {
	const params = await searchParams
	const page = Number(params.page || '1')
	const result = await getPublishedPosts(page, 10)
	const posts = result.items
	const site = getSiteConfig()
	return (
		<main className="mx-auto min-h-[calc(100vh-57px)] w-full max-w-3xl px-5 py-10">
			<header className="mb-10 border-b border-neutral-300 pb-6">
				<p className="mb-2 text-sm text-neutral-500">{site.subtitle}</p>
				<h1 className="text-4xl font-semibold tracking-normal text-neutral-900">{site.title}</h1>
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
			{
				result.totalPages > 1 ? (
					<nav className="mt-4 flex items-center justify-between text-sm text-neutral-600">
						{result.page > 1 ? (<Link className="hover:text-neutral-950 hover:underline" href={`/?page=${result.page - 1}`}>上一页</Link>) : <span></span>}
						<span>第 {result.page} / {result.totalPages} 页</span>
						{result.page < result.totalPages ? (<Link className="hover:text-neutral-950 hover:underline" href={`/?page=${result.page + 1}`}>下一页</Link>) : <span></span>}
					</nav>
				) : null
			}
		</main>
	);
}
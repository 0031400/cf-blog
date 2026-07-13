import { getPublishedPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
	const posts = await getPublishedPosts()
	return (
		<main>
			<h1>CF BLOG</h1>
			{posts.length === 0 ? (<p>暂无文章</p>) : (
				<ul>
					{posts.map((post) => (
						<li key={post.id}>
							<Link href={`/posts/${post.slug}`}>{post.title}</Link>
							<p>{post.excerpt}</p>
							{post.published_at ? <time>{post.published_at}</time> : null}
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
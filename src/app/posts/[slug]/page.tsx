import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"

type PageProps = {
    params: Promise<{ slug: string }>
}
export default async function PostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) {
        notFound()
    }
    return (
        <main>
            <article>
                <h1>{post.title}</h1>
                {post.published_at ? <time>{post.published_at}</time> : null}
                <p>{post.excerpt}</p>
                <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
            </article>
        </main>
    )
}
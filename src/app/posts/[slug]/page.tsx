import { MarkdownContent } from "@/components/MarkdownContent"
import { getPostBySlug } from "@/lib/posts"
import Link from "next/link"
import { notFound } from "next/navigation"

type PageProps = {
    params: Promise<{ slug: string }>
}
export const dynamic = "force-dynamic"
export default async function PostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) {
        notFound()
    }
    return (
        <main className="mx-auto min-h-[calc(100vh-57px)] w-full max-w-3xl px-5 py-10">
            <article>
                <Link href="/" className="mb-8 inline-block text-sm text-neutral-500 hover:text-neutral-950">返回首页</Link>
                <header className="mb-8 border-b border-neutral-300 pb-6">
                    <h1 className="text-4xl font-semibold tracking-normal text-neutral-950">{post.title}</h1>
                    {post.published_at ? <time className="mt-4 block text-sm text-neutral-500">{post.published_at}</time> : null}
                    <p className="mt-5 text-lg leading-8 text-neutral-600">{post.excerpt}</p>
                </header>
                <MarkdownContent content={post.content}></MarkdownContent>
            </article>
        </main>
    )
}
import { isAdmin } from "@/lib/admin";
import { getAdminPostById } from "@/lib/posts";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type PageProps = {
    params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic"
export default async function AdminPostPage({ params }: PageProps) {
    if (!(await isAdmin())) {
        redirect('/admin')
    }
    const { id } = await params
    const post = await getAdminPostById(Number(id))
    if (!post) {
        notFound()
    }
    return (
        <main className="mx-auto min-h-[calc(100vh-57px)] w-full max-w-4xl px-5 py-8">
            <header className="mb-8 border-b border-neutral-300 pb-5">
                <div className="mb-4 flex gap-4 text-neutral-500 text-sm">
                    <Link className="hover:text-neutral-950 hover:underline" href="/admin">返回后台</Link>
                    {post.status === 'published' ? (<Link className="hover:text-neutral-950 hover:underline" href={`/posts/${post.slug}`}>查看文章</Link>) : null}
                </div>
                <h1 className="text-3xl font-semibold text-neutral-950">编辑文章</h1>
            </header>
            <form action={`/api/admin/posts/${post.id}`} method="post" className="grid gap-4 rounded border border-neutral-300 bg-white p-5">
                <input className="rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" type="text" name="title" defaultValue={post.title} required />
                <input className="rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" type="text" name="slug" defaultValue={post.slug} required />
                <textarea className="min-h-24 rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" name="excerpt" defaultValue={post.excerpt} />
                <textarea className="min-h-96 rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" name="content" defaultValue={post.content} required />
                <div className="flex flex-wrap gap-3">
                    <button className="rounded border border-neutral-300 bg-white px-4 py-2 hover:border-neutral-950" name="action" value="draft" type="submit">保存草稿</button>
                    <button className="rounded bg-neutral-950 px-4 py-2 text-white" name="action" value="publish" type="submit">发布</button>
                    <button className="rounded border border-red-300 bg-white px-4 py-2 hover:border-red-600 text-red-600" name="action" value="delete" type="submit">删除</button>
                </div>
            </form>
        </main>
    )
}
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton"
import { isAdmin } from "@/lib/admin"
import { getAdminPosts } from "@/lib/posts"
import Link from "next/link"

type PageProps = {
    searchParams: Promise<{ error?: string, page?: string }>
}
export const dynamic = "force-dynamic"
export default async function AdminPage({ searchParams }: PageProps) {
    const admin = await isAdmin()
    const params = await searchParams
    if (!admin) {
        return (
            <main className="mx-auto min-h-[calc(100vh-57px)] w-full flex max-w-md items-center px-5 py-10">
                <section className="w-full rounded border border-neutral-300 bg-white p-6">
                    <h1 className="text-2xl font-semibold text-neutral-500">后台登录</h1>
                    {params.error ? <p className="mt-3 text-sm text-red-600">密钥不正确</p> : null}
                    <form action="/api/admin/login" method="post" className="mt-6 space-y-6">
                        <input className="w-full rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" type="password" name="token" placeholder="ADMIN_TOKEN" required />
                        <button className="w-full rounded bg-neutral-950 px-4 py-2 text-white" type="submit">登录</button>
                    </form>
                </section>
            </main>
        )
    }
    const page = Number(params.page || '1')
    const result = await getAdminPosts(page, 10)
    const posts = result.items
    return (
        <main className="mx-auto min-h-[calc(100vh-57px)] w-full max-w-5xl px-5 py-8">
            <header className="mb-8 flex items-center justify-between border-b border-neutral-300 pb-5">
                <div>
                    <p className="text-sm text-neutral-500">Admin</p>
                    <h1 className="text-3xl font-semibold text-neutral-950">文章后台</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link className="rounded border border-neutral-300 bg-white px-4 py-2 text-sm hover:border-neutral-950" href="/">查看首页</Link>
                    <form action="/api/admin/logout" method="post">
                        <button className="rounded border border-neutral-300 bg-white px-4 py-2 text-sm hover:border-neutral-950" type="submit">退出</button>
                    </form>
                </div>
            </header>
            <section className="mb-10 rounded border border-neutral-300 bg-white p-5">
                <h2 className="mb-5 text-xl font-semibold text-neutral-950">新建文章</h2>
                <form className="grid gap-4" action="/api/admin/posts" method="post">
                    <input className="rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" name="title" placeholder="标题" required />
                    <input className="rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" name="slug" placeholder="slug" required />
                    <textarea className="min-h-24 rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" name="excerpt" placeholder="摘要"></textarea>
                    <textarea className="min-h-56 rounded border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950" name="content" placeholder="正文" required></textarea>
                    <div className="flex gap-3">
                        <ConfirmSubmitButton className="rounded border border-neutral-300 bg-white px-4 py-2 hover:border-neutral-950" name="status" value="draft" title="保存为草稿" description="确定要把这篇新文章保存为草稿吗">保存草稿</ConfirmSubmitButton>
                        <ConfirmSubmitButton className="rounded bg-neutral-950 px-4 py-2 text-white" name="status" value="published" title="发布文章" description="发布后读者可以在前台看到它">发布</ConfirmSubmitButton>
                    </div>
                </form>
            </section>
            <section>
                <h2 className="mb-4 text-xl font-semibold text-neutral-950">文章列表</h2>
                <ul className="divide-y divide-neutral-200 rounded border border-neutral-300 bg-white">
                    {posts.map((post) => (
                        <li key={post.id} className="flex items-center justify-between gap-4 px-4 py-3">
                            <div className="min-w-0">
                                <Link className="block truncate font-medium text-neutral-950 hover:underline" href={`/admin/posts/${post.id}`} >{post.title}</Link>
                                <span className="text-sm text-neutral-500">{post.status}</span>
                            </div>
                            {post.status === 'published' ? (<Link className="shrink-0 text-sm text-neutral-500 hover:text-neutral-950" href={`/posts/${post.slug}`}>查看</Link>) : null}
                        </li>
                    ))}
                </ul>
                {
                    result.totalPages > 1 ? (
                        <nav className="mt-4 flex items-center justify-between text-sm text-neutral-600">
                            {result.page > 1 ? (<Link className="hover:text-neutral-950 hover:underline" href={`/admin?page=${result.page - 1}`}>上一页</Link>) : <span></span>}
                            <span>第 {result.page} / {result.totalPages} 页</span>
                            {result.page < result.totalPages ? (<Link className="hover:text-neutral-950 hover:underline" href={`/admin?page=${result.page + 1}`}>下一页</Link>) : <span></span>}
                        </nav>
                    ) : null
                }
            </section>
        </main>
    )
}
import { isAdmin } from "@/lib/admin"
import { getAdminPosts } from "@/lib/posts"
import Link from "next/link"

type PageProps = {
    searchParams: Promise<{ error?: string }>
}
export default async function AdminPage({ searchParams }: PageProps) {
    const admin = await isAdmin()
    const params = await searchParams
    if (!admin) {
        return (
            <main>
                <h1>后台登录</h1>
                {params.error ? <p>密钥不正确</p> : null}
                <form action="/api/admin/login" method="post">
                    <input type="password" name="token" placeholder="ADMIN_TOKEN" required />
                    <button type="submit">登录</button>
                </form>
            </main>
        )
    }
    const posts = await getAdminPosts()
    return (
        <main>
            <header>
                <h1>文章后台</h1>
                <form action="/api/admin/logout" method="post">
                    <button type="submit">退出</button>
                </form>
            </header>
            <section>
                <h2>新建文章</h2>
                <form action="/api/admin/posts" method="post">
                    <input name="title" placeholder="标题" required />
                    <input name="slug" placeholder="slug" required />
                    <textarea name="excerpt" placeholder="摘要"></textarea>
                    <textarea name="content" placeholder="正文" required></textarea>
                    <button name="status" value="draft" type="submit" >保存草稿</button>
                    <button name="status" value="published" type="submit" >发布</button>
                </form>
            </section>
            <section>
                <h2>文章列表</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link href={`/admin/posts/${post.id}`} >{post.title}</Link>
                            <span> / {post.status}</span>
                            {post.status === 'published' ? (<Link href={`/posts/${post.slug}`}> / 查看</Link>) : null}
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}
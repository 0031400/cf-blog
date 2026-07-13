import { isAdmin } from "@/lib/admin";
import { getAdminPostById } from "@/lib/posts";
import { notFound, redirect } from "next/navigation";

type PageProps = {
    params: Promise<{ id: string }>;
}
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
        <main>
            <h1>编辑文章</h1>
            <form action={`/api/admin/posts/${post.id}`} method="post">
                <input type="text" name="title" defaultValue={post.title} required />
                <input type="text" name="slug" defaultValue={post.slug} required />
                <textarea name="excerpt" defaultValue={post.excerpt} />
                <textarea name="content" defaultValue={post.content} required />
                <button name="action" value="draft" type="submit">保存草稿</button>
                <button name="action" value="publish" type="submit">发布</button>
                <button name="action" value="delete" type="submit">删除</button>
            </form>
        </main>
    )
}
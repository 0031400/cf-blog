import { isAdmin } from "@/lib/admin"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import { NextResponse } from "next/server"

type RouteContext = {
    params: Promise<{ id: string }>
}
export async function POST(request: Request, context: RouteContext) {
    if (!(await isAdmin())) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    const { id } = await context.params
    const postId = Number(id)
    if (!Number.isInteger(postId) || postId <= 0) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    const formData = await request.formData()
    const action = String(formData.get('action') || '')
    const db = getCloudflareContext().env.DB
    if (action === 'delete') {
        await db.prepare('DELETE FROM posts WHERE id = ?').bind(postId).run()
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    const title = String(formData.get('title') || '').trim()
    const slug = String(formData.get('slug') || '').trim()
    const excerpt = String(formData.get('excerpt') || '').trim()
    const content = String(formData.get('content') || '').trim()
    const status = action === 'publish' ? 'published' : 'draft'
    const now = new Date().toISOString()
    if (!title || !slug || !content) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    await db.prepare(
        `
        UPDATE posts
        SET slug = ?,
        title = ?,
        excerpt = ?,
        content = ?,
        status = ?,
        updated_at = ?,
        published_at = CASE
        WHEN ? = 'published' AND published_at IS NULL THEN ? 
        WHEN ? = 'published' THEN published_at
        ELSE NULL
        END
        WHERE id = ? 
        `
    ).bind(slug, title, excerpt, content, status, now, status, now, status, postId).run()
    return NextResponse.redirect(new URL(`/admin/posts/${postId}`, request.url))
}
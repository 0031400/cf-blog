import { isAdmin } from "@/lib/admin";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    const formData = await request.formData()
    const title = String(formData.get('title') || '').trim()
    const slug = String(formData.get('slug') || '').trim()
    const excerpt = String(formData.get('excerpt') || '').trim()
    const content = String(formData.get('content') || '').trim()
    const status = String(formData.get('status')) === 'published' ? 'published' : 'draft'
    if (!title || !slug || !content) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    const db = getCloudflareContext().env.DB
    const now = new Date().toISOString()
    const result = await db.prepare(
        `
        INSERT INTO posts (
            slug,title,excerpt,content,status,created_at,updated_at,published_at
        ) VALUES (?,?,?,?,?,?,?,?)
        `
    ).bind(slug, title, excerpt, content, status, now, now, status === 'published' ? now : null).run()
    const postId = Number(result.meta.last_row_id)
    return NextResponse.redirect(new URL(`/admin/posts/${postId}`, request.url))
}
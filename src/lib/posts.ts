import { getCloudflareContext } from '@opennextjs/cloudflare'
export type PostListItem = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    cover_image: string | null;
    published_at: string | null;
}
export type PostDetail = PostListItem & {
    content: string;
    created_at: string;
    updated_at: string;
}
export type AdminPost = PostDetail & {
    status: "draft" | "published"
}
function getDB() {
    return getCloudflareContext().env.DB
}
export async function getPublishedPosts() {
    const db = getDB()
    const result = await db.prepare(
        `
        SELECT id,slug,title,excerpt,cover_image,published_at
        FROM posts
        WHERE status = 'published'
        ORDER BY published_at DESC,id DESC
        LIMIT 20
        `
    ).all<PostListItem>()
    return result.results
}
export async function getPostBySlug(slug: string) {
    const db = getDB()
    return db.prepare(
        `
        SELECT id,slug,title,excerpt,content,cover_image,created_at,updated_at,published_at
        FROM posts
        WHERE slug = ? AND status = 'published'
        LIMIT 1
        `
    ).bind(slug)
        .first<PostDetail>()
}
export async function getAdminPosts() {
    const db = getDB()
    const result = await db.prepare(
        `
        SELECT id,slug,title,excerpt,content,cover_image,status,created_at,updated_at,published_at
        FROM posts
        ORDER BY updated_at DESC,id DESC
        LIMIT 100
        `
    ).all<AdminPost>()
    return result.results
}
export async function getAdminPostById(id:number) {
    const db = getDB()
    return db.prepare(
        `
        SELECT id,slug,title,excerpt,content,cover_image,status,created_at,updated_at,published_at
        FROM posts
        WHERE id = ?
        LIMIT 1
        `
    ).bind(id)
        .first<AdminPost>()
}
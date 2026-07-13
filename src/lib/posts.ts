import { getCloudflareContext } from '@opennextjs/cloudflare'
export type PaginateResult<T> = {
    items: T[]
    page: number
    pageSize: number
    total: number
    totalPages: number
}
function normalizePage(page: number) {
    if (!Number.isInteger(page) || page < 1) {
        return 1
    }
    return page
}
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
export async function getPublishedPosts(page = 1, pageSize = 10): Promise<PaginateResult<PostListItem>> {
    const db = getDB()
    const safePage = normalizePage(page)
    const offset = (safePage - 1) * pageSize
    const count = await db.prepare(
        `
        SELECT COUNT(*) as total
        FROM posts
        WHERE status = 'published'
        `
    ).first<{ total: number }>()
    const result = await db.prepare(
        `
        SELECT id,slug,title,excerpt,cover_image,published_at
        FROM posts
        WHERE status = 'published'
        ORDER BY published_at DESC,id DESC
        LIMIT ? OFFSET ?
        `
    ).bind(pageSize, offset).all<PostListItem>()
    const total = count?.total ?? 0
    return {
        items: result.results
        , page: safePage
        , pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize))
    }
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
export async function getAdminPosts(page = 1, pageSize = 10) {
    const db = getDB()
    const safePage = normalizePage(page)
    const offset = (safePage - 1) * pageSize
    const count = await db.prepare(
        `
        SELECT COUNT(*) as total
        FROM posts
        `
    ).first<{ total: number }>()
    const result = await db.prepare(
        `
        SELECT id,slug,title,excerpt,content,cover_image,status,created_at,updated_at,published_at
        FROM posts
        ORDER BY updated_at DESC,id DESC
        LIMIT ? OFFSET ?
        `
    ).bind(pageSize, offset).all<AdminPost>()
    const total = count?.total ?? 0
    return {
        items: result.results
        , page: safePage
        , pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize))
    }
}
export async function getAdminPostById(id: number) {
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
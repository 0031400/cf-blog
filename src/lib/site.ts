export function getSiteConfig() {
    const title = process.env.BLOG_TITLE?.trim()
    const subtitle = process.env.BLOG_SUBTITLE?.trim()
    const author = process.env.BLOG_AUTHOR?.trim()
    return {
        title: title || "CF BLOG",
        subtitle: subtitle || "Cloudflare Workers Blog",
        author: author || "admin"
    }
}
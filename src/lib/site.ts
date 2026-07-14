import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getSiteConfig() {
    const env = getCloudflareContext().env
    return {
        title: env.BLOG_TITLE || "CF BLOG",
        subtitle: env.BLOG_SUBTITLE || "Cloudflare Workers Blog",
        author: env.BLOG_AUTHOR || "admin"
    }
}
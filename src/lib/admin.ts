import { getCloudflareContext } from "@opennextjs/cloudflare"
import { cookies } from "next/headers"

export const ADMIN_COOKIE = "cf_blog_admin"
export function getAdminToken() {
    return getCloudflareContext().env.ADMIN_TOKEN?.trim() || "123456"
}
export async function isAdmin() {
    const token = getAdminToken()
    if (!token) {
        return false
    }
    const cookieStore = await cookies()
    return cookieStore.get(ADMIN_COOKIE)?.value === token
}
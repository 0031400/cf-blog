import { ADMIN_COOKIE, getAdminToken } from "@/lib/admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const formData = await request.formData()
    const token = String(formData.get("token") || "")
    const adminToken = getAdminToken()
    if (!adminToken || token !== adminToken) {
        return NextResponse.redirect(new URL("/admin?error=1", request.url))
    }
    const response = NextResponse.redirect(new URL("/admin", request.url))
    response.cookies.set(ADMIN_COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 })
    return response
}
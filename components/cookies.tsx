"use server"
import { cookies } from "next/headers"

export async function like(id: string) {
    var cookieStore = cookies()
    var favorited = cookieStore.get("favorited")?.value ?? ""

    if (!favorited.includes(id)) {
        favorited = id + "," + favorited
    } else {
        favorited = favorited.replace(id + ",", "")
    }
    cookieStore.set("favorited", favorited, { expires: 2147483647 })
}
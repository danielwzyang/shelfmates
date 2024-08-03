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
    cookieStore.set("favorited", favorited, { maxAge: 34560000 })
}

export async function getFavorited() {
    var cookieStore = cookies()
    var favorited = cookieStore.get("favorited")?.value ?? ""
    return favorited
}
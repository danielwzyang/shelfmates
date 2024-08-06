"use client"

import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }
import { useEffect, useState } from "react"
import Dropdown from "@/components/dropdown"
import { useCookies } from "next-client-cookies"

export default function App() {
    var cookies = useCookies()
    var favorited = cookies.get("favorited")?.split(",").filter((e) => { return e != "" }) ?? []

    const [sortBy, changeSort] = useState("Recency")
    const [productList, changeList] = useState(favorited.map((e, i) => {
        return <Product id={e as keyof typeof products} key={i} />
    }))

    useEffect(() => {
        changeList(favorited.sort(sortProducts).map((e, i) => {
            return <Product id={e as keyof typeof products} key={i} />
        }))
    }, [sortBy])

    function sortProducts(a: string, b: string) {
        switch (sortBy) {
            case "Recency":
                return 0
            case "Price (Low)":
                if (products[a as keyof typeof products]["price"] < products[b as keyof typeof products]["price"]) {
                    return -1
                }
                if (products[a as keyof typeof products]["price"] > products[b as keyof typeof products]["price"]) {
                    return 1
                }
                return 0
            case "Price (High)":
                if (products[a as keyof typeof products]["price"] < products[b as keyof typeof products]["price"]) {
                    return 1
                }
                if (products[a as keyof typeof products]["price"] > products[b as keyof typeof products]["price"]) {
                    return -1
                }
                return 0
            case "Rating":
                if (products[a as keyof typeof products]["rating"] < products[b as keyof typeof products]["rating"]) {
                    return 1
                }
                if (products[a as keyof typeof products]["rating"] > products[b as keyof typeof products]["rating"]) {
                    return -1
                }
                if (products[a as keyof typeof products]["reviews"] < products[b as keyof typeof products]["reviews"]) {
                    return 1
                }
                if (products[a as keyof typeof products]["reviews"] > products[b as keyof typeof products]["reviews"]) {
                    return -1
                }
                return 0
            case "# of Reviews":
                if (products[a as keyof typeof products]["reviews"] < products[b as keyof typeof products]["reviews"]) {
                    return 1
                }
                if (products[a as keyof typeof products]["reviews"] > products[b as keyof typeof products]["reviews"]) {
                    return -1
                }
                return 0
        }
        return 0
    }

    return (
        <div>
            <Navbar page="favorited" />
            <div className="w-full flex justify-center mt-[10px]">
                <Dropdown header="Sort by:" list={["Recency", "Price (Low)", "Price (High)", "Rating", "# of Reviews"]} state={sortBy} func={changeSort} />
            </div>
            <div className="flex justify-center pb-[40px] min-h-full">
                {
                    productList.length > 0 ?
                        (
                            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                                {productList}
                            </div>
                        )
                        : <h1 className="text-2xl w-fit mb-2 absolute top-[50%]">You have no favorites!</h1>
                }
            </div>
        </div>
    )
}
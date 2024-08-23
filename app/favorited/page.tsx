"use client"

import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }
import { useEffect, useState } from "react"
import Dropdown from "@/components/dropdown"
import { useCookies } from "next-client-cookies"
import PriceFilter from "@/components/pricefilter"
import tags from "../../tags.json"
import Tag from "@/components/tag"

export default function App() {
    var cookies = useCookies()
    var favorited = cookies.get("favorited")?.split(",").filter((e) => { return e != "" }) ?? []

    const [sortBy, changeSort] = useState("Recency")
    const [productList, changeList] = useState(favorited.map((e, i) => {
        return <Product id={e as keyof typeof products} key={i} />
    }))
    const [priceFilter, changePriceFilter] = useState<number[]>([10, 20])
    const [tagFilter, changeTagFilter] = useState<string[]>([])

    useEffect(() => {
        changeList(favorited.sort(sortProducts).filter((e) => {
            var price = products[e as keyof typeof products]["price"]
            return priceFilter[0] <= price && price <= priceFilter[1]
        }).filter((e) => {
            var ret = true
            tagFilter.forEach((tag) => {
                if (!products[e as keyof typeof products]["tags"].includes(tag)) {
                    ret = false
                }
            })
            return ret
        }).map((e, i) => {
            return <Product id={e as keyof typeof products} key={i} />
        }))
    }, [sortBy, priceFilter, tagFilter])

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

    function toggleTag(name: string) {
        var tagFilterCopy = [...tagFilter]
        if (!tagFilter.includes(name)) {
            tagFilterCopy.push(name)
        } else {
            tagFilterCopy.splice(tagFilter.indexOf(name), 1)
        }
        changeTagFilter(tagFilterCopy)
    }

    return (
        <div className="min-h-screen">
            <Navbar page="favorited" />
            {
                favorited.length > 0 ?
                    <div className="mt-[10px] flex-col w-fit m-auto">
                        <div className="flex gap-[10px] ">
                            <Dropdown header="Sort by:" list={["Amazon ID", "Price (Low)", "Price (High)", "Rating", "# of Reviews"]} state={sortBy} func={changeSort} />
                            <PriceFilter priceFilter={priceFilter} changePriceFilter={changePriceFilter} />
                        </div>
                        <div className="mt-[5px] gap-[5px] flex w-fit max-w-[90vw] m-auto">
                            {
                                tags.map((e, i) => {
                                    return <Tag name={e} key={i} toggleTag={toggleTag} />
                                })
                            }
                        </div>
                    </div>
                    :
                    <div></div>
            }
            <div className="flex justify-center mx-auto">
                {
                    favorited.length > 0 ?
                        productList.length > 0 ? <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {productList}
                        </div>
                            :
                            <h1 className="text-2xl w-fit absolute top-[50%]">No results found.</h1>
                        :
                        <h1 className="text-2xl w-fit absolute top-[50%]">You have no favorites!</h1>
                }
            </div>
        </div>
    )
}
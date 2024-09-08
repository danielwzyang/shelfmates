"use client"

import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }
import { useEffect, useState } from "react"
import { useCookies } from "next-client-cookies"
import Parameters from "@/components/parameters"
import sortProducts from "@/components/sortproducts"

export default function App() {
    var cookies = useCookies()
    var favorited = cookies.get("favorited")?.split(",").filter((e) => { return e != "" }) ?? []

    const [sortBy, changeSort] = useState("Recency")
    const [productList, changeList] = useState(favorited.map((e, i) => {
        return <Product id={e as keyof typeof products} key={i} />
    }))
    const [priceFilter, changePriceFilter] = useState<number[]>([5, 25])
    const [tagFilter, changeTagFilter] = useState<string[]>([])

    useEffect(() => {
        changeList(favorited.sort((a, b) => sortProducts(sortBy, a, b)).filter((e) => {
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
                    <Parameters dropdownSelections={["Recency", "Price (Low)", "Price (High)", "Rating", "# of Reviews"]}
                    sortBy={sortBy} changeSort={changeSort} priceFilter={priceFilter} changePriceFilter={changePriceFilter} toggleTag={toggleTag}/>
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
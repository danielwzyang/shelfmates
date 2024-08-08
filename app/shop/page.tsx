"use client"

import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }
import { useEffect, useState } from "react"
import Dropdown from "@/components/dropdown"
import PriceFilter from "@/components/pricefilter"

export default function App() {
    const [sortBy, changeSort] = useState("Amazon ID")
    const [productList, changeList] = useState([...Object.keys(products)].sort(sortProducts).map((e, i) => {
        return <Product id={e as keyof typeof products} key={i} />
    }))
    const [priceFilter, changePriceFilter] = useState<number[]>([5, 25])

    useEffect(() => {
        changeList([...Object.keys(products)].sort(sortProducts).filter((e) => {
            var price = products[e as keyof typeof products]["price"]
            return priceFilter[0] <= price && price <= priceFilter[1]
        }).map((e, i) => {
            return <Product id={e as keyof typeof products} key={i} />
        }))
    }, [sortBy, priceFilter])

    function sortProducts(a: string, b: string) {
        switch (sortBy) {
            case "Amazon ID":
                if (a < b) {
                    return -1
                }
                if (a > b) {
                    return 1
                }
                return 0
            case "Rating":
                if (products[a as keyof typeof products]["rating"] < products[b as keyof typeof products]["rating"]) {
                    return 1
                }
                if (products[a as keyof typeof products]["rating"] > products[b as keyof typeof products]["rating"]) {
                    return -1
                }
                // sorts by review if the rating is the same
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
        }
        return 0
    }

    return (
        <div className="h-screen">
            <Navbar page="shop" />
            <div className="mt-[10px] flex w-fit gap-[10px] m-auto">
                <Dropdown header="Sort by:" list={["Amazon ID", "Price (Low)", "Price (High)", "Rating", "# of Reviews"]} state={sortBy} func={changeSort} />
                <PriceFilter priceFilter={priceFilter} changePriceFilter={changePriceFilter} />
            </div>
            <div className="flex justify-center mx-auto">
                {
                    productList.length > 0 ?
                        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {productList}
                        </div>
                        :
                        <h1 className="text-2xl w-fit absolute top-[50%] whitespace-pre-line">No results found.</h1>
                }
            </div>
        </div>
    )
}
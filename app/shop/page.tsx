"use client"

import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }
import { useEffect, useState } from "react"
import { getFavorited } from "@/components/cookies"
import Dropdown from "@/components/dropdown"

export default function App() {
    const [favorites, updateFavorites] = useState<string[]>([])
    const [sortBy, changeSort] = useState("Amazon ID")

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
                return 0
            case "# of Reviews":
                if (products[a as keyof typeof products]["reviews"] < products[b as keyof typeof products]["reviews"]) {
                    return 1
                }
                if (products[a as keyof typeof products]["reviews"] > products[b as keyof typeof products]["reviews"]) {
                    return -1
                }
                return 0
            case "Cheapest":
                if (products[a as keyof typeof products]["price"] < products[b as keyof typeof products]["price"]) {
                    return -1
                }
                if (products[a as keyof typeof products]["price"] > products[b as keyof typeof products]["price"]) {
                    return 1
                }
                return 0
            case "Most Expensive":
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

    var productList = Object.keys(products).sort(sortProducts).map((e, i) => {
        return <Product id={e as keyof typeof products} key={i} startingValue={favorites.includes(String(e))} />
    })

    function update(favoriteProducts: string[]) {
        updateFavorites(favoriteProducts)
        productList = Object.keys(products).sort().map((e, i) => {
            return <Product id={e as keyof typeof products} key={i} startingValue={favoriteProducts.includes(String(e))} />
        })
    }

    useEffect(() => {
        const fetchFavorited = async () => {
            try {
                const favorited = await getFavorited()
                const favoriteProducts = favorited.split(",").filter((e) => e != "")
                update(favoriteProducts)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFavorited()
    }, [])



    return (
        <div>
            <Navbar page="shop" />
            <div className="w-full flex justify-center mt-[10px]">
                <Dropdown header="Sort by:" list={["Amazon ID", "Cheapest", "Most Expensive", "Rating", "# of Reviews"]} state={sortBy} func={changeSort} />
            </div>
            <div className="flex justify-center">
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {productList}
                </div>
            </div>
        </div>
    )
}
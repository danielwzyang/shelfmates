"use client"

import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }
import { useEffect, useState } from "react"
import { getFavorited } from "@/components/cookies"

export default function App() {
    const [favorites, updateFavorites] = useState<string[]>([])
    var productList = Object.keys(products).sort().map((e, i) => {
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
            <h1></h1>
            <div className="flex justify-center">
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {productList}
                </div>
            </div>
        </div>
    )
}
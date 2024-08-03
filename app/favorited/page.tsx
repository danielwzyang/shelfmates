"use client"

import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }
import { getFavorited } from "@/components/cookies"
import { useState, useEffect } from "react"

export default function App() {
    const [favorites, updateFavorites] = useState([])
    var productList = favorites.map((e, i) => {
        return <Product id={e as keyof typeof products} key={i} startingValue={favorites.includes(String(e))} />
    })

    function update(favoriteProducts) {
        updateFavorites(favoriteProducts)
        productList = favoriteProducts.map((e, i) => {
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
            <Navbar page="favorited" />
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
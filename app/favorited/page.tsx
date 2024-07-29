/** @jest-environment jsdom */
"use client"

import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }

export default function App() {
    var value = document.cookie.split("; ").find(row => row.startsWith('"likes"='))
    value = value ? value.split("=")[1] : ""

    var productList = value.split(",").filter((e) => e != "").map((e, i) => {
        return <Product id={e as keyof typeof products} key={i} />
    })

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
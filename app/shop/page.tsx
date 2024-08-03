import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }
import { cookies } from "next/headers"

export default function App() {
    var cookieStore = cookies()
    var favorited = cookieStore.get("favorited")?.value ?? ""
    
    var productList = Object.keys(products).sort().map((e, i) => {
        return <Product id={e as keyof typeof products} key={i} liked={favorited.includes(String(e))} />
    })

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
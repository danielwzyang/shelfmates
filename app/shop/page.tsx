import Navbar from "@/components/navbar"
import Product from "@/components/product"
import products from "../../products.json" with { type: "json" }

var productList = Object.keys(products).map((e, i) => {
    return <Product id={e as keyof typeof products} key={i} />
})

export default function App() {
    return (
        <div>
            <Navbar page="shop" />
            <div className="flex justify-center pb-[40px]">
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {productList}
                </div>
            </div>
        </div>
    )
}
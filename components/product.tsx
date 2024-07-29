import { KeyObjectType } from "crypto"
import products from "../products.json" with { type: "json" }

export interface Props {
    id: keyof typeof products
}

export default function Product (props: Props) {
    return (
        <a href={"https://amazon.com/dp/" + props.id} target="_blank" 
        className="mt-[20px] mx-[10px] 
        2xl:w-[250px] lg:w-[300px] md:w-[350px] sm:w-[600px]
        2xl:h-[300px] lg:h-[360px] md:h-[420px] sm:h-[720px]
        border border-[#e0e0e0] rounded-3xl flex justify-center">
            <img src={products[props.id]["image"]} alt={props.id} className="m-[10%] w-[60%] h-[60%] object-contain"/>
        </a>
    )
}
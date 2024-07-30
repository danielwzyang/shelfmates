"use client"

import React from "react"
import products from "../products.json" with { type: "json" }
import Rating from "./rating"
import { useCookies } from "next-client-cookies"

export interface productProps {
    id: keyof typeof products
}

export default function Product(props: productProps) {
    const cookies = useCookies()

    const [favorited, updateFavorites] = React.useState(() => {
        var cookie = cookies.get("favorited")
        if (cookie?.includes(String(props.id))) {
            return true
        }
        return false
    })


    function like() {
        var cookie = cookies.get("favorited")
        var value = cookie ? cookie : ""

        if (!favorited) {
            value += String(props.id) + ","
        } else {
            value = value.replace(String(props.id) + ",", "")
        }
        console.log(value)
        cookies.set("favorited", value)
        updateFavorites(!favorited)
    }

    return (
        <div className="mt-[20px] mx-[10px] 
        2xl:w-[250px] lg:w-[300px] md:w-[350px] sm:w-[400px] w-[350px]
        2xl:h-[300px] lg:h-[360px] md:h-[420px] sm:h-[480px] h-[420px]
        border border-[#e0e0e0] rounded-3xl flex-col justify-center bg-white">
            <div className="w-fit h-[8%] mt-[5%] ml-[5%]">
                <svg height="100%" viewBox="0 0 24 24" fill={!favorited ? "none" : "#ed82b2"} onClick={() => { like() }}>
                    <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <img src={products[props.id]["image"]} alt={props.id} className="mx-[20%] w-[60%] h-[60%] object-contain" />

            <div className="flex flex-col h-[15%] justify-center items-center text-sm font-bold">
                <h1>{"$" + String(products[props.id]["price"].toFixed(2))}</h1>
                <Rating id={props.id} />
            </div>

            <div className="relative w-full h-[13%]">

                <a href={"https://amazon.com/dp/" + props.id} target="_blank" className="absolute right-[5%] bottom-[30%] w-fit bg-[#e5e5e5] px-[3%] rounded-xl border font-bold lg:text-sm">
                    buy
                </a>
            </div>
        </div>
    )
}
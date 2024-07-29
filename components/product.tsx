/** @jest-environment jsdom */
"use client"

import React from "react"
import products from "../products.json" with { type: "json" }


export interface Props {
    id: keyof typeof products
}

export default function Product(props: Props) {
    const [liked, updateLikes] = React.useState(() => {
        if (typeof window !== undefined) {
            if (document.cookie == "") {
                return false
            } else {
                if (document.cookie.includes(String(props.id))) {
                    return true
                }
                return false
            }
        }
    })

    function like() {
        var value = document.cookie.split("; ").find(row => row.startsWith('"likes"='))
        value = value ? value.split("=")[1] : ""

        if (!liked) {
            value += String(props.id) + ","
        } else {
            value = value.replace(String(props.id) + ",", "")
        }
        console.log(value)
        document.cookie = `"likes"=${value}; path=/;`
        updateLikes(!liked)
    }

    return (
        <div className="mt-[20px] mx-[10px] 
        2xl:w-[250px] lg:w-[300px] md:w-[350px] sm:w-[400px] w-[350px]
        2xl:h-[300px] lg:h-[360px] md:h-[420px] sm:h-[480px] h-[420px]
        border border-[#e0e0e0] rounded-3xl flex-col justify-center bg-white">

            <img src={products[props.id]["image"]} alt={props.id} className="mt-[15%] mx-[20%] w-[60%] h-[60%] object-contain" />

            <div className="flex relative h-[25%]">
                <a href={"https://amazon.com/dp/" + props.id} target="_blank" className="absolute bottom-[10%] left-[7.5%] bg-[#e5e5e5] px-[5%] rounded-xl border">
                    buy
                </a>

                <svg width="30%" height="30%" viewBox="0 0 24 24" fill={!liked ? "none" : "#ed82b2"} className="absolute bottom-[10%] right-[-5%]" onClick={() => { like() }}>
                    <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}
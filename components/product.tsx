"use client"

import React from "react"
import products from "../products.json" with { type: "json" }
import Rating from "./rating"
import { useCookies } from "next-client-cookies"
import { useDoubleTap } from "use-double-tap"
import ReactCardFlip from "react-card-flip"

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



    const [isFlipped, flip] = React.useState(false)

    const bind = useDoubleTap(() => {
        like()
    })

    function like() {
        var cookie = cookies.get("favorited")
        var value = cookie ? cookie : ""

        if (!favorited) {
            if (!value.includes(String(props.id))) {
                value = String(props.id) + "," + value
            }
        } else {
            value = value.replace(String(props.id) + ",", "")
        }
        console.log(value)
        cookies.set("favorited", value, { expires: 2147483647 })
        updateFavorites(!favorited)
    }

    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <div {...bind} className="mt-[20px] mx-[10px] 
        2xl:w-[250px] lg:w-[300px] md:w-[350px] sm:w-[400px] w-[350px]
        2xl:h-[350px] lg:h-[420px] md:h-[504px] sm:h-[576px] h-[504px]
        border border-[#e0e0e0] rounded-3xl flex-col justify-center bg-white">
                <div className="w-full h-[8%] mt-[5%] ml-[5%] flex">
                    <svg height="100%" viewBox="0 0 24 24" fill={!favorited ? "none" : "#ed82b2"} onClick={() => { like() }}>
                        <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <button onClick={() => { flip(!isFlipped) }} className="absolute right-[10%] w-[7%] ">
                        <svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="12.71 0 193.84 219.27">
                            <path d="m110.57 28.285 19.418 19.418h-31.492c-47.301 0-85.783 38.482-85.783 85.783 0 47.302 38.483 85.783 85.783 85.783v-40c-25.245 0-45.783-20.539-45.783-45.783 0-25.245 20.538-45.783 45.783-45.783h31.492l-19.417 19.417 28.283 28.284 67.703-67.701-67.702-67.703-28.285 28.285z"></path>
                        </svg>
                    </button>
                </div>
                <img src={products[props.id]["image"]} alt={props.id} className="mx-[20%] w-[60%] h-[60%] object-contain" />

                <div className="flex flex-col h-[12%] my-[6%] justify-center items-center font-bold text-base lg:text-sm sm:text-lg">
                    <h1>{"$" + String(products[props.id]["price"].toFixed(2))}</h1>
                    <Rating id={props.id} />
                </div>

                <div className="relative w-full h-[8%]">

                    <a href={"https://amazon.com/dp/" + props.id} target="_blank" className="absolute right-[5%] bottom-[40%] w-fit bg-[#e5e5e5] px-[3%] rounded-xl border font-bold text-base lg:text-sm sm:text-lg">
                        buy
                    </a>
                </div>
            </div>


            <div {...bind} className="mt-[20px] mx-[10px] 
        2xl:w-[250px] lg:w-[300px] md:w-[350px] sm:w-[400px] w-[350px]
        2xl:h-[350px] lg:h-[420px] md:h-[504px] sm:h-[576px] h-[504px]
        border border-[#e0e0e0] rounded-3xl flex items-center justify-center bg-white">
                <button onClick={() => { flip(!isFlipped) }} className="mt-[5%] absolute right-[10%] top-[0%] w-[7%] scale-x-[-1]">
                    <svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="12.71 0 193.84 219.27">
                        <path d="m110.57 28.285 19.418 19.418h-31.492c-47.301 0-85.783 38.482-85.783 85.783 0 47.302 38.483 85.783 85.783 85.783v-40c-25.245 0-45.783-20.539-45.783-45.783 0-25.245 20.538-45.783 45.783-45.783h31.492l-19.417 19.417 28.283 28.284 67.703-67.701-67.702-67.703-28.285 28.285z"></path>
                    </svg>
                </button>
                <img src={products[props.id]["backimage"]} className="mx-[10%] h-fit w-[80%] object-contain border border-[2px] rounded-xl" />
            </div>
        </ReactCardFlip>
    )
}
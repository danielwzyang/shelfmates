"use client"

import React, { useState, useEffect } from "react"
import products from "../products.json" with { type: "json" }
import Rating from "./rating"
import { useDoubleTap } from "use-double-tap"
import ReactCardFlip from "react-card-flip"
import { useCookies } from "next-client-cookies"

export interface productProps {
    id: keyof typeof products,
}

export default function Product(props: productProps) {
    var cookies = useCookies()
    const [isFlipped, flip] = useState(false)
    const [liked, updateLike] = useState(cookies.get("favorited")?.includes(String(props.id)) ?? false)
    const [zoomed, zoom] = useState(false)

    function like(id: string) {
        updateLike(!liked)
        var value = cookies.get("favorited") ?? ""
        if (!liked && !value.includes(String(props.id))) {
            value = String(props.id) + "," + value
        } else {
            value = value.replace(String(props.id) + ",", "")
        }
        cookies.set("favorited", value, { expires: 365 })
    }

    const bind = useDoubleTap(() => {
        like(String(props.id))
    })

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped}>
                <div {...bind} className="my-[6px] mx-[7.5px] 
        2xl:w-[250px] lg:w-[300px] md:w-[350px] sm:w-[400px] w-[350px]
        2xl:h-[350px] lg:h-[420px] md:h-[504px] sm:h-[576px] h-[504px]
        border border-[#e0e0e0] rounded-3xl flex-col justify-center bg-white">
                    <div className="w-full h-[8%] mt-[5%] ml-[5%] flex">
                        <svg height="100%" viewBox="0 0 24 24" fill={!liked ? "none" : "#ed82b2"} onClick={() => { like(String(props.id)) }}>
                            <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <button onClick={() => { flip(!isFlipped) }} className="absolute right-[10%] w-[7%] ">
                            <svg version="1.1" viewBox="12.71 0 193.84 219.27" xmlns="http://www.w3.org/2000/svg">
                                <path d="m206.56 67.703h-199" fill="#ffcb00" strokeLinecap="round" strokeWidth="30" />
                                <path d="m124.29 14.94 53.347 53.347-53.346 53.346" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="30" />
                                <path d="m177.64 68.287h-70.932s-69.847-4.6378-72.67 68.286c0.51327 5.4294 0.48278 56.692 64.143 62.755" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="30" />
                            </svg>
                        </button>
                    </div>
                    <img onClick={() => { zoom(true) }} src={products[props.id]["image"]} alt={props.id + " cover image"}
                        className="cursor-zoom-in mx-[20%] w-[60%] h-[60%] object-contain" />

                    <div className="flex flex-col h-[12%] my-[6%] justify-center items-center font-bold text-base lg:text-sm sm:text-lg">
                        <h1>{"$" + String(products[props.id]["price"].toFixed(2))}</h1>
                        <Rating id={props.id} />
                    </div>

                    <div className="relative w-full h-[8%]">

                        <a href={"https://amazon.com/dp/" + props.id} target="_blank"
                            className="absolute right-[5%] bottom-[40%] w-fit bg-[#e5e5e5] px-[3%] rounded-xl border font-bold text-base lg:text-sm sm:text-lg">
                            buy
                        </a>
                    </div>
                </div>


                <div {...bind} className="my-[6px] mx-[7.5px] 
        2xl:w-[250px] lg:w-[300px] md:w-[350px] sm:w-[400px] w-[350px]
        2xl:h-[350px] lg:h-[420px] md:h-[504px] sm:h-[576px] h-[504px]
        border border-[#e0e0e0] rounded-3xl flex items-center justify-center bg-white">
                    <button onClick={() => { flip(!isFlipped) }} className="mt-[5%] absolute right-[10%] top-[0%] w-[7%] scale-x-[-1]">
                        <svg version="1.1" viewBox="12.71 0 193.84 219.27" xmlns="http://www.w3.org/2000/svg">
                            <path d="m206.56 67.703h-199" fill="#ffcb00" strokeLinecap="round" strokeWidth="30" />
                            <path d="m124.29 14.94 53.347 53.347-53.346 53.346" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="30" />
                            <path d="m177.64 68.287h-70.932s-69.847-4.6378-72.67 68.286c0.51327 5.4294 0.48278 56.692 64.143 62.755" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="30" />
                        </svg>
                    </button>
                    <h1 className="absolute bottom-[10%] font-bold text-base lg:text-sm sm:text-lg">{products[props.id]["dimensions"].join(" in x ") + " in"}</h1>
                    <img onClick={() => { zoom(true) }} src={products[props.id]["backimage"]} alt={props.id + " back image"}
                        className="cursor-zoom-in mx-[10%] w-[80%] object-contain border border-[2px] rounded-xl" />
                </div>
            </ReactCardFlip>


            <div className={"cursor-zoom-out fixed mx-auto left-0 right-0 top-0 flex flex-col justify-center items-center w-screen h-screen z-10 backdrop-blur-sm " + (zoomed ? "" : " hidden")}
                onClick={() => { zoom(false) }}>
                <div className="fixed w-full h-full bg-black opacity-[0.05]"></div>
                <img src={products[props.id][isFlipped ? "backimage" : "image"]} alt={props.id + (isFlipped ? " back image" : " image")}
                    className="w-[80%] h-[80%] object-contain z-10" />
            </div>
        </div>
    )
}
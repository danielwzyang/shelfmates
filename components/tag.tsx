import { select } from "@nextui-org/theme"
import { useState } from "react"



export interface tagProps {
    name: string,
    toggleTag: Function
}

export default function Tag(props: tagProps) {
    const [selected, changeSelected] = useState(false)

    return <div onClick={() => { props.toggleTag(props.name); changeSelected(!selected) }}
        className={"px-[1rem] py-[0.2rem] border rounded-xl" + (selected ? " bg-[#e6e6e6]" : " bg-white")}>
        <h1 className={"font text-base lg:text-sm sm:text-lg" + (selected ? " font-semibold" : "")}>{props.name}</h1>
    </div>
}
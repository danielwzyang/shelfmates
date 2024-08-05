import { useClickAway } from "@uidotdev/usehooks"
import { LegacyRef, useState } from "react"

export interface DropdownProps {
    header: string,
    list: string[],
    state: string,
    func: Function
}

export default function Dropdown(props: DropdownProps) {
    const [opened, setOpened] = useState(false)

    const ref = useClickAway<HTMLDivElement>(() => {
        setOpened(false)
    })

    function toggle() {
        setOpened(!opened)
    }

    return <div className="w-[8rem]" ref={ref}>
        <div onClick={toggle} className="flex justify-center items-center gap-[0.3rem] px-[0.5rem] py-[0.2rem] border rounded-lg bg-white hover:bg-[#e6e6e6] text-sm">
            <h1 className="font-semibold">
                {props.header}
            </h1>
            <svg className={"h-[1.25rem] scale-y-[" + (opened ? "-" : "") + "1]"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        <div className={"border rounded-lg bg-white absolute flex flex-col z-10" + (opened ? "" : " hidden")} >
            {
                props.list.map((e, i) => {
                    return <h1 className={"rounded-lg text-sm hover:bg-[#e6e6e6] text-left px-[1rem] py-[0.1rem] w-full" + (props.state == e ? " font-semibold" : "")} 
                    onClick={() => {props.func(e); setOpened(false)}} key={i}>{e}</h1>
                })
            }
        </div>
    </div>
}
import Link from "next/link"

export default function Navbar(props: any) {
    return (
        <div className="p-5 flex flex-col items-center border border-[#e0e0e0]">
            <Link href="/" className="text-4xl w-fit mb-2 font-extrabold">shelfmates</Link>
            <div className="flex items-center ">
                <Link href="/shop" className={"w-fit mx-6 font-medium hover:text-[#56525c] hover:rotate-[3deg]" + (props.page == "shop" ? " underline" : "")}>shop</Link>
                <Link href="/favorited" className={"w-fit mx-6 font-medium hover:text-[#56525c] hover:rotate-[-3deg]" + (props.page == "favorited" ? " underline" : "")}>favorited</Link>
                <Link href="/about" className={"w-fit mx-6 font-medium hover:text-[#56525c] hover:rotate-[3deg]" + (props.page == "about" ? " underline" : "")}>about</Link>
                <Link href="/contact" className={"w-fit mx-6 font-medium hover:text-[#56525c] hover:rotate-[-3deg]" + (props.page == "contact" ? " underline" : "")}>contact</Link>
            </div>
        </div>
    )
}
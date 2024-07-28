import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen">
            <div className="p-5 flex flex-col items-center border border-[#e0e0e0]">
                <h1 className="text-4xl w-fit mb-2 font-extrabold ">shelfmates</h1>
                <div className="flex items-center">
                    <Link href="/" className="text-l w-fit mx-6 font-medium">browse</Link>
                    <Link href="/" className="text-l w-fit mx-6 font-medium">favorites</Link>Y
                    <Link href="/" className="text-l w-fit mx-6 font-medium">about</Link>
                    <Link href="/" className="text-l w-fit mx-6 font-medium">contact</Link>
                </div>
            </div>
        </div>
    );
}

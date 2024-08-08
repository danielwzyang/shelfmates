import { Slider } from "@nextui-org/react"

export interface filterProps {
    priceFilter: number[],
    changePriceFilter: Function
}

export default function PriceFilter(props: filterProps) {
    return <div className="border rounded-lg bg-white w-fit px-[10px] h-fit rounded-3xl flex flex-col justify-center items-center">
        <div className="flex items-center py-[0.2rem]">
            <Slider
                aria-label="a"
                classNames={{
                    base: "w-[100px] mr-[10px]",
                    filler: "bg-black",
                    thumb: "bg-black",
                    track: "bg-[#dbdbdb] h-2"
                }}
                size="md"
                disableThumbScale={true} renderThumb={(props) => (
                    <div
                        {...props}
                        className="top-1/2"
                    >
                        <span className="bg-black rounded-full w-3 h-3 block transition-transform" />
                    </div>
                )}
                showTooltip={true} tooltipValueFormatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
                tooltipProps={{
                    classNames: {
                        base: [
                            "before:bg-black",
                        ],
                        content: [
                            "bg-black",
                        ],
                    },
                }}
                step={1} minValue={5} maxValue={25} defaultValue={[10, 20]} onChangeEnd={(value) => { props.changePriceFilter(typeof value == "number" ? [value, value] : value) }} />
            <h1 className="whitespace-nowrap font-semibold text-base lg:text-sm sm:text-lg">
                {props.priceFilter[0] != props.priceFilter[1] ? "$" + props.priceFilter[0] + " - $" + props.priceFilter[1] : "$" + props.priceFilter[0]}
            </h1>
        </div>
    </div>
}
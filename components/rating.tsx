import products from "../products.json" with { type: "json" }
import Star from "./star"

export interface ratingProps {
    id: keyof typeof products
}

export default function Rating(props: ratingProps) {
    var starsLeft = Math.round(products[props.id]["rating"] * 2) / 2.0
    var starArray = []
    while (starsLeft > 0) {
        if (starsLeft >= 1) {
            starsLeft -= 1
            starArray.push(
                <Star value={1} key={5 - starArray.length} />
            )
        } else {
            starsLeft -= 0.5
            starArray.push(
                <Star value={0.5} key={5 - starArray.length} />
            )
        }
    }
    while (starArray.length < 5) {
        starArray.push(<Star value={0} key={5 - starArray.length} />)
    }
    return <div className="w-[55%] items-center flex gap-[2%]">
        <h1 className="text-base pt-[2%] px-[2%] lg:text-sm sm:text-base">{products[props.id]["rating"]}</h1>
        {
            starArray
        }
        <h1 className="text-base pt-[2%] px-[2%] lg:text-sm sm:text-base">{products[props.id]["reviews"]}</h1>
    </div>
}
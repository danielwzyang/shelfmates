import Dropdown from "./dropdown"
import PriceFilter from "./pricefilter"
import Tag from "./tag"
import tags from "../tags.json"

export interface parametersProps {
    dropdownSelections: string[],
    sortBy: string,
    changeSort: Function,
    priceFilter: number[],
    changePriceFilter: Function,
    toggleTag: Function,
}

export default function Parameters(props: parametersProps) {
    return (
        <div className="mt-[10px] flex-col w-fit m-auto">
            <div className="flex gap-[10px] justify-center">
                <Dropdown header="Sort by:" list={props.dropdownSelections} state={props.sortBy} func={props.changeSort} />
                <PriceFilter priceFilter={props.priceFilter} changePriceFilter={props.changePriceFilter} />
            </div>
            <div className="mt-[5px] gap-[5px] flex flex-wrap justify-center w-[1000px] max-w-[80vw] m-auto">
                {
                    tags.map((e, i) => {
                        return <Tag name={e} key={i} toggleTag={props.toggleTag} />
                    })
                }
            </div>
        </div>
    )
}
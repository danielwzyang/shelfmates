import products from "../products.json" with { type: "json" }

export default function sortProducts(sortBy: string, a: string, b: string) {
    switch (sortBy) {
        case "Amazon ID":
            if (a < b) {
                return -1
            }
            if (a > b) {
                return 1
            }
            return 0
        case "Recency":
            return 0
        case "Price (Low)":
            if (products[a as keyof typeof products]["price"] < products[b as keyof typeof products]["price"]) {
                return -1
            }
            if (products[a as keyof typeof products]["price"] > products[b as keyof typeof products]["price"]) {
                return 1
            }
            return 0
        case "Price (High)":
            if (products[a as keyof typeof products]["price"] < products[b as keyof typeof products]["price"]) {
                return 1
            }
            if (products[a as keyof typeof products]["price"] > products[b as keyof typeof products]["price"]) {
                return -1
            }
            return 0
        case "Rating":
            if (products[a as keyof typeof products]["rating"] < products[b as keyof typeof products]["rating"]) {
                return 1
            }
            if (products[a as keyof typeof products]["rating"] > products[b as keyof typeof products]["rating"]) {
                return -1
            }
            if (products[a as keyof typeof products]["reviews"] < products[b as keyof typeof products]["reviews"]) {
                return 1
            }
            if (products[a as keyof typeof products]["reviews"] > products[b as keyof typeof products]["reviews"]) {
                return -1
            }
            return 0
        case "# of Reviews":
            if (products[a as keyof typeof products]["reviews"] < products[b as keyof typeof products]["reviews"]) {
                return 1
            }
            if (products[a as keyof typeof products]["reviews"] > products[b as keyof typeof products]["reviews"]) {
                return -1
            }
            return 0
    }
    return 0
}
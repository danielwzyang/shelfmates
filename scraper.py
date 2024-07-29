import requests
import re
from bs4 import BeautifulSoup
import numpy as np
import json

with open("products.json", "r") as f:
    data = json.load(f)

header = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9'
        }

while True:
    id = input("\nenter id: ")
    while id == "":
        id = input("enter id: ")
    if id == "stop":
        break

    url = f'https://www.amazon.com/dp/{id}'
    page = requests.get(url, headers=header)
    if page.status_code == 200:
        # success getting page
        soup = BeautifulSoup(page.content, 'html.parser')

        # find name
        name = soup.find_all(
            "span", class_="a-size-large product-title-word-break")[0]
        if name:
            name = name.get_text(strip=True)
            print("\n\t\033[4mname\033[0m: " + name)
        else:
            print("name not found")

        # find price
        price_whole = soup.find_all("span", class_="a-price-whole")[0]
        price_fraction = soup.find_all("span", class_="a-price-fraction")[0]
        price = ""
        if price_whole and price_fraction:
            price = float(price_whole.get_text(strip=True) + price_fraction.get_text(strip=True))
            print("\t\033[4mprice\033[0m: " + "{:.2f}".format(price))
        else:
            print("price not found")

        ## find dimensions
        dimensions = soup.find_all("table", class_="a-keyvalue prodDetTable")[0]
        if dimensions:
            dimensions = dimensions.get_text(strip=True)

            # looks for float dimensions
            match = re.search(
                "Product Dimensions([\\d.]+) x ([\\d.]+) x ([\\d.]+) inches", dimensions)
            if not match:
                # integer dimensions
                match = re.search(
                    "Product Dimensions\\s*(\\d+) x (\\d+) x (\\d+) inches", dimensions)
            if match:
                dimensions = [float(match.group(1)), float(
                    match.group(2)), float(match.group(3))]
                print("\t\033[4mlength\033[0m: " + str(dimensions[0]) + ", \033[4mwidth\033[0m: " + str(dimensions[1]) + ", \033[4mheight\033[0m: " + str(dimensions[2]))
            else:
                print("match not found")
        else:
            print("product info not found")

        ## find rating
        rating = [x for x in soup.find_all("span", class_="a-size-base a-color-base") if np.array_equal(x.parent.attrs["class"], ['a-popover-trigger', 'a-declarative'])][0]
        if rating:
            rating = float(rating.get_text(strip=True)[:3])
            print("\t\033[4mrating\033[0m: " + str(rating) + " stars")
        else:
            print("rating not found")

        ## find number of reviews
        reviews = soup.find_all("span", id="acrCustomerReviewText")[0]
        if reviews:
            reviews = int(reviews.get_text(strip=True)[:3])
            print("\t\033[4mreviews\033[0m: " + str(reviews))
        else:
            print("reviews not found")
        
        ## input image link
        image = input("\t\033[4mimage link\033[0m: ")

        data[id] = {
            "name": name,
            "price": price,
            "dimensions": dimensions,
            "rating": rating,
            "reviews": reviews,
            "image": image,
        }
    else:
        print("failed to get page")

print(list(data.keys()))
with open("products.json", "w") as f:
    json.dump(data, f)

print("data dumped")
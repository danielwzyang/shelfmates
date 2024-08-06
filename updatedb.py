import requests
from bs4 import BeautifulSoup
import json
import numpy as np

with open("products.json", "r") as f:
    data = json.load(f)

header = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9"
        }

for key in data.keys():
    print("\nkey:", key)
    
    url = f"https://www.amazon.com/dp/{key}"
    page = requests.get(url, headers=header)
    if page.status_code == 200:
        # success getting page
        soup = BeautifulSoup(page.content, "html.parser")

        # get price
        price_whole = soup.find_all("span", class_="a-price-whole")[0]
        price_fraction = soup.find_all("span", class_="a-price-fraction")[0]
        price = ""
        if price_whole and price_fraction:
            price = float(price_whole.get_text(strip=True) + price_fraction.get_text(strip=True))
            print("price updated from", data[key]["price"], "to", price)
        else:
            print("price not found")

        # get rating
        rating = [x for x in soup.find_all("span", class_="a-size-base a-color-base") if np.array_equal(x.parent.attrs["class"], ["a-popover-trigger", "a-declarative"])][0]
        if rating:
            rating = float(rating.get_text(strip=True)[:3])
            print("rating updated from", data[key]["rating"], "to", rating)
        else:
            print("rating not found")

        ## find number of reviews
        reviews = soup.find_all("span", id="acrCustomerReviewText")[0]
        if reviews:
            reviews = int(reviews.get_text(strip=True)[:3])
            print("reviews updated from", data[key]["reviews"], "to", reviews)
        else:
            print("reviews not found")
        data[key] = {
            "name": data[key]["name"],
            "price": price,
            "dimensions": data[key]["dimensions"],
            "rating": rating,
            "reviews": reviews,
            "image": data[key]["image"],
            "backimage": data[key]["backimage"],
            "tags": data[key]["tags"],
            "link": data[key]["link"],
    }
    else:
        print("failed to get page")

with open("products.json", "w") as f:
    json.dump(data, f)

print("\ndata dumped")
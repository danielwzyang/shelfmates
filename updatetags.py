import json

with open("products.json", "r") as f:
    data = json.load(f)

tags = []

for key in data.keys():
    for tag in data[key]["tags"]:
        if tag not in tags:
            tags.append(tag)

tags.sort()

with open("tags.json", "w") as f:
    json.dump(tags, f)

print("\ntags dumped\n")



### Exercise 1: Converting Lists into Dictionaries


keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

# Combine lists using zip() and convert to a dictionary
result_dict = dict(zip(keys, values))

print(result_dict)



### Exercise 2: Cinemax #2


family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}
total_cost = 0

# Loop through the family dictionary
for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15

    print(f"{name.capitalize()} has to pay ${price}.")
    total_cost += price

print(f"\nTotal cost for the family: ${total_cost}")


#*Bonus (User Input):**


family = {}

# Allow user to add family members
while True:
    name = input("Enter family member's name (or type 'done' to finish): ")
    if name.lower() == "done":
        break
    age = int(input(f"Enter {name}'s age: "))
    family[name] = age

total_cost = 0
print("\n--- Ticket Prices ---")
for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15

    print(f"{name.capitalize()}: ${price}")
    total_cost += price

print(f"Total ticket cost: ${total_cost}")



### Exercise 3: Zara


# 1. Create the dictionary
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"],
    },
}

# 2. Modify and access elements
brand["number_stores"] = 2

clothes_types = ", ".join(brand["type_of_clothes"])
print(f"Zara's clients search for clothes suited for: {clothes_types}.")

brand["country_creation"] = "Spain"

if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

brand.pop("creation_date")

print("Last competitor:", brand["international_competitors"][-1])
print("Major colors in the US:", brand["major_color"]["US"])
print("Number of keys in brand:", len(brand))
print("All keys in brand:", list(brand.keys()))

# Bonus: Merge dictionaries
more_on_zara = {"creation_date": 1975, "number_stores": 10000}
brand.update(more_on_zara)
print("\nMerged Brand Dictionary:")
print(brand)


### Exercise 4: Disney Characters

users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

# 1. Map characters to indices
char_to_index = {user: i for i, user in enumerate(users)}
print("Pattern 1:", char_to_index)

# 2. Map indices to characters
index_to_char = {i: user for i, user in enumerate(users)}
print("Pattern 2:", index_to_char)

# 3. Sorted alphabetically mapped to indices
sorted_users = sorted(users)
sorted_char_to_index = {user: i for i, user in enumerate(sorted_users)}
print("Pattern 3:", sorted_char_to_index)

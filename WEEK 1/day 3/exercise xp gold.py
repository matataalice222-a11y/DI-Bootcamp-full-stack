

### Exercises 1, 2, & 3: Birthday Look-up (Combined Progressive Script)


# Exercise 1: Initial dictionary setup
birthdays = {
    "Alice": "1995/04/12",
    "Bob": "1988/11/23",
    "Charlie": "2001/01/05",
    "Diana": "1992/08/19",
    "Ethan": "1999/06/30"
}

# Welcome message
print("Welcome to the Birthday Look-up program!")
print("You can look up the birthdays of the people in the list!\n")

# Exercise 3: Add a new person first
new_name = input("Enter a name to add to the birthday list: ").strip().capitalize()
new_bday = input(f"Enter {new_name}'s birthday (YYYY/MM/DD): ").strip()
birthdays[new_name] = new_bday
print(f"Successfully added {new_name} to the list!\n")

# Exercise 2: Display all names in the dictionary
print("Available names:")
for name in birthdays.keys():
    print(f"- {name}")
print()

# Ask user for a name to look up
search_name = input("Whose birthday would you like to look up? ").strip().capitalize()

# Exercise 2 & 1: Look up with error handling
if search_name in birthdays:
    print(f"\n{search_name}'s birthday is on {birthdays[search_name]}.")
else:
    print(f"\nSorry, we don’t have the birthday information for {search_name}.")


### Exercise 4: Fruit Shop


# Part 1: Print items and prices in a sentence
simple_items = {
    "banana": 4,
    "apple": 2,
    "orange": 1.5,
    "pear": 3
}

print("--- Item Prices ---")
for item, price in simple_items.items():
    print(f"The price of a {item} is ${price:.2f}.")

print("\n--- Total Stock Cost ---")

# Part 2: Calculate cost to buy everything in stock
stock_items = {
    "banana": {"price": 4, "stock": 10},
    "apple": {"price": 2, "stock": 5},
    "orange": {"price": 1.5, "stock": 24},
    "pear": {"price": 3, "stock": 1}
}

total_stock_value = 0

for item, info in stock_items.items():
    item_total = info["price"] * info["stock"]
    total_stock_value += item_total

print(f"It would cost ${total_stock_value:.2f} to buy everything in stock.")


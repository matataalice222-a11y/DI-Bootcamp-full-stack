#*Exercise 1: Favorite Numbers**


my_fav_numbers = {7, 14, 21}


# Add two new numbers
my_fav_numbers.add(28)
my_fav_numbers.add(35)  # Last number added

# Remove the last number added
my_fav_numbers.remove(35)

friend_fav_numbers = {3, 14, 28, 42}

# Concatenate sets using union
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

print(our_fav_numbers)




#Exercise 2: Tuple**


my_tuple = (1, 2, 3)

# Tuples are immutable, meaning their elements cannot be changed, added, or removed after creation.
# Attempting to add an element using a list-like method like my_tuple.append(4) will raise an AttributeError.
# To "add" elements, you must create a new tuple by concatenation:
my_tuple = my_tuple + (4, 5)
print(my_tuple)



#Exercise 3: List Manipulation**


basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")

apples_count = basket.count("Apples")
print(f"Apples count: {apples_count}")

basket.clear()
print(basket)



#Exercise 4: Floats**

#*Recap:* An **integer** is a whole number without a decimal point (e.g., `2`), whereas a **float** is a number that contains a decimal point representing fractions/reals (e.g., `2.5`).


# Generating the sequence [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
sequence = [x / 2 for x in range(3, 11)]

# Optional formatting to convert whole floats (e.g., 2.0) to int:
formatted_sequence = [int(x) if x.is_integer() else x for x in sequence]
print(formatted_sequence)


#*Exercise 5: For Loop**


# Print numbers from 1 to 20
for num in range(1, 21):
    print(num)

# Print numbers where the index is even (using step in range)
for num in range(2, 21, 2):
    print(num)


#Exercise 6: While Loop**


while True:
    name = input("Enter your name: ").strip()

    if not name.isdigit() and len(name) >= 3 and name.isalpha():
        print("thank you")
        break
    else:
        print("Invalid input. Name must contain at least 3 letters and no digits.")



#*Exercise 7: Favorite Fruits**


fav_fruits_input = input("Enter your favorite fruits (separated by spaces): ")
fav_fruits = fav_fruits_input.split()

chosen_fruit = input("Enter the name of any fruit: ")

if chosen_fruit in fav_fruits:
    print("You chose one of your favorite fruits! Enjoy!")
else:
    print("You chose a new fruit. I hope you enjoy it!")



#*Exercise 8: Pizza Toppings**
toppings = []
base_price = 10.0
topping_price = 2.50

while True:
    topping = input("Enter a pizza topping (or 'quit' to finish): ").strip()
    if topping.lower() == "quit":
        break

    toppings.append(topping)
    print(f"Adding {topping} to your pizza.")

total_cost = base_price + (len(toppings) * topping_price)
print(f"\nYour toppings: {', '.join(toppings)}")
print(f"Total cost: ${total_cost:.2f}")


#Exercise 9: Cinemax Tickets**


# Ticket Pricing
family_size = int(input("How many people are in your family? "))
total_cost = 0

for i in range(family_size):
    age = int(input(f"Enter age for person {i + 1}: "))
    if age < 3:
        total_cost += 0
    elif 3 <= age <= 12:
        total_cost += 10
    else:
        total_cost += 15

print(f"Total ticket cost: ${total_cost}")

# Bonus: Restricted Movie Filter
names_and_ages = {"Alex": 17, "Sam": 15, "Jordan": 22, "Taylor": 19}
allowed_attendees = []

for name, age in names_and_ages.items():
    if 16 <= age <= 21:
        allowed_attendees.append(name)

print("Final attendees allowed to watch:", allowed_attendees)


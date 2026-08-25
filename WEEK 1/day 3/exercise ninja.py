


# Initial setup
cars_string = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

# 1. Convert string to a list using split()
cars_list = [car.strip() for car in cars_string.split(",")]


# 2. Print count of manufacturers
print(f"Number of manufacturers in the list: {len(cars_list)}")

# 3. Print list in reverse/descending order (Z-A)
descending_cars = sorted(cars_list, reverse=True)
print("Manufacturers in descending order (Z-A):", descending_cars)

# 4. Count names containing the letter 'o' (case-insensitive)
with_o = sum(1 for car in cars_list if 'o' in car.lower())
print(f"Number of manufacturers with 'o' in their name: {with_o}")

# 5. Count names NOT containing the letter 'i' (case-insensitive)
without_i = sum(1 for car in cars_list if 'i' not in car.lower())
print(f"Number of manufacturers without 'i' in their name: {without_i}")

print("\n--- Bonus 1 ---")

# Bonus 1: Remove duplicates programmatically
duplicates_list = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]

# Use dict.fromkeys() or set() to remove duplicates while preserving order
unique_cars = list(dict.fromkeys(duplicates_list))

# Print as comma-separated string
formatted_string = ", ".join(unique_cars)
print(f"Unique manufacturers: {formatted_string}")
print(f"Number of unique companies: {len(unique_cars)}")

print("\n--- Bonus 2 ---")

# Bonus 2: Ascending order (A-Z) with reversed letters in each name
# 1. Sort A-Z
sorted_ascending = sorted(unique_cars)

# 2. Reverse letters of each name using string slicing [::-1]
reversed_names = [car[::-1] for car in sorted_ascending]
print("Ascending order with reversed names:", reversed_names)


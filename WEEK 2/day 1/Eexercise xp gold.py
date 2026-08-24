
#*Exercise 1: Geometry**


import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        """Calculates and returns the perimeter (circumference) of the circle."""
        return 2 * math.pi * self.radius

    def area(self):
        """Calculates and returns the area of the circle."""
        return math.pi * (self.radius ** 2)

    def definition(self):
        """Prints the geometrical definition of a circle."""
        print("A circle is a 2D geometric shape consisting of all points in a plane that are at a given distance (radius) from a fixed point (center).")

# Example Usage:
c = Circle(5.0)
print(f"Perimeter: {c.perimeter():.2f}")
print(f"Area: {c.area():.2f}")
c.definition()


#Exercise 2: Custom List Class**


import random

class MyList:
    def __init__(self, letters):
        self.letters = list(letters)

    def get_reversed(self):
        """Returns the reversed list."""
        return list(reversed(self.letters)) # or self.letters[::-1]

    def get_sorted(self):
        """Returns the sorted list."""
        return sorted(self.letters)

    def generate_random_numbers(self):
        """Bonus: Generates a list of random numbers with the same length as letters."""
        return [random.randint(1, 100) for _ in range(len(self.letters))]

# Example Usage:
my_list = MyList(['d', 'a', 'c', 'b'])
print("Reversed:", my_list.get_reversed())
print("Sorted:", my_list.get_sorted())
print("Random Numbers List:", my_list.generate_random_numbers())



#Exercise 3: Restaurant Menu Manager (`menu_manager.py`)**


class MenuManager:
    def __init__(self):
        # Initializing default menu items
        self.menu = [
            {"name": "Soup", "price": 10, "spice_level": "B", "gluten_index": False},
            {"name": "Hamburger", "price": 15, "spice_level": "A", "gluten_index": True},
            {"name": "Salad", "price": 18, "spice_level": "A", "gluten_index": False},
            {"name": "French Fries", "price": 5, "spice_level": "C", "gluten_index": False},
            {"name": "Beef bourguignon", "price": 25, "spice_level": "B", "gluten_index": True}
        ]

    def add_item(self, name, price, spice, gluten):
        """Adds a new dish to the menu."""
        new_dish = {
            "name": name,
            "price": price,
            "spice_level": spice,
            "gluten_index": gluten
        }
        self.menu.append(new_dish)
        print(f"'{name}' has been added to the menu.")

    def update_item(self, name, price, spice, gluten):
        """Updates an existing dish in the menu if it exists."""
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                dish["price"] = price
                dish["spice_level"] = spice
                dish["gluten_index"] = gluten
                print(f"'{name}' has been updated.")
                return
        print(f"Error: '{name}' is not in the menu.")

    def remove_item(self, name):
        """Deletes a dish if found and prints the updated menu."""
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                self.menu.remove(dish)
                print(f"'{name}' was successfully removed.")
                print("Updated Menu:", self.menu)
                return
        print(f"Error: '{name}' is not in the menu.")

# Example Usage:
if __name__ == "__main__":
    manager = MenuManager()
    
    # Add new item
    manager.add_item("Tacos", 12, "C", False)
    
    # Update existing item
    manager.update_item("Soup", 12, "A", False)
    
    # Try updating non-existent item
    manager.update_item("Pizza", 20, "A", True)
    
    # Remove item
    manager.remove_item("French Fries")


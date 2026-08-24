
class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        """
        Supports adding a single animal with count, or passing multiple 
        animals via keyword arguments (**kwargs).
        """
        # Step 8: Handle **kwargs for multiple animals passed as keyword arguments
        if kwargs:
            for animal, qty in kwargs.items():
                self.animals[animal] = self.animals.get(animal, 0) + qty

        # Step 3: Handle traditional single animal addition
        if animal_type:
            self.animals[animal_type] = self.animals.get(animal_type, 0) + count

    def get_info(self):
        """Formats and returns the full farm summary."""
        info = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            info += f"{animal:<7} : {count}\n"
        info += f"\n    E-I-E-I-0!"
        return info

    def get_animal_types(self):
        """Step 6: Returns a sorted list of all animal types."""
        return sorted(list(self.animals.keys()))

    def get_short_info(self):
        """Step 7: Returns a short summary sentence with pluralized animal names."""
        animal_types = self.get_animal_types()
        formatted_animals = []

        for animal in animal_types:
            # Add 's' if the animal count is greater than 1
            if self.animals[animal] > 1:
                formatted_animals.append(f"{animal}s")
            else:
                formatted_animals.append(animal)

        # Join animals with commas and an 'and' for the final item
        if len(formatted_animals) > 1:
            animals_str = ", ".join(formatted_animals[:-1]) + f" and {formatted_animals[-1]}"
        elif formatted_animals:
            animals_str = formatted_animals[0]
        else:
            animals_str = "no animals"

        return f"{self.name}'s farm has {animals_str}."


# ==========================================
# TESTING THE CODE
# ==========================================
if __name__ == "__main__":
    # Steps 1–5 Test
    macdonald = Farm("McDonald")
    macdonald.add_animal('cow', 5)
    macdonald.add_animal('sheep')
    macdonald.add_animal('sheep')
    macdonald.add_animal('goat', 12)

    print(macdonald.get_info())
    # Output:
    # McDonald's farm
    #
    # cow     : 5
    # sheep   : 2
    # goat    : 12
    #
    #     E-I-E-I-0!

    print("\n--- Testing Bonus Steps ---")

    # Step 6: Test get_animal_types
    print("Animal types:", macdonald.get_animal_types())

    # Step 7: Test get_short_info
    print(macdonald.get_short_info())
    # Output: McDonald's farm has cows, goats and sheeps.

    # Step 8: Test upgraded add_animal using **kwargs
    old_farm = Farm("Old McDonald")
    old_farm.add_animal(cow=5, sheep=2, goat=12)
    print("\nKwargs output:")
    print(old_farm.get_info())


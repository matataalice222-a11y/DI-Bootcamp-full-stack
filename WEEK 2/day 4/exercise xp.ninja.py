
### Exercise 1: Restaurant Menu Manager - Regular Expressions

import json
import re

VALENTINE_JSON = "valentine_menu.json"

def initialize_json():
    """Ensure the JSON file exists with an empty list for special items."""
    try:
        with open(VALENTINE_JSON, "x") as f:
            json.dump({"valentine_items": []}, f, indent=4)
    except FileExistsError:
        pass

def validate_item_name(name: str) -> bool:
    """
    Validates name rules:
    1. Starts with 'V'.
    2. Words start with uppercase, connection words in lowercase.
    3. Contains at least two 'e' (or 'E') and no numbers.
    """
    # Check no numbers
    if re.search(r'\d', name):
        return False
    
    # Check at least two 'e's (case-insensitive)
    if len(re.findall(r'e', name, re.IGNORECASE)) < 2:
        return False

    # Check first character is capital 'V'
    if not name.startswith("V"):
        return False

    # Connection words that should be lowercase
    connection_words = {"of", "and", "in", "on", "at", "to", "a", "an", "the", "with", "for"}
    
    # Split by spaces and hyphenated parts
    words = re.split(r'[\s-]+', name)
    
    for idx, word in enumerate(words):
        if not word:
            continue
        if idx == 0:
            if not word[0].isupper() or word[0] != 'V':
                return False
        elif word.lower() in connection_words:
            if not word.islower():
                return False
        else:
            if not word[0].isupper():
                return False
                
    return True

def validate_price(price: str) -> bool:
    """Matches the pattern XX,14 where X are digits."""
    return bool(re.fullmatch(r'^\d{2},14$', price))

def display_heart_menu(items):
    """Prints a star heart containing menu items."""
    heart = [
        "  ***   ***  ",
        " ***** ***** ",
        "*************",
        " *********** ",
        "  *********  ",
        "   *******   ",
        "    *****    ",
        "     ***     ",
        "      *      "
    ]
    print("\n" + "\n".join(heart))
    print("\n--- VALENTINE'S MENU ---")
    if not items:
        print("No items added yet.")
    else:
        for item in items:
            print(f"- {item['name']} | Price: ${item['price']}")
    print("------------------------\n")

def add_valentine_item():
    initialize_json()
    
    name = input("Enter item name: ").strip()
    price = input("Enter price (Format XX,14): ").strip()
    
    if not validate_item_name(name):
        print("Invalid item name! Must start with 'V', have 2+ 'e's, no numbers, and valid capitalization.")
        return
        
    if not validate_price(price):
        print("Invalid price pattern! Must follow format XX,14 (e.g., 25,14).")
        return

    with open(VALENTINE_JSON, "r+") as f:
        data = json.load(f)
        data["valentine_items"].append({"name": name, "price": price})
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()

    print("Item successfully added!")
    display_heart_menu(data["valentine_items"])

if __name__ == "__main__":
    add_valentine_item()


### Exercise 2: Dungeons & Dragons

import random
import json

class Character:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        self.stats = {
            "Strength": self._generate_ability_score(),
            "Dexterity": self._generate_ability_score(),
            "Constitution": self._generate_ability_score(),
            "Intelligence": self._generate_ability_score(),
            "Wisdom": self._generate_ability_score(),
            "Charisma": self._generate_ability_score()
        }

    @staticmethod
    def _generate_ability_score() -> int:
        """Rolls 4 d6 dice, drops the lowest, and returns the sum of top 3."""
        rolls = [random.randint(1, 6) for _ in range(4)]
        rolls.sort()
        return sum(rolls[1:])

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "age": self.age,
            "stats": self.stats
        }

class Game:
    def __init__(self):
        self.characters = []

    def start(self):
        num_players = int(input("How many players are playing? "))
        
        for i in range(num_players):
            print(f"\n--- Player {i + 1} ---")
            name = input("Enter character name: ").strip()
            age = int(input("Enter character age: "))
            
            char = Character(name, age)
            self.characters.append(char)
            print(f"Created character {name} with stats: {char.stats}")

        self.export_to_txt("characters.txt")
        self.export_to_json("characters.json")
        print("\nExported characters to 'characters.txt' and 'characters.json'.")

    def export_to_txt(self, filename: str):
        with open(filename, "w") as f:
            f.write("=== DUNGEONS & DRAGONS CHARACTERS ===\n\n")
            for char in self.characters:
                f.write(f"Name: {char.name}\n")
                f.write(f"Age: {char.age}\n")
                f.write("Attributes:\n")
                for stat, value in char.stats.items():
                    f.write(f"  - {stat}: {value}\n")
                f.write("-" * 35 + "\n")

    def export_to_json(self, filename: str):
        data = [char.to_dict() for char in self.characters]
        with open(filename, "w") as f:
            json.dump(data, f, indent=4)

if __name__ == "__main__":
    game = Game()
    game.start()


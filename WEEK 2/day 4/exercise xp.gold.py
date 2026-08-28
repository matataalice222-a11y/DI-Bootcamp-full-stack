

#*Exercise 1: Restaurant Menu Manager**

#`restaurant_menu.json`**


{
    "items": [
        {
            "name": "Vegetable soup",
            "price": 30
        },
        {
            "name": "Hamburger",
            "price": 44.9
        },
        {
            "name": "Milkshake",
            "price": 22.5
        },
        {
            "name": "Artichoke",
            "price": 18
        },
        {
            "name": "Beef stew",
            "price": 52.5
        }
    ]
}

#`menu_manager.py`**


import json

class MenuManager:
    def __init__(self, filename="restaurant_menu.json"):
        self.filename = filename
        with open(self.filename, "r") as file:
            self.menu = json.load(file)

    def add_item(self, name, price):
        self.menu["items"].append({"name": name, "price": float(price)})

    def remove_item(self, name):
        for index, item in enumerate(self.menu["items"]):
            if item["name"].lower() == name.lower():
                del self.menu["items"][index]
                return True
        return False

    def save_to_file(self):
        with open(self.filename, "w") as file:
            json.dump(self.menu, file, indent=4)


#*`menu_editor.py`
def load_manager():
    return MenuManager()

def add_item_to_menu(manager):
    name = input("Enter the item's name: ")
    try:
        price = float(input("Enter the item's price: "))
        manager.add_item(name, price)
        print("Item was added successfully.")
    except ValueError:
        print("Invalid price input.")

def remove_item_from_menu(manager):
    name = input("Enter the name of the item to remove: ")
    if manager.remove_item(name):
        print(f"'{name}' was deleted successfully.")
    else:
        print("Error: Item not found in the menu.")

def show_restaurant_menu(manager):
    print("\n--- RESTAURANT MENU ---")
    for item in manager.menu["items"]:
        print(f"{item['name']}: ${item['price']}")
    print("------------------------")

def show_user_menu(manager):
    while True:
        print("\n=== MENU EDITOR ===")
        print("(a) Add an item")
        print("(d) Delete an item")
        print("(v) View the menu")
        print("(x) Exit")
        
        user_choice = input("Choose an option: ").lower().strip()
        
        if user_choice == 'a':
            add_item_to_menu(manager)
        elif user_choice == 'd':
            remove_item_from_menu(manager)
        elif user_choice == 'v':
            show_restaurant_menu(manager)
        elif user_choice == 'x':
            manager.save_to_file()
            print("Menu saved successfully. Exiting program.")
            break
        else:
            print("Invalid choice. Please select a valid option.")

if __name__ == "__main__":
    manager_instance = load_manager()
    show_user_menu(manager_instance)



#*Exercise 2: Giphy API #1**

import requests

api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
query = "hilarious"
rating = "g"
limit = 10

# 1. Use f-strings and variables to build the URL string with limit=10
url = f"https://api.giphy.com/v1/gifs/search?q={query}&rating={rating}&limit={limit}&api_key={api_key}"

response = requests.get(url)

# 2. Check if status code is 200
if response.status_code == 200:
    data = response.json()
    
    # 3. Only return gifs which have a height bigger than 100
    filtered_gifs = []
    for gif in data["data"]:
        # Extract height from original images object
        height = int(gif["images"]["original"]["height"])
        if height > 100:
            filtered_gifs.append(gif)
            
    # 4. Return the length of the filtered list
    print(f"Total gifs with height > 100: {len(filtered_gifs)}")
    print(f"First 10 gifs fetched successfully.")
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")


#*Exercise 3: Giphy API #2**


import requests

API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"

def fetch_gifs():
    search_term = input("Enter a search term or phrase: ").strip()
    
    if search_term:
        search_url = f"https://api.giphy.com/v1/gifs/search?q={search_term}&api_key={API_KEY}&limit=10"
        response = requests.get(search_url)
        if response.status_code == 200:
            data = response.json().get("data", [])
            if data:
                print(f"\nFound {len(data)} gifs for '{search_term}':")
                for gif in data:
                    print(f"- {gif['title']}: {gif['url']}")
                return

    # Fallback to trending gifs if query fails or returns empty results
    print(f"\nCould not find requested term or phrase '{search_term}'. Showing trending gifs of the day instead:")
    trending_url = f"https://api.giphy.com/v1/gifs/trending?api_key={API_KEY}&limit=10"
    trending_response = requests.get(trending_url)
    
    if trending_response.status_code == 200:
        trending_data = trending_response.json().get("data", [])
        for gif in trending_data:
            print(f"- {gif['title']}: {gif['url']}")

if __name__ == "__main__":
    fetch_gifs()


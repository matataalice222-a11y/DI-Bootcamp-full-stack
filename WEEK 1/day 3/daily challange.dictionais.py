

#*Challenge 1: Letter Index Dictionary**


# 1. User Input
word = input("Enter a word: ")

# 2. Creating the Dictionary
letter_indices = {}

for index, char in enumerate(word):
    if char in letter_indices:
        letter_indices[char].append(index)
    else:
        letter_indices[char] = [index]

# Output
print(letter_indices)



#Challenge 2: Affordable Item
def buy_affordable_items(items_purchase, wallet):
    # 2. Data Cleaning for Wallet
    wallet_clean = int(wallet.replace("$", "").replace(",", ""))
    
    basket = []

    # 3. Determining Affordable Items in order of priority
    for item, price_str in items_purchase.items():
        # Clean the item price
        price = int(price_str.replace("$", "").replace(",", ""))
        
        # Check if we can afford the item
        if wallet_clean >= price:
            basket.append(item)
            wallet_clean -= price  # Update remaining money

    # Return result
    if not basket:
        return "Nothing"
    else:
        return sorted(basket)  # Alphabetical order


# ==========================================
# TEST EXAMPLES
# ==========================================

# Test 1
items_purchase_1 = {"Water": "$1", "Bread": "$3", "TV": "$1,000", "Fertilizer": "$20"}
wallet_1 = "$300"
print(buy_affordable_items(items_purchase_1, wallet_1))
# Output: ['Bread', 'Fertilizer', 'Water']

# Test 2
items_purchase_2 = {"Apple": "$4", "Honey": "$3", "Fan": "$14", "Bananas": "$4", "Pan": "$100", "Spoon": "$2"}
wallet_2 = "$100"
print(buy_affordable_items(items_purchase_2, wallet_2))
# Output: ['Apple', 'Bananas', 'Fan', 'Honey', 'Spoon']

# Test 3
items_purchase_3 = {"Phone": "$999", "Speakers": "$300", "Laptop": "$5,000", "PC": "$1200"}
wallet_3 = "$1"
print(buy_affordable_items(items_purchase_3, wallet_3))
# Output: "Nothing"


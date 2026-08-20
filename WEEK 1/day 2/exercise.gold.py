#Exercise 1: Concatenate lists**


list1 = [1, 2, 3]
list2 = [4, 5, 6]

# Option A: Using extend()
list1.extend(list2)
print(list1)


# Option B: Using unpacking
combined = [*list1, *list2]


#Exercise 2: Range of numbers**


for num in range(1500, 2501):
    if num % 5 == 0 and num % 7 == 0:
        print(num)
        


#Exercise 3: Check the index**


names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input("Enter your name: ")

if user_name in names:
    print(f"The index of the first occurrence is: {names.index(user_name)}")
    
else:
    print("Name not found in the list.")



#Exercise 4: Greatest Number**


num1 = float(input("Input the 1st number: "))
num2 = float(input("Input the 2nd number: "))
num3 = float(input("Input the 3rd number: "))

greatest = max(num1, num2, num3)
print(f"The greatest number is: {int(greatest) if greatest.is_integer() else greatest}")



#Exercise 5: The Alphabet**


import string

alphabet = string.ascii_lowercase
vowels = "aeiou"

for letter in alphabet:
    if letter in vowels:
        print(f"'{letter}' is a vowel.")
    else:
        print(f"'{letter}' is a consonant.")



#Exercise 6: Words and letters**


words = []
for i in range(7):
    word = input(f"Enter word {i + 1}: ")
    words.append(word)

letter = input("Enter a single character: ")

for word in words:
    if letter in word:
        print(f"The index of '{letter}' in '{word}' is {word.index(letter)}.")
    else:
        print(f"The character '{letter}' does not exist in the word '{word}'.")


#Exercise 7: Min, Max, Sum**

numbers = list(range(1, 1000001))

print(f"Minimum: {min(numbers)}")
print(f"Maximum: {max(numbers)}")
print(f"Sum: {sum(numbers)}")


#*Exercise 8: List and Tuple**

user_input = input("Enter comma-separated numbers: ")

numbers_list = user_input.split(",")
numbers_tuple = tuple(numbers_list)

print(numbers_list)
print(numbers_tuple)


#Exercise 9: Random number (with Bonuses)**


import random

wins = 0
losses = 0

while True:
    user_input = input("Guess a number from 1 to 9 (or type 'quit' to exit): ").strip()
    
    if user_input.lower() == 'quit':
        break
        
    if not user_input.isdigit() or not (1 <= int(user_input) <= 9):
        print("Please enter a valid number between 1 and 9.")
        continue
        
    user_guess = int(user_input)
    random_num = random.randint(1, 9)
    
    if user_guess == random_num:
        print("Winner!")
        wins += 1
    else:
        print(f"Better luck next time. The number was {random_num}.")
        losses += 1

print(f"\nGame Over! Total wins: {wins}, Total losses: {losses}")

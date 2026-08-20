

#Challenge 1: Multiples of a Number**

#This solution takes two integer inputs, generates multiples using a `for` loop with `range()`, and appends them to a list.

# Ask user for inputs
number = int(input("Enter a number: "))
length = int(input("Enter length: "))

# Initialize an empty list
multiples = []

# Generate multiples using a loop
for i in range(1, length + 1):
    multiples.append(number * i)

# Output result
print(multiples)


Alternative 

number = int(input("Enter a number: "))
length = int(input("Enter length: "))

multiples = [number * i for i in range(1, length + 1)]
print(multiples)


#*Challenge 2: Remove Consecutive Duplicate Letters**

#This solution loops through each character in the string and appends it to a result string only if it is different from the last character added.


# Ask user for a string
user_word = input("Enter a word: ")

# Initialize an empty string to store the result
result = ""

# Loop through each character
for char in user_word:
    # Append char if result is empty or if char is different from the last added character
    if not result or char != result[-1]:
        result += char


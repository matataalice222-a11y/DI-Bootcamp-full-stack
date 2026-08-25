#*Exercise 1: Formula**
import math

# Fixed values
C = 50
H = 30

# Prompt user for input
user_input = input("Enter comma-separated numbers: ")

# Split input string by comma, calculate Q for each value, and round to nearest integer
d_values = user_input.split(",")    
results = []


for d in d_values:
    D = float(d.strip())

    Q = round(math.sqrt((2 , C , D) / H))
    results.append(str(Q))

# Print comma-separated results
print(",".join(results))



#Exercise 2: List of integers**

import random

# 1. Store the list
numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7]

# 2. Basic Prints
print("Sorted descending:", sorted(numbers, reverse=True))
print("Sum:", sum(numbers))

# 3. First and last numbers
print("First and last:", [numbers[0], numbers[-1]])

# 4. Numbers > 50
print("Greater than 50:", [x for x in numbers if x > 50])

# 5. Numbers < 10
print("Smaller than 10:", [x for x in numbers if x < 10])

# 6. Numbers squared
print("Squared numbers:", [x ** 2 for x in numbers])

# 7. Without duplicates
unique_nums = list(set(numbers))
print("Unique list:", unique_nums)
print("Count of unique items:", len(unique_nums))

# 8. Average
print("Average:", sum(numbers) / len(numbers))

# 9 & 10. Largest & Smallest
print("Largest:", max(numbers))
print("Smallest:", min(numbers))

# 11. Bonus: Without built-in functions
manual_sum = 0
manual_largest = numbers[0]
manual_smallest = numbers[0]

for num in numbers:
    manual_sum += num
    if num > manual_largest:
        manual_largest = num
    if num < manual_smallest:
        manual_smallest = num

manual_avg = manual_sum / len(numbers)
print(f"Manual calculations -> Sum: {manual_sum}, Avg: {manual_avg}, Max: {manual_largest}, Min: {manual_smallest}")

# 12. Bonus: User input (10 numbers)
user_numbers = []
for _ in range(10):
    val = int(input("Enter an integer between -100 and 100: "))
    user_numbers.append(val)

# 13. Bonus: Generate 10 random integers
random_10 = [random.randint(-100, 100) for _ in range(10)]

# 14. Bonus: Random amount (>= 50) of random integers
amount = random.randint(50, 100)
random_dynamic = [random.randint(-100, 100) for _ in range(amount)]

# 15. Bonus Answer:
# Yes, the code using loops, len(), sum(), max(), and min() works dynamically regardless of the size of the list.


#Exercise 3: Working on a paragraph**


import re

paragraph = (
    "Python is a high-level, general-purpose programming language. "
    "Its design philosophy emphasizes code readability with the use of significant indentation. "
    "Python is dynamically typed and garbage-collected."
)

# Core tasks
char_count = len(paragraph)
sentences = re.split(r'[.!?]+', paragraph.strip(".!?"))
sentence_count = len([s for s in sentences if s.strip()])

words = re.findall(r'\b\w+\b', paragraph.lower())
word_count = len(words)
unique_words = set(words)
unique_word_count = len(unique_words)

# Bonus tasks
non_whitespace_count = len(paragraph.replace(" ", "").replace("\n", ""))
avg_words_per_sentence = word_count / sentence_count if sentence_count > 0 else 0
non_unique_word_count = word_count - unique_word_count

print(f"Character Count: {char_count}")
print(f"Sentence Count: {sentence_count}")
print(f"Word Count: {word_count}")
print(f"Unique Word Count: {unique_word_count}")
print(f"Non-Whitespace Characters: {non_whitespace_count}")
print(f"Average Words Per Sentence: {avg_words_per_sentence:.2f}")
print(f"Non-Unique Words Count: {non_unique_word_count}")

#Exercise 4: Frequency Of The Words**


text = input("Enter text: ")

# Splitting by spaces to preserve punctuation attached to words as shown in example
words = text.split(" ")
frequency = {}

for word in words:
    frequency[word] = frequency.get(word, 0) + 1

for word in sorted(frequency.keys()):
    print(f"{word}:{frequency[word]}")

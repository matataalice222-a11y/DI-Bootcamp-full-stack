

#Using the built-in `.count()` method (Shortest):**


def count_occurrence(text, char):
    return text.count(char)

# Test cases
print(count_occurrence("Programming is cool!", "o"))  # Output: 3
print(count_occurrence("This is a great example", "y")) # Output: 0


#*Using a simple `for` loop:**


def count_occurrence(text, char):
    count = 0
    for c in text:
        if c == char:
            count += 1
    return count



#Interactive with user input:**


text = input("String: ")
char = input("Character: ")

print(text.count(char))


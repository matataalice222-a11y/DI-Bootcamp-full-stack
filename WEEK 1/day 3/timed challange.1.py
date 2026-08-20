


# Starter code (Note: raw_input() is Python 2; use input() if running Python 3)
REverseinp = input("Enter a sentence: ")

# Split the sentence into words, reverse the list, and join them back together
words = REverseinp.split()
reversed = " ".join(words[::-1])

# Output the result
print(reversed)

#*How it works:**

#split()` divides the string into a list of individual words by spaces.
#[::-1]` reverses the list of words.
#" ".join(...)` combines the reversed list of words back into a single string separated by spaces.
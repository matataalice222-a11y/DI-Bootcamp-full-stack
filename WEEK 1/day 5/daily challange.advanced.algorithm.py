#Challenge 1: Sorting**


# Step 1: Get Input
user_input = input("Enter comma-separated words: ")

# Step 2: Split the string into a list of words
words_list = user_input.split(",")

# Step 3: Sort the list alphabetically
words_list.sort()

# Step 4: Join the sorted list into a single comma-separated string
result = ",".join(words_list)

# Step 5: Print the result
print(result)



#Challenge 2: Longest Word**


def longest_word(sentence):
    # Step 2: Split the sentence into words by spaces
    words = sentence.split(" ")

    # Step 3: Initialize variable to track the longest word
    longest = ""

    # Step 4 & 5: Iterate through words and compare lengths
    for word in words:
        if len(word) > len(longest):
            longest = word

    # Step 6: Return the longest word found
    return longest


# Testing the function
print(
    longest_word("Margaret's toy is a pretty doll.")
)  # Output: "Margaret's"
print(
    longest_word("A thing of beauty is a joy forever.")
)  # Output: "forever."
print(
    longest_word("Forgetfulness is by all means powerless!")
)  # Output: "Forgetfulness"

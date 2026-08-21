
import re

MATRIX_STR = """
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%"""

# Step 1: Convert matrix_string to a 2D list (matrix)
lines = MATRIX_STR.strip("\n").split("\n")
matrix = [list(line) for line in lines]

# Step 2 & 3: Iterate through columns and extract all characters top-to-bottom
num_rows = len(matrix)
num_cols = len(matrix[0]) if num_rows > 0 else 0

raw_column_text = ""
for col in range(num_cols):
    for row in range(num_rows):
        raw_column_text += matrix[row][col]

# Step 4: Replace any group of non-alpha symbols between alpha characters with a space
# Using Regex: replaces non-alphabetical groups flanked by letters with a single space
decoded_message = re.sub(
    r"(?<=[a-zA-Z])[^a-zA-Z]+(?=[a-zA-Z])", " ", raw_column_text
)

# Step 5: Print the decoded message
print(decoded_message)



#*Alternative solution (without regex):**


MATRIX_STR = """
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%"""

lines = MATRIX_STR.strip("\n").split("\n")
matrix = [list(line) for line in lines]

num_rows = len(matrix)
num_cols = len(matrix[0])

# Read column by column
column_chars = []
for col in range(num_cols):
    for row in range(num_rows):
        column_chars.append(matrix[row][col])

# Replace symbol groups between letters with spaces
decoded_message = ""
in_symbol_group = False

for char in column_chars:
    if char.isalpha():
        if in_symbol_group and decoded_message:
            decoded_message += " "
        decoded_message += char
        in_symbol_group = False
    else:
        in_symbol_group = True

print(decoded_message)


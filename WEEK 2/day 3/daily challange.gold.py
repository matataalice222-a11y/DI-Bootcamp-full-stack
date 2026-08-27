
user_data = []

# Ask user for 5 inputs
for i in range(5):
    raw_input = input(f"Enter person {i+1} details (Name,Age,Score): ")
    name, age, score = raw_input.split(",")
    # Storing values as strings to match expected output format
    user_data.append((name.strip(), age.strip(), score.strip()))

# Sort using a lambda function with priority: Name > Age > Score
sorted_data = sorted(user_data, key=lambda x: (x[0], int(x[1]), int(x[2])))

print(sorted_data)

### Explanation

# **Tuple Structure:** Each input is stored as a tuple `(name, age, score)`.
# **Lambda Key:** `key=lambda x: (x[0], int(x[1]), int(x[2]))` returns a tuple that Python uses for sorting priority. It compares `x[0]` (Name) first, then `int(x[1])` (Age), and finally `int(x[2])` (Score) to break any ties. Converting age and score to `int` inside the lambda ensures correct numerical sorting rather than alphabetical string sorting.
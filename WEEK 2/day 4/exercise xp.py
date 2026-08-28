

#*Exercise 1: Random Sentence Generator**


import random

def get_words_from_file(file_path):
    """Reads a file and returns a list of words."""
    with open(file_path, "r") as file:
        content = file.read()
        words = content.split()
    return words

def get_random_sentence(length, file_path="words.txt"):
    """Generates a random lowercase sentence of a specified length."""
    words = get_words_from_file(file_path)
    selected_words = [random.choice(words) for _ in range(length)]
    sentence = " ".join(selected_words).lower()
    return sentence

def main():
    print("This program generates a random sentence of a specified length from a word list.")
    user_input = input("Enter the desired sentence length (between 2 and 20): ")
    
    try:
        length = int(user_input)
        if 2 <= length <= 20:
            sentence = get_random_sentence(length)
            print(f"\nGenerated Sentence:\n{sentence}")
        else:
            print("Error: The number must be between 2 and 20 (inclusive).")
    except ValueError:
        print("Error: Invalid input. Please enter a valid integer.")

if __name__ == "__main__":
    main()

#Exercise 2: Working with JSON**

import json

sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

# Step 1: Parse JSON string to Python dictionary
data = json.loads(sampleJson)

# Step 2: Access and print the nested "salary" key
salary = data["company"]["employee"]["payable"]["salary"]
print(f"Salary: {salary}")

# Step 3: Add the "birth_date" key to the employee dictionary
data["company"]["employee"]["birth_date"] = "1995-05-15"

# Step 4: Save the modified dictionary to a JSON file
with open("modified_employee.json", "w") as file:
    json.dump(data, file, indent=4)

print("Modified JSON saved successfully to 'modified_employee.json'.")


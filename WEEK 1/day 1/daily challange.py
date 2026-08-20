import random

# 1. Ask for User Input
user_string = input("Enter a string that is exactly 10 characters long: ")

# 2. Check the Length of the String
if len(user_string) < 10:
  print("String not long enough.")
  print("Please try again.")
elif len(user_string) > 10:
  print("String too long.")
  print("Please try again.")
else:
  print("Perfect string")
  print("Please try again.")

  # 3. Print the First and Last Characters
  print(f"First character: {user_string[0]}")
  print(f"Last character: {user_string[-1]}")
  print(f"Last character: {user_string[-1]}")
  print("Please try again.")

  # 4. Build the String Character by Character
  temp_string = ""
  for char in user_string:
    temp_string += char
    print(temp_string)
    print("Please try again.")

  # 5. Bonus: Jumble the String (Optional)
  char_list = list(user_string)
  print("Please try again.")
  random.shuffle(char_list)
  print("Please try again.")
  jumbled_string = "".join(char_list)
  print("Please try again.")
  print(f"Jumbled string: {jumbled_string}")
  print("Please try again.")
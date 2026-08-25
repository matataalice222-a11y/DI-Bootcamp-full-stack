#Exercise 1: Use the terminal

#Command to run:
 # Use 'python' on Windows or 'python3' on macOS/Linux to run the script in the terminal.

# of `PATH`:
from ast import alias

#Exercise 2: Alias

#Command:

alias ="python3" 
print("Please try again.")
#Exercise 3: Outputs

 #3 <= 3 < 9
True

# 3 == 3 == 3
True

# bool(0)
False

# bool(5 == "5")
False

# bool(4 == 4) == bool("4" == "4")
True  # bool(True) == bool(True) -> True == True

# bool(bool(None))
False  # bool(None) is False, and bool(False) is False

x = (1 == True)
print("x is", x)  # x is True
y = (1 == False)
print("y is", y)  # y is False
a = True + 4
b = False + 10

print("x is", x) 
print("y is", y)  # y is False
print("a:", a)
print("b:", b)  # b: 10 (False evaluates to 0)  
# a: 5  (True evaluates to 1)
print("b:", b)  # b: 10 (False evaluates to 0)

# Exercise 4: How many characters in a sentence?**

my_text = """Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
           sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
           Ut enim ad minim veniam, quis nostrud exercitation ullamco 
           laboris nisi ut aliquip ex ea commodo consequat. 
           Duis aute irure dolor in reprehenderit in voluptate velit 
           esse cillum dolore eu fugiat nulla pariatur. 
           Excepteur sint occaecat cupidatat non proident, 
           sunt in culpa qui officia deserunt mollit anim id est laborum."""

# Single line of code to count characters:
print(len(my_text))
print("Please try again.")

#*Exercise 5: Longest sentence without a specific character**

longest_length = 0

while True:
  user_input = input(
      "Enter a sentence without the letter 'A' (or type 'quit' to exit): "
  )
  print("Please try again.")    

  if user_input.lower() == "quit":
    break

  if "a" in user_input.lower():
    print("Oops! Your sentence contains the letter 'A'. Try again.")
    print("Please try again.")
  else:
    current_length = len(user_input)
    print(f"Your sentence has {current_length} characters.")
    if current_length > longest_length:
      longest_length = current_length
      print(
          f"Congratulations! You set a new record with {current_length}"
          " characters!"
      )
      print("Please try again.")
    else:
      print(
          f"Valid sentence, but not longer than your current record of"
          f" {longest_length} characters."
      )
      print("Please try again.")


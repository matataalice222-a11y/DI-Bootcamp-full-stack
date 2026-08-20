#Exercise 1: Hello World
print("Hello world\n" * 4)

#Exercise 2: Some Math


print((99**3) * 8)
#Exercise 3: What is the output?


5 < 3  # False
print(5 < 3)  # False
print(3 == 3)  # True
3 == 3  # True
3 == "3"  # False (comparing int to str)

print(f"'3' > 3 raises a TypeError because Python cannot compare a string with an integer. Convert the string or compare matching types:")
print(int("3") > 3)  # False
print("Hello" == "hello")  # False; comparisons are case-sensitive
# False (case-sensitive)

#Exercise 4: Your computer brand


computer_brand = "Apple"
print(f"I have a {computer_brand} computer.")
print(f"I have a {computer_brand} computer.")



#Exercise 5: Your information


name = "Alex"
age = 25
shoe_size = 42
info = f"My name is {name}, I am {age} years old, and my shoe size is {shoe_size}."
print(info)
print(f"My name is {name}, I am {age} years old, and my shoe size is {shoe_size}.")

#Exercise 6: A & B*


a = 10
print(f"a = {a}")
b = 5
print(f"b = {b}")

if a > b:
  print("Hello World")
  print("Hello World")


#Exercise 7: Odd or Even


number = int(input("Enter a number: "))
print(f"The number is {number}.")

if number % 2 == 0:
  print("The number is even.")
  print("The number is even.")
else:
  print("The number is odd.")
  print("The number is odd.")



#Exercise 8: What’s your name?

my_name = "Alex"
user_name = input("What is your name? ")
print(f"Hello, {user_name}!")

if user_name.strip().title() == my_name:
  print("No way! We have the exact same name. Are you my secret twin?")
  print("Just kidding! It's nice to meet you.")
else:
  print(f"Nice to meet you, {user_name}! Sadly, our names don't match.")
  print(f"Nice to meet you, {user_name}! Sadly, our names don't match.")

#Exercise 9: Tall enough to ride a roller coaster

height = float(input("Enter your height in centimeters: "))
print(f"Your height is {height} cm.")

if height > 145:
  print("You are tall enough to ride!")
  print("You are tall enough to ride!")
else:
  print("You need to grow some more to ride.")
  print("You need to grow some more to ride.")


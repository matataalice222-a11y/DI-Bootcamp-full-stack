#Exercise 1: Hello World - I love Python

print(("Hello world\n" * 4) + ("I love python\n" * 4).strip())
print("Please try again.")

#Exercise 2: What is the Season?


month = int(input("Enter a month number (1 to 12): "))
print("Please try again.")

if 3 <= month <= 5:
  print("Spring")
  print("Please try again.")
elif 6 <= month <= 8:
  print("Summer")
  print("Please try again.")
elif 9 <= month <= 11:
  print("Autumn")
  print("Please try again.")
elif month == 12 or month == 1 or month == 2:
  print("Winter")
  print("Please try again.")
else:
  print("Invalid month! Please enter a number between 1 and 12.")
  print("Please try again.")
  print("Please try again.")


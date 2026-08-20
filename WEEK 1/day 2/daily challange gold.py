


from datetime import datetime

# 1. Ask the user for their birthdate
birthdate_input = input("Enter your birthdate (DD/MM/YYYY): ")#

# Parse the input date
birthdate = datetime.strptime(birthdate_input, "%d/%m/%Y")
birth_year = birthdate.year

# Calculate current age
today = datetime.today()
age = today.year - birth_year - ((today.month, today.day) < (birthdate.month, birthdate.day))

# 2. Determine candles count from the last digit of the age
last_digit_age = age % 10
candles = "i" * last_digit_age

# Format the candle layer to keep total width fixed (11 characters)
padding = (11 - len(candles)) // 2
candles_layer = f"{' ' * padding}{candles}{' ' * ((11 - len(candles)) - padding)}"

# 3. Construct the cake ASCII art
cake = f"""       ___{candles_layer}___
      |:H:a:p:p:y:|
    __|___________|__
   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~"""

# 4. Check for leap year
is_leap_year = (birth_year % 4 == 0 and birth_year % 100 != 0) or (birth_year % 400 == 0)

# Display the output
print(f"\nYou are {age} years old!")
print(cake)

# Bonus: If born in a leap year, display a second cake
if is_leap_year:
    print("\nBonus: You were born in a leap year! Here is a second cake:")
    print(cake)
#*How it works:**

#**Candles Calculation:** Uses modulo division (`age % 10`) to extract the last digit of the age and generates the corresponding count of `'i'` characters.
# **Dynamic Centering:** Centers the candles dynamically inside the `___iiiii___` top layer.
# **Leap Year Logic:** Evaluates standard calendar leap year rules (divisible by 4 and not 100, unless also divisible by 400) to print a second cake if true.
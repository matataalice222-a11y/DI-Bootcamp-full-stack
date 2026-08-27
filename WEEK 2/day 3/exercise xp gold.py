

#*Exercise 1: Upcoming Holiday*
from datetime import datetime

def upcoming_holiday(country_code='US'):
    today =datetime.now()
    print(f"Today's date: {today.strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Get holidays for the current 
    # Find future holidays
    future_holidays = [
        (date, name) for date, name in country_holidays.items() 
        if datetime.combine(date, datetime.min.time()) > today
    ]
    
    if not future_holidays:
        print("No upcoming holidays found.")
        return

    # Find the nearest holiday
    next_holiday_date, holiday_name = min(future_holidays, key=lambda x: x[0])
    next_holiday_dt = datetime.combine(next_holiday_date, datetime.min.time())
    
    time_left = next_holiday_dt - today
    days = time_left.days
    hours, remainder = divmod(time_left.seconds, 3600)
    minutes, _ = divmod(remainder, 60)
    
    print(f"The next holiday is {holiday_name} in {days} days, {hours} hours, and {minutes} minutes.")

upcoming_holiday()


#*Exercise 2: How Old Are You On Jupiter?**


def calculate_age_on_planets(seconds):
    earth_year_seconds = 31557600
    
    orbital_periods = {
        'Earth': 1.0,
        'Mercury': 0.2408467,
        'Venus': 0.61519726,
        'Mars': 1.8808158,
        'Jupiter': 11.862615,
        'Saturn': 29.447498,
        'Uranus': 84.016846,
        'Neptune': 164.79132
    }
    
    earth_years = seconds / earth_year_seconds
    
    for planet, period in orbital_periods.items():
        planet_age = earth_years / period
        print(f"{planet}: {planet_age:.2f} {planet}-years old")

calculate_age_on_planets(1000000000)



#*Exercise 3: Regular Expression #1**


import re

def return_numbers(text_string):
    numbers = re.findall(r'\d', text_string)
    return ''.join(numbers)

print(return_numbers('k5k3q2g5z6x9bn'))  # Output: 532569


#*Exercise 4: Regular Expression #2**


import re

def validate_full_name():
    # Matches exactly two capitalized words containing only letters separated by one space
    pattern = r'^[A-Z][a-zA-Z]*\s[A-Z][a-zA-Z]*$'
    
    while True:
        full_name = input("Enter your full name (e.g., John Doe): ").strip()
        if re.match(pattern, full_name):
            print("Valid name!")
            break
        else:
            print("Invalid input. Name must contain exactly two words, letters only, with each word capitalized.")

validate_full_name()


#Exercise 5: Python Password Generator**

import random
import string

def generate_password(length):
    digits = string.digits
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    special = "!@#$%^_"
    all_chars = digits + lowercase + uppercase + special

    # Guarantee required criteria
    password = [
        random.choice(digits),
        random.choice(lowercase),
        random.choice(uppercase),
        random.choice(special)
    ]

    # Fill remainder
    password += [random.choice(all_chars) for _ in range(length - 4)]
    random.shuffle(password)
    return ''.join(password)

def test_password(password, expected_length):
    if len(password) != expected_length:
        return False
    has_digit = any(c in string.digits for c in password)
    has_lower = any(c in string.ascii_lowercase for c in password)
    has_upper = any(c in string.ascii_uppercase for c in password)
    has_special = any(c in "!@#$%^_" for c in password)
    return has_digit and has_lower and has_upper and has_special

# Run automated tests
def run_tests():
    for _ in range(100):
        test_length = random.randint(6, 30)
        pwd = generate_password(test_length)
        assert test_password(pwd, test_length), f"Test failed for password: {pwd}"
    print("All 100 password generation tests passed successfully!")

run_tests()

# Interactive program flow
def main():
    while True:
        try:
            length = int(input("Enter desired password length (6-30): "))
            if 6 <= length <= 30:
                break
            print("Length must be between 6 and 30.")
        except ValueError:
            print("Please enter a valid number.")

    password = generate_password(length)
    print(f"\nGenerated Password: {password}")
    print("Please keep this password in a safe place!")

main()

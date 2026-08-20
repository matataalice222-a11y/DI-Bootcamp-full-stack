

### Exercise 1: When will I retire?

def get_age(year, month, day):
    # Hard-coded current date
    current_year = 2026
    current_month = 8
    current_day = 20
    
    # Calculate age accounting for whether birthday has occurred this year
    age = current_year - year - ((current_month, current_day) < (month, day))
    return age

def can_retire(gender, date_of_birth):
    # Parse date string "YYYY/MM/DD"
    year, month, day = map(int, date_of_birth.split('/'))
    
    # Calculate age using get_age function
    age = get_age(year, month, day)
    
    # Retirement thresholds
    if gender.lower() == 'm':
        return age >= 67
    elif gender.lower() == 'f':
        return age >= 62
    else:
        return False

# Interactive execution
user_gender = input("Enter your gender (m/f): ").strip()
user_dob = input("Enter your date of birth (YYYY/MM/DD): ").strip()

if can_retire(user_gender, user_dob):
    print("Congratulations! You can retire.")
else:
    print("You are not eligible to retire yet.")


### Exercise 2: Sum ($X + XX + XXX + XXXX$)


def calculate_series_sum(x):
    # Convert integer to string to build repeating digits, then back to int
    x_str = str(x)
    term1 = int(x_str)
    term2 = int(x_str * 2)
    term3 = int(x_str * 3)
    term4 = int(x_str * 4)
    
    return term1 + term2 + term3 + term4

# Example Call:
result = calculate_series_sum(3)
print(f"Result for X=3: {result}")  # Output: 3702



### Exercise 3: Double Dice


import random

def throw_dice():
    return random.randint(1, 6)

def throw_until_doubles():
    throws = 0
    while True:
        throws += 1
        die1 = throw_dice()
        die2 = throw_dice()
        if die1 == die2:
            break
    return throws

def main():
    results = []  # List collection to store count of throws for each run
    
    for _ in range(100):
        throws_needed = throw_until_doubles()
        results.append(throws_needed)
        
    total_throws = sum(results)
    average_throws = total_throws / len(results)
    
    print(f"Total throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws:.2f}")

main()


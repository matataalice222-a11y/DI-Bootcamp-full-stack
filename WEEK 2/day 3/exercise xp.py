
### **Exercise 1: Currencies**


class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        # Format plural string for output (e.g., '5 dollars')
        label = self.currency if self.amount == 1 else f"{self.currency}s"
        return f"{self.amount} {label}"

    def __repr__(self):
        return self.__str__()

    def __int__(self):
        return int(self.amount)

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        elif isinstance(other, (int, float)):
            return self.amount + other
        return NotImplemented

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        elif isinstance(other, (int, float)):
            self.amount += other
        else:
            return NotImplemented
        return self


### **Exercise 2: Import**



def sum_two_numbers(a, b):
    print(a + b)



#exercise_one.py**

sum_two_numbers(5, 10)


### **Exercise 3: String module**

import string
import random

def generate_random_string(length=5):
    letters = string.ascii_letters  # Contains uppercase and lowercase letters
    random_string = "".join(random.choice(letters) for _ in range(length))
    return random_string

print(generate_random_string())



### **Exercise 4: Current Date**


from datetime import date

def display_current_date():
    today = date.today()
    print(f"Current Date: {today}")

display_current_date()


### **Exercise 5: Time Left Until January 1st**

from datetime import datetime

def time_until_new_year():
    now = datetime.now()
    next_year = datetime(year=now.year + 1, month=1, day=1)
    time_left = next_year - now
    
    days = time_left.days
    hours, remainder = divmod(time_left.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    print(f"Time left until January 1st: {days} days, {hours}:{minutes:02d}:{seconds:02d}")

time_until_new_year()



### **Exercise 6: Birthday and Minutes**

from datetime import datetime

def minutes_lived(birthdate_str):
    # Expects birthdate format: 'YYYY-MM-DD HH:MM' or 'YYYY-MM-DD'
    try:
        birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d %H:%M")
    except ValueError:
        birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")

    now = datetime.now()
    time_lived = now - birthdate
    total_minutes = int(time_lived.total_seconds() / 60)
    
    print(f"You have lived approximately {total_minutes:,} minutes!")

minutes_lived("2000-01-01")


### **Exercise 7: Faker Module**

from faker import Faker

fake = Faker()
users = []

def add_fake_users(count):
    for _ in range(count):
        user = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        }
        users.append(user)

add_fake_users(5)
print(users)

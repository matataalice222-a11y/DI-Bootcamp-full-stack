

### **Exercise 1: Pets**


class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# Step 1: Create the Siamese Class
class Siamese(Cat):
    pass

# Step 2: Create a List of Cat Instances
cat1 = Bengal("Leo", 3)
cat2 = Chartreux("Felix", 5)
cat3 = Siamese("Luna", 2)

all_cats = [cat1, cat2, cat3]

# Step 3: Create a Pets Instance
sara_pets = Pets(all_cats)

# Step 4: Take Cats for a Walk
sara_pets.walk()



### **Exercise 2: Dog
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if my_power > other_power:
            return f"{self.name} won the fight!"
        elif other_power > my_power:
            return f"{other_dog.name} won the fight!"
        else:
            return "It's a tie!"

# Step 2: Create Dog Instances
dog1 = Dog("Rex", 4, 20)
dog2 = Dog("Ballto", 2, 15)
dog3 = Dog("Max", 5, 25)

# Step 3: Test Dog Methods
print(dog1.bark())
print(f"{dog2.name}'s run speed: {dog2.run_speed()}")
print(dog1.fight(dog2))



### **Exercise 3: Dogs Domesticated**


import random

# Step 1: Import Dog Class (Assuming Dog is available in scope or imported from dog_module)
# from dog_module import Dog 

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        # Extract names from Dog objects if passed, or use string args directly
        dog_names = [self.name] + [dog.name if isinstance(dog, Dog) else str(dog) for dog in args]
        names_str = ", ".join(dog_names)
        print(f"{names_str} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
            trick = random.choice(tricks)
            print(f"{self.name} {trick}")

# Step 3: Test PetDog Methods
my_dog = PetDog("Fido", 2, 10)
other_dog1 = PetDog("Buddy", 3, 12)

my_dog.train()
my_dog.play(other_dog1, "Max")
my_dog.do_a_trick()



### **Exercise 4: Family and Person Classes**


class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18

class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        person = Person(first_name, age)
        person.last_name = self.last_name
        self.members.append(person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return
        print(f"No family member found with the name {first_name}.")

    def family_presentation(self):
        print(f"Family Last Name: {self.last_name}")
        for member in self.members:
            print(f"Name: {member.first_name}, Age: {member.age}")

# Testing the implementation
my_family = Family("Smith")

my_family.born("John", 45)
my_family.born("Jane", 43)
my_family.born("Tom", 20)
my_family.born("Timmy", 12)

my_family.family_presentation()

my_family.check_majority("Tom")
my_family.check_majority("Timmy")


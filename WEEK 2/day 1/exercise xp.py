

#Exercise 1: Cats**
class Cat:

  def __init__(self, cat_name, cat_age):
    self.name = cat_name
    self.age = cat_age


# Step 1: Create cat objects
cat1 = Cat("Whiskers", 3)
cat2 = Cat("Felix", 7)
cat3 = Cat("Luna", 5)


# Step 2: Create a function to find the oldest cat
def find_oldest_cat(cat1, cat2, cat3):
  cats = [cat1, cat2, cat3]
  oldest = cats[0]
  for cat in cats:
    if cat.age > oldest.age:
      oldest = cat
  return oldest


# Step 3: Print the oldest cat's details
oldest_cat = find_oldest_cat(cat1, cat2, cat3)
print(
    f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old."
)



#Exercise 2: Dogs**


# Step 1: Create the Dog Class
class Dog:

  def __init__(self, name, height):
    self.name = name
    self.height = height

  def bark(self):
    print(f"{self.name} goes woof!")

  def jump(self):
    x = self.height * 2
    print(f"{self.name} jumps {x} cm high!")


# Step 2: Create Dog Objects
davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Teacup", 20)

# Step 3: Print Dog Details and Call Methods
print(f"David's dog: Name = {davids_dog.name}, Height = {davids_dog.height}cm")
davids_dog.bark()
davids_dog.jump()

print(f"Sarah's dog: Name = {sarahs_dog.name}, Height = {sarahs_dog.height}cm")
sarahs_dog.bark()
sarahs_dog.jump()

# Step 4: Compare Dog Sizes
if davids_dog.height > sarahs_dog.height:
  print(f"{davids_dog.name} is bigger than {sarahs_dog.name}.")
elif sarahs_dog.height > davids_dog.height:
  print(f"{sarahs_dog.name} is bigger than {davids_dog.name}.")
else:
  print(f"{davids_dog.name} and {sarahs_dog.name} are the same size.")



#*Exercise 3: Who’s the song producer?**


# Step 1: Create the Song Class
class Song:

  def __init__(self, lyrics):
    self.lyrics = lyrics

  def sing_me_a_song(self):
    for line in self.lyrics:
      print(line)


# Example usage
stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven",
])

stairway.sing_me_a_song()

#Exercise 4: Afternoon at the Zoo (Includes Bonus)**


class Zoo:

  def __init__(self, zoo_name):
    self.name = zoo_name
    self.animals = []
    self.groups = {}

  # Bonus implementation: accepts multiple animal names via *args
  def add_animal(self, *new_animals):
    for animal in new_animals:
      if animal not in self.animals:
        self.animals.append(animal)

  def get_animals(self):
    print(f"Animals in {self.name}: {', '.join(self.animals)}")

  def sell_animal(self, animal_sold):
    if animal_sold in self.animals:
      self.animals.remove(animal_sold)
      print(f"{animal_sold} was sold.")
    else:
      print(f"{animal_sold} is not in the zoo.")

  def sort_animals(self):
    self.animals.sort()
    self.groups = {}

    for animal in self.animals:
      first_letter = animal[0].upper()
      if first_letter not in self.groups:
        self.groups[first_letter] = []
      self.groups[first_letter].append(animal)

    return self.groups

  def get_groups(self):
    for letter, animal_list in self.groups.items():
      print(f"{letter}: {animal_list}")


# Step 2: Create a Zoo instance
brooklyn_safari = Zoo("Brooklyn Safari")

# Step 3: Test the Zoo methods
brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Cougar", "Cat", "Zebra")
brooklyn_safari.get_animals()

brooklyn_safari.sell_animal("Bear")
brooklyn_safari.get_animals()

brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()


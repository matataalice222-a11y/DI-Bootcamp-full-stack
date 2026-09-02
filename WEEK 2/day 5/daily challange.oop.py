
### Exercise 1: OOP Quiz Answers

# **Class:** A blueprint or template for creating objects. It defines the attributes (data) and methods (behavior) that the created objects will have.
# **Instance:** A specific realization of a class (an individual object created using the class template).
# **Encapsulation:** The practice of bundling data (attributes) and methods that operate on that data into a single unit (a class), while restricting direct external access to internal components.
# **Abstraction:** Hiding complex implementation details and showing only the essential features of an object to simplify interaction.
# **Inheritance:** A mechanism where a child class derives attributes and methods from a parent class, promoting code reuse.
# **Multiple Inheritance:** A feature where a child class can inherit directly from more than one parent class.
# **Polymorphism:** The ability of different classes to respond to the same method call in their own specific ways.
#**Method Resolution Order (MRO):** The deterministic order in which Python searches for attributes or methods in a class hierarchy, especially when dealing with multiple inheritance.



### Exercise 2: Deck of Cards Implementation


import random


class Card:

    def __init__(self, suit: str, value: str):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"


class Deck:

    SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"]
    VALUES = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
    ]

    def __init__(self):
        self.cards = []
        self.reset_deck()

    def reset_deck(self):
        """Generates a complete 52-card deck."""
        self.cards = [
            Card(suit, value) for suit in self.SUITS for value in self.VALUES
        ]

    def shuffle(self):
        """Ensures the deck has all 52 cards and rearranges them randomly."""
        if len(self.cards) != 52:
            self.reset_deck()
        random.shuffle(self.cards)

    def deal(self):
        """Deals a single card from the deck, removing it from the deck."""
        if not self.cards:
            return "All cards have been dealt."
        return self.cards.pop()


# --- Usage Example ---
deck = Deck()
print(f"Initial deck size: {len(deck.cards)}")

deck.shuffle()
print("Deck shuffled!")

dealt_card = deck.deal()
print(f"Dealt card: {dealt_card}")
print(f"Remaining cards: {len(deck.cards)}")



import random

wordslist = [
    "correction",
    "childish",
    "beach",
    "python",
    "assertive",
    "interference",
    "complete",
    "share",
    "credit card",
    "rush",
    "south",
]
word = random.choice(wordslist)

### YOUR CODE STARTS FROM HERE ###

# Visual representation of the gallows for 0 to 6 incorrect guesses
HANGMAN_PICS = [
    """
   +---+
   |   |
       |
       |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
       |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
   |   |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
  /|   |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========""",
    """
   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========""",
]

BODY_PARTS = [
    "head",
    "body",
    "left arm",
    "right arm",
    "left leg",
    "right leg",
]


def display_game_state(word, guessed_letters, wrong_guesses):
    """Prints the current gallows status, the word with hidden letters, and guessed letters."""
    print(HANGMAN_PICS[len(wrong_guesses)])

    # Hide unguessed letters with '*', preserve spaces for multi-word entries
    display_word = [
        char if (char == " " or char in guessed_letters) else "*"
        for char in word
    ]
    print("\nWord: " + " ".join(display_word))
    print(f"Guessed letters: {', '.join(sorted(guessed_letters))}\n")


def play_hangman():
    guessed_letters = set()
    wrong_guesses = []
    max_attempts = 6

    print("Welcome to Hangman!")

    while len(wrong_guesses) < max_attempts:
        display_game_state(word, guessed_letters, wrong_guesses)

        # Check if the player has guessed all letters in the word/phrase
        if all(char == " " or char in guessed_letters for char in word):
            print(f"🎉 Congratulations! You guessed the word: '{word}'")
            return

        guess = input("Guess a letter: ").lower().strip()

        # Input validation
        if len(guess) != 1 or not guess.isalpha():
            print("⚠️ Please enter a single letter.\n")
            continue

        if guess in guessed_letters:
            print(f"⚠️ You already guessed '{guess}'. Try another letter.\n")
            continue

        guessed_letters.add(guess)

        if guess in word:
            print(f"✅ Good guess! '{guess}' is in the word.\n")
        else:
            wrong_guesses.append(guess)
            added_part = BODY_PARTS[len(wrong_guesses) - 1]
            print(
                f"❌ '{guess}' is not in the word. Added {added_part} to the gallows!\n"
            )

    # Game over condition
    display_game_state(word, guessed_letters, wrong_guesses)
    print(f"☠️ Game Over! All body parts are on the gallows.")
    print(f"The secret word was: '{word}'")


if __name__ == "__main__":
    play_hangman()


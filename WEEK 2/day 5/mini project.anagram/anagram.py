from pathlib import Path

from anagram_checker import AnagramChecker


def validate_input(user_input: str):
    """Validates user input: single word, alphabetic characters only."""
    cleaned = user_input.strip()

    if not cleaned:
        return None, "Input cannot be empty."

    words = cleaned.split()
    if len(words) > 1:
        return None, "Error: Only a single word is allowed."

    word = words[0]
    if not word.isalpha():
        return None, "Error: Word must contain only alphabetic characters."

    return word, None


def main():
    sowpods_path = Path(__file__).parent / "sowpods.txt"

    try:
        checker = AnagramChecker(sowpods_path)
    except FileNotFoundError:
        print(f"Error: Word list file not found: {sowpods_path}")
        return

    while True:
        print("\n--- ANAGRAM CHECKER ---")
        print("1. Input a word")
        print("2. Exit")
        choice = input("Select an option (1-2): ").strip()

        if choice == "2":
            print("Goodbye!")
            break
        elif choice == "1":
            word, error = validate_input(input("Enter a word: "))

            if error:
                print(f"\n[!] {error}")
                continue

            is_valid = checker.is_valid_word(word)
            anagrams = checker.get_anagrams(word)

            print("\n" + "=" * 35)
            print(f'YOUR WORD : "{word.upper()}"')
            print(
                f"Status    : "
                f"{'This is a valid English word.' if is_valid else 'This word is not in the dictionary.'}"
            )
            print(f"Anagrams  : {', '.join(anagrams) if anagrams else 'No anagrams found.'}")
            print("=" * 35)
        else:
            print("Invalid choice. Please enter 1 or 2.")


if __name__ == "__main__":
    main()
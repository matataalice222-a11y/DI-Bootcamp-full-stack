class AnagramChecker:

    def __init__(self, file_path="sowpods.txt"):
        """Loads the word list from a text file into a set of lowercased words."""
        with open(file_path, "r", encoding="utf-8") as file:
            self.word_list = {word.strip().lower() for word in file}

    def is_valid_word(self, word: str) -> bool:
        """Checks if the given word exists in the loaded word list."""
        return word.lower() in self.word_list

    def is_anagram(self, word1: str, word2: str) -> bool:
        """Checks if two words are anagrams of each other."""
        w1, w2 = word1.lower(), word2.lower()
        return sorted(w1) == sorted(w2)

    def get_anagrams(self, word: str) -> list:
        """Finds all anagrams for the given word from the word list."""
        target = word.lower()
        anagrams = []

        for candidate in self.word_list:
            if candidate != target and self.is_anagram(target, candidate):
                anagrams.append(candidate)

        return anagrams
import re
import string


class Text:
    def __init__(self, text):
        self.text = text

    def word_frequency(self, word):
        words = self.text.split()
        count = words.count(word)
        return count if count > 0 else None

    def most_common_word(self):
        words = self.text.split()

        if not words:
            return None

        frequencies = {}

        for word in words:
            frequencies[word] = frequencies.get(word, 0) + 1

        return max(frequencies, key=frequencies.get)

    def unique_words(self):
        return list(set(self.text.split()))

    @classmethod
    def from_file(cls, file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            return cls(file.read())


class TextModification(Text):
    def remove_punctuation(self):
        translator = str.maketrans("", "", string.punctuation)
        self.text = self.text.translate(translator)
        return self.text

    def remove_stop_words(self):
        stop_words = {
            "a", "an", "the", "is", "are", "am", "and", "or",
            "in", "on", "at", "to", "of", "for", "with", "this",
            "that", "it", "as", "was", "were", "be", "by"
        }

        words = self.text.split()
        filtered_words = [
            word for word in words
            if word.lower() not in stop_words
        ]

        self.text = " ".join(filtered_words)
        return self.text

    def remove_special_characters(self):
        self.text = re.sub(r"[^A-Za-z0-9\s]", "", self.text)
        return self.text
    
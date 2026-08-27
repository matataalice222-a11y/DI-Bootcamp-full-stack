
### 1. Install the module

### 2. Python code


from googletrans import Translator

french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]

translator = Translator()

translations = {}

for word in french_words:
    translated = translator.translate(word, src="fr", dest="en")
    translations[word] = translated.text

print(translations)


### Expected output


{
    "Bonjour": "Hello",
    "Au revoir": "Goodbye",
    "Bienvenue": "Welcome",
    "A bientôt": "See you soon"
}

### How it works

#`Translator()` creates the translator.
# `translate()` translates each French word.
# `src="fr"` means the source language is **French**.
# `dest="en"` means the destination language is **English**.
# The `for` loop goes through each word.
# `translations[word] = translated.text` stores the French word and its English translation in a dictionary.

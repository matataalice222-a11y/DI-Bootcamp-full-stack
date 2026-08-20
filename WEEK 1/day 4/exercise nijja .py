


def get_full_name(first_name, last_name, middle_name=""):
    if middle_name:
        full_name = f"{first_name} {middle_name} {last_name}"
    else:
        full_name = f"{first_name} {last_name}"
    return full_name.title()

# Examples
print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))  # John Hooker Lee
print(get_full_name(first_name="bruce", last_name="lee"))                     # Bruce Lee



#Exercise 2: From English to Morse**


MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----'
}

# Invert dictionary for reverse lookup
ENGLISH_CODE_DICT = {value: key for key, value in MORSE_CODE_DICT.items()}

def english_to_morse(text):
    words = text.upper().split(' ')
    morse_words = []
    for word in words:
        morse_letters = [MORSE_CODE_DICT[char] for char in word if char in MORSE_CODE_DICT]
        morse_words.append(' '.join(morse_letters))
    return ' / '.join(morse_words)

def morse_to_english(morse):
    morse_words = morse.split(' / ')
    english_words = []
    for word in morse_words:
        letters = word.split(' ')
        english_letters = [ENGLISH_CODE_DICT[code] for code in letters if code in ENGLISH_CODE_DICT]
        english_words.append(''.join(english_letters))
    return ' '.join(english_words).capitalize()

# Example
morse = english_to_morse("Hello World")
print(morse)  # .... . .-.. .-.. --- / .-- --- .-. .-.. -..
print(morse_to_english(morse))  # Hello world



#*Exercise 3: Box of stars**


def box_printer(*args):
    if not args:
        return
    
    # Determine length of the longest string
    max_len = max(len(s) for s in args)
    
    # Print top border
    print("*" * (max_len + 4))
    
    # Print each line padded with spaces
    for word in args:
        print(f"* {word.ljust(max_len)} *")
        
    # Print bottom border
    print("*" * (max_len + 4))

# Example
box_printer("Hello", "World", "in", "reallylongword", "a", "frame")



#*Exercise 4: What is the purpose of this code?**


#**Purpose:** It sorts an unsorted list of numbers in **ascending order** (from smallest to largest) in place.
# **How it works:** It iterates through the list starting from the second element, compares the current value (`currentvalue`) with preceding elements, and shifts larger elements one position to the right until it finds the correct insertion position for `currentvalue`.
#**Output:** `[17, 20, 26, 31, 44, 54, 55, 77, 93]`
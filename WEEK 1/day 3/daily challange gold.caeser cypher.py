def caesar_cipher(text, shift, mode):
    result = ""
    
    # Decryption is simply shifting in the opposite direction
    if mode == "decrypt":
        shift = -shift

    for char in text:
        if char.isupper():
            # Shift uppercase characters (ASCII 65-90)
            result += chr((ord(char) - 65 + shift) % 26 + 65)
        elif char.islower():
            # Shift lowercase characters (ASCII 97-122)
            result += chr((ord(char) - 97 + shift) % 26 + 97)
        else:
            # Leave spaces, numbers, and punctuation unchanged
            result += char

    return result


def main():
    print("=== Caesar Cipher Program ===")
    
    # 1. Ask the user for mode
    while True:
        mode = input("Would you like to 'encrypt' or 'decrypt'? ").strip().lower()
        if mode in ["encrypt", "decrypt"]:
            break
        print("Invalid option. Please enter 'encrypt' or 'decrypt'.")

    # 2. Get message input
    message = input("Enter your message: ")

    # 3. Get shift value input
    while True:
        try:
            shift = int(input("Enter the shift number (e.g., 3): "))
            break
        except ValueError:
            print("Please enter a valid integer for the shift.")

    # 4. Perform encryption/decryption
    output = caesar_cipher(message, shift, mode)
    
    print(f"\nResult ({mode}ed): {output}")


if __name__ == "__main__":
    main()


class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        """Simulates placing a call to another Phone object."""
        log_entry = f"{self.phone_number} called {other_phone.phone_number}"
        print(log_entry)
        self.call_history.append(log_entry)

    def show_call_history(self):
        """Prints the full call history of this phone."""
        print(f"\n--- Call History for {self.phone_number} ---")
        if not self.call_history:
            print("No calls recorded.")
        for call in self.call_history:
            print(call)

    def send_message(self, other_phone, content):
        """
        Sends a message to another Phone object and records it in both 
        sender and recipient message logs.
        """
        message_data = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        # Save to sender's messages
        self.messages.append(message_data)
        # Save to receiver's messages
        other_phone.messages.append(message_data)
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}")

    def show_outgoing_messages(self):
        """Displays all messages sent from this phone."""
        print(f"\n--- Outgoing Messages for {self.phone_number} ---")
        outgoing = [m for m in self.messages if m["from"] == self.phone_number]
        if not outgoing:
            print("No outgoing messages.")
        for msg in outgoing:
            print(f"To {msg['to']}: {msg['content']}")

    def show_incoming_messages(self):
        """Displays all messages received by this phone."""
        print(f"\n--- Incoming Messages for {self.phone_number} ---")
        incoming = [m for m in self.messages if m["to"] == self.phone_number]
        if not incoming:
            print("No incoming messages.")
        for msg in incoming:
            print(f"From {msg['from']}: {msg['content']}")

    def show_messages_from(self, sender_number):
        """Displays messages received specifically from a target phone number."""
        print(f"\n--- Messages from {sender_number} to {self.phone_number} ---")
        filtered = [
            m for m in self.messages 
            if m["from"] == sender_number and m["to"] == self.phone_number
        ]
        if not filtered:
            print(f"No messages found from {sender_number}.")
        for msg in filtered:
            print(f"Content: {msg['content']}")


# ==========================================
# TEST YOUR CODE
# ==========================================
if __name__ == "__main__":
    # Create Phone Instances
    phone1 = Phone("555-0101")
    phone2 = Phone("555-0202")
    phone3 = Phone("555-0303")

    # Test Calls
    print("--- Testing Calls ---")
    phone1.call(phone2)
    phone1.call(phone3)
    
    # Show Call History
    phone1.show_call_history()

    # Test Messages
    print("\n--- Testing Messaging ---")
    phone1.send_message(phone2, "Hey, how are you?")
    phone2.send_message(phone1, "I'm doing well, thanks!")
    phone3.send_message(phone1, "Don't forget the meeting tomorrow.")

    # View Outgoing/Incoming
    phone1.show_outgoing_messages()
    phone1.show_incoming_messages()

    # View Messages from a specific sender
    phone1.show_messages_from("555-0202")


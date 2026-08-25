
import sys

# ==========================================
# Parts I & III: BankAccount Class
# ==========================================
class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            return True
        return False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to perform a deposit.")
        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Deposit amount must be a positive integer.")
        self.balance += amount
        print(f"Successfully deposited ${amount}. New balance: ${self.balance}")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to perform a withdrawal.")
        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")
        if amount > self.balance:
            raise Exception("Insufficient funds.")
        self.balance -= amount
        print(f"Successfully withdrew ${amount}. New balance: ${self.balance}")


# ==========================================
# Part II: MinimumBalanceAccount Class
# ==========================================
class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to perform a withdrawal.")
        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Cannot withdraw ${amount}. Balance cannot fall below minimum balance of ${self.minimum_balance}.")
        self.balance -= amount
        print(f"Successfully withdrew ${amount}. New balance: ${self.balance}")


# ==========================================
# Part IV: ATM Class (BONUS)
# ==========================================
class ATM:
    def __init__(self, account_list, try_limit):
        # Validate account_list contains BankAccount or MinimumBalanceAccount instances
        if not isinstance(account_list, list) or not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("account_list must be a list of BankAccount or MinimumBalanceAccount instances.")
        self.account_list = account_list

        # Validate try_limit is a positive number
        try:
            if not isinstance(try_limit, (int, float)) or try_limit <= 0:
                raise Exception("try_limit must be a positive number.")
            self.try_limit = try_limit
        except Exception as e:
            print(f"Error initializing try_limit: {e}")
            self.try_limit = 2

        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n=== ATM MAIN MENU ===")
            print("1. Log in")
            print("2. Exit")
            choice = input("Select an option (1-2): ").strip()

            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Thank you for using the ATM. Goodbye!")
                break
            else:
                print("Invalid option. Please try again.")

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                print(f"\nWelcome, {username}!")
                self.current_tries = 0  # Reset tries on successful login
                self.show_account_menu(account)
                return

        # If authentication failed for all accounts
        self.current_tries += 1
        print(f"Invalid credentials. Try {self.current_tries}/{self.try_limit}")

        if self.current_tries >= self.try_limit:
            print("\nMaximum login attempts reached. Program shutting down.")
            sys.exit()

    def show_account_menu(self, account):
        while True:
            print(f"\n--- ACCOUNT MENU ({account.username}) ---")
            print(f"Current Balance: ${account.balance}")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit to Main Menu")
            choice = input("Select an option (1-3): ").strip()

            try:
                if choice == "1":
                    amount = int(input("Enter deposit amount: "))
                    account.deposit(amount)
                elif choice == "2":
                    amount = int(input("Enter withdrawal amount: "))
                    account.withdraw(amount)
                elif choice == "3":
                    account.authenticated = False  # Log out user
                    print("Logged out successfully.")
                    break
                else:
                    print("Invalid option. Please try again.")
            except ValueError:
                print("Error: Please enter a valid integer amount.")
            except Exception as e:
                print(f"Error: {e}")


# ==========================================
# Testing / Demonstration
# ==========================================
if __name__ == "__main__":
    acc1 = BankAccount("alice", "pass123", balance=500)
    acc2 = MinimumBalanceAccount("bob", "secret456", balance=300, minimum_balance=50)

    # Start the ATM system
    atm = ATM(account_list=[acc1, acc2], try_limit=3)


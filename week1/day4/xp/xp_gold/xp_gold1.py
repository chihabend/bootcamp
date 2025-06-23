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
        else:
            return False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("User not authenticated.")
        if amount <= 0:
            raise ValueError("Deposit must be a positive amount.")
        self.balance += amount

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("User not authenticated.")
        if amount <= 0:
            raise ValueError("Withdraw must be a positive amount.")
        self.balance -= amount
class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("User not authenticated.")
        if amount <= 0:
            raise ValueError("Withdraw must be a positive amount.")
        if self.balance - amount < self.minimum_balance:
            raise Exception("Insufficient funds to maintain minimum balance.")
        self.balance -= amount
class ATM:
    def __init__(self, account_list, try_limit):
        if not isinstance(account_list, list) or not all(isinstance(acc, BankAccount) for acc in account_list):
            raise TypeError("account_list must be a list of BankAccount instances.")
        if not isinstance(try_limit, int) or try_limit <= 0:
            print("Invalid try limit, defaulting to 2.")
            try_limit = 2

        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n--- ATM MENU ---")
            print("1. Login")
            print("2. Exit")
            choice = input("Choose an option: ")
            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Goodbye.")
                break
            else:
                print("Invalid option.")

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                print(f"Welcome, {username}!")
                self.show_account_menu(account)
                return
        self.current_tries += 1
        print("Incorrect username or password.")
        if self.current_tries >= self.try_limit:
            print("Maximum number of tries exceeded. Exiting.")
            exit()

    def show_account_menu(self, account):
        while True:
            print(f"\n--- Account Menu ({account.username}) ---")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Check Balance")
            print("4. Logout")
            choice = input("Choose an action: ")
            try:
                if choice == "1":
                    amount = int(input("Amount to deposit: "))
                    account.deposit(amount)
                elif choice == "2":
                    amount = int(input("Amount to withdraw: "))
                    account.withdraw(amount)
                elif choice == "3":
                    print(f"Current balance: {account.balance}")
                elif choice == "4":
                    account.authenticated = False
                    print("Logged out.")
                    break
                else:
                    print("Invalid option.")
            except Exception as e:
                print("Error:", e)
if __name__ == "__main__":
    acc1 = BankAccount("alice", "1234", 1000)
    acc2 = MinimumBalanceAccount("bob", "pass", 500, 100)
    atm = ATM([acc1, acc2], try_limit=3)

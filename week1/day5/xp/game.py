import random

class Game:
    def get_user_item(self):
        options = ['rock', 'paper', 'scissors']
        while True:
            user_item = input("Please select (rock/paper/scissors): ").lower()
            if user_item in options:
                return user_item
            print("Invalid input. Try again.")

    def get_computer_item(self):
        return random.choice(['rock', 'paper', 'scissors'])

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif (user_item == "rock" and computer_item == "scissors") or \
             (user_item == "scissors" and computer_item == "paper") or \
             (user_item == "paper" and computer_item == "rock"):
            return "win"
        else:
            return "loss"

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        
        if result == "win":
            print(f"You selected {user_item}. The computer selected {computer_item}. You win!")
        elif result == "loss":
            print(f"You selected {user_item}. The computer selected {computer_item}. You lose!")
        else:
            print(f"You selected {user_item}. The computer selected {computer_item}. It's a draw!")

        return result

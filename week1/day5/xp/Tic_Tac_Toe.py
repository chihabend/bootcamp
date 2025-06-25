
board = [" " for _ in range(9)]

def display_board():
    print()
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---+---+---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---+---+---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print()

def player_input(player):
    while True:
        try:
            pos = int(input(f"Player {player} - Enter a position (1-9): ")) - 1
            if pos in range(9) and board[pos] == " ":
                board[pos] = player
                break
            else:
                print("Invalid move. Try again.")
        except ValueError:
            print("Please enter a number between 1 and 9.")

def check_win(player):
    win_combos = [
        (0, 1, 2), (3, 4, 5), (6, 7, 8),
        (0, 3, 6), (1, 4, 7), (2, 5, 8),  
        (0, 4, 8), (2, 4, 6)              
    ]
    return any(board[a] == board[b] == board[c] == player for a, b, c in win_combos)

def is_tie():
    return " " not in board

def play():
    print("🎮 Welcome to Tic Tac Toe!")
    display_board()
    current_player = "X"

    while True:
        player_input(current_player)
        display_board()

        if check_win(current_player):
            print(f"🎉 Player {current_player} wins!")
            break
        elif is_tie():
            print("🤝 It's a tie!")
            break

        current_player = "O" if current_player == "X" else "X"

# Start the game
if __name__ == "__main__":
    play()

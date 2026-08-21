
# Tic Tac Toe Game in Python


def display_board(board):
    """Prints the current state of the 3x3 game board."""
    print("\n  1   2   3")
    for i, row in enumerate(board):
        print(f"{i + 1} " + " | ".join(row))
        if i < 2:
            print(" ---+---+---")
    print()


def player_input(board, player):
    """Gets row and column from the player, validating range and empty cell."""
    while True:
        try:
            row = (
                int(
                    input(f"Player {player}, enter row (1-3): ")
                )
                - 1
            )
            col = (
                int(
                    input(f"Player {player}, enter column (1-3): ")
                )
                - 1
            )

            if row not in range(3) or col not in range(3):
                print("Invalid input! Row and column must be between 1 and 3.")
            elif board[row][col] != " ":
                print("That square is already taken! Pick another.")
            else:
                return row, col
        except ValueError:
            print("Invalid input! Please enter numbers only.")


def check_win(board, player):
    """Checks rows, columns, and diagonals for a winning line."""
    # Check rows and columns
    for i in range(3):
        if all(board[i][j] == player for j in range(3)):
            return True
        if all(board[j][i] == player for j in range(3)):
            return True

    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2] == player:
        return True
    if board[0][2] == board[1][1] == board[2][0] == player:
        return True

    return False


def check_tie(board):
    """Checks if all board positions are filled."""
    return all(cell != " " for row in board for cell in row)


def play():
    """Main game loop managing turns, board state, and end conditions."""
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"

    print("Welcome to Tic Tac Toe!")

    while True:
        display_board(board)

        # Get current player's move and update the board
        row, col = player_input(board, current_player)
        board[row][col] = current_player

        # Check for win condition
        if check_win(board, current_player):
            display_board(board)
            print(f"🎉 Player {current_player} wins!")
            break

        # Check for tie condition
        if check_tie(board):
            display_board(board)
            print("🤝 It's a tie!")
            break

        # Switch players
        current_player = "O" if current_player == "X" else "X"


if __name__ == "__main__":
    play()


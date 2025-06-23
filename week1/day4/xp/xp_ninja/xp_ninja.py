import random
import time
import os

class GameOfLife:
    def __init__(self, rows, cols, initial_state=None):
        self.rows = rows
        self.cols = cols
        self.grid = initial_state if initial_state else self.create_random_grid()

    def create_random_grid(self):
        return [[random.choice([0, 1]) for _ in range(self.cols)] for _ in range(self.rows)]

    def display(self):
        os.system('cls' if os.name == 'nt' else 'clear')
        for row in self.grid:
            print("".join(['🟩' if cell else '⬛' for cell in row]))
        print()

    def count_neighbors(self, row, col):
        directions = [(-1, -1), (-1, 0), (-1, 1),
                      (0, -1),         (0, 1),
                      (1, -1), (1, 0), (1, 1)]
        count = 0
        for dr, dc in directions:
            r, c = row + dr, col + dc
            if 0 <= r < self.rows and 0 <= c < self.cols:
                count += self.grid[r][c]
        return count

    def next_generation(self):
        new_grid = [[0 for _ in range(self.cols)] for _ in range(self.rows)]

        for i in range(self.rows):
            for j in range(self.cols):
                neighbors = self.count_neighbors(i, j)
                if self.grid[i][j] == 1:
                    if neighbors == 2 or neighbors == 3:
                        new_grid[i][j] = 1
                else:
                    if neighbors == 3:
                        new_grid[i][j] = 1
        self.grid = new_grid

    def run(self, generations=10, delay=0.5):
        for gen in range(generations):
            print(f"=== Génération {gen + 1} ===")
            self.display()
            self.next_generation()
            time.sleep(delay)

if __name__ == "__main__":
    game = GameOfLife(rows=10, cols=10)
    game.run(generations=20, delay=0.3)

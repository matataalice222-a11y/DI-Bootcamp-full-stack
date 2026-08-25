

### **Fixed Border Implementain
import time
import os

class Cell:
    def __init__(self, is_alive=False):
        self.is_alive = is_alive

    def __str__(self):
        return "⬛" if self.is_alive else "⬜"

class GameOfLife:
    def __init__(self, rows, cols, initial_pattern=None):
        self.rows = rows
        self.cols = cols
        # Initialize grid with dead cells
        self.grid = [[Cell(False) for _ in range(cols)] for _ in range(rows)]
        
        # Load an initial pattern of live cell coordinates [(r, c), ...]
        if initial_pattern:
            for r, c in initial_pattern:
                if 0 <= r < rows and 0 <= c < cols:
                    self.grid[r][c].is_alive = True

    def get_live_neighbors(self, r, c):
        count = 0
        # Check all 8 neighboring directions
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr == 0 and dc == 0:
                    continue
                nr, nc = r + dr, c + dc
                # Check grid boundaries (fixed borders)
                if 0 <= nr < self.rows and 0 <= nc < self.cols:
                    if self.grid[nr][nc].is_alive:
                        count += 1
        return count

    def step(self):
        """Calculates the next generation of the grid."""
        new_states = [[False for _ in range(self.cols)] for _ in range(self.rows)]

        for r in range(self.rows):
            for c in range(self.cols):
                live_neighbors = self.get_live_neighbors(r, c)
                is_alive = self.grid[r][c].is_alive

                # Apply Conway's Rules
                if is_alive and live_neighbors in (2, 3):
                    new_states[r][c] = True
                elif not is_alive and live_neighbors == 3:
                    new_states[r][c] = True
                else:
                    new_states[r][c] = False

        # Apply state changes simultaneously
        for r in range(self.rows):
            for c in range(self.cols):
                self.grid[r][c].is_alive = new_states[r][c]

    def display(self, generation):
        os.system('cls' if os.name == 'nt' else 'clear')
        print(f"--- Generation {generation} ---")
        for row in self.grid:
            print("".join(str(cell) for cell in row))
        print("\nPress Ctrl+C to stop.")

    def run(self, generations=20, delay=0.3):
        for gen in range(1, generations + 1):
            self.display(gen)
            self.step()
            time.sleep(delay)

# --- Example Patterns ---
# Glider pattern
glider = [(0, 1), (1, 2), (2, 0), (2, 1), (2, 2)]

# Blinker pattern (oscillator)
blinker = [(1, 0), (1, 1), (1, 2)]

# Run the game
if __name__ == "__main__":
    game = GameOfLife(rows=10, cols=10, initial_pattern=glider)
    game.run(generations=15, delay=0.3)


### **Bonus: Expandable Grid (Sparse Set Approach)**

import time

class DynamicGameOfLife:
    def __init__(self, initial_live_cells=None, max_limit=10000):
        # Set of tuples holding (row, col) of currently alive cells
        self.live_cells = set(initial_live_cells) if initial_live_cells else set()
        self.max_limit = max_limit

    def get_neighbors(self, r, c):
        """Returns all 8 neighbor coordinates within bounds."""
        neighbors = []
        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                if dr == 0 and dc == 0:
                    continue
                nr, nc = r + dr, c + dc
                if -self.max_limit <= nr <= self.max_limit and -self.max_limit <= nc <= self.max_limit:
                    neighbors.append((nr, nc))
        return neighbors

    def step(self):
        neighbor_counts = {}

        # Count live neighbors for all active cells and adjacent dead cells
        for r, c in self.live_cells:
            for nr, nc in self.get_neighbors(r, c):
                neighbor_counts[(nr, nc)] = neighbor_counts.get((nr, nc), 0) + 1

        next_generation = set()

        # Evaluate state changes
        for pos, count in neighbor_counts.items():
            if count == 3 or (count == 2 and pos in self.live_cells):
                next_generation.add(pos)

        self.live_cells = next_generation

    def display_viewport(self, min_r=0, max_r=10, min_c=0, max_c=10):
        """Displays a rendering window of the dynamic space."""
        for r in range(min_r, max_r):
            line = ""
            for c in range(min_c, max_c):
                line += "⬛" if (r, c) in self.live_cells else "⬜"
            print(line)

# Run infinite dynamic grid test
if __name__ == "__main__":
    # Glider moving infinitely down-right
    glider = {(0, 1), (1, 2), (2, 0), (2, 1), (2, 2)}
    game = DynamicGameOfLife(initial_live_cells=glider, max_limit=10000)

    for gen in range(1, 10):
        print(f"\nGeneration {gen}:")
        game.display_viewport(0, 6, 0, 6)
        game.step()
        time.sleep(0.3)


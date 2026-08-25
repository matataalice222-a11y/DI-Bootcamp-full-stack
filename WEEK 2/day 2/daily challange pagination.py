
import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        # Step 2: Initialize attributes
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0
        
        # Calculate total pages (at least 1 page even if empty)
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1

    def get_visible_items(self):
        """Returns the list of items visible on the current page."""
        start_index = self.current_idx * self.page_size
        end_index = start_index + self.page_size
        return self.items[start_index:end_index]

    # Alias for camelCase method chaining in bonus step
    getVisibleItems = get_visible_items

    def go_to_page(self, page_num):
        """Navigates to specified 1-based page number."""
        if not isinstance(page_num, int) or page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page number {page_num} is out of range. Must be between 1 and {self.total_pages}.")
        
        self.current_idx = page_num - 1
        return self  # Returning self enables method chaining

    def first_page(self):
        """Navigates to the first page."""
        self.current_idx = 0
        return self

    def last_page(self):
        """Navigates to the last page."""
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        """Moves one page forward if not on the last page."""
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    # Alias for camelCase method chaining in bonus step
    nextPage = next_page

    def previous_page(self):
        """Moves one page backward if not on the first page."""
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    # Alias for camelCase method chaining in bonus step
    previousPage = previous_page

    def __str__(self):
        """Returns visible items on current page separated by newlines."""
        return "\n".join(str(item) for item in self.get_visible_items())


# ==========================================
# Step 6: Testing the Code
# ==========================================

alphabet_list = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabet_list, 4)

# Test 1: First page items
print(p.get_visible_items())  # ['a', 'b', 'c', 'd']

# Test 2: Next page items
p.next_page()
print(p.get_visible_items())  # ['e', 'f', 'g', 'h']

# Test 3: Last page items
p.last_page()
print(p.get_visible_items())  # ['y', 'z']

# Test 4: Custom __str__() method output
p.first_page()
print("--- Page 1 String Representation ---")
print(str(p))

# Test 5: Method Chaining (Bonus)
print("--- Method Chaining Test ---")
p.first_page()
result = p.nextPage().nextPage().nextPage().getVisibleItems()
print(result)  # ['m', 'n', 'o', 'p']

# Test 6: Invalid page numbers raising ValueError
try:
    p.go_to_page(10)
except ValueError as e:
    print(f"Handled Error: {e}")

try:
    p.go_to_page(0)
except ValueError as e:
    print(f"Handled Error: {e}")


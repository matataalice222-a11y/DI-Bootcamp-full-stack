
import math
from functools import total_ordering

@total_ordering
class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must specify either a radius or a diameter.")

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative.")
        self._radius = value

    @property
    def diameter(self):
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        if value < 0:
            raise ValueError("Diameter cannot be negative.")
        self._radius = value / 2

    @property
    def area(self):
        return math.pi * (self._radius ** 2)

    @classmethod
    def from_diameter(cls, diameter):
        """Alternative constructor using diameter."""
        return cls(diameter=diameter)

    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area:.2f})"

    def __repr__(self):
        return f"Circle({self.radius})"

    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented

    def __eq__(self, other):
        if isinstance(other, Circle):
            return self.radius == other.radius
        return False

    def __lt__(self, other):
        if isinstance(other, Circle):
            return self.radius < other.radius
        return NotImplemented


### Testing the Implementation


# 1. Initialization and Querying
c1 = Circle(radius=5)
c2 = Circle.from_diameter(8)  # radius = 4

print(f"c1 Radius: {c1.radius}, Diameter: {c1.diameter}, Area: {c1.area:.2f}")
print(f"c2 Radius: {c2.radius}, Diameter: {c2.diameter}, Area: {c2.area:.2f}")

# 2. String Representation
print("\nString Representation:")
print(c1)

# 3. Addition (__add__)
c3 = c1 + c2
print("\nAddition:")
print(f"c1 + c2 = {c3}")

# 4. Comparisons (__eq__, __gt__, __lt__)
print("\nComparisons:")
print(f"Is c1 > c2? {c1 > c2}")
print(f"Is c1 == c2? {c1 == c2}")

# 5. Sorting a List of Circles
circles = [Circle(radius=10), Circle(radius=2), Circle(radius=7), Circle(radius=4)]
circles.sort()

print("\nSorted Circles:")
for c in circles:
    print(c)


### Optional Bonus: Drawing Sorted Circles with `turtle`


import turtle

def draw_circles(circle_list):
    screen = turtle.Screen()
    screen.title("Sorted Circles")
    
    t = turtle.Turtle()
    t.speed(3)
    
    for circle in circle_list:
        # Scale up small radii for visibility
        scaled_radius = circle.radius * 10
        
        # Move down by radius so circles share a center line
        t.penup()
        t.sety(-scaled_radius)
        t.pendown()
        
        t.circle(scaled_radius)
        
    screen.exitonclick()

# Example usage:
# draw_circles(sorted_circles)


import math
class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("Either radius or diameter must be provided.")

    @property
    def diameter(self):
        return self.radius * 2

    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2

    def area(self):
        return math.pi * (self.radius ** 2)

    def __str__(self):
        return f"Circle with radius: {self.radius:.2f}, diameter: {self.diameter:.2f}, area: {self.area():.2f}"

    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented

    def __eq__(self, other):
        if isinstance(other, Circle):
            return self.radius == other.radius
        return NotImplemented

    def __lt__(self, other):
        if isinstance(other, Circle):
            return self.radius < other.radius
        return NotImplemented

    def __le__(self, other):
        return self == other or self < other

    def __gt__(self, other):
        return not self <= other
    def __ge__(self, other):
        return not self < other

if __name__ == "__main__":
    c1 = Circle(radius=5)
    c2 = Circle(diameter=8)
    c3 = c1 + c2
    print(c1) 
    print(c2)
    print(c3)
    print("Is c1 > c2?", c1 > c2) 
    print("Is c1 == c2?", c1 == c2) 
    circles = [c1, c2, c3, Circle(radius=2), Circle(radius=7)]
    sorted_circles = sorted(circles)
    print("\nSorted Circles by Radius:")
    for c in sorted_circles:
        print(c)

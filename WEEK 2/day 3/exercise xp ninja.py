

#*Exercise 1: Temperature (SOLID Design)**

from abc import ABC, abstractmethod

class Temperature(ABC):
    def __init__(self, value: float):
        self.value = value

    @abstractmethod
    def to_celsius(self) -> float:
        pass

    def to_type(self, target_class):
        celsius_val = self.to_celsius()
        return target_class.from_celsius(celsius_val)

class Celsius(Temperature):
    def to_celsius(self) -> float:
        return self.value

    @classmethod
    def from_celsius(cls, celsius_val: float):
        return cls(celsius_val)

class Fahrenheit(Temperature):
    def to_celsius(self) -> float:
        return (self.value - 32) * 5 / 9

    @classmethod
    def from_celsius(cls, celsius_val: float):
        return cls((celsius_val * 9 / 5) + 32)

class Kelvin(Temperature):
    def to_celsius(self) -> float:
        return self.value - 273.15

    @classmethod
    def from_celsius(cls, celsius_val: float):
        return cls(celsius_val + 273.15)


# Example Usage
c = Celsius(25)
f = c.to_type(Fahrenheit)
k = f.to_type(Kelvin)

print(f"{c.value}°C = {f.value:.2f}°F = {k.value:.2f}K")


#Exercise 2: In the Quantum Realm**


import random

class QuantumParticle:
    def __init__(self, x=None, y=None, p=None):
        self.x = x if x is not None else random.randint(1, 10000)      # Position
        self.y = y if y is not None else random.uniform(0.0, 1.0)     # Momentum
        self.p = p if p is not None else random.choice([0.5, -0.5])   # Spin
        self.entangled_particle = None

    def _disturbance(self):
        self.x = random.randint(1, 10000)
        self.y = random.uniform(0.0, 1.0)
        print("Quantum Interferences!!")

    def position(self):
        self._disturbance()
        return self.x

    def momentum(self):
        self._disturbance()
        return self.y

    def spin(self):
        self._disturbance()
        # If entangled, measuring spin updates both particles to opposite spins
        if self.entangled_particle:
            self.p = random.choice([0.5, -0.5])
            self.entangled_particle.p = -self.p
            print("Spooky Action at a Distance !!")
        else:
            self.p = random.choice([0.5, -0.5])
        return self.p

    def entangle(self, other_particle):
        if not isinstance(other_particle, QuantumParticle):
            raise TypeError("A quantum particle can only be entangled with another QuantumParticle!")
        
        self.entangled_particle = other_particle
        other_particle.entangled_particle = self
        
        # Set entangled particle's spin to opposite value
        other_particle.p = -self.p
        
        print("Spooky Action at a Distance !!")

    def __repr__(self):
        return f"QuantumParticle(position={self.x}, momentum={self.y:.4f}, spin={self.p})"


# Example Usage
p1 = QuantumParticle(x=1, p=0.5)
p2 = QuantumParticle(x=2, p=0.5)

# Entangle particles
p1.entangle(p2)

# Measure spin to trigger quantum interference and spooky action
print("Measured Spin P1:", p1.spin())
print("P2 State after measurement:", p2)


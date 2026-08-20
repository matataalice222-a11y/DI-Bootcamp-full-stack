


x = int(input('Enter the Number:')) 

# Find all proper divisors (excluding x itself) and sum them
divisor_sum = sum(i for i in range(1, x) if x % i == 0)

# Check if the sum of proper divisors equals the original number
if x > 0 and divisor_sum == x:
    print(True)
else:
    print(False)


#How it works:**

# `range(1, x)` iterates through all numbers from 1 up to $x - 1$.
# `x % i == 0` checks if $i$ divides $x$ evenly without a remainder.
# `sum(...)` totals up all valid divisors.
#The condition checks whether the total sum matches $x$, printing `True` if it matches (like 6, where $1 + 2 + 3 = 6$) and `False` otherwise.
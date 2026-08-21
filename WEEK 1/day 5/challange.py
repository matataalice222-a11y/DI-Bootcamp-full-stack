#Exercise 1**


my_list = ["apple", "banana", "cherry"]
item = "orange"
index = 1

my_list.insert(index, item)
print(my_list)  # ['apple', 'orange', 'banana', 'cherry']


#Exercise 2**


text = "Hello world from Python"
space_count = text.count(" ")
print(space_count)  # 3


#Exercise 3**


text = "Hello World! 123"
uppercase_count = sum(1 for char in text if char.isupper())
lowercase_count = sum(1 for char in text if char.islower())

print(f"Upper case letters: {uppercase_count}")
print(f"Lower case letters: {lowercase_count}")


#*Exercise 4**


def my_sum(arr):
    total = 0
    for num in arr:
        total += num
    return total


print(my_sum([1, 5, 4, 2]))  # 12


#*Exercise 5**


def find_max(numbers):
    if not numbers:
        return None
    max_num = numbers[0]
    for num in numbers[1:]:
        if num > max_num:
            max_num = num
    return max_num


print(find_max([0, 1, 3, 50]))  # 50



#Exercise 6**

def factorial(n):
    if n < 0:
        return None
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result


print(factorial(4))  # 24


#Exercise 7**

def list_count(lst, element):
    count = 0
    for item in lst:
        if item == element:
            count += 1
    return count


print(list_count(["a", "a", "t", "o"], "a"))  # 2



#*Exercise 8**

import math


def norm(lst):
    total_sum = sum(lst)
    return math.sqrt(total_sum**2)  # Returns absolute value of sum


print(norm([1, 2, 2]))  # 3.0



#Exercise 9**


def is_mono(arr):
    is_increasing = all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))
    is_decreasing = all(arr[i] >= arr[i + 1] for i in range(len(arr) - 1))
    return is_increasing or is_decreasing


print(is_mono([7, 6, 5, 5, 2, 0]))  # True
print(is_mono([2, 3, 3, 3]))  # True
print(is_mono([1, 2, 0, 4]))  # False



#Exercise 10**


def print_longest_word(words):
    if not words:
        return
    longest = max(words, key=len)
    print(longest)


print_longest_word(["apple", "banana", "watermelon", "fig"])  # watermelon



#Exercise 11**

data = [10, "apple", 42, "banana", "cherry", 7]

integers = [x for x in data if isinstance(x, int) and not isinstance(x, bool)]
strings = [x for x in data if isinstance(x, str)]

print("Integers:", integers)  # [10, 42, 7]
print("Strings:", strings)  # ['apple', 'banana', 'cherry']



#Exercise 12**


def is_palindrome(s):
    cleaned = s.lower()
    return cleaned == cleaned[::-1]


print(is_palindrome("radar"))  # True
print(is_palindrome("John"))  # False



#Exercise 13**


def sum_over_k(sentence, k):
    words = sentence.split()
    return sum(1 for word in words if len(word) > k)


sentence = "Do or do not there is no try"
print(sum_over_k(sentence, 2))  # 3



#Exercise 14**


def dict_avg(d):
    if not d:
        return 0
    return sum(d.values()) / len(d)


print(dict_avg({"a": 1, "b": 2, "c": 8, "d": 1}))  # 3.0



#Exercise 15**


def common_div(a, b):
    limit = min(a, b)
    return [i for i in range(1, limit + 1) if a % i == 0 and b % i == 0]


print(common_div(10, 20))  # [1, 2, 5, 10]


#*Exercise 16**

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True


print(is_prime(11))  # True



#Exercise 17**


def weird_print(lst):
    result = [val for idx, val in enumerate(lst) if idx % 2 == 0 and val % 2 == 0]
    print(result)


weird_print([1, 2, 2, 3, 4, 5])  # [2, 4]


#Exercise 18**

def type_count(**kwargs):
    counts = {}
    for val in kwargs.values():
        t_name = type(val).__name__
        counts[t_name] = counts.get(t_name, 0) + 1

    formatted = ", ".join(f"{k}: {v}" for k, v in counts.items())
    print(formatted)


type_count(a=1, b="string", c=1.0, d=True, e=False)
# int: 1, str: 1, float: 1, bool: 2


#Exercise 19**

def custom_split(text, delimiter=None):
    result = []
    current_token = []

    if delimiter is None:
        # Split by contiguous whitespace
        in_space = True
        for char in text:
            if char.isspace():
                if not in_space:
                    result.append("".join(current_token))
                    current_token = []
                    in_space = True
            else:
                current_token.append(char)
                in_space = False
        if current_token:
            result.append("".join(current_token))
    else:
        # Split by explicit character delimiter
        for char in text:
            if char == delimiter:
                result.append("".join(current_token))
                current_token = []
            else:
                current_token.append(char)
        result.append("".join(current_token))

    return result


print(custom_split("hello world python"))  # ['hello', 'world', 'python']
print(custom_split("a,b,c", ","))  # ['a', 'b', 'c']



#*Exercise 20**


def to_password_format(password_str):
    return "*" * len(password_str)


print(to_password_format("mypassword"))  # **********


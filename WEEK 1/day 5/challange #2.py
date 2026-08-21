#Exercise 1: Pattern Printing Solutions**

#Pattern 1: Pyramid**


rows = 3
for i in range(rows):
    spaces = " " * (rows - i - 1)
    stars = "*" * (2 * i + 1)
    print(spaces + stars)



#Pattern 2: Right-aligned Triangle**


rows = 5
for i in range(1, rows + 1):
    spaces = " " * (rows - i)
    stars = "*" * i
    print(spaces + stars)


#Pattern 3: Hourglass / Diamond Half-and-Half**


# Top half (Left-aligned growing)
for i in range(1, 6):
    print("*" * i)

# Bottom half (Right-aligned shrinking)
for i in range(5, 0, -1):
    spaces = " " * (5 - i)
    stars = "*" * i
    print(spaces + stars)



#*Exercise 2: Code Analysis & Selection Sort**

#Annotated Code with Comments**


my_list = [2, 24, 12, 354, 233]  # Initialize the target list

# Outer loop: iterate through indices from 0 up to len(my_list) - 2
for i in range(len(my_list) - 1):
    minimum = i  # Assume current index i holds the minimum value

    # Inner loop: check remaining elements to find a smaller value
    for j in range(i + 1, len(my_list)):
        if my_list[j] < my_list[minimum]:
            minimum = j  # Update minimum index if a smaller value is found

            # If a smaller element was found, swap it into position i
            if minimum != i:
                my_list[i], my_list[minimum] = (
                    my_list[minimum],
                    my_list[i],
                )

print(my_list)  # Print the sorted list


#Variable State Tracking (Trace)**

# `my_list = [2, 24, 12, 354, 233]`
#**Iteration 1 (`i = 0`):**
#`minimum = 0` (`my_list[0] = 2`)
#`j = 1` to `4`: No element is smaller than `2`.
# `my_list` remains: `[2, 24, 12, 354, 233]`


#**Iteration 2 (`i = 1`):**
#`minimum = 1` (`my_list[1] = 24`)
#`j = 2`: `my_list[2]` (`12`) `<` `my_list[1]` (`24`). `minimum` becomes `2`. Swap `my_list[1]` and `my_list[2]`.
#`my_list` becomes: `[2, 12, 24, 354, 233]`
#`j = 3, 4`: No smaller values compared to current `minimum`.


#**Iteration 3 (`i = 2`):**
#`minimum = 2` (`my_list[2] = 24`)
# `j = 3, 4`: No smaller values than `24`.
# `my_list` remains: `[2, 12, 24, 354, 233]`


#**Iteration 4 (`i = 3`):**
#`minimum = 3` (`my_list[3] = 354`)
#`j = 4`: `my_list[4]` (`233`) `<` `my_list[3]` (`354`). `minimum` becomes `4`. Swap `my_list[3]` and `my_list[4]`.
 #`my_list` becomes: `[2, 12, 24, 233, 354]`



#Final Output**

[2, 12, 24, 233, 354]



#Purpose of the Program**

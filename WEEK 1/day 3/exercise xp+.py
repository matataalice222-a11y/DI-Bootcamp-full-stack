

#Exercise 1: Student Grade Summary**


student_grades = {
    "Alice": [88, 92, 100],
    "Bob": [75, 78, 80],
    "Charlie": [92, 90, 85],
    "Dana": [83, 88, 92],
    "Eli": [78, 80, 72]
}

# Initialize empty dictionaries
student_averages = {}
student_letter_grades = {}

# 1. Calculate average and assign letter grades
for name, grades in student_grades.items():
    avg = sum(grades) / len(grades)
    student_averages[name] = avg
    
    if avg >= 90:
        letter = 'A'
    elif avg >= 80:
        letter = 'B'
    elif avg >= 70:
        letter = 'C'
    elif avg >= 60:
        letter = 'D'
    else:
        letter = 'F'
        
    student_letter_grades[name] = letter

# 2. Calculate class average
class_average = sum(student_averages.values()) / len(student_averages)

# 3. Print results
print(f"Class Average: {class_average:.2f}\n")
print("Student Summary:")
for name in student_grades:
    print(f"- {name}: Average = {student_averages[name]:.2f}, Grade = {student_letter_grades[name]}")



#*Exercise 2: Advanced Data Manipulation and Analysis**


sales_data = [
    {"customer_id": 1, "product": "Smartphone", "price": 600, "quantity": 1, "date": "2023-04-03"},
    {"customer_id": 2, "product": "Laptop", "price": 1200, "quantity": 1, "date": "2023-04-04"},
    {"customer_id": 1, "product": "Laptop", "price": 1000, "quantity": 1, "date": "2023-04-05"},
    {"customer_id": 2, "product": "Smartphone", "price": 500, "quantity": 2, "date": "2023-04-06"},
    {"customer_id": 3, "product": "Headphones", "price": 150, "quantity": 4, "date": "2023-04-07"},
    {"customer_id": 3, "product": "Smartphone", "price": 550, "quantity": 1, "date": "2023-04-08"},
    {"customer_id": 1, "product": "Headphones", "price": 100, "quantity": 2, "date": "2023-04-09"},
]

# Task 3: Sales Data Enhancement (modifying list in-place first for downstream tasks)
for item in sales_data:
    item["total_price"] = item["price"] * item["quantity"]

# Task 1: Total Sales Calculation
total_sales_per_product = {}
for item in sales_data:
    product = item["product"]
    total_sales_per_product[product] = total_sales_per_product.get(product, 0) + item["total_price"]

# Task 2: Customer Spending Profile
customer_spending = {}
for item in sales_data:
    cid = item["customer_id"]
    customer_spending[cid] = customer_spending.get(cid, 0) + item["total_price"]

# Task 4: High-Value Transactions
high_value_txs = [item for item in sales_data if item["total_price"] > 500]
high_value_txs.sort(key=lambda x: x["total_price"], reverse=True)

# Task 5: Customer Loyalty Identification
purchase_counts = {}
for item in sales_data:
    cid = item["customer_id"]
    purchase_counts[cid] = purchase_counts.get(cid, 0) + 1

loyal_customers = [cid for cid, count in purchase_counts.items() if count > 1]

# Bonus: Category Average Transaction Value & Popular Product
product_tx_counts = {}
product_units_sold = {}

for item in sales_data:
    prod = item["product"]
    product_tx_counts[prod] = product_tx_counts.get(prod, 0) + 1
    product_units_sold[prod] = product_units_sold.get(prod, 0) + item["quantity"]

avg_tx_value = {prod: total_sales_per_product[prod] / product_tx_counts[prod] for prod in total_sales_per_product}
most_popular_product = max(product_units_sold, key=product_units_sold.get)

# Display Output
print("=== Sales Summary ===")
print("Total Sales per Product:", total_sales_per_product)
print("Customer Spending Profiles:", customer_spending)
print("Loyal Customers (Customer IDs):", loyal_customers)
print("Average Transaction Value per Product:", avg_tx_value)
print("Most Popular Product (by units sold):", most_popular_product)



#*Marketing Insights & Strategy:**

#**Target High-Value Categories:** Smartphones and Laptops drive the bulk of overall revenue. Premium promotions and bundle deals (e.g., bundling Headphones with Laptops) can increase order values further.
#**Loyalty Programs:** Customer IDs 1, 2, and 3 all returned for multiple purchases. Implementing a formal rewards program will sustain repeat purchases and protect customer lifetime value.
#**Cross-Selling Opportunities:** Accessories like Headphones sell in higher unit quantities but lower overall price points—ideal candidates for checkout add-on recommendations.
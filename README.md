# lemonade-stand

## Description

This repo shows two different approaches to the same problem from a recent mock interview with an aspiring programmer. 
In `functional.js`, you'll find the solution given by the organization that organizes the interviews. It's pure JS, but it's hard to read and exhibits poor programming practices such as unclear variable naming, nested control-flow, lack of guiding comments, and inconsistent code style.

In the `src` directory is my solution, which employs an Object-Oriented approach. The compoenets are:

### Models
Models represent blueprints for creating the real-world objects we're representing. In this case, we have a queue and a cash register. Each model has properties (queue has a cash register to serve it, cash register has the count of $5,$10,$20 dollar bills to keep track of) and functions/methods (queue kicks off the process of serving customers, cash register handles each purchase and makes change).

### Constants
These are values that don't need to change. we store them here so that we don't accidentally fat-finger the wrong number somewhere. There is no such thing as being too clear when labeling variables.

### Utils
A lot of the more complicated logic lives here. We abstract the more complicated logic into small utilities so that model methods read more like english than code

# Prompt

Lemonade Change
https://leetcode.com/problems/lemonade-change/

Prompt
At a lemonade stand, each lemonade costs $5.

Customers are standing in a queue to buy from you, and order one at a time (in the order specified by bills).

Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer, so that the net transaction is that the customer pays $5.

Return true if and only if you can provide every customer with correct change.

Example One:
Input
let input = [5,5,5,10,20]
Output
let expectedOutput = true
Explanation
From the first 3 customers, we collect three $5 bills in order.

From the fourth customer, we collect a $10 bill and give back a $5.

From the fifth customer, we give a $10 bill and a $5 bill.

Since all customers got correct change, we output true.

Example Two:
Input
let input = [5,5,10]
Output
let expectedOutput = true
Explanation
We collect two $5 bills from the first two customers and give one back as change to the last customer.

Example Three:
Input
let input = [10,10]
Output
let expectedOutput = false
Explanation
The first customer needs $5 back in change, but we don't have any five dollar bills.

Example Four:
Input
let input = [5,5,10,10,20]
Output
let expectedOutput = false
Explanation
From the first two customers in order, we collect two $5 bills.

For the next two customers in order, we collect a $10 bill and give back a $5 bill.

For the last customer, we can't give change of $15 back because we only have two $10 bills.

Since not every customer received correct change, the answer is false.

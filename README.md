# JS OOP Prototype

### Featureset 1 - Random Number Generator
- use the file exercise/randomgenerator.js
- modify the RandomGenerator class
- complete the properties and methods included in the class
- should be able to:
	- take in a min and max numbers for random range
	- return the min and max range
	- generate a random number
	- get the random number
- test the class in the output in index.html

### Featureset 2 - Basic Caculator Object
- use the file exercise/basiccalcobject.js
- modify the Calculator class
- complete the properties and methods included in the class
- should be able to:
	- take in an operator
	- take in 2 numbers (no more)
	- calculate and return the value
- test the class in the output in index.html

### Featureset 3 - Monetary Account
- use the file exercise/bankaccount.js
- modify the Account class
- complete the properties and methods included in the class
- should be able to:
	- store money in the Account
	- add money to the account
	- remove money from the account, but no more than in the account
	- get the current amount in the account
- test the class in the output in index.html

### Featureset 4 - Bank that uses Monetary Account
- use the file exercise/bank.js
- modify the Bank class
- complete the properties and methods included in the class
- it will make use of the Account class from Featureset 3
- it should be able to:
	- make an account, but not if the account already exists
	- check for the existence of an account
	- remove the account, but not if it doesn't exist or has money in it
	- deposit money into the account, but not if it doesn't exist
	- withdraw money from the account, but not if it doesn't exist or exceeds the amount in the account
- test the class in the output in index.html

### Featureset 5 - Deck of Cards
- use the file exercise/card.js
- card.js contains both Card and Deck objects
- modify the Card and Deck classes
- it should be able to:
	- card
		- make a card with a given suite and face value
		- get the current suite
		- get the current face value
	- deck
		- add a card of a given suite and face value
		- shuffle the existing cards
		- get the amount of cards in the deck
		- deal cards (remove from deck and provide an array of removed cards)


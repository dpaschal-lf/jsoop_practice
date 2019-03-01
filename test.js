
function displayMessage(message, type='error'){
	var element = $("<div>").text(message).addClass(type);
	if(type==='error'){
		console.error(message);
	} else if (type==='warning'){
		console.warn(message);
	} else {
		console.log(message);
	}
	element.appendTo('#displayArea');
	
}

function storageContainsElement(storage, element){
	//base case
	if (storage === element){ return true; }
	if (!(storage instanceof Object)){ return false; }
	if (typeof storage === 'function'){ return false; }
	//recursive case
	if (typeof storage.values === 'function'){
		storage = Array.from(storage.values());
	} else {
		storage = Object.values(storage);
	}
	return storage.some(subStorage => storageContainsElement(subStorage, element));
}

function featureSet1(){
	displayMessage('--RandomGenerator test', 'header');
	if(typeof RandomGenerator !== 'function' ){
		displayMessage('RandomGenerator class does not exist.  Check exercises/randomgenerator.js and make sure the object is defined still.');
		return false;
	}
	var len = RandomGenerator.length;
	if(len !== 2 ){
		displayMessage('RandomGenerator constructor should expect minimum and maximum values.  Currently expects ' + len + ' parameters');
		return false;
	}
	var gen = new RandomGenerator(0, 20);
	if(gen.min !== 0 || gen.max !== 20){
		displayMessage('constructor did not store the minimum and maximum values in provided min and max properties.  Expected min=0 and max=20 and got min='+gen.min+' and max='+gen.max);
		return false;
	}
	displayMessage('constructor: passed', 'message')

	if(typeof gen.getRange !== 'function'){
		displayMessage('"getRange" is not a method of randomGenerator');
		return false;
	}
	var range = gen.getRange();
	if(typeof range !== 'object' || (range.min !== 0 || range.max !==20)){
		displayMessage('getRange did not return the expected values.  Expected {min:0, max:20} and got '+JSON.stringify(range));
		return false;
	}
	displayMessage('getRange: passed', 'message');
	if(typeof gen.generate !== 'function'){
		displayMessage('"generate" is not a method of randomGenerator');
		return false;
	}
	gen.generate();
	var genAddedProperties = Object.keys(gen);
	for (var i = genAddedProperties.length - 1; i >= 0; i--){
		var genKey = genAddedProperties[i];
		if (typeof gen[genKey] === 'function' || ['min', 'max'].includes(genKey)){
			genAddedProperties.splice(i, 1);
		}
	}
	if(genAddedProperties.length === 0){
		displayMessage('generate should store it\'s random value as a property of randomGenerator');
		return false;
	}
	var genNumStorageProperty = genAddedProperties[0];
	var storedVal = gen[genNumStorageProperty];
	if(typeof storedVal !== 'number'){
		displayMessage('generate should store a number, but instead stored a ' + typeof storedVal);
		return false;
	}
	if(storedVal < range.min || storedVal > range.max){
		displayMessage('generate should store a number between its min(' + range.min + ') and max(' + range.max + '), but instead stored ' + storedVal);
		return false;
	}
	var testRange = { min: Infinity, max: -Infinity };
	for(var i = 0; i < 10000; i++){
		gen.generate();
		testRange.min = Math.min(testRange.min, gen[genNumStorageProperty]);
		testRange.max = Math.max(testRange.max, gen[genNumStorageProperty]);
	}
	testRange.min = Math.floor(testRange.min);
	testRange.max = Math.ceil(testRange.max);
	if (testRange.min !== range.min || testRange.max !== range.max){
		displayMessage('generate should store a number between '+range.min+' and '+range.max+', but instead stores a number between '+testRange.min+' and '+testRange.max);
		return false;
	}
	displayMessage('generate: passed', 'message');
	if(gen.getNum === undefined){
		displayMessage('missing method "getNum" in randomGenerator');
		return false;
	}
	var val = gen.getNum();
	if(typeof val !== 'number'){
		displayMessage('getNum should return a number but returned ' + typeof val + ' instead');
		return false
	}
	if(val !== gen[genNumStorageProperty]){
		displayMessage('getNum should have returned the number stored by generate ' + gen[genNumStorageProperty] + ', but instead returned ' + val);
		return false;
	}
	displayMessage('getNum: passed', 'message');
	displayMessage('RandomGenerator passed all tests', 'message')
	return true;

}

function featureSet2(){
	displayMessage('--Calculator test', 'header');
	if(typeof Calculator !== 'function' ){
		displayMessage('Calculator class does not exist.  Check exercises/basiccalcobject.js and make sure the object is defined still.');
		return false;
	}
	var calc = new Calculator();

	var calcProperties = Object.keys(calc)
	.filter(key => typeof calc[key] !== 'function');
	var calcPropertyLen = calcProperties.length;
	if (calcPropertyLen < 2){
		displayMessage('No storage created in Calculator constructor for the operator and/or numbers. Found ' + calcPropertyLen + ' properties. Is each property initialized?');
		return false;
	} else if (calcPropertyLen > 3){
		displayMessage('Found ' + calcPropertyLen + ' properties in Calculator constructor. Are you sure you need that many?', 'warning');
	}
	displayMessage('constructor successfully initialized properties for storing operator & numbers', 'message')

	if(typeof calc.loadNumber !== 'function'){
		displayMessage('missing method "loadNumber" in Calculator');
		return false;
	}
	var len = calc.loadNumber.length;
	if(len !== 1 ){
		displayMessage('loadNumber should expect one parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var len = calc.loadNumber("moo");
	if(len !== false){
		displayMessage('loadNumber should return false when the input is not a number.  Passed in "moo" and should have returned false, it returned '+len);
		return false;
	}
	var len = calc.loadNumber("4");
	if(typeof len !=='boolean' && len !== false){
		displayMessage('loadNumber should return false when the input is not a number.  Passed in "4" and should have returned false, it returned '+len);
		return false;
	}
	displayMessage('loadNumber successfully rejected invalid input', 'message')
	var len = calc.loadNumber(5);
	if(len !== 1){
		displayMessage('loadNumber should return the length of the stored numbers (1).  It returned '+len);
		return false;
	}
	displayMessage('loadNumber successfully entered data', 'message')

	var len = calc.loadNumber(2);
	if(len !== 2){
		displayMessage('loadNumbers should return the length of the stored numbers (2).  It returned '+len);
		return false;
	}
	displayMessage('loadNumber successfully entered 2nd number', 'message')
	if(typeof calc.loadOperator !== 'function'){
		displayMessage('missing method "loadOperator" in Calculator');
		return false;
	}
	var len = calc.loadOperator.length;
	if(len !== 1 ){
		displayMessage('loadOperator should expect one parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var len = calc.loadOperator(5);
	if(len !== false){
		displayMessage('loadOperator should return false when +,-,*, or / are not used as arguments.  It returned '+len);
		return false;
	}
	displayMessage('loadOperator successfully rejected invalid input', 'message')
	var len = calc.loadOperator('*');
	if(len !== true){
		displayMessage('loadOperator should return true when a proper input is used as a parameter.  It returned '+len);
		return false;
	}
	displayMessage('loadOperator successfully called', 'message')
	if(typeof calc.calculate !== 'function'){
		displayMessage('missing method "calculate" in Calculator');
		return false;
	}
	var result = calc.calculate()
	if(result !== 10){
		displayMessage('Result should have been numeric 10, but was '+result+ ' instead.');
		return false;		
	}
	displayMessage('calculate ran successfully and returned 5*2=10', 'message')
	var len = calc.loadNumber(3);
	if(len !== 1){
		displayMessage('loadNumbers should return the length of the stored numbers.  There should be only 1.  Did you reset the stored numbers after calculation?  It returned '+len);
		return false;
	}
	var len = calc.loadNumber(4);
	if(len !== 2){
		displayMessage('loadNumber(4) called.  loadNumbers should have returned 2 .  It returned '+len);
		return false;
	}
	var len = calc.loadNumber(0);
	if(len !== false){
		displayMessage('loadNumber intentionally called too many times.  loadNumbers should return false when it already has 2 numbers .  It returned '+len);
		return false;
	}
	displayMessage('loadNumber successfully called too many times and it rejected the input', 'message')

	var len = calc.loadOperator('+');
	if(len !== true){
		displayMessage('loadOperator("+") called. loadOperator should return true when a proper input is used as a parameter.  It returned '+len);
		return false;
	}
	var result = calc.calculate()
	if(result !== 7){
		displayMessage('Result should have been numeric 7, but was '+result+ ' instead.');
		return false;		
	}
	displayMessage('calculate ran successfully and returned 3+4=7', 'message')
	var len = calc.loadNumber(5);
	if(len !== 1){
		displayMessage('loadNumbers should return the length of the stored numbers.  There should be only 1.  Did you reset the stored numbers after calculation?  It returned '+len);
		return false;
	}
	var len = calc.loadNumber(3);
	if(len !== 2){
		displayMessage('loadNumber(3) called.  loadNumbers should have returned 2 .  It returned '+len);
		return false;
	}
	var len = calc.loadOperator('-');
	if(len !== true){
		displayMessage('loadOperator("-") called. loadOperator should return true when a proper input is used as a parameter.  It returned '+len);
		return false;
	}
	var result = calc.calculate()
	if(result !== 2){
		displayMessage('Result should have been numeric 2, but was '+result+ ' instead.');
		return false;		
	}
	displayMessage('calculate ran successfully and returned 5-3=2', 'message');
	var len = calc.loadNumber(12);
	if(len !== 1){
		displayMessage('loadNumbers should return the length of the stored numbers.  There should be only 1.  Did you reset the stored numbers after calculation?  It returned '+len);
		return false;
	}
	var len = calc.loadNumber(4);
	if(len !== 2){
		displayMessage('loadNumber(4) called.  loadNumbers should have returned 2 .  It returned '+len);
		return false;
	}
	var len = calc.loadOperator('/');
	if(len !== true){
		displayMessage('loadOperator("/") called. loadOperator should return true when a proper input is used as a parameter.  It returned '+len);
		return false;
	}
	var result = calc.calculate()
	if(result !== 3){
		displayMessage('Result should have been numeric 3, but was '+result+ ' instead.');
		return false;		
	}
	displayMessage('calculate ran successfully and returned 12/4=3', 'message');
	var testOperations = {
		'+': function(a, b){ return a + b },
		'-': function(a, b){ return a - b },
		'*': function(a, b){ return a * b },
		'/': function(a, b){ return a / b },
	};
	var testOperators = Object.keys(testOperations);
	var testIterations = 10000;
	var numberCounterMax = Math.sqrt(testIterations);
	for (var a = 1; a <= numberCounterMax; a++){
		for (var b = 1; b <= numberCounterMax; b++){
			var num1 = (numberCounterMax - a + 1) / b * Math.pow(-1, a);
			var num2 = (numberCounterMax - b + 1) / a * Math.pow(-1, b);
			var operator = testOperators[(a + b) % 4];
			var expected = testOperations[operator](num1, num2);

			calc.loadNumber(num1);
			calc.loadNumber(num2);
			calc.loadOperator(operator);
			var actual = calc.calculate();

			if (actual !== expected){
				displayMessage('calculate many-operation stress test failed on ' + num1 + ' ' + operator + ' ' + num2 + ' = ' + expected + '. Instead, returned ' + actual);
				return false;
			}
		}
	}
	displayMessage('calculate many-operation stress test ran successfully', 'message');
	displayMessage('Calculator passed all tests', 'message')
	return true;
}

function featureSet3(){
	displayMessage('--Account', 'header');
	if(typeof Account !== 'function' ){
		displayMessage('Account class does not exist.  Check exercises/bankaccount.js and make sure the object is defined still.');
		return false;
	}
	var account = new Account();
	var accountProperties = Object.keys(account)
	.filter(function(key){ return typeof account[key] !== 'function' });
	var accountPropLength = accountProperties.length;
	if (accountPropLength === 0){
		displayMessage('No storage created in Account constructor for the amount of money in the account. Found ' + calcPropertyLen + ' properties. Is each property initialized?');
		return false;
	} else if (accountPropLength > 1) {
		displayMessage('Found ' + calcPropertyLen + ' properties in Account constructor. Are you sure you need that many?', 'warning');
	} else if (account[accountProperties[0]] !== 0){
		displayMessage('Amount of money in the account should be initialized to 0. Instead, it was ' + account[accountProperties[0]]);
		return false;
	}
	displayMessage('constructor successfully initialized amount of money in account', 'message')

	if(typeof account.add !== 'function'){
		displayMessage('missing method "add" in Account');
		return false;
	}
	var len = account.add.length;
	if(len !== 1 ){
		displayMessage('add should expect one parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var amount= account.add('sandwich');
	if(amount!==false){
		displayMessage('add should return false when the input is not a number.  Passed in "sandwich" and should have returned false, it returned '+amount);
		return false;
	}
	var amount= account.add(-37);
	if(amount!==false){
		displayMessage('add should return false when the input is not a positive number.  Passed in -37 and should have returned false, it returned '+amount);
		return false;
	}
	var amount= account.add(5);
	if(amount!==5){
		displayMessage('add(5) called, but didn\'t return the expect value 5.  It returned '+amount);
		return false;
	}	
	displayMessage('add(5) returned the correct value', 'message')

	var amount= account.add(2);
	if(amount!==7){
		displayMessage('add(2) called, but didn\'t return the expect value 7 (5+2).  It returned '+amount);
		return false;
	}	
	displayMessage('add(2) returned the correct value', 'message')
	if(typeof account.getAmount !== 'function'){
		displayMessage('missing method "getAmount" in Account');
		return false;
	}
	var amount= account.getAmount();
	if(amount!==7){
		displayMessage('getAmount called, but didn\'t return the expect value 7.  It returned '+amount);
		return false;
	}
	displayMessage('getAmount returned the correct value', 'message')
	if(typeof account.remove !== 'function'){
		displayMessage('missing method "remove" in Account');
		return false;
	}
	var len = account.remove.length;
	if(len !== 1 ){
		displayMessage('remove should expect one parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var amount= account.remove('free money');
	if(amount!==false){
		displayMessage('remove should return false when the input is not a number.  Passed in "free money" and should have returned false, it returned '+amount);
		return false;
	}
	var amount= account.remove(-14);
	if(amount!==false){
		displayMessage('remove should return false when the input is not a positive number.  Passed in -14 and should have returned false, it returned '+amount);
		return false;
	}
	var amount= account.remove(3);
	if(amount!==3){
		displayMessage('remove(3) called, but didn\'t return the expect value that was removed (3).  It returned '+amount);
		return false;
	}	
	displayMessage('remove(3) returned the correct value', 'message')
	var amount= account.remove(20);
	if(amount!==4){
		displayMessage('remove(20) called, It should have returned the remaining amount removed (4).  It returned '+amount);
		return false;
	}
	displayMessage('remove(20) returned the correct value', 'message')

	var amount= account.getAmount();
	if(amount!==0){
		displayMessage('getAmount called, but didn\'t return the expect value 0.  It returned '+amount);
		return false;
	}	
	displayMessage('getAmount() returned the correct value', 'message')
	displayMessage('Account passed all tests', 'message')
	return true;
}

function featureSet4(){
	displayMessage('--Bank', 'header');
	if(typeof Bank !== 'function' ){
		displayMessage('Bank class does not exist.  Check exercises/bank.js and make sure the object is defined still.');
		return false;
	}
	var len = Bank.length;
	if(len !== 1 ){
		displayMessage('Bank constructor should expect the name of the bank as a parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var bank = new Bank('DofA');
	var bankProperties = Object.keys(bank).filter(key => typeof bank[key] !== 'function');
	var bankNameProperty = bankProperties.find(key => bank[key] === 'DofA');
	if (bankNameProperty === undefined){
		displayMessage('No storage created in Bank constructor for the bank\'s name.');
		return false;
	}
	var bankAccountsProperty = bankProperties.find(key => bank[key] instanceof Object && bank[key].constructor === Object);
	if (bankAccountsProperty === undefined){
		displayMessage('No storage created in Bank constructor for accounts.');
		return false;
	}
	displayMessage('constructor successfully initialized bank\'s name and account storage object.', 'message')

	if(typeof bank.makeAccount !== 'function'){
		displayMessage('missing method "makeAccount" in Bank');
		return false;
	}
	var len = bank.makeAccount.length;
	if(len !== 1 ){
		displayMessage('makeAccount should expect one parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var newAccount = bank.makeAccount('abc123');
	if(!(newAccount instanceof Account)){
		displayMessage('makeAccount did not return an Account object.  It returned '+newAccount);
		return false;
	}
	var duplicateAccount = bank.makeAccount('abc123');
	if(duplicateAccount !== false){
		var messagePostfix = duplicateAccount;
		if (duplicateAccount instanceof Account){
			messagePostfix = 'an Account object';
		}
		displayMessage('makeAccount should return false when the given account number already exists.  It returned ' + messagePostfix);
		return false;
	}
	var bankAccountsStorage = bank[bankAccountsProperty];
	var originalAccountExists = storageContainsElement(bankAccountsStorage, newAccount);
	if (!originalAccountExists){
		displayMessage('makeAccount should not replace the original account when the account number already exists.');
		return false;
	}
	displayMessage('makeAccount("abc123") returned the correct value', 'message');

	if(typeof bank.checkForAccount !== 'function'){
		displayMessage('missing method "checkForAccount" in Bank');
		return false;
	}
	var len = bank.checkForAccount.length;
	if(len !== 1 ){
		displayMessage('checkForAccount should expect one parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var result = bank.checkForAccount('abc123');
	if(result !== true){
		displayMessage('checkForAccount("abc123") should have returned true.  It returned '+result);
		return false;
	}
	displayMessage('checkForAccount("abc123") returned the correct value', 'message')
	var result = bank.checkForAccount('zzzzzz');
	if(result!==false){
		displayMessage('checkForAccount("zzzzzz") should have returned false as no such account exists.  It returned '+result);
		return false;
	}
	displayMessage('checkForAccount("zzzzzz") returned the correct value', 'message')

	var result = bank.checkForAccount('abc123');
	if(result!==true){
		displayMessage('checkForAccount("abc123") should have returned true as there should be that account.  It returned '+result);
		return false;
	}
	if(typeof bank.removeAccount !== 'function'){
		displayMessage('missing method "removeAccount" in Bank');
		return false;
	}
	var len = bank.removeAccount.length;
	if(len !== 1 ){
		displayMessage('removeAccount should expect one parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var result = bank.removeAccount('zzzzzz');
	if(result!=='account zzzzzz does not exist'){
		displayMessage('removeAccount("zzzzzz") should have returned "account zzzzzz does not exist" as there is no account by that number.  It returned '+result);
		return;
	}
	var result = bank.removeAccount('abc123');
	if(result!=='account abc123 deleted'){
		displayMessage('removeAccount("abc123") should have returned "account abc123 deleted".  It returned '+result);
		return;
	}
	displayMessage('removeAccount("abc123") returned the correct value', 'message');
	var result = bank.checkForAccount('abc123');
	if(result!==false){
		displayMessage('checkForAccount("abc123") should have returned false as that account should have been removed.  It returned '+result);
		return;
	}
	displayMessage('checkForAccount("abc123") returned the correct value after removeAccount("abc123")', 'message');
	var newAccount = bank.makeAccount('1349823399');
	if(!(newAccount instanceof Account)){
		displayMessage('makeAccount did not return an Account object.  It returned '+newAccount);
		return;
	}
	var result = bank.checkForAccount('1349823399');
	if(result!==true){
		displayMessage('checkForAccount("1349823399") should have returned true as there should be that account.  It returned '+result);
		return;
	}
	if(typeof bank.deposit !== 'function'){
		displayMessage('missing method "deposit" in Bank');
		return false;
	}
	var len = bank.deposit.length;
	if(len !== 2 ){
		displayMessage('deposit should expect 2 parameters.  Currently expects ' + len + ' parameters');
		return false;
	}
	var result = bank.deposit('zzzzzz',10);
	if(result!=='account does not exist'){
		displayMessage('deposit("zzzzzz") should have returned "account does not exist" as there is no account by that number.  It returned '+result);
		return;
	}
	var result = bank.deposit('1349823399',7);
	if(result!=='account 1349823399 now has 7'){
		displayMessage('deposit("1349823399", 7) should have returned "account 1349823399 now has 7".  It returned '+result);
		return;
	}
	displayMessage('deposit("1349823399", 7) returned the correct value', 'message')
	var result = bank.deposit('1349823399',3);
	if(result!=='account 1349823399 now has 10'){
		displayMessage('deposit("1349823399", 3) should have returned "account 1349823399 now has 10" (7 + 3).  It returned "'+result+'"');
		return;
	}
	displayMessage('deposit("1349823399", 3) returned the correct value', 'message')
	var result = bank.removeAccount('1349823399');
	if(result!=='account is not empty'){
		displayMessage('removeAccount("1349823399") should have returned "account is not empty" as there is still money in the account and it cannot be deleted.  It returned '+result);
		return;
	}
	displayMessage('removeAccount("1349823399") returned the correct value', 'message')
	if(typeof bank.withdraw !== 'function'){
		displayMessage('missing method "withdraw" in Bank');
		return false;
	}
	var len = bank.withdraw.length;
	if(len !== 2 ){
		displayMessage('withdraw should expect 2 parameters.  Currently expects ' + len + ' parameters');
		return false;
	}
	var result = bank.withdraw('zzzzzz', 2);
	if(result!=='account does not exist'){
		displayMessage('withdraw("zzzzzz", 2) should have returned "account does not exist" as there is no such account.  It returned '+result);
		return;
	}
	var result = bank.withdraw('1349823399', 2);
	if(result!=='removed 2 from account 1349823399. It now has 8'){
		displayMessage('withdraw("1349823399", 2) should have returned "removed 2 from account 1349823399. It now has 8".  It returned '+result);
		return;
	}
	displayMessage('withdraw("1349823399", 2) returned the correct value', 'message')
	var result = bank.withdraw('1349823399', 9);
	if(result!=='removed 8 from account 1349823399. It now has 0'){
		displayMessage('withdraw("1349823399", 9) should have returned "removed 8 from account 1349823399. It now has 0".  It returned '+result);
		return;
	}
	displayMessage('withdraw(account, amount) passes', 'message')
	var result = bank.removeAccount('1349823399');
	if(result!=='account 1349823399 deleted'){
		displayMessage('removeAccount("1349823399") should have returned "account 1349823399 deleted" as there is no money remaining in the account.  It returned "'+result+'"');
		return;
	}
	displayMessage('Bank passes all tests', 'message');
	return true;
}

function featureSet5(){
	displayMessage('--Cards and Deck', 'header');
	if(typeof Card !== 'function' ){
		displayMessage('Card class does not exist.  Check exercises/card.js and make sure the object is defined still.');
		return false;
	}
	var len = Card.length;
	if(len !== 2 ){
		displayMessage('Card constructor should expect a suit and a face value as parameters.  Currently expects ' + len + ' parameters');
		return false;
	}
	if(typeof Deck !== 'function' ){
		displayMessage('Deck class does not exist.  Check exercises/card.js and make sure the object is defined still.');
		return false;
	}
	var deck = new Deck();
	var deckProperties = Object.keys(deck)
	.filter(function(key){ return typeof deck[key] !== 'function'; });
	var deckPropertyLength = deckProperties.length;
	if (deckPropertyLength < 1){
		displayMessage('No storage created in Deck constructor for Card objects');
		return false;
	}
	displayMessage('constructor: passed', 'message');

	if(typeof deck.addCard !== 'function'){
		displayMessage('missing method "addCard" in Deck');
		return false;
	}
	var len = deck.addCard.length;
	if(len !== 2 ){
		displayMessage('addCard should expect two parameters.  Currently expects ' + len + ' parameters');
		return false;
	}
	var result = deck.addCard('Hearts','K');
	if(result !== 1){
		displayMessage('addCard("Hearts","K") should have returned a count of 1, but returned ' + result + ' instead');
		return false;
	}
	displayMessage('addCard("Hearts", "K") successfully returns 1', 'message');
	if(typeof deck.getCardCount !== 'function'){
		displayMessage('missing method "getCardCount" in Deck');
		return false;
	}
	var result = deck.getCardCount();
	if(result !== 1){
		displayMessage('getCardCount should have returned a count of 1, but returned ' + result + ' instead');
		return false;
	}
	var result = deck.addCard('Spades', 8);
	if(result !== 2){
		displayMessage('addCard("Spades", 8) should have returned a count of 2, but returned ' + result + ' instead');
		return false;
	}
	displayMessage('addCard("Spades", 8) successfully returns 2', 'message');
	var result = deck.getCardCount();
	if(result !== 2){
		displayMessage('getCardCount should have returned a count of 2, but returned ' + result + ' instead');
		return false;
	}

	if(typeof deck.dealCards !== 'function'){
		displayMessage('missing method "dealCards" in Deck');
		return false;
	}
	var len = deck.dealCards.length;
	if(len !== 1 ){
		displayMessage('dealCards should expect one parameter.  Currently expects ' + len + ' parameters');
		return false;
	}
	var result = deck.addCard('Diamonds', 5);
	if(result !== 3){
		displayMessage('addCard("Diamonds", 5) should have returned a count of 3, but returned ' + result + ' instead');
		return false;
	}
	var result = deck.dealCards(2);
	if(Array.isArray(result) !== true){
		displayMessage('dealCards should have returned an array, returned ' + result + ' instead');
		return false;
	}
	if(result.length !== 2){
		displayMessage('dealCards should have returned an array of 2 elements, returned ' + result + ' instead');
		return false;
	}
	var resultAllCards = result.every(function(element){ return element instanceof Card });
	if(!resultAllCards){
		displayMessage('dealCards should have returned an array containing Cards, returned ' + JSON.stringify(result) + ' instead');
		return false;
	}
	if(
		result[0].suit !== 'Diamonds' || result[0].faceValue !== 5
		|| result[1].suit !== 'Spades' || result[1].faceValue !== 8
		){
		displayMessage('dealCards should have returned the last 2 of the added cards (K of Hearts, 8 of Spades, 5 of Diamonds) in reverse order (5 of Diamonds, 8 of Spades). Instead, it returned ' + JSON.stringify(result));
		return false;
	}
	var result = deck.getCardCount();
	if(result !== 1){
		displayMessage('after dealing the 2 cards in deck, getCardCount should have returned a count of 1, but returned ' + result + ' instead');
		return false;
	}
	displayMessage('dealCards(2) successfully removed and returned the last two cards in reverse-order', 'message');

	var result = deck.dealCards(2);
	if(Array.isArray(result) !== true){
		displayMessage('dealCards should have returned an array, returned ' + result + ' instead');
		return false;
	}
	if(result.length !== 1){
		displayMessage('dealCards(2) should have returned an array of 1 element, as there was only 1 card remaining. Instead, returned ' + JSON.stringify(result) + ' instead');
		return false;
	}
	var resultAllCards = result.every(function(element){ return element instanceof Card });
	if(!resultAllCards){
		displayMessage('dealCards should have returned an array containing Cards, returned ' + JSON.stringify(result) + ' instead');
		return false;
	}
	if(
		result[0].suit !== 'Hearts' || result[0].faceValue !== 'K'
		){
		displayMessage('dealCards should have returned the last remaining card (K of Hearts). Instead, it returned ' + JSON.stringify(result));
		return false;
	}
	var result = deck.getCardCount();
	if(result !== 0){
		displayMessage('after dealing the last card in the deck, getCardCount should have returned a count of 0, but returned ' + result + ' instead');
		return false;
	}
	displayMessage('dealCards(2) successfully removed and returned only the last remaining card', 'message');

	var suits = ['hearts','clubs','diamonds','spades'];
	var faceValues = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
	var cardAddOrder = [];
	for(var suitI = 0; suitI < suits.length; suitI++){
		for(var faceI = 0; faceI < faceValues.length; faceI++){
			var result = deck.addCard(suits[suitI], faceValues[faceI]);
			cardAddOrder.push({suit: suits[suitI], faceValue: faceValues[faceI]});
		}
	}
	displayMessage('addCard(suit, facevalue) passes', 'message')
	var result = deck.getCardCount();
	if(result !== 52){
		displayMessage('getCardCount / addCard failure:  should have returned a count of 52, but returned ' + result + ' instead');
		return false;
	}
	displayMessage('getCardCount passes', 'message')
	var result = deck.dealCards(1);
	if(result[0].constructor !== Card){
		displayMessage('dealCards should have returned an array containing Cards, returned ' + result + ' instead');
		return false;
	}
	if(typeof result[0].getSuit !== 'function'){
		displayMessage('missing method "getSuit" in Card');
		return false;
	}
	if(typeof result[0].getFaceValue !== 'function'){
		displayMessage('missing method "getFaceValue" in Card');
		return false;
	}
	if(result[0].getSuit() !== 'spades' || result[0].getFaceValue() !== 'K'){
		displayMessage('first card should have been K of spades, but was  ' + result[0].getFaceValue() + ' of ' +result[0].getSuit()+ ' instead');
		return false;
	}
	displayMessage('card getFaceValue and getSuit pass', 'message');

	if(typeof deck.shuffle !== 'function'){
		displayMessage('missing method "shuffle" in Deck');
		return false;
	}
	var lenBeforeShuffle = deck.getCardCount();
	deck.shuffle();
	var lenAfterShuffle = deck.getCardCount();
	if (lenAfterShuffle !== lenBeforeShuffle){
		displayMessage('shuffle should not affect the number of cards in the deck (' + lenBeforeShuffle + '). Instead, shuffle changed the deck size to ' + lenAfterShuffle);
		return false;
	}
	var cards = deck.dealCards(7);
	if(cards.length !== 7){
		displayMessage('shuffle/deal cards:  should have returned 7 cards, but returned ' + JSON.stringify(result) + ' instead');
		return false;
	}
	for(var i=0; i< cards.length; i++){
		if(suits.indexOf( cards[i].getSuit()) === -1){
			displayMessage('drawn card has an illegal suit in it:  should have been  ' + suits.join(',') + ' but was ' + cards[i].getSuit());
			return false;
		}
	}
	for(var i=0; i< cards.length; i++){
		if(faceValues.indexOf( cards[i].getFaceValue()) === -1){
			displayMessage('drawn card has an illegal face value in it:  should have been  ' + faceValues.join(',') + ' but was ' + cards[i].getFaceValue());
			return false;
		}
	}
	var nonShuffledCards = cardAddOrder.slice(-8, -1).reverse();
	var cardsInSamePosition = 0;
	for (var i=0; i < cards.length; i++){
		var shuffledCard = cards[i];
		var nonShuffledCard = nonShuffledCards[i];
		if (shuffledCard.getSuit() === nonShuffledCard.suit && shuffledCard.getFaceValue() === nonShuffledCard.faceValue){
			cardsInSamePosition++;
		}
	}
	if (cardsInSamePosition === 7){
		displayMessage('shuffle should have randomly re-ordered the cards in the Deck, but the cards were still dealt in non-shuffled order');
		return false;
	} else if (cardsInSamePosition >= 5){
		displayMessage('shuffle should have randomly re-ordered the cards in the Deck, but ' + cardsInSamePosition + ' of the 7 dealt cards were still in the same position. Are you sure the whole deck was shuffled?', 'warning');
	}
	var deck2 = new Deck();
	var suits = ['hearts','clubs','diamonds','spades'];
	var faceValues = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
	var cardAddOrder = [];
	for(var suitI = 0; suitI < suits.length; suitI++){
		for(var faceI = 0; faceI < faceValues.length; faceI++){
			var result = deck2.addCard(suits[suitI], faceValues[faceI]);
			cardAddOrder.push({suit: suits[suitI], faceValue: faceValues[faceI]});
		}
	}
	var deck2Cards = deck.dealCards(52);
	var cardMap = {};
	for(var cardIndex = 0; cardIndex < deck2Cards.length; cardIndex++){
		var card = deck2Cards[cardIndex];
		var comboText = card.getSuit()+card.getFaceValue();
		cardMap[comboText] = cardMap.hasOwnProperty(comboText) ? cardMap[comboText] + 1 : 1;
	}
	for(var key in cardMap){
		if( cardMap[key] > 1){
			displayMessage('shuffle appears to have duplicated some of the cards.  Illegal shuffle')
		}
	}
	displayMessage('dealCards(count) passes', 'message')
	displayMessage('shuffle() passes', 'message')
	displayMessage('Card and Deck passes all tests', 'message');
	return true;
}

var testFunctions = ['featureSet1', 'featureSet2', 'featureSet3', 'featureSet4', 'featureSet5']

var i = 0;
while( i<testFunctions.length && window[testFunctions[i]]() === true){
	i++;
}




















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

function featureSet1(){
	displayMessage('--RandomGenerator test', 'header');
	if(typeof RandomGenerator === 'undefined' ){
		displayMessage('randomGenerator object does not exist.  Check exercises/randomgenerator.js and make sure the object is defined still.');
		return false;
	}
	var gen = new RandomGenerator(0, 20);
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
	if(typeof Calculator === 'undefined' ){
		displayMessage('Calculator object does not exist.  Check exercises/basiccalcobject.js and make sure the object is defined still.');
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
	if(typeof Account === 'undefined' ){
		displayMessage('Account object does not exist.  Check exercises/bankaccount.js and make sure the object is defined still.');
		return false;
	}
	var account = new Account();
	var accountProperties = Object.keys(account);
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
	if(typeof Bank === 'undefined' ){
		displayMessage('Bank object does not exist.  Check exercises/bank.js and make sure the object is defined still.');
		return false;
	}
	var bank = new Bank('DofA');	
	if(typeof bank.makeAccount !== 'function'){
		displayMessage('missing method "makeAccount" in Bank');
		return false;
	}
	var newAccount = bank.makeAccount('abc123');
	if(!(newAccount instanceof Account)){
		displayMessage('makeAccount did not return an Account object.  It returned '+newAccount);
		return false;
	}
	displayMessage('makeAccount("abc123") returned the correct value', 'message')
	if(bank.checkForAccount === undefined){
		displayMessage('missing method "checkForAccount" in Bank');
		return false;
	}
	var result = bank.checkForAccount('abc123');
	if(result !== true){
		displayMessage('checkForAccount("abc123") should have returned true.  It returned '+result);
		return;
	}
	displayMessage('checkForAccount("abc123") returned the correct value', 'message')
	var result = bank.checkForAccount('zzzzzz');
	if(result!==false){
		displayMessage('checkForAccount("zzzzzz") should have returned false as no such account exists.  It returned '+result);
		return;
	}
	displayMessage('checkForAccount("zzzzzz") returned the correct value', 'message')

	var result = bank.checkForAccount('abc123');
	if(result!==true){
		displayMessage('checkForAccount("abc123") should have returned true as there should be that account.  It returned '+result);
		return;
	}
	if(bank.removeAccount === undefined){
		displayMessage('missing method "removeAccount" in Bank');
		return false;
	}	
	var result = bank.removeAccount('zzzzzz');
	if(result!=='account zzzzzz does not exist'){
		displayMessage('removeAccount("zzzzzz") should have returned "account zzzzzz does not exist" as there is no account by that number.  It returned '+result);
		return;
	}
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
	if(bank.deposit === undefined){
		displayMessage('missing method "deposit" in Bank');
		return false;
	}
	var result = bank.deposit('zzzzzz',10);
	if(result!=='account does not exist'){
		displayMessage('deposit("zzzzzz") should have returned "account does not exist" as there is no account by that number.  It returned '+result);
		return;
	}
	var result = bank.deposit('1349823399',10);
	if(result!=='account 1349823399 now has 10'){
		displayMessage('deposit("1349823399") should have returned "account 1349823399 now has 10".  It returned '+result);
		return;
	}
	displayMessage('deposit(account, amount) passes', 'message')
	var result = bank.removeAccount('1349823399');
	if(result!=='account is not empty'){
		displayMessage('removeAccount("1349823399") should have returned "account is not empty" as there is still money in the account and it cannot be deleted.  It returned '+result);
		return;
	}
	displayMessage('removeAccount("1349823399") returned the correct value', 'message')
	if(bank.withdraw === undefined){
		displayMessage('missing method "withdraw" in Bank');
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
	var result = bank.withdraw('1349823399', 20);
	if(result!=='removed 8 from account 1349823399. It now has 0'){
		displayMessage('withdraw("1349823399", 20) should have returned "removed 8 from account 1349823399. It now has 0".  It returned '+result);
		return;
	}
	displayMessage('withdraw(account, amount) passes', 'message')
	var result = bank.removeAccount('1349823399');
	if(result!=='account 1349823399 deleted'){
		displayMessage('removeAccount("1349823399") should have returned "account 1349823399 deleted" as there is still money in the account and it cannot be deleted.  It returned '+result);
		return;
	}
	displayMessage('Bank passes all tests', 'message');
	return true;
}

function featureSet5(){
	displayMessage('--Cards and Deck', 'header');
	if(typeof Card === 'undefined' ){
		displayMessage('Card object does not exist.  Check exercises/card.js and make sure the object is defined still.');
		return false;
	}
	if(typeof Deck === 'undefined' ){
		displayMessage('Deck object does not exist.  Check exercises/card.js and make sure the object is defined still.');
		return false;
	}
	var deck = new Deck();	
	if(deck.addCard === undefined){
		displayMessage('missing method "addCard" in Deck');
		return false;
	}
	var result = deck.addCard('Hearts','K');
	if(result !== 1){
		displayMessage('addCard("Hearts","K") should have returned a count of 1, but returned ' + result + ' instead');
		return false;
	}
	if(deck.getCardCount === undefined){
		displayMessage('missing method "getCardCount" in Deck');
		return false;
	}
	var result = deck.getCardCount();
	if(result !== 1){
		displayMessage('getCardCount should have returned a count of 1, but returned ' + result + ' instead');
		return false;
	}

	if(deck.dealCards === undefined){
		displayMessage('missing method "dealCards" in Deck');
		return false;
	}
	var result = deck.dealCards(1);
	if(Array.isArray(result) !== true){
		displayMessage('dealCards should have returned an array, returned ' + result + ' instead');
		return false;
	}
	if(result.length !== 1){
		displayMessage('dealCards should have returned an array of 1 element, returned ' + result + ' instead');
		return false;
	}
	if(result[0].constructor !== Card){
		displayMessage('dealCards should have returned an array containing Cards, returned ' + result + ' instead');
		return false;
	}
	var result = deck.getCardCount();
	if(result !== 0){
		displayMessage('after dealing the 1 card in deck, getCardCount should have returned a count of 0, but returned ' + result + ' instead');
		return false;
	}
	var suits = ['hearts','clubs','diamonds','spades'];
	var faceValues = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
	for(var suitI = 0; suitI < suits.length; suitI++){
		for(var faceI = 0; faceI < faceValues.length; faceI++){
			var result = deck.addCard(suits[suitI], faceValues[faceI]);
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
	if(result[0].getSuit === undefined){
		displayMessage('missing method "getSuit" in Card');
		return false;
	}
	if(result[0].getFaceValue === undefined){
		displayMessage('missing method "getFaceValue" in Card');
		return false;
	}
	if(result[0].getSuit() !== 'spades' || result[0].getFaceValue() !== 'K'){
		displayMessage('first card should have been K of spades, but was  ' + result[0].getFaceValue() + ' of ' +result[0].getSuit()+ ' instead');
		return false;
	}
	displayMessage('card getFaceValue and getSuit pass', 'message')
	if(deck.shuffle === undefined){
		displayMessage('missing method "shuffle" in Deck');
		return false;
	}
	displayMessage('shuffle() passes', 'message')
	deck.shuffle();
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
	displayMessage('dealCards(count) passes', 'message')
	displayMessage('Card and Deck passes all tests', 'message');
	return true;
}

var testFunctions = ['featureSet1', 'featureSet2', 'featureSet3', 'featureSet4', 'featureSet5']

var i = 0;
while( i<testFunctions.length && window[testFunctions[i]]() === true){
	i++;
}



















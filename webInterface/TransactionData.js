var gTransactionData = [];
var gBalanceOverTime = [];
var gTransactionsByCategory = {};

// Recalculate charts now that transaction data changed
function processTransactionData()
{
	gBalanceOverTime = [];
	for (var i = 0; i < gTransactionData.length; ++i)
	{
		gBalanceOverTime.push({x: gTransactionData[i].date, y: gTransactionData[i].balance});

		// Separate by category
		if (gTransactionData[i].userCategories) {
			for (var categoryIndex = 0; categoryIndex < gTransactionData[i].userCategories.length; ++categoryIndex) {
				categoryName = gTransactionData[i].userCategories[categoryIndex];
				if (categoryName in gTransactionsByCategory) {
					gTransactionsByCategory[categoryName].push(gTransactionData[i]);
				}
				else {
					gTransactionsByCategory[categoryName] = [gTransactionData[i]];
				}
			}
		}
	}
}

let dateRegex = /(.*)\/(.*)\/(.*)/

// Assume format account,date,amount,balance,category,description,memo,notes\r
function makeTransactionLogEntryFromCSV(csvLine)
{
	splitLine = csvLine.trim().split(',');
	if (splitLine.length != 8)
	{
		console.log('Error: CSV line has unexpected formatting: \n' + csvLine);
		return null;
	}

	dateMatch = splitLine[1].match(dateRegex);

	var newEntry = {
		account: splitLine[0],
		// E.g. 12/17/2019
		// Month is zero indexed in JS
		date: new Date(dateMatch[3], dateMatch[1] - 1, dateMatch[2], 1, 1, 1, 1),
		amount: splitLine[2],
		balance: parseFloat(splitLine[3].replace("$", "")),
		bankCategory: splitLine[4],
		description: splitLine[5],
		memo: splitLine[6],
		notes: splitLine[7],
		userCategories: []
	};

	categorizeEntry(newEntry);

	return newEntry;
}

function addUserCategory(entry, newCategory) {
	if (entry.userCategories.indexOf(newCategory) === -1) {
		entry.userCategories.push(newCategory);
	}
}


function categorizeEntry(entry)
{
	// These are provided by my bank. Not sure I'm happy they're analyzing my transactions... :(
	if (entry.bankCategory == 'DiningOut') {
		addUserCategory(entry, 'Food');
	}
	else if (entry.bankCategory == 'Travel') {
		addUserCategory(entry, 'Travel');
	}
	else if (entry.bankCategory == 'Entertainment') {
		addUserCategory(entry, 'Entertainment');
	}
	else if (entry.bankCategory == 'Automobile') {
		addUserCategory(entry, 'Gas');
	}
}

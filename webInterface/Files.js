// Thanks https://www.html5rocks.com/en/tutorials/file/dndfiles/
function handleFileSelect(evt)
{
	var files = evt.target.files;  // FileList object

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, file; file = files[i]; i++)
	{
		/* output.push(
		   '<li><strong>', escape(file.name), '</strong> (', file.type || 'n/a', ') - ', file.size,
		   ' bytes, last modified: ',
		   file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a',
		   !file.type.match('text.csv') ? ' (unsupported format)' : ' (CSV supported)', '</li>');
		 */
		var reader = new FileReader();
		reader.onload = function() {
			var transactionTable = document.getElementById('transactionTable');
			transactionTable.innerHTML = '<thead></thead><tbody>';

			var text = reader.result;
			var lines = text.split('\n');
			// Note: Skip row 0, which has header labels
			for (var lineIndex = 1; lineIndex < lines.length; ++lineIndex)
			{
				line = lines[lineIndex];
				var logEntry = makeTransactionLogEntryFromCSV(line);
				/* console.log(logEntry); */
				if (logEntry)
				{
					gTransactionData.push(logEntry);
				}
			}

			processTransactionData();
			updateVisualizations();
			
			transactionTable.innerHTML += '</tbody>';
		};
		reader.readAsText(file);
	}
}

document.getElementById('filesUpload').addEventListener('change', handleFileSelect, false);

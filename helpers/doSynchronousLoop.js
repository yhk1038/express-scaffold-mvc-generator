/**
 * Process an array of data synchronously.
 *
 * @param data An array of data.
 * @param processData A function that processes an item of data.
 * 
 * Signature: function(item, i, callback),
 * where
 * {@code item} is the i'th item
 * {@code i} is the loop index value and
 * {@code calback} is the parameterless function to call on completion of processing an item.
 */
Array.prototype.forEach2 = function (processData, done) {
	let data = this;
	if (data.length > 0) {
		var loop = function(data, i, processData, done) {
			processData(data[i], function() {
				if (++i < data.length) {
					loop(data, i, processData, done);
				} else {
					if (done) done();
				}
			}, i);
		};
		loop(data, 0, processData, done);
	} else {
		if (done) done();
	}
}
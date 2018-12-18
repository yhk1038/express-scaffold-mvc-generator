const fs = require('fs');
const path = require('path');

const checkDirectory = function (directory, callback) {
  fs.stat(directory, function(err, stats) {
    //Check if error defined and the error code is "not exists"
    if (err && err.errno === 34) {
      //Create the directory, call the callback.
      fs.mkdir(directory, callback);
    } else {
      //just in case there was a different error:
      callback(err)
    }
  });
}

const checkDirectorySync = function (directory) {
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

const makefile = function (filepath, data, callback) {
  checkDirectorySync(path.dirname(filepath));
  fs.writeFile(filepath, data,
    function (err) {
      if (err){throw err};
      if (callback) { callback(err, {path: filepath, data: data}) };
    }
  );
}

module.exports = makefile

let fs = require('fs');
let path = require('path');


function delete_empty_directory(filepath) {
  let dirpath = path.dirname(filepath);
  if (fs.readdirSync(dirpath).length === 0) {
    fs.rmdirSync(dirpath);
  }
}

function delete_directory_recursive(dirpath) {
  if (fs.existsSync(dirpath)) {
    fs.readdirSync(dirpath).forEach(function(file, index){
      let curPath = path.join(dirpath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        delete_directory_recursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirpath);
  }
};

function delete_if_the_file_exists(filepath) {
  if (fs.existsSync(filepath)) {
    if (fs.lstatSync(filepath).isDirectory()) {
      delete_directory_recursive(filepath);
      delete_empty_directory(filepath);
    }
    
    else {
      fs.unlink(filepath, err => {
        if (err) {
          throw console.error(err)
        } else {
          console.log(filepath, 'is deleted');
          delete_empty_directory(filepath);
          return fs
        }
      });
    }
  }
  
  else {
    console.log(filepath,'doesn\'t exist');
    return fs
  }
}

module.exports = delete_if_the_file_exists
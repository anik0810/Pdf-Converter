
var fs = require('fs');
 
function delete_file(file){
fs.unlink(file, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log('File deleted!');
});
}

module.exports={delete_file};

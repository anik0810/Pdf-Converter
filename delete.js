
var fs = require('fs');
 
function delete_file(file){
fs.unlink(file, function (err) {
    if (err) throw err;
    console.log('');
});
}

module.exports={delete_file};

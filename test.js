var spawn = require('child_process').spawn;

var proc = spawn('git');
proc.stdout.on('data', function(data) {
  console.log(data.toString());
});

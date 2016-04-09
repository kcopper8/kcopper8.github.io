var spawn = require('hexo-util/lib/spawn');
var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});

hexo.init().then(function(){
  return hexo.call('generate', {});
// }).then(function() {
  // return hexo.call('deploy', {}).then(function() {
    // console.log('deployed');
  // });
}).then(function() {
  return spawn('git', ['add', '-A']);
}).then(function() {
  return spawn('git', ['commit', '-m', 'site updated']);
}).then(function() {
  return spawn('git', ['push', 'origin', 'source']);
});

// var proc = spawn('hexo');
// proc.stdout.on('data', function(data) {
  // console.log(data.toString());
// });


// hexo deploy -g
// git add -A
// git commit -m 'site updated'
// git push origin source

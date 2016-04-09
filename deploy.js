var spawn = require('hexo-util/lib/spawn');
var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});

var commitMessage = process.argv[2];

hexo.init().then(function(){
  return hexo.call('generate', {});
}).then(function() {
  return hexo.call('deploy', {
    message : commitMessage
  }).then(function() {
    console.log('deployed');
  });
}).then(function() {
  return spawn('git', ['add', '-A'], {
    verbose : true
  });
}).then(function() {
  return spawn('git', ['commit', '-m', commitMessage || 'site Updated'], {
    verbose : true
  });
}).then(function() {
  return spawn('git', ['push', 'origin', 'source'], {
    verbose : true
  });
});

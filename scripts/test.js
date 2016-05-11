var git_push = require('../../../hexo-source-deployer-git/lib/git_push.js');

hexo.extend.deployer.register('source-git', function(args) {
  // console.log('hexo-source-deployer-git', arguments);
  // console.log('git_push', git_push);
  return git_push({
    path : this.base_dir,
    repository : args.repository,
    branch : args.branch
  });
});

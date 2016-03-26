echo deploy

hexo deploy -g
git add -A
git commit -m 'site updated'
git push origin source

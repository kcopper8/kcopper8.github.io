---
layout: post
title: hexo-source-deployer-git (4)
tags:
  - hexo
categories: []
date: 2016-05-01 16:06:00
---
[hexo-source-deployer-git (3)](/2016/04/21/hexo-source-deployer-git-3/) 에 이어서

### (테스트를 테스트하기 위해) 로직 손으로 돌리기

은근슬쩍 git_publish 모듈을 git_push 모듈로 이름을 바꿨다. 기능의 용도를 한정짓기 위해서이다. (날린 글에서 적어둔 깨달음이 큰 영향을 주었다.)

새로 만든 디렉토리를  push 하기 위해서는 다음을 거친다. init, add, commit, push.

```
$ git init
Initialized empty Git repository in C:/dev/atom_project/hexo-source-deployer-git/spec/lib/publish_test/public/.git/

$ ls
foo.txt

$ git add -A 

$ git commit -m 'First commit'
[master (root-commit) 493d834] First commit
 1 file changed, 1 insertion(+)
 create mode 100644 foo.txt

```
여기까진 잘 됐는데, push 를 할 때 실패했다. 참고 파일인 [deployer.js](https://github.com/hexojs/hexo-deployer-git/blob/master/lib/deployer.js) 을 따라하다가 --force 가 빠지면 어떻게 되나 보려고 빼봤는데 안되었는데, 붙여도 마찬가지이다.

```
$ git push -u repo.url HEAD:/c/dev/atom_project/hexo-source-deployer-git/spec/lib/publish_test/remote
fatal: remote part of refspec is not a valid name in HEAD:/c/dev/atom_project/hexo-source-deployer-git/spec/lib/publish_test/remote
```

여기서부터 git 공부로 넘어가... 기 전에, repository URL 이 제대로 만들어졌는지부터 한번 확인해봐야겠다.
```
// test.js
var pathFn = require('path');
console.log(pathFn.join(__dirname, 'remote'));

// C:\dev\atom_project\hexo-source-deployer-git\spec\lib\publish_test\remote
```
경로명이 전혀 다르게 나온다. repo.url 이 잘못 만들어진 것 같다. 다시 해봐야겠다.
```
$ git push -u repo.url HEAD:C:\dev\atom_project\hexo-source-deployer-git\spec\lib\publish_test\remote --fore
error: src refspec HEAD:C does not match any.
error: failed to push some refs to 'repo.url'
```
좋다. 메시지가 바뀌었다. 다시 한번 명령어를 확인했더니 전혀 잘못 만든 것을 발견했다. 복붙 실수...

```
$ git push -u  C:\dev\atom_project\hexo-source-deployer-git\spec\lib\publish_test\remote HEAD:master
fatal: 'C:devatom_projecthexo-source-deployer-gitspeclibpublish_testremote' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

왠지 다 와가는 느낌이 든다.

처음에 했던 게 맞았네. 우울해진다. 다 쓰고나면 이 부분 글 지워야지...


여튼 이걸 해본 후 validation 의 clone 이 잘 된다. 파일 비교도 잘 되었다.

#### 테스트가 실패하는 경우의 환경 초기화

TDD 기반으로 테스트할 때는 어쩔 수 없이 테스트가 실패하는 경우가 자주 생긴다. 그런데 그 경우 테스트 중간에 생성된 상태를 원래대로 돌려야 하는가가 신경쓰인다.

실제 파일 시스템을 이용한 테스트를 만드는 중에서는 테스트가 실패한 경우-validation 체크 실패 등-에는 afterEach 가 돌지 않고 중간 작업물을 그대로 남겨두는 게 편할 것 같다. 하지만 테스트가 완성된 후 TDD를 진행하는 과정에서는 제대로 돌아서 초기화 시켜주는 게 편하겠지.

과연 그럴까? 로직 도중에 실패했을 때 진행 중간 단계에서 멈춰서 어느 파일이 남아있는지 `git status` 같은걸 해볼 수 있는 편이 훨씬 더 쉽게 찾을 수 있을 법도 한데.

하지만 테스트라는 것은 그런 식으로 남아있는 작업물을 직접 확인하지 않고도 어느 단계에서 실패했는지를 알려줄 수 있을 때 잘 만들어졌다고 평할 수 있는 거겠지. 하지만 그럼 그만큼 테스트가 잘 만들어져야 한다는 것인데... 배보다 배꼽이 커지는 이슈에 대해서는 항상 생각이 꼬리를 문다.


어렵다. 일단 생각난 것은 다 적었으니 넘어가자. 드디어 코드를 짤 수 있게 되었다.

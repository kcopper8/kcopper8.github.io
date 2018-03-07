---
layout: post
title: hexo-source-deployer-git (2)
date: 2016-04-16 17:16:13
tags:
---
[hexo-source-deployer-git (1)](/2016/04/12/hexo-source-deployer-git-1/) 에 이어서.

## 특정 디렉토리를 git 으로 push 하는 기능 만들기

```
lib/
   /git_pusher.js
```
를 만들었다. [hexo-util](https://github.com/hexojs/hexo-util) 의 spawn 을 이용해 특정 디렉토리를 git repository 로 push 하는 기능을 가진다. TDD로 해볼까?


### 테스트 만들기

```
spec/
	/lib/git_pusherSpec.js
    
```

일단 테스트 파일을 만들었다. spawn 을 모킹해서 적절한 명령어가 호출되는지를 확인해보는 정도로 만들 수 있을 것 같은데 그 정도로 충분할까 고민하기 시작했다.

이런 고민은 항상 외부 모듈과 연동하는 기능의 테스트를 만들 때마다 하게 되고, 결론을 내려도 찜찜한 게 보통이었다. 충분히 고민할 시간이 있는 경우도 많지 않고.

하지만 이번에는 공부 차원에서 만들어보는 거니까 시간도 충분히 있고, hexo-deployer-git 라는 예제도 있으니 이쪽을 참고해본 다음에 진행해볼까 싶다.

#### hexo-deployer-git 테스트 참고하기

hexo-deployer-git 의 [deployer.js 테스트 파일](https://github.com/hexojs/hexo-deployer-git/blob/master/test/deployer.js)을 보니 다음과 같이 실제 git 커맨드를 실행시켜서 validation 을 하는 로직이 보였다.

```
  function validate(branch) {
    branch = branch || 'master';

    // Clone the remote repo
    return spawn('git', ['clone', fakeRemote, validateDir, '--branch', branch]).then(function() {
      // Check the branch name
      return fs.readFile(pathFn.join(validateDir, '.git', 'HEAD'));
    }).then(function(content) {
      content.trim().should.eql('ref: refs/heads/' + branch);

      // Check files
      return fs.readFile(pathFn.join(validateDir, 'foo.txt'));
    }).then(function(content) {
      content.should.eql('foo');
    });
  }
```

어떤 식으로 테스트 했는지를 자세히 파악하기 위해 한번 받아서 테스트를 돌려보기로 했다.

우선 빌드를 하고,
```
$ git clone https://github.com/hexojs/hexo-deployer-git
$ cd hexo-deployer-git
$ npm init
```

실행해보았다.
```
$ mocha test/deployer.js


  deployer
    √ default (729ms)
    √ custom branch (540ms)
    - custom message
On branch master
nothing to commit, working directory clean
Branch master set up to track remote branch master from C:\dev\atom_project\hexo-deployer-git\test\deployer_test\remote.
To C:\dev\atom_project\hexo-deployer-git\test\deployer_test\remote
 * [new branch]      HEAD -> master
On branch master
nothing to commit, working directory clean
Branch master set up to track remote branch master from C:\dev\atom_project\hexo-deployer-git\test\deployer_test\remote.
Everything up-to-date
    √ multi deployment (767ms)


  3 passing (2s)
  1 pending

```
잘 실행되었다. 그럼 이제 뜯어보기 시작해야겠다.

스펙은 모두 4개지만, 이름을 보니 모두 같은 기능에 설정이 다른 케이스를 테스트하는 모양이다. 나는 git 테스트를 보고 싶은 거니 `default` 만 봐도 충분할 것 같다.

#### deployer.js 테스트 default

[deployer.js](https://github.com/hexojs/hexo-deployer-git/blob/master/test/deployer.js) 의 default 테스트는 다음과 같이 진행된다.

1. `basedir` 에 테스트할 소스 폴더를 만들고 아무 내용이나 넣어둔다.
2. `fakeRemote` 폴더에 remote repository 역할을 할 repository 를 만들어둔다.
3. `fakeRemote` 를 repository 로 사용해서 deployer 를 실행시킨다.
4. `fakeRemote` 에서 `validateDir` 로 clone 받은 다음, 소스 파일 내용과 .git/HEAD 파일 내용을 비교한다.

굉장하다. 정말 제대로 git repository 에 내용이 잘 저장되는지를 테스트하고 있다. 게다가 그 테스트 코드가 예상보다 짧다는 것이 좀 충격적이다.

테스트 코드가 짧은 이유는 deployer.js 가 명백히 하나의 기능만을 제공하고 있기 때문에서 기인하는 것 같다. 하나의 기능만 제공하니 하나만 테스트하면 되는 것이고 그래서 테스트 코드가 길지 않은 것은 당연하다. 살짝 깨달음을 얻은 기분이다. 이 부분에 대해서는 나중에 별도로 글을 써 보는 게 좋겠다.

여하튼 테스트는 deployer.js 와 같은 방법으로 해도 될 것 같다. 아니. 애초에 특정 디렉토리를 git 으로 push 하는 기능 자체를 deployer.js 로 써도 될 것 같다. 그 기능이 충분한지 확인해봐야겠다.


안타깝지만, deployer.js 는 `.deploy_git` 이라는 디렉토리에 파일을 복사후 push 하는 등 hexo-deployer-git 에 특화된 기능을 가지고 있어서 그대로 사용할 순 없었다. 하지만 deployer.js 와 그 테스트에서 많은 것을 참고할 수 있었다. 역시 뜯어보길 잘한 것 같다.


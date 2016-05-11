title: hexo-source-deployer-git (6)
date: 2016-05-10 23:03:14
tags:
---
[hexo-source-deployer-git (5)](/2016/05/01/hexo-source-deployer-git-5/) 에서 계속

git_push 가 동작하므로, 마지막 단계가 남았다.

## git_push 로 hexo plugin 만들기

[hexo Plugins](https://hexo.io/docs/plugins.html) 문서에 따르면, plugin 은 두가지 방식으로 서버에 추가할 수 있다. 하나는 *Script* 방식으로, 스크립트를 `scripts` 디렉토리에 넣어두면 서버가 뜰 때 로딩되는 방식이다.

다른 하나는 *Plugin* 방식으로, npm 모듈 형태로 만들어 `node_modules` 디렉토리에 설치하고, 모듈명이 `hexo-` 라는 prefix 를 가지면 된다고 한다.

최종적으로는 *Plugin* 으로 만들 생각이긴 하지만, 먼저 *Script* 방식으로 테스트해보고 나서 구성하는 순서를 밟을 예정이다.

### hexo script 써보기

우선 hexo deployer plugin 이 실행될 때 어떤 값들이 넘어오는지를 보는 단순 deployer script 를 추가해보기로 했다.  hexo 문서 중에 어떤 값이 넘어오는지 설명한 문서가 없는 것 같다.

hexo 서버 루트에 `scripts/test.js`를 만들고 `console.log('test');` 만 넣어 보았다.

```
$ hexo                                                  
test                                                    
Usage: hexo <command>                                   
                                                        
Commands:                                               
  clean     Removed generated files and cache.          
  config    Get or set configurations.                  
  ...
```

오오. 된다. hexo 를 실행시키기만 해도 다 읽어들이나보다. 그럼 여기다 deployer 를 정의해본다.

```
hexo.extend.deployer.register('source-git', function(args) {
  console.log('hexo-source-deployer-git', this, arguments);
});
```

그나저나 hexo 객체가 글로벌 변수로 등록되어 있나보다 그냥 막 써도 되네.

deploy 를 한번 해보자.

```
$ hexo deploy

INFO  Deploying: git
INFO  Clearing .deploy_git folder...
INFO  Copying files from public folder...
```

일단 `git` deployer 는 실행되었고, `source-git` 은 실행되지 않았다. 깜박하고 있었는데, 여기에 등록되더라도 실행되는 deployer 는 `_config.yml` 에 설정된 녀석이었지. `_config.yml` 에서 `git` deployer 의 설정을 제거하면 `source-git` 만 테스트할 수 도 있겠다.

설정을 바꿔서 다시 실행해보았다.

```
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: source-git
```

결과는 단순했다. context 는 hexo 객체고(당연하네), arguments 는`_config.yml` 의 deployer 설정값이었는데, 문서에 적힌 대로였다(당연하군).
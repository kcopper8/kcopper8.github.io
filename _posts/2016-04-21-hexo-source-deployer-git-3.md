---
layout: post
title: hexo-source-deployer-git (3)
date: 2016-04-21 22:47:47
tags:
---
[hexo-source-deployer-git (2)](/2016/04/16/hexo-source-deployer-git-2/) 에 이어서

## 특정 디렉토리를 git 으로 push 하는 기능 만들기
를 계속한다.

### test 만들기
[hexo-deployer-git 의 deployer.js 테스트](https://github.com/hexojs/hexo-deployer-git/blob/master/test/deployer.js) 를 참고해 테스트를 만들 생각이다.

인터페이스는 다음과 같다. 

```
function git_publish(path, repository) {
}
	path : '', // push 대상 디렉토리
    repository : '' // push 할 repository
});
```

그리고 이를 가져다 실행하는 기본 테스트를 만들려다 보니 watch 도 없고 기껏 설정해놓은 lint 도 돌아가지 않고 있다는 것을 발견했다. 공부했던 걸 써먹어볼 때가 온 것 같다.

## 다시 구현 기반 만들기
gulp, gulp-eslint 를 설치하고, lib spec 디렉토리의 .js 파일이 변경되면 lint 를 수행하게 해두었다.

해두고 보니 eslint 의 설정이 부족했다. jasmine 의 beforeEach 를 알아먹지 못한다. 이걸 global 객체 설정이라고 설명해줘야 할 것 같다.

찾아보니 eslint 문서에 `jasmine` 환경이 predefine 되어 있다고 되어 있어서 설정에 넣어주었다.
```
// .eslintrc
{
  "extends": "./node_modules/eslint-config-hexo/eslint.js",
  "env" : {
    "jasmine" : true
  }
}
```

lint 는 해결되었고, watch 와 test 를 만들었다.

만들어놓고 보니 조금 실수했다 싶은 게, 매 파일 저장시 돌릴 정도로 테스트가 가볍지 않을 것 같았다. 일단 이대로 쓰다가 무거우면 없애야겠다. 왜 hexo-deployer-git 에서 watch 를 안만들어뒀는지도 알 것 같았다.



### 테스트 만들기

hexo-deployer-git 을 참고해 테스트에서 해야 할 것들을 보면

1. basedir - 테스트 대상 디렉토리를 만들고 파일을 생성하는 등의 작업을 한다.
2. fakeRemote - 리모트 repository 를 만든다.
3. git_publish 실행,
4. 체크아웃받아 비교확인한다.


#### basedir 만들기
basedir 만들기, 즉 디렉토리와 파일을 만들려면 파일 시스템을 사용해야 한다. `hexo-fs` 가 제공하는 것 같으니 의존성에 추가한다. 함께 사용할 게 뻔하니 `hexo-util` 도 의존성에 추가해둔다.

```
npm install --save hexo-fs hexo-util
```


테스트하다 발견. jasmine 은 async 테스트를 위해 `beforeEach` 나 `it` callback 에 비동기 호출 종료 신호 함수? -이런 걸 뭐라고 부르는지 모르겠는데- 를 넘긴다. 근데 이걸 파라메터에 정의해두고 done 을 호출해주지 않으면 마냥 기다리게 된다.

당연하다면 당연한 동작인데, 자바스크립트 기능에서 function 인자 정의 여부에 따라 동작이 다른 라이브러리를 사용해보는 게 너무 오래간만이라 찾아내는 데 시간이 걸렸다.

#### fakeRemote 만들기
별다른 걸리는 게 없었다.

#### TDD를 따라가는 과정의 답답함

지금 나름 TDD 기반으로 하기 위해서 테스트를 다 만들고 나서 git_publish 를 만드는 순서로 가려 하는데 생각보다 힘들다. 테스트에 있는 validation 로직이 문제이다. validation 로직은 파일을 checkout 받은 다음 원본 디렉토리와 비교하는 것인데, 이게 제대로 만들어졌는지를 파악하기 위해서는 파일을 remote 에 push 해봐야 한다. 그런데 이 동작은 최종적으로 필요한 동작이다. 즉, 로직이 잘 만들어졌는지 테스트 하기 위해 테스트를 만들고 있는데, 테스트가 잘 만들어져 있는지 테스트하기 위해 로직이 필요한 것.

엄밀히 따지고 보면 서로 꼬리를 무는 관계는 아니다. git push 는 로직을 통하지 않고도 할 수 있고, 내가 만들려고 하는 로직은 그 동작을 node 에서 수행하는 코드니까, 1. 손으로 동작을 실행시켜 2. 테스트를 테스트하고, 3. 2를 기반가지고 로직을 만드는 순서이다. 1과 3이 비슷해보이긴 해도 엄밀하게 말하면 다르다.

다만 충분히 생략가능한 과정을 굳이 따라가고 있어야 하는가가 답답한 느낌이 든다. 이런 부분이 TDD에 대해 비판적인 사람들이 가지는 생각인 걸까?

뭐, 테스트를 일종의 문서화라고 생각하고, 유지보수관점에서 코드 자체보다 테스트를 잘 만들어두는 것의 가치를 추구한다고 생각해보면 그다지 틀린 순서도 아닌 것 같다. 지금은 공부중이니 좀 답답해도 따라가봐야겠다.


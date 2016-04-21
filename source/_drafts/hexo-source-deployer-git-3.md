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

lint 는 해결되었으니 이제 watch 에 테스트를 추가할 차례다.



잠시 테스트를 만들다 보니 watch 도 없고, 


인터페이스를 잡기 위해 필요한 것들을 생각해보면, `base_dir` 및 `public_dir` 등이 필요하다. 그런데 이것들을 hexo deployer 는 어떻게 받는지는 의문이 들었지만 이미 너무 간 것 같다 찾아보기도 하고 했으니 이것들은 좀 천천히 작성하도록 하자.


hexo 의 deployer 는 다음을 context 로 가지는 모양이다.
```
{
	base_dir : '',
    public_dir : '',
    log : ''
}
```
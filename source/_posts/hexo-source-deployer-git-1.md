title: hexo-source-deployer-git (1)
tags:
  - hexo
categories: []
date: 2016-04-12 23:14:00
---
[배포 정리](/2016/03/27/배포-정리/) 글에서 소스 deploy를 적당히 스크립트로만 만들었는데, 이걸 deploy plugin 으로 만들어두면 좋겠다는 아이디어도 있었다 이를 한번 진행해보려고 한다.

기능은 단순하다. hexo 기본 디렉토리의 모든 파일을 지정한 repository 로 push 하는 플러그인이다. [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git) 을 많이 참고할 수 있을 것 같다.

## 작업 계획
1. 구현 기반 만들기
2. 특정 디렉토리를 git 으로 push 하는 기능 만들기
3. 2를 hexo plugin 으로 붙이기

순으로 진행할 예정이다.

## 구현 기반 만들기
이걸 뭐라고 하더라. package.json, 테스트 설정 등을 해두는 작업인데... 언젠가는 제대로 파악해둬야겠다. 

- npm init
- jasmine init
- git init
- add .gitignore
- npm install eslint --save-dev
- npm install eslint-config-hexo --save-dev
- add .eslintrc


### eslint-config-hexo extends 이슈
구현 기반을 추가하는 중에 [eslint-config-hexo](https://github.com/hexojs/eslint-config-hexo) 라는 것을 발견했다. hexo 의 lint rule 규칙인 것 같아서 사용하기 위해 추가했다. 그런데 동작하지 않아서 설정을 바꿔줘야 했다.

README 에는 다음과 같이 적혀 있었다.

```
{
  "extends": "hexo"
}
```
하지만 `eslint index.js`를 실행했을 때 다음과 같은 오류가 발생하며 설정 경로를 찾지 못했다.

```
Cannot find module 'eslint-config-hexo'
Referenced from: c:\dev\atom_project\hexo-source-deployer-git\.eslintrc
Error: Cannot find module 'eslint-config-hexo'
Referenced from: c:\dev\atom_project\hexo-source-deployer-git\.eslintrc
    at Object.ModuleResolver.resolve (c:\Users\user\AppData\Roaming\npm\node_modules\eslint\lib\util\module-resolver.js:74:19)
    at resolve (c:\Users\user\AppData\Roaming\npm\node_modules\eslint\lib\config\config-file.js:475:33)
```
eslint 설정 문서의 [Extending Configuration Files 항목](http://eslint.org/docs/user-guide/configuring#extending-configuration-files)을 읽고 다음과 같이 바꿔줬더니 잘 동작한다.

```
{
  "extends": "./node_modules/eslint-config-hexo/eslint.js"
}
```
최초의 설정이 잘못된 설정이라고 생각되진 않는다. eslint-config-hexo 라는 모듈을 찾으로 시도한 것은 설정 자체는 유효하다는 이야기로 보인다. 문서에도 다른 모듈을 가져와서 extends 할 수 있다고 되어 있고, hexo-deployer-git 에서도 그렇게 사용하고 있고 [.eslintrc](https://github.com/hexojs/hexo-deployer-git/blob/master/.eslintrc) 

추측컨데 eslint 의 문제가 아닐까 싶다. 윈도우에서만 발생하는 현상이라던가.. 일단 잘 동작하니 더이상 찾아볼 의욕을 잃었다.

일단 여기서 시간을 많이 쓰기도 했고 떠오르는 설정은 다 넣었으니 다음 단계로 넘어가기로 했다.



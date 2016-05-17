title: travis CI
date: 2016-05-17 21:34:27
tags:
---
이전부터 [Travis CI](https://travis-ci.org/) 를 써봐야겠다고 생각했는데, 이번
기회에 [hexo-source-deployer-git](https://github.com/kcopper8/hexo-source-deployer-git)
에다가 써봐야겠다.

## 훑어보기
일단 사이트로 들어가 무작정 훑어보기 시작했다. 가입은 예전에 github 계정으로
해두었었다.

해야 하는 건 다음 내용으로 보인다.

1. travis CI [profile](https://travis-ci.org/profile/) 페이지에서 빌드할 repository 켜기
2. repository 에 `.travis.yml` 파일 만들어두기
3. push 하기 (빌드 실행됨)


그냥 `.traivs.yml` 만 만들면 할 일이 거의 없겠다. 이 파일을 어떻게 작성하는지는
[language-specific](https://docs.travis-ci.com/user/language-specific/) 문서에
언어별로 설명되어 있다고 한다. node 기반의 프로젝트니 node 관련 문서를 찾으려고
했는데, [javascript 문서](https://docs.travis-ci.com/user/languages/javascript-with-nodejs)가
애초에 **javascript with node** 라는 제목으로 만들어져 있었다.

내용을 훑어봐야겠다.

### [Building a Node.js project(Travis CI)](https://docs.travis-ci.com/user/languages/javascript-with-nodejs)

우선은 [Getting started](https://docs.travis-ci.com/user/getting-started/)
문서와 [general build configuration](https://docs.travis-ci.com/user/customizing-the-build/)
문서를 읽으라고 되어 있다. Getting Started 문서에는 별 내용이 없으니 넘어가고,
general build configuration 문서를 훑어봐야겠다. 링크를 따라가니 문서의 제목이
*customizing the build* 라고 바뀌어 있다.

### [Customizing the build(Travis CI)](https://docs.travis-ci.com/user/customizing-the-build/)

문서 요약.

Travis CI 에는 프로그래밍 언어별로 기본 빌드 환경과 기본 빌드 스텝들을 제공한다.
빌드 스텝들은 `.travis.yml` 에서 커스터마이즈 할 수 있다. `.travis.yml` 파일은
repository 의 루트 디렉토리에 있어야 한다.

#### The Build Lifecycle
Travis CI 빌드는 다음 두 단계로 진행된다.

1. install : 의존성 설치
2. script : 빌드 스크립트 실행

이 단계 앞뒤로 커스텀 커맨드를 실행시킬 수 있다. `before_install`, `before_script`, `after_script`


`before_install` 스텝에서는 각 프로젝트에서 필요로 하는 추가적은 의존성을 설치할 수 있다. 우분투 패키지라거나 커스텀 서비스라거나.

`after_success`, `after_failure` 에서는 빌드가 성공하거나 실패했을 때 추가적인 작업을 실행시킬 수 있다. 문서 작성이나 서버로 배포 같은거. `$TRAVIS_TEST_RESULT` 환경 변수를 퉁해 빌드 결과에 접근할 수 있다.

부가적인 배포 단계같은거 다 합한 전체 빌드 라이프사이클은 다음과 같다.

1. Install `apt addons`
2. `before_install`
3. `install`
4. `before_script`
5. `script`
6. `after_success` or `after_failure`
7. OPTIONAL `before_deploy`
8. OPTIONAL `deploy`
9. OPTIONAL `after_deploy`
10. `after_script`


#### Customizing the Installation Step
기본적인 의존성 설치는 프로젝트 언어에 따라 결정된다. 예를 들어 자바는 Maven 이나 Gradle 중에 하나가 선택되는데, 어느 빌드 파일이 repository 에 있느냐에 따른다. 루비는 repository 에 Gemfile 이 있을 때 Bundler 를 사용한다.

### 잠깐
내 목적은 이 문서를 번역하려는 게 아니고 그냥 `.travis.yml` 을 설정하려는 거다. 이 문서의 번역은 프로그래밍이나 영어를 나보다 훨씬 잘하는 사람한테 넘기고, 나는 그냥 당장 필요한 거만 보는 게 좋겠다.

문서의 구조상 [Building a Node.js project(Travis CI)](https://docs.travis-ci.com/user/languages/javascript-with-nodejs)
문서가 이
[Customizing the build(Travis CI)](https://docs.travis-ci.com/user/customizing-the-build/) 문서를 다 봐야
이해할 수 있는 형태로 구성되진 않았을 것 같다. 그러니 node.js 문서로 돌아가서
내용을 따라가다가 모르는 게 나오면 *Customizing the build* 문서로 돌아오는 게 낫겠다.


### [Building a Node.js project(Travis CI)](https://docs.travis-ci.com/user/languages/javascript-with-nodejs)

우선 `.travis.yml` 파일에 `language` 와 `node_js` 버전을 설정해야 하나보다.

```
language: node_js
node_js:
  - "5"
```

`node` 대신 `iojs` 를 사용하게 하는 등의 설정을 구체적으로 할 수 있지만 내게 필요한 게 아니니 넘어가야겠다. `.nvmrc` 도 설정할 수 있는데, 이것도 넘어가야겠다.

디폴트 테스트로 `npm test` 를 실행한다고 한다. 그렇게 테스트하면 되니 그대로 놔두자... 가 아니었다. `hexo-source-deployer-git`는 테스트할 때 `gulp` 가 필요한데, 이런 global 설치된 녀석들은 `before_script` 에서 설치해줘야 하는 모양이다. `before_script` 에 `gulp` 및 `jasmine` 설치를 추가했다.

```
before_script:
  - npm install -g gulp jasmine
```

이 문서 자체는 이 이상 딱히 읽을 만한 내용이 없었다. 참고할 만한게 있을까 싶어 `hexo-deployer-git` 의 [`.travis.yml](https://github.com/hexojs/hexo-deployer-git/blob/master/.travis.yml) 파일을 열어보았다. 딱히 더 추가할 만한 내용이 없는 것 같다.


그렇게 추가하고 push 해보았다.

#### 이슈
문제가 있었다.

우선은 테스트의 문제인데, 애초에 테스트가 git config 에 `user.name` 및 `user.email` 이 설정되어 있지 않다면 사용자의 입력을 받아야 진행되는 형태였다. 그래서 `before_script` 에 그걸 지정해주는 라인을 추가해야 했다.

```
before_script:
  - git config --global user.email "you@example.com"
  - git config --global user.name "Your Name"
  - npm install -g gulp jasmine
```

그리고 *gulp* 의 문제인 것 같은데, `gulp test` 는 성공하든 실패하든 `exit code` 가 0이라 Travis CI 가 테스트를 성공했는지 실패했는지 알아볼 수 없는 모양이다. Travis CI 에는 gulp 테스트인 경우에는 다음과 같이 설정하라고 되어 있는데 어쩌면 다음과 같이 설정하면 gulp 의 응답을 파싱해서 성공 실패를 판단해 주는 게 아닐까? 한번 테스트해봐야겠다.

```
script: jasmine
```

덕분에 확인하게 되었는데, 테스트 실패를 받을 수 없었던 것은 순전히 `gulp test` task 를 구성할 때 jasmine 의 응답값을 리턴하지 않게 했기 때문이었다. `jasmine` 을 호출하게 했더니 성공도 실패도 잘 감지되었다. 이 값을 `gulp test` 가 잘 전달하게 수정하면 더 좋겠지만 이 정도에서 멈추기로 했다. 이미 많이 했다. 귀찮아졌다.

여튼 테스트는 되었고.

### 이미지 embedding
Travis CI 의 빌드 status 를 보여주는 이미지를 사용하기 위한 가이드 문서가 있다. [Embedding Status Images](https://docs.travis-ci.com/user/status-images/) 이다.

별 내용은 없다. 자기 *Travis CI* 빌드 페이지에 가면 있는 이미지의 URL을 클릭하고 branch 를 선택하면 붙여놓을 코드를 만들어준다고 한다. 나는 README.md 에다 붙여넣을 예정이니 *Markdown* 을 선택했다.

```
[![Build Status](https://travis-ci.org/kcopper8/hexo-source-deployer-git.svg)](https://travis-ci.org/kcopper8/hexo-source-deployer-git)
```

과 같은 코드를 받았고, README 에 넣어서 commit 했다!
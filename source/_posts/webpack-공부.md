---
title: webpack 공부
date: 2016-03-28 01:43:57
tags:
---

이전 글에서 webpack 으로 결정했으니 사용법이라도 파악해봐야겠다.

webpack 튜토리얼 문서 http://webpack.github.io/docs/tutorials/getting-started/ 를 따라해보기로 했다.

### [SECOND FILE](http://webpack.github.io/docs/tutorials/getting-started/#second-file) 까지 따라해본 소감:
wiredep 만큼 세팅 및 사용이 편할 것 같다!

뭐 아직까지는 맛보기겠지?

### [THE FIRST LOADER](http://webpack.github.io/docs/tutorials/getting-started/#first-loader) 까지 하는 중:
이 단락 들어가는 시점에서 이 이상 굳이 따라해야 하나 하는 의문을 가지게 되었다. 나는 당장 쓰고픈 걸 찾는 것이고 css 는 굳이 webpack 으로 머지할 의도를 가지고 있지 않다. 불필요한 시간소모인 것 같다는 느낌이 크게 든다. css 를 스크립트에서 로드하는 것도 왠지 친근하지 않고.

일단 튜토리얼이 길지 않으니 따라가봐야겠다.

일단 역시나 css 를 읽어서 문자열로 만든 다음 bundle.js 에 합쳐버리는 방식이다. 그리고 그 문자열을 포함해서 style 태그로 만들어 head 에 넣는 식인 것 같다. 신경쓰이는 부분이 2가지 생겼다.

    1. js 로딩이 끝나기 전에는 스타일이 적용되지 않을 것이라는 점

느린 네트워크에서 FE 성능이 조금이라도 더 빨라 보이게 하려고 스타일은 HEAD 에, 스크립트는 바디 저 끝에 두는 방식이 있다. js에는 별 게 없는 케이스에나 쓰는 방식이지만, 그 경우 js 파일의 로딩이나 해석(? 처리? 뭐라고 불러야 하지? 공부할게 계속 늘어난다...)이 늦어도 페이지가 어느정도 정상적으로 보이게 하는 방식인데, css-loader 를 쓰면 js를 수행하는 과정에서 스타일이 로드된다.

    2. css 문법 중 별도 파일로 분리된 css 파일에서만 쓸 수 있는 녀석이 있어서 그런 건 정상 동작하지 않을 것이다.

근데 이게 뭐였는지 기억이 안난다. 그때 이거 이야기해주신 분이랑도 떨어졌고. 나중에 알만한 사람에게 물어봐야겠다.

어차피 마음에 안들면 안쓰면 되는 거고, 공부하는데 시간도 얼마 안걸렸으니 딱히 손해본 건 없는 것 같다!

그리고 생각해보니 React 로 뭔가 만들게 되면 1은 거의 의미없겠구나.


### [BINDING LOADERS](http://webpack.github.io/docs/tutorials/getting-started/#binding-loaders) :
아. 그래! css-loader 따라하면서 loader 명 앞에 써주는 거 되게 번거롭다고 생각했다! 하긴 잘 생각해봤으면 그거 쓰던 중에 이런 거 있겠거니 하고 예상할 수도 있었을 텐데!

어쩌면 css-loader 항목을 거친 것은 되려 이걸 설명하기 위해서일지도 모르겠다.

### [A CONFIG FILE](http://webpack.github.io/docs/tutorials/getting-started/#config-file) :
그리고 나서 Config file 의 순이군. 멋지다. Loader -> CLI 매개변수 -> 설정파일 의 순서로 깔끔하게 유도했다. 군더더기 없는 멋진 튜토리얼 구성이다. webpack 이 문서화가 잘 되었다는 이야기가 있는데 명불허전이다.

그렇게 config file로 관심을 유도했지만, 별도의 설명없이 config file 내용을 보여주는 것 만으로 깔끔하게 설명을 끝냈다. 물론 읽는 나 역시 깔끔하게 이해했다. 역시 잘 만들어진 것은 군더더기가 없다.

조금 즐거워졌다. webpack 을 이용해서 뭔가 만들어보고 싶어지고 있다.


### [WATCH MODE](http://webpack.github.io/docs/tutorials/getting-started/#watch-mode) 까지 :
watch 모드를 쓸 때 캐싱을 켜두면 좀더 빨라진다는 듯 하다. 튜토리얼에는 설명이 없는 듯 하니 나중에 따로 찾아봐야겠다.

### [DEVELOPMENT SERVER](http://webpack.github.io/docs/tutorials/getting-started/#development-server) :
사실 이거 처음 튜토리얼 훑어볼 때부터 궁금했었다. 어디까지 해주는 녀석일까? bundle.js 를 만들었는데 bundle 이라는 디렉토리가 생긴다면 html 파일은 어떻게 안해주는 것인가?

아항.

    http://localhost:8080/webpack-dev-server/

는 디렉토리의 static 파일을 그냥 제공하고, js 이름의 디렉토리로 이동하면 맨 HTML 에 그 js 를 심은 결과를 보여주는 구나. js 확인해보기도 좋겠고 모듈화를 잘 해서 만들게 유도되기도 하겠다. 좋구나.

## 소감
아주 마음에 들었다. 좀 더 써보고 싶다. 그런데 gulp 나 grunt 랑은 어떻게 같이 쓰면 될지, livereload 는 어떻게 하면 될지 등이 신경쓰인다. 다음 공부할 대상으로 잡아봐야겠다.

좋은 공부였다. 아무래도 생각나는 거 쓰면서 하는 게 더 공부가 잘 되는 듯 하다. 의식의 흐름대로 적는 글이라 누가 읽기에는 안좋겠지만서도.

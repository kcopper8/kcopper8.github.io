title: hexo-source-deployer-git (7)
date: 2016-05-13 01:58:50
tags:
---
[hexo-source-deployer-git (6)](/2016/05/10/hexo-source-deployer-git-6/) 에서 계속... 인가?

Plugin 으로 만드는 것만 남았다. 점점 더 진행하기 귀찮아지지만, 시작한 거 끝을 보자.

## git_push 로 hexo plugin 만들기

지난 문서에서 *Script* 방식으로 만들었던 코드를 가져와서 플러그인 디렉토리에 deployer 정의 코드를 만들었다.

```
// index.js
var git_push = require('./lib/git_push.js');

hexo.extend.deployer.register('source-git', function(args) {
  return git_push({
    path : this.base_dir,
    repository : args.repository,
    branch : args.branch
  });
});
```
그리고 가져다 설치했다.

```
$ npm install ../../hexo-source-deployer-git/
hexo-site@0.0.0 C:\dev\atom_project\hexo_site\blog
`-- hexo-source-deployer-git@1.0.0  extraneous

npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.0.12
```

신기하다. 내가 만든 npm 모듈이 설치되었다!

그럼 한번 실행시켜보자.

됐다~ 가 아니었다. `scripts` 디렉토리에 있는 파일을 안 지우고 테스트 한 탓에 되는 것 처럼 보인 것 뿐이다. scripts 디렉토리 파일을 제거하고 실행해보니 안된다. plugins 문서를 좀 더 자세히 읽어보기로 했다.

    You’ll also need to list your plugin as a dependency in the root package.json of your hexo instance in order for Hexo to detect and load it.

그 외에도 package.json 에 dependency 로 추가되어 있어야 한다고 한다. 의존성을 추가하고 다시 실행시켜 보았다.


title: FTP synchronizer
date: 2016-06-27 02:17:24
tags:
---
# FTP Synchronizer

FTP 로 접근해서 사용하는 리모트 작업저장소가 있다. 혼자만 작업하는 곳은 아닌데, 개발 및 배포환경을 만들어서 다른 작업자들과 공유할 여유가 되지는 않아서 소스 버전 관리는 혼자만 하고 있다.

FTP 로 접근해 리모트에 있는 파일들을 내려받아 GIT repository 에 commit 하는 스크립트 같은 걸 만들어봐야겠다.

## 기능 및 계획
1. 설정해놓은 FTP 경로에서 파일을 재귀적으로 다운받는다.
2. 1을 할 때 remote 의 파일이 변경되지 않았다면 다시 받지 않는다.
3. 1을 할 때 예외 파일을 지정할 수 있다.

까지만 해놓은 다음 그 다음 기능을 넣도록 하자.


## vinyl-ftp
gulp 기반의 [vinyl-ftp](https://github.com/morris/vinyl-ftp) 라는 녀석이 있어서 스크립트는 이걸 쓰면 되지 않을까 생각함.

## FTP 다운로드



### map-stream
gulp 의 pipe 에서 커스텀 기능을 넣어서 살펴보기 위해 [map-stream](https://github.com/dominictarr/map-stream) 을 추가했다. 근데 map-stream 심오한데.

### vinyl
vinyl-ftp 의 인터페이스를 이해하려면 결국 [vinyl](https://github.com/gulpjs/vinyl) 을 봐야 하는 모양이다.



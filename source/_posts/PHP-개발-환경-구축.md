title: PHP 개발 환경 구축
date: 2016-05-21 02:43:05
tags:
---
아는 사람한테 뭘 좀 만들어 줄 일이 생겨서 그누보드를 만지게 되었다. PHP는 너무 오래간만이라서 워밍업 겸 [PHP The Right Way](http://modernpug.github.io/php-the-right-way/) 를 보고 있었는데, 개중에 Window 에서 개발 환경 설정에 대한 항목이 있어서 따라가보려 한다.

그렇잖아도 window 환경에 PHP 설치하고 apache 도 설치하고, DB 도 설치하고... 등등이 귀찮아서 답답했는데 마침 잘 되었다.

게다가 VM으로 리눅스를 설치해서 로컬 개발 서버로 사용하려던 계획은 실패했다. Virtual Box 가 설치하는 이미지마다 커널 패닉을 뱉더니 급기야는 블루스크린을 띄워버렸다...


	완전한 웹서버와 MySQL 데이터베이스 등을 포함한 “통합(All-in-One)” 패키지를 선호한다면 Web Platform Installer나 XAMPP, EasyPHP, OpenServer, WAMP 등을 사용하여 빠르게 윈도우에서 개발 환경을 갖출 수 있습니다.

여기에서 가져온 키워드로 검색하다가 EasyPHP 에 대한 설명이 마음에 들었다. [이들을 비교하는 스택오버플로우 질문글](http://stackoverflow.com/questions/5580342/windows-xampp-vs-wampserver-vs-easyphp-vs-alternative) 에서 읽었는데, 쉽고 portable 하며, 아파치 등의 일반적인 서버를 그대로 쓰는 듯 하며, Window Service 를 사용하지 않는다고 한다. 여차하면 깔끔하게 제거하기 쉽겠다 싶어 이걸 써보기로 했다.


[EasyPHP](http://www.easyphp.org/) 사이트에서 devserver 를 다운로드 받았다. 설치했다. 셋업과정에서 선택할 거라곤 설치될 디렉토리 밖에 없었다.

설치 후 실행시키니 트레이 아이콘이 생기고, 우클릭해서 대시보드를 여니 웹서버 start 버튼과 DB 서버 start 버튼이 보인다. 누르니 그냥 실행된다. 딱히 뭐 더 쓸 게 없네.





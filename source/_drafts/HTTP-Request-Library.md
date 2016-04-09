title: HTTP Request Library
tags: []
categories: []
date: 2016-04-03 20:47:00
---

ajax 를 사용할 일이 있는데, 이왕이면 node 에서도 사용할 수 있는 라이브러리여서 테스트 코드도 만들 수 있으면 좋겠다.

구글 검색해보니 2개가 눈에 띄었다.

- [axios](https://github.com/mzabriskie/axios)
- [popsicle](https://github.com/blakeembrey/popsicle)

둘다 Promise 기반의 인터페이스인데, popsicle 은 npm v5.0.1, axios 는 v0.9.1 이라 popsicle 을 사용하기로 했다.

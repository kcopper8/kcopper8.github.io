title: 2 minute introduction to Rx
author: Kcopper8
date: 2016-07-16 16:43:17
tags:
---
[2 minute introduction to Rx](https://medium.com/@andrestaltz/2-minute-introduction-to-rx-24c8ca793877) 를 읽고 Observable 에 대해 감이 왔습니다. 영어공부를 겸해 번역해보았습니다.

# 2 분만에 하는 Rx 소개

[내가 얼마 전에 쓴 튜토리얼](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)을 보셨나요? 너무 길죠? 맞습니다. [Rx](https://github.com/Reactive-Extensions/RxJS) 는 그리 어렵지 않습니다. 어쩌면 당신이 이미 스스로 만들어 쓰고 있는 것일 수도 있습니다. 다음을 읽어주세요.

배열이 뭔지 아시나요? 당연히 그렇겠죠. 여기 배열이 하나 있습니다.

```
[ 14, 9, 5, 2, 10, 13, 4 ]
```

이 배열은 immutable 이라 변경하지 말고 홀수를 모두 제외해 달라고 한다면 어떻게 하시겠습니까? 흔히 쓰는 방법은 이거죠.

```
[ 14, 9, 5, 2, 10, 13, 4 ]

filter( (x) -> x % 2 == 0 )

[ 14, 2, 10, 4 ]
```

아직은 전혀 새로울 것이 없습니다. [underscore.js](http://underscorejs.org/#filter), [ECMAScript 5.1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [LINQ](https://en.wikipedia.org/wiki/Language_Integrated_Query), [Guava](https://code.google.com/p/guava-libraries/wiki/GuavaExplained), 등에서 일상적으로 사용하는것들이죠. 이것은 함수형 패러다임에서 왔습니다.

---

이제 마우스 클릭 이벤트의 커서 위치 데이터를 생각해봅시다. 타임라인에 그리면 이런 모양이겠죠.

![a stream of events](https://cdn-images-1.medium.com/max/800/1*FjTqms95LbK_ztsZXiNpoQ.png)

친구여, 이것은 _이벤트 스트림(stream  of events)_입니다. **Observable** 이라고도 불리지요.

클릭 이벤트들은 마우스에서 왔습니다. 그래서 이벤트 스트림 전체는 _immutable_ 입니다, 생성된 후 다른 이벤트를 추가하거나 제거할 수 없다는 의미에서는요. 

그러나 내가 `x < 250` 이하의 이벤트들에만 관심이 있다면 어떨까요? 우리가 배열에 했듯, 원본을 필터링하는 새 스트림을
만들 수 없을까요?

![original stream](https://cdn-images-1.medium.com/max/800/1*FjTqms95LbK_ztsZXiNpoQ.png)

```
filter( (event) -> event.x < 250 )
```

![filtered stream](https://cdn-images-1.medium.com/max/800/1*DvH5Iqul7Nxor7r7AencgA.png)

그럼 immutable 배열과 Observable 은 뭐가 다를까요? 별 차이 없습니다. 둘 다 map, filter, reduce 를 사용할 수 있습니다. 또한 Observable 에는 
_merge_, _delay_, _concat_, _buffer_, _distinct_, _first_, _last_, _zip_, 
_startWith_, _window_, _takeUntil_, _skip_, _scan_, _sample_, _amb_, _join_, _flatMap_ 도 사용할 수 있습니다.

**그냥 비동기적인 Immutable 배열로 생각하세요.**

Rx 는 event 를 위한 underscore.js 입니다. 그런데 잠시만요, 이벤트란 뭘까요? 당신의 어플리케이션의 모든 것은 이벤트가 될 수 있지 않습니까?

"application started" 이벤트, "API response arrived" 이벤트, "keyboard key pressed" 이벤트,
"invalidateLayout()" 이벤트, "device slept" 이벤트 등등등...

모든 것은 이벤트 스트림이 될 수 있습니다. 잘 구성하고 결합하는 것이 관건일 뿐입니다.

이상, 2분만에 소개하는 Rx였습니다.

> What's the difference between an array and events?
> 
> — Erik Meijer
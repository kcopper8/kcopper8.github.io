title: Angular2 study 4
author: Kcopper8
date: 2016-07-15 01:28:09
tags:
---
이 문서는 Angular 2 의 [Getting and Saving Data with HTTP](https://angular.io/docs/ts/latest/tutorial/toh-pt6.html)
문서를 필요한 부분 번역한 문서입니다.

# 7. HTTP

TypeScript 를 이용한 Angular 2 가이드

_service 와 component 들을 Http 를 사용하게 변경합니다._


## [Getting and Saving Data with HTTP](https://angular.io/docs/ts/latest/tutorial/toh-pt6.html)

우리의 주주들은 우리의 진행을 치하합니다. 이제 그들은 hero 데이터를
서버로부터 받고, 유저들이 hero 를 추가/수정/삭제할 수 있게 하고
그 변경사항을 서버로 돌려보내 저장할 수 있게 되길 원합니다.

이 챕터에서는 우리는 어플리케이션에게 리모트 서버의 Web API
를 호출하는 HTTP call 을 만드는 법을 알려줄 겁니다.

## Where We Left off
생략

## Providing HTTP Services
`Http` 는 **Angular 코어 모듈이 아닙니다.** 웹 접근하는 건 Angular 의
부가적 모듈이고, 그것은 `@angular/http` 로 호출되는, 
Angular npm 패키지의 별개의 스크립트 파일에 포함되오 있고, 분리된
모듈로 존재합니다. 

우연히도 우리는 `@angular/http` 를 import 할 준비가 되어있습니다.
왜냐하면 `systemjs.config` 가 _SystemJS_ 를 우리가 필요할 때
로드하도록 설정했기 때문입니다.

### Register (provide) HTTP services
우리의 앱 Angular 의 `http` 서비스에 의존할 겁니다. 그것 자체는
다른 지원 서비스에 의존하겠죠. `@angualr/http` 의 `HTTP_PROVIDERS` 배열은
http service들을 위한 전체 set 을 가지고 있습니다.

우리는 어플리케이션의 어디에서 라도 `http` 서비스에 접근할 수 있어야 합니다.
그래서 우리는 그것을 `main.ts` 에서 호출하는 `bootstrap` 에서 등록합니다.
그 곳은 우리가 어플리케이션과 그것의 root `AppComponent`를 실행
하는 곳이죠.

```
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }         from './app.component';
import { appRouterProviders }   from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS
]);
```
우리가 `HTTP_PROVIDERS`를 `bootstrap` 두번째 파라메터 배열에
추가한 것에 주목해주세요. 이것은 `@Component` decorator 의
`provider` 배열과 동일한 효과입니다.

## Simulating the web API
우리는 일반적으로 application 범위의 service 들을 루트 `AppComponent` provider에
등록하도록 권장했습니다. 여기서는 특별한 이유로 `main` 에 등록합니다.

우리의 어플리케이션은 개발 도중에 stage 된 상태이고 완료와는 거리가 멉니다.
우리는 심지어 heroes 에 관한 request 를 처리할 web 서버도 없습니다.
우리가 그걸 하기 전까지, 우리는 페이크를 써야 합니다.

우리는 HTTP Client 를 mock 서비스로부터 데이터를 저장하고 받도록 trick 
쓸 것입니다. _in-memory_ web API 입니다.

어플리케이션 자체는 이것을 알 필요가 없고, 알아서도 안됩니다. 그래서
우리는 in-memory web API 를 `AppComponent` 바깥에 둡니다.

여기 이 트릭으로 동작하는 버전의 `main` 이 있습니다.

```
// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data.service';

// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }         from './app.component';
import { appRouterProviders }   from './app.routes';

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
]);
```

아래를 진행하여 우리는 default `XHRBackend` - 원격 서버로 통신하는 서비스 - 를 in-memory web API 서비스로 바꿉니다.

```
export class InMemoryDataService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    return {heroes};
  }
}
```

이 파일은 `mock-heroes.ts` 를 대체합니다. 그건 이제 삭제해도 됩니다.


    이 챕터는 Angular HTTP 라이브러리를 소개하는 챕터입니다. 이 backend 동작의
    디테일에 집착하지 마십시오. 그냥 예제를 따라오세요.

    in-memory web API 에 대해서는 나중에 [HTTP client chapter](https://angular.io/docs/ts/latest/tutorial/toh-pt6.html) 
    에서 더 배울 수 있습니다. 기억하세요. in-memory web API 는 Tour of Heroes 같은 개발 진행중이거나
    데모 환경에서나 유용할 겁니다. 당신이 실제 web API 를 가지고 있다면 스킵하세요.


## Heroes and HTTP

우리의 현재 `HeroService` 구현을 봅시다.

```
getHeroes() {
  return Promise.resolve(HEROES);
}
```

우리는 mock hero 배열로 resovle 된 promise 를 리턴합니다. 그것은 그 때는
충분해 보였지만 우리는 우리가 HTTP client 로 hero들을 받을 날을 기대하는 걸
알고 있습니다. 그리고 우리가 비동기적 동작이 되어야 한다는 것도요.

드디어 그 날이 왔습니다. `getHeroes()` 를 HTTP 를 사용하도록 바꿉시다!

```
// app/hero.service.ts (new constructor and revised getHeroes)

  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

```

### HTTP Promise

우리는 여전히 Promise 를 리턴하지만, 다르게 만듭니다.

Angular `http.get` 는 RxJS 의 `Observable` 을 리턴합니다. _Observables_은 
비동기적 데이터 흐름을 관리하는 강력한 방법입니다. 우리는 `Observables` 를
나중에 배울 겁니다.

지금은 익숙한 것으로 돌아갑시다. `Observable` 을 `toPromise` 를 이용해 `Promise` 로 바꿉시다.

```
.toPromise()
```

불행하게도, Angular 의 `Observable` 은 `toPromise` 메서드를 가지고 있지 않습니다. ...
not out of the box. 박스 밖에는 없습니다. Angular `Observable` 은 bare-bones implementation
입니다.

`toPromise` 같은 `Observable`을 유용하게 확장하는 score 가 있습니다. 우리가 이것들을
원한면면, 우리는 우리 스스로 이것들을 추가해야 합니다. rxJs 라이브러리르 이런 식으로
importing 하는 것 만큼 쉽습니다.

```
import 'rxjs/add/operator/toPromise';
```

### Extracting the data in the _then_ callback

promise 의 `then` 에서는 우리는 Http `Response` 의 `join` 메서드를 이 response
의 데이터를 풀기 위해 호출합니다.

```
.then(response => response.json().data)
```

아.. 더는 못하겠다. 안되겠다.


```
  getHero(id: number) {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
```
여기에서 `getHeroes()` 의 return data type 을 빼먹었더니 컴파일이 안되었다. 
타입스크립트 대단해!

## Updating Components
`EventEmitter` 가 뭘까?
[Component Interaction Cookbook](https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#child-to-parent)
에 관련 내용이 들어있다고 하는 것 같다.


` <my-hero-detail (close)="close($event)"></my-hero-detail>`
궁금. `(close)` 는 커스텀 이벤트인 것 같은?


title: Angular2 study 3
author: Kcopper8
date: 2016-07-14 23:10:16
tags:
---
# Angular2 study 3

## [Routing Around the App](https://angular.io/docs/ts/latest/tutorial/toh-pt5.html)

[Routing and Navigation](https://angular.io/docs/ts/latest/guide/router.html) 에서 router 관련 정보를 더 얻을 수 있다고 한다.

	Go back to the HeroesComponent and remove the HeroService from its providers array. We are promoting this service from the HeroesComponent to the AppComponent. We do not want two copies of this service at two different levels of our app.


이건 좀 놀랍다기보단 별론 것 같다. AppComponent 에 provider 로 `HeroService` 가 선언되어 있으면, AppComponent 가 의존하는 HeroesComponent 에서는 provider 를 선언하지 않아도 HeroService 가 위에서 지정한게 들어가는 것 같은데... 글쎄. 좀 미묘한데.

나중에 provider 는 좀 확실히 알아봐야겠다. provider 외에 다른 DI 대안이나... 그래 DI 문서를 읽어보면 되겠네.


### Add Routing
```
<base href="/">
```

이런걸 한다. 이게 뭘까? 처음 보는게 나왔다.

	See the base href section of the [Router](https://angular.io/docs/ts/latest/guide/router.html#!#base-href) chapter to learn why this matters.

라고 한다.

`base` 태그는 원래 있었던 건가보다...

```
const routes: Routerconfig = [
  {
    path: 'heroes',
    component: HeroesComponent
  }
];
```

엑. 이거 뭐야. 타입 있는데 Array 를 넣어도 되네. 이거 Array 확장한 클래스야? 뭐지. 궁금하다. TypeScript 를 제대로 봐야겠다. 볼 거 많네.

에이 깜짝이야.

```
export type RouterConfig = Route[];
```
그냥 배열이었네. 완전 깜짝 놀랐잖아.

### Router Outlet
`AppComponent` 에 bootstrap 했기 때문인지 그 템플릿에 다음과 같이 적은 부분에 routing 된 component 가 들어가는 모양.

```
<router-outlet></<router-outlet>
```

이런 식으로 특정 위치에 여러 종류의 컴포넌트를 오게 할 수도 있을 것 같아 보이는데 이건 routing 한정인가? 그냥 기능 동작으로 하려면 어떻게 해야 할까?


```
  {
    path: 'dashboard',
    component: HeroesComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
```

redirect 를 위와 같이 쓰게 되는데, `redirectTo` 에는 `/` 를 붙이고 `path` 에는 안붙이는 게 조금 마음에 안든다. `redirectTo` 에는 일반 URL도 사용해도 되기 때문인가? `path` 에도 그냥 `/` 부터 시작해도 되지 않았을까?

[Routing](https://angular.io/docs/ts/latest/guide/router.html#!#redirect) 의 redirect 관련 문서

`routerLinkActive` 가 뭔지 알려주고 넘어가!

### Configure a Route with a Parameter
`ActivatedRoute ` 현재 라우팅의 정보를 알려주는 무언가겠지. PageInfoHolder 같은 건가보네. 여기저기 니즈는 다 똑같구만

```
this.route.params.subscribe(params => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
```

`route.params.subscribe` 는 뭐고 왜 callback 형식으로 동작하는거지? params 가 처리되기 까지 기다리는 건가? 


[CanDeactivate-interface.html](https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html) 라고 history back() 으로 이동할 때 일정 이상 가지 못하게 하는 뭔가가 있다는 것도 같은데 뭘까?

### Select a Dashboard Hero
근데 왜 이 시점에서 URL 직접 입력하면 안되는 거지?
클릭해서 url 바뀌면 화면 나오는데.


```
{{selectedHero.name | uppercase}} is my hero
```
라는 표현방식을 [Pipe](https://angular.io/docs/ts/latest/guide/pipes.html) 라고 하는가보다.




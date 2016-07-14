title: Angular2 study 2
author: Kcopper8
date: 2016-07-14 00:11:41
tags:
---
# Angular2 study 2

## [MULTIPLE COMPONENTS](https://angular.io/docs/ts/latest/tutorial/toh-pt3.html)

여러 컴포넌트로 나누는 걸 해보나보다.


Naming Convention 이 있었다.

    Naming conventions

    We like to identify at a glance which classes are components and which files contain components.

    Notice that we have an AppComponent in a file named app.component.ts and our new HeroDetailComponent is in a file named hero-detail.component.ts.

    All of our component names end in "Component". All of our component file names end in ".component".

    We spell our file names in lower dash case (AKA kebab-case) so we don't worry about case sensitivity on the server or in source control.


[the-hero-property-is-an-input-](https://angular.io/docs/ts/latest/tutorial/toh-pt3.html#!#the-hero-property-is-an-input-) 부분을 보다보니, 특정 영역을 뚫어두고 여러 컴포넌트를 상황에 따라 넣어쓰는 걸 어떻게 하는지를 이번 튜토리얼 끝나기 전에 파악해야겠다는 생각이 떠올랐다.


> Angular insists that we declare a target property to be an input property. If we don't, Angular rejects the binding and throws an error.

이 부분 좀 중요해 보인다.

> We explain input properties in more detail [here](https://angular.io/docs/ts/latest/guide/attribute-directives.html#!#why-input) where we also explain why target properties require this special treatment and source properties do not.

[저기](https://angular.io/docs/ts/latest/guide/attribute-directives.html#!#why-input) 에서 input properties 에 대해서 좀 더 설명한다. 거기서는 왜 target 프로퍼티가 이 특별 취급을 당하고 source properties 는 아닌지에 대해서도 설명되어 있다.

뭐, injection 할 수 있는 프로퍼티를 명시적으로 지정해놓기 위해서가 아닐까? @Input 역시 annotation 이 아닐까 싶었는데 역시나 그렇고. 그렇잖아도 단순 member properties 에 바로 injection 할 수 있는 건 위험하기도 하고 다양하게 쓰기도 어렵고 해서 별론데.. 하고 생각하던 참이었다. 보면 볼수록 angular 는 spring mvc 비슷해지네.

그리고 @Input 에 대해서는 [Attribute Directive](https://angular.io/docs/ts/latest/guide/attribute-directives.html#input) 페이지에서 더 설명한단다.

```
<my-hero-detail [hero]="selectedHero"></my-hero-detail>
```
여기 왜 `[]`, 일방향 바인딩일까 생각해봤는데, 객체 레퍼런스의 바인딩이니 당연히 일방향이어야겠다 생각했다. 근데 양방향도 가능하긴 한건가? 좀 궁금함.


> It's not happening yet!
> 
> We click among the heroes. No details. We look for an error in the console of the browser development tools. No error.
> 
> It is as if Angular were ignoring the new tag. That's because it is ignoring the new tag.

어우 짜증나는 친구들 같으니... ㅋㅋㅋ 내가 생각한 거 다 예상해놨잖아!


```
directives: [HeroDetailComponent]
```

directives 등록을 사용하는 `@Component` 에 정의하는 것도 꽤 특이하네. 전체 사용하는 것들을 의존성 추적해서 리스트화 하는건가.

## [Services](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html)

서비스를 만들고 injection 이다!

    We've adopted a convention in which we spell the name of a service in lowercase followed by .service. If the service name were multi-word, we'd spell the base filename in lower dash-case. The SpecialSuperHeroService would be defined in the special-super-hero.service.ts file.
    
naming convention 설명이 있다.



> It is a "best practice" to apply the @Injectable() decorator ​from the start​ both for consistency and for future-proofing.

`@Injectable()` 을 처음부터 넣어두는게 __best practive__ 라는데요...


역시 [dependency injection](https://angular.io/docs/ts/latest/guide/dependency-injection.html) 챕터가 따로 있었다. 


> We should be able to create a component in a test and not worry that it might do real work — like calling a server! — before we tell it to do so.

우리는 테스트 안에서 컴포넌트가 우리가 시키기 전에 실제로 동작-서버 호출 같은거-하지 않을까 걱정하지 않고 그것을 생성할 수 있어야 한다.

`ngOnInit Lifecycle Hook. ` 주요 키워드일듯. [Lifecycle Hooks](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html) 챕터를 참고하라고한다.

injection 방식이 constructor 외에 더 있을 것도 같다. inejctor 에게 어떻게 HeroService 를 등록하는지 알려주기 위해 providers array 를 사용하라는 걸 보면 다른 방식으로 알려주는 것도 있을 법 하다.

그리고 생성자에서 명시적으로 member 변수로 할당하지 않아도 생성자 파라메터에 적어만 놓으면 member 변수가 되는 건 아무래도 너무 많이 뛰어넘은 것 같다. 아무래도 어딘가 default injector 같은게 있고, 설정으로 inection 방식을 새로 쓰는 뭔가가 있지 않을까?

`Promise` 가 es6 에는 전역으로 들어갔구나! 멋져!



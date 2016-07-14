title: Angular2 Study
author: Kcopper8
date: 2016-07-12 23:33:34
tags:
---
# Angular2 study
제목이 좀 거창하지만 여튼, Anuglar 2 를 겪어보기로 했다. 이걸로 해보면서 연습용 프로젝트의 뼈대도 만들어볼 예정이다.



## quick start
[5 Min Quickstart](https://angular.io/docs/ts/latest/quickstart.html) 를 따라가보기로 했다.

일단 [Add package definition and configuration files](https://angular.io/docs/ts/latest/quickstart.html#!#add-config-files) 에서 있는 다음 부분을 모르겠다.

```
  "dependencies": {
    "@angular/common": "2.0.0-rc.4",
    "@angular/compiler": "2.0.0-rc.4",
    "@angular/core": "2.0.0-rc.4",
    "@angular/forms": "0.2.0",
    "@angular/http": "2.0.0-rc.4",
    "@angular/platform-browser": "2.0.0-rc.4",
    "@angular/platform-browser-dynamic": "2.0.0-rc.4",
    "@angular/router": "3.0.0-beta.1",
    "@angular/router-deprecated": "2.0.0-rc.2",
    "@angular/upgrade": "2.0.0-rc.4",
```
뭐지. @로 시작해도 되나. 이거 내가 뭔지 이해못하고 그냥 넣고 지나가도 되나.

그리고 `systemjs`가 뭐지

또 이렇게 공부할 것이 늘어난다...

### main.ts
[main.ts](https://angular.io/docs/ts/latest/quickstart.html#!#main) 항목에서

```
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
bootstrap(AppComponent);
```

라는 것을 봤는데, bootstrap 이 트위터 부트스트랩 라이브러리인줄 알았더니 그게 아닌가보다. Angular 컴포넌트를 웹페이지 body 태그 같은곳에 붙여넣어서 최초로 돌려주는 뭔가인가보다. 이것 말고도 다른 방법이 있다고 한다. 코르도바라거나 NativeScript 같은. 앱 만들 생각도 당분간은 없으니 이것만 생각해둬도 되겠지.

SystemJs 는 모듈화 관리 라이브러리였군. webpack 비슷한 역할을 하는가보다. 딱히 이걸 선호해서 quickStart 에 넣어둔 것은 아니라고 한다.

## Tour of Heroes
[Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) 라는 앱을 만들어보는 튜토리얼 페이지를 따라해봐야겠다.

quick start 를 받았다.

어...
```
export class AppComponent {
  title = 'Tour of Heroes';
  hero = 'windstorm';
}
```
이건 타입스크립트 문법인가 es6 문법인가... 이건 확인해보고 와야겠다...
일단 [TypeScript classes 문서](https://www.typescriptlang.org/docs/handbook/classes.html) 를 보니 class member 프로퍼티 선언이고.. [es6 classes MDN 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 에 이 방식에 대한 언급이 없으니 일단 타입스크립트 문법인가보다. 

```
template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>'
```
이런 걸 해보면서 기본 표현법을 접했다. 좀더 자세한 표현을 위해서는 [Displaying Data](https://angular.io/docs/ts/latest/guide/displaying-data.html) 문서를 따라해보라고.

### [Hero Object](https://angular.io/docs/ts/latest/tutorial/toh-pt1.html#!#hero-object)

hero 라는 리터럴을 객체로 만들어보잔다.

```
hero: Hero = {
  id: 1,
  name: 'Windstorm'
};
```
이걸 타이핑해보는데 딴것보다 TypeScript 가 엄청 마음에 들기 시작했다.

```
	template: `
      <h1>{{title}}</h1>
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div><label>name: </label>{{hero.name}}</div>
    `
```

오오오오. es6 너무 좋다. 이거 한번 쓰기 시작하면 못 벗어나겠는데?!



### two way binding
> 본 항목과 관계된 `ngModel` 에 대해 더 배우려면 [Forms](https://angular.io/docs/ts/latest/guide/forms.html#!#ngModel) 문서나 [Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#ngModel) 문서를 더 보면 된다.
    
```
<input [(ngModel)]="hero.name" placeholder="name">
```

이렇게 한다고 한다.

잘 반영되기는 하는데,

- validating 을 확인해봐야 할 것 같다.


문서가 [다음 페이지](https://angular.io/docs/ts/latest/tutorial/toh-pt2.html)로 넘어간다.

## Displaying Our Heroes
### Exposing heroes
TypeScript 가 타입 추론도 하는 듯.



> The (*) prefix to ngFor indicates that the `<li>` element and its children constitute a master template.
> 
> The ngFor directive iterates over the heroes array returned by the AppComponent.heroes property and stamps out instances of this template.
> 
> The quoted text assigned to ngFor means “take each hero in the heroes array, store it in the local hero variable, and make it available to the corresponding template instance”.
>  
> The let keyword before "hero" identifies hero as a template input variable. We can reference this variable within the template to access a hero’s properties.
>  
> Learn more about ngFor and template input variables in the Displaying Data and Template Syntax chapters.





## Selecting a Hero
UI Pattern `master-detail` 라는게 있다고 한다. 그렇다는 건 다른 이름이 붙은 패턴들도 꽤 있다는 이야기네? 어딘가 정리된 게 있을 법도 하다.

ng 에 property 에 붙는 타입이 몇 종류 있는 모양이다.

|         | example           | code  |
|---------------|---------------|-------|
| *     | *ngFor | *ngFor="let hero of heroes" |
| ()      | (click)      |   (click)="onSelect(hero)" |
| []      | [class.selected]      |   [class.selected]="hero === selectedHero" |

바인딩에 대해서는 [User Input](https://angular.io/docs/ts/latest/guide/user-input.html) 과 [Templating Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#event-binding) 챕터에서 배울 수 있다고 한다.


```
export class AppComponent {
  title = 'Tour of Heroes';
  selectedHero: Hero;
}
```

이건 또 무슨 문법이래...가 아니라 착각했다. 변수였구만. TypeScript 에서 `:` 문자는 클래스 정의할 때는 쓸 일이 없는가보다. `:`는 타입 지정할 때만 쓰니 클래스 member 정의할 때도 `=` 을 쓰게 되는 것일까?

`*ngIf` 나 `*ngFor` 같은 것들에 대해서 더 배우고 싶다면 [Structural-Directives](https://angular.io/docs/ts/latest/guide/structural-directives.html) 문서를 참고하거나, [Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#directives) 를 참고

`[]` 는 one way property binding 이라고 한다. 역시 [Templating Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#property-binding) 문서 참고.
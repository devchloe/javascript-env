# Vue.js 프론트엔드 개발/배포 라이프사이클 한눈에 보기

## 목표
- Vue CLI3를 통한 Vue 프로젝트 생성 & 개발환경 설정 끝내기
- 프론트엔드 개발에 필요한 개념/용어 익숙해지기

## 목차
1. 설치
   1. 버전정보
   1. NVM 설치
   1. Node/NPM 설치
   1. Vue CLI 설치

1. 프로젝트 생성 및 실행
   1. vue create [프로젝트이름]
   1. npm run serve (vue-cli-service serve)
   1. npm run build (vue-cli-service build)

1. 프로젝트 추가 모듈 설정
   1. Transpiler: Babel
   1. CSS Pre-processor: Sass/SCSS (with node/sass)
   1. Linter: ESLint + Prettier
   1. Unit Testing: Jest

1. Vue 컴포넌트 개발 (Next)
   1. 프로젝트 레이아웃 (Smart-Dummy pattern, Atomic design, BEM 등)
   1. 네이밍 컨벤션 (메서드, 이벤트, 변수 등)
   1. 테스트 범위/수준
   
1. 운영 빌드/배포
   1. Dockerfile

## 설치
### 버전정보
- NVM: 1.1.7
- NODE: 10.16.2
- NPM: 6.9.0
- Vue CLI: 3.10.0

### NVM(Node Version Manager) 설치
- 필요한 노드 버전이 다를 경우, 이전 버전을 삭제하지 않고도 개발 환경에 따라 여러 노드 버전을 관리할 수 있음
- Windows 설치 경로: .nvm/node-version
- [nvm-setup.zip 다운로드](https://github.com/coreybutler/nvm-windows/releases)
```bash
nvm version
```

### Node/NPM 설치
NVM으로 설치하기
```bash
nvm proxy 70.10.15.10:8080
nvm install v10.16.2
nvm ls
# 10.16.2
nvm use 10.16.2
# Now using node v10.16.2 (64-bit)
node --version
# v10.16.2
npm --version
# 6.9.0
```
NPM 프록시 설정 (전역)
```bash
npm config set proxy http://70.10.15.10:8080 --global
npm config set https-proxy http://70.10.15.10:8080 --global
npm config set strict-ssl false --global
npm config get proxy
npm config get https-proxy
npm config get strict-ssl
npm config ls -l
```

### Vue CLI 3 설치 (추천)

- Vue 스캐폴딩 프로젝트 생성
- webpack, babel, jest 등 수많은 configuration을 수작업으로 하지 않아도 됨
- 빠른 환경 구성 가능
- 단일 Vue 컴포넌트 실행/테스트

NPM으로 설치하기 (전역)
```bash
npm install -g @vue/cli
vue --version
# 3.10.0
```

구성 요소
- CLI
  - vue create: 새로운 Vue 프로젝트 빠르게 생성, 다양한 preset/plugin 선택 가능
  - vue ui: 프로젝트 설정을 GUI로 제공
- CLI Service
  - vue-cli-service serve: webpack-dev-server 기반으로 개발 서버를 자동 구성/실행, webpack-dev-server는 Hot-Module-Replacement(HMR) 기능 제공
  - vue-cli-service build: webpack을 이용하여 배포에 필요한 파일(bundle)을 dist/ 디렉토리에 생성, webpack은 js, css 파일을 번들링하여 하나의 파일을 생성함
  - vue-cli-service inspect: Vue CLI 프로젝트에서 제공하는 webpack 설정 확인
- CLI Preset/Plugin
  - plugin: babel, jest, eslint, ..와 같은 다른 모듈
  - Vue CLI는 플러그인 기반 아키텍처로 구성되어 있어서 프로젝트 환경 구성에 유연함을 제공
  - plugin generator가 preset 정보를 바탕으로 설치함
  - preset: 미리 정의한 option과 plugin을 담은 JSON 오브젝트
  - 미리 정의한 option을 각 설정파일이나 vue.config.js에서 커스터마이징 가능
  - vue add: 필요한 plugin을 언제든 추가 가능


## 프로젝트 생성 및 실행
### vue create 
```bash
vue create hello-world
```
package.json (default)
```json
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
}
```

### npm run serve
개발용 웹서버로 webpack-dev-server를 실행, 메모리에 올려두고 파일이 변경되었을 때 자동 reload하기 때문에 개발 시간 단축
![cli-service-serve.png](./cli-service-serve.png)
vue.config.js - devServer 포트 지정
```
module.exports = {
  devServer: {
    port: 8081
  }
}
```

### npm run build
dist/ 디렉토리에 webpack 번들링 결과물 저장, 운영 배포시 활용
![cli-service-build.png](./cli-service-build.png)

### 개발 환경별 서버 설정
개발 환경별로 환경변수(local, development, stage, ..)를 관리하고 개발환경(로컬/스테이지 등) 로컬 개발, 개발계, 스테이지계 등 테스트하고자 하는 서버 주소를  (개발 편의성)을 위한 webpack 설정 추가
vue.config.js

개발 서버 변경의 번거로움을 줄이기 위해서 script를 별도로 만들어 둔다.
vue-cli-service는 profile을 --mode 옵션으로 변경


로컬 백엔드 서버, 개발계 서버 주소 설정
webpack dev server(http 서버) 설정 확인

**환경변수 관리**

.env.local - 프론트엔드, 백엔드 모두 변경되는 상황
``` 
VUE_APP_API_SERVER=http://localhost:8080
```
.env.development - 프론트엔드만 변경되는 상황
```
VUE_APP_API_SERVER=http://70.121.224.112:4000
```

**환경별 실행을 위한 script 작성**

package.json
```text
"scripts": {
    "serve": "vue-cli-service serve --mode local",
    "serve:dev: "vue-cli-service serve --mode development"
}
```

npm run serve
```
.env
.env.local
```
npm run serve:dev
```
.env
.env.development
```

프론트엔드 웹서버, 백엔드 서버 설정 추가하기 
(프론트엔드 웹서버는 따로 띄울 필요 없음(webpack-dev-server), vue는 --mode 옵션으로 NODE_ENV로 읽어들일 환경 변수 파일을 구분함, NODE_ENV로 webpack이 실행/빌드을 달리함)
https://cli.vuejs.org/guide/mode-and-env.html#modes
- 백엔드 API 서버 설정
  - 로컬 백엔드 서버 (화면, 서버단 수정)
  
실행
```bash
npm run serve
```
  - 개발 서버, staging, 등등.. (화면만 수정, 로컬에 백엔드 서버를 띄울 필요 없음)

실행
```bash
npm run serve --mode development
```

devServer 설정
- devServer 포트 지정 (브라우저에서 8081로 접근)
- CORS 문제 해결
- 가난한 풀스택 개발자라면 로컬 환경에서 프론트엔드와 백엔드 서버를 다 띄워놓고 개발해야 한다. 이 때 별다른 설정을 안했다면 프론트엔드에서 백엔드로 http request가 보내지지 않는다. http request를 프론트엔드 서버(이 경우에는 webpack-dev-server가 로컬 환경에 띄워준 웹서버)로 보내기 때문이다. request를 백엔드로 보내야 한다. 아래 예시를 참고하여 webpack에 proxyTable을 설정해준다.

프론트엔드와 백엔드 서비스가 다른 호스트에서 실행되는 경우 API request를 API 서버로 프록시하기 위한 설정 
proxy: 프로젝트 내에서 호출하는 외부 API나 다른 포트를 사용하는 로컬 서버 API가 있을 경우 이 API url들은 해당 서버로 호출하도록 우회할 수 있도록 만드는 옵션
https://cli.vuejs.org/config/#devserver-proxy
https://brightparagon.wordpress.com/2018/06/27/webpack-v4-development-configuration/
```javascript
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_SERVER,
        changeOrigin: true
      }
    }
  }
}
```

proxy 예제
https://ryulog.tistory.com/138
webpack dev server proxy 예제 (자세함)
http://frontend.diffthink.kr/2016/12/docs-webpack-dev-server.html


### Intellij 설정
.vue 확장자 파일 인식을 위한 Intellij plugin 설치
```
File > Settings > Plugins > Vue.js
```

### Webstorm
```
```


## 프로젝트 추가 모듈 설치/설정
![cli-select-features.png](./cli-select-features.png)
### Javascript compiler: Babel
브라우저나 개발 환경에 따라 지원하는 자바스크립트 스펙이 다를 수 있다. 개발자는 최신 자바스크립트 스펙(ES6+)으로 개발하고 Babel의 도움을 얻어 각 환경에 맞는 코드로 변환한다.

```js
// Babel Input: ES2015 arrow function
[1, 2, 3].map((n) => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
```
babel.config.js
```js
module.exports = {
  presets: ["@vue/app"]
};
```

### CSS Pre-processors: Sass/SCSS (with node-sass)

CSS를 읽기 쉽고 구조화할 수 있게 해주는 툴, helped to achieve writing reusable, maintainable and extensible codes in CSS.
css name 충돌, 디버깅이 어렵다. css 재사용 한계 
브라우저별로 CSS 속성에 prefix를 붙여서 개발한다거나..

- CSS 모듈화, 가독성
- CSS 공통 속성은 변수 선언을 통해 중복 제거
- CSS 중첩, DOM 구조에 맞게 CSS도 구조화
- CSS 전처리기: Sass(가장 오래, 가장 많이 사용), Less, Stylus

브라우저는 Sass의 문법을 알지 못하기 때문에 Sass(.scss) 파일을 css 파일로 컴파일(트랜스파일링)하여야 한다. 따라서 Sass 환경의 설치가 필요하다.

CSS Pre-processors 기능

- Variables: Primary 색상, 기본 폰트 크기 등과 같이 어플리케이션 전반에 걸쳐 사용되는 CSS 값을 변수로 선언하고 재사용할 수 있다.

CSS
```css
div {
    font-size: 16px;
}
```
Sass/SCSS
```scss
$font-size: 16px; // font-size 변수 선언/값 할당

div {
    font-size: $font-size;
}
```

- Nesting: 기존 CSS 문법으로는 HTML 부모/자식 요소에 스타일을 적용하기 위해서 셀렉터들의 조합으로 DOM 구조를 표현해야 했다. CSS를 중첩 구조로 표현할 수 있어 스타일 구조의 가독성을 높일 수 있다. 중첩이 너무 깊어지지 않도록 조심한다.
CSS
```css
ul { margin: 0; }
ul li { float: left; }
ul a { color: #999; }
ul a:hover { color: #229ed3; }
```
Sass/SCSS
```scss
$link-color: #999;
$link-hover: #229ed3;

ul {
    margin: 0;

    li {
        float: left;
    }

    a {
        color: $link-color;

        &:hover {
            color: $link-hover;
        }
    }
}
```

- Mixins: CSS 속성값을 파라미터로 받아서 스타일을 적용하는 방법을 제공한다. CSS 코드 중복을 줄일 수 있고 스타일 변경에 유연성을 제공한다.
CSS
```css
h1 { border: 5px solid #ddd; }
h1:hover { border-color: #999; }
```
Sass/SCSS
```scss
@mixin bordered($width) {
    border: $width solid #ddd;

    &:hover {
        border-color: #999;
    }
}

h1 {
    @include bordered(5px);
}
```

- Extends: 공통 스타일을 한 번 정의해두고 필요한 코드 블럭에서 가져다 쓸 수 있다. 코드 중복을 줄이고 가독성을 높인다.
CSS
```css
.block, p, ul, ol { margin: 10px 5px; }

p { border: 1px solid #eee; }
ul, ol { color: #333; text-transform: uppercase; }
```
Sass/SCSS
```scss
.block { margin: 10px 5px; }

p {
  @extend .block;
  border: 1px solid #eee;
}

ul, ol {
  @extend .block;
  color: #333;
  text-transform: uppercase;
}
```

SASS를 선택한 이유
사용법
 classic CSS. SASS and Stylus have additional styles. In SASS, you can omit curly brackets and semicolon, 
SASS syntax가 눈으로 읽기에 더 명확함
기능이 더 많음 
가장 오래됨, 가장 많이 사용
많은 커뮤니티



vs. dart-sass
사용률
![npm-trends-node-sass.png](./npm-trends-node-sass.png)
컴파일 속도 [출처][sass-compiler-comparison] 
[![sass-compiler-comparison.png](./sass-compiler-comparison.png)](https://davidgracieweb.co.uk/node-sass-vs-grunt-sass-vs-dart-sass-vs-ruby-sass/)



### Linter: ESLint (+ Prettier)
ECMAScript/Javascript 표준에 맞게 코드 품질을 높일 수 있도록 ESLint를 적용한다. 기본으로 설정된 Linting 규칙을 팀 코드 컨벤션에 맞게 변경할 수 있다.
Prettier를 함께 사용하면 서로 다른 팀원들의 코딩 스타일을 일련의 규칙에 맞게 포맷팅할 수 있어 일관된 코딩 스타일 적용이 가능하다.

Dependencies
```npm
eslint
prettier
eslint-config-prettier: eslint와 prettier 규칙 중 충돌나는 것을 비활성화 
eslint-plugin-prettier: prettier에서 정의한 규칙을 eslint에 추가하기 위한 모듈, lint 돌렸을 때 오류를 함께 출력
```


ESLint은 코드품질, Prettier는 코드포맷, 본래 목적은 약간 다르지만 각자 코딩 규칙을 정의하고 있기 때문에 양쪽 규칙이 
- ESLint: 코드 규칙을 정의
- Prettier(fommater): IDE 소스 포맷팅 단축키/메뉴를 통해 `일관된 코딩 스타일` 적용 가능, 정의한 코드 규칙대로 포맷팅
- 양쪽에 있는 디폴트 코드 규칙이 충돌하지 않으려면 설정이 필요함

- 프로세스: 막 자기 스타일로 개발하고 prettier로 포맷팅하고 eslint 돌린 후 수정


.eslintrc.js
https://eslint.org/docs/rules/
https://eslint.org/docs/user-guide/getting-started
```js
module.exports = {
  extends: ["plugin:vue/essential", "@vue/prettier"], // 적용하고자 하는 rule 선언, eslint 룰에 추가 
  rules: { // 규칙 변경
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    //  "semi": ["error", "always"], // ;을 항상 붙여야 한다.
     // "quotes": ["error", "double"],
        // "quotes": ["error", "single"], // '으로 감싸야 한다. "은 안된다.
  }
}
```

.prettierrc
https://prettier.io/docs/en/configuration.html
```
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true, **
  "trailingComma": "all",
  "bracketSpacing": true,
  "semi": true,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```
Webstorm 설정

prettier
  - Settings > Javascript Libraries > Download > prettier

### Unit tesing: Jest
테스트 코드를 작성 했을 때 얻을 수 있는 이점은, 리팩토링 이후 코드가 제대로 작동하고 있는 것을 검증하기 매우 간편하다.

- 선택한 이유: mocha(runner, 테스트 구문 작성을 위한 구조만 제공), chai(assertion library)

- Settings > javascript libraries > download > jest

#### Bundler: Webpack
- Vue CLI3
  - webpack 설정 파일 잡아주기
        - Settings > Languages & Frameworks > JavaScript > Webpack > D:\devops-console\workspace\hello-world\node_modules\@vue\cli-service\webpack.config.js

  - vue에서 webpack 설정 보기
    - vue inspect > output.js
    - /node_modules/@vue/cli-service/webpack.config.js

- Settings > javascript libraries > download > prettier, jest, webpack


# 프로젝트 실행 (개발)
기능 추가나 코드 변경 시 기존 코드가 제대로 동작하는지 확인할 수 있음
새로운 개발자 투입이 쉬움

TDD를 하든 나중에 코드 검증을 위한 테스트 코드를 짜든 중요한건 테스트 가능한 코드를 짜는 것이다.
테스트 가능한 코드란 function 단위로 잘 쪼개놓은 ,클린 코드
테스트 코드 짜기가 힘들면 코드를 제대로 구조화하지 못했다라고 볼 수 있음. -> 리팩토링 하면됨

무엇을 테스트할 것인가? 팀의 결정에 달려있음, 어느정도 틀을 정해놓을 것임


Unit Test: Tests are provided a given input and an output is often evaluated to make sure it matches expectations.
세부 구현을 테스트하지 않음, 인터페이스를 테스트함



# 프로젝트 배포 (운영)



## Dockerfile
```
FROM node:lts-alpine as build-stage
RUN mkdir -p /usr/app/client
WORKDIR /usr/app/client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/app/client/dist /var/www/html
RUN chown nginx:nginx /var/www/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```




# Next
테스트 코드짜기, 
Q. 테스트를 어느 정도까지 짤꺼냐?
render, interaction(event), lifecycle

네이밍룰(pascal, prefix), 
레이아웃 (atomic or smart-dummy)

스토리북

- vue.config.js
import 구문 시 파일경로 압축을 위한 설정, 폴더 이름/파일 경로 변경 시 일일히 수정해야하는 번거로움 줄이기
  - vue.config.js webpack 설정
  https://alexjover.com/blog/enhance-jest-configuration-with-module-aliases/
  디폴트 webpack configuration 수정하기


```js
const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.join(__dirname, 'src'),
        'components': path.join(__dirname, 'src', 'components'),
        'actions': path.join(__dirname, 'src', 'actions')
      }
    }
  }
}
```

- jest.config.js
```js
module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
    "components/(.*)$": "<rootDir>/src/components/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
```
# docs
https://github.com/coreybutler/nvm-windows/releases
https://nodejs.org/ko/download/
https://cli.vuejs.org/guide/installation.html
https://cli.vuejs.org/guide/creating-a-project.html#vue-create

https://alligator.io/vuejs/using-new-vue-cli-3/

[sass-compiler-comparison]: https://davidgracieweb.co.uk/node-sass-vs-grunt-sass-vs-dart-sass-vs-ruby-sass/

https://htmlmag.com/article/an-introduction-to-css-preprocessors-sass-less-stylus
https://poiemaweb.com/sass-basics
https://prettier.io/docs/en/integrating-with-linters.html

이미지 스프라이트
CSS 스프라이트

webpack https://haviyj.tistory.com/25

vue-cli 튜토리얼 참조 https://www.techiediaries.com/vue-cli-tutorial/

vue-cli config https://cli.vuejs.org/config/#global-cli-config

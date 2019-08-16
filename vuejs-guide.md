# Vue.js를 이용한 프론트엔드 어플리케이션 개발/배포 라이프사이클 한 눈에 훑어보기

## 목표
- Vue CLI3를 통한 Vue 프로젝트 생성, 주요 요소/설정 설명 (개발/운영에 필요한 설정 과정)
- TDD를 통한 Vue component 개발 맛보기


## 목차
- 환경 구성
  - 개발 환경 구성/설치 (nvm, node/npm, proxy 설정)
  - Vue 프로젝트 생성
  - Vue 프로젝트 설정 (babel, jest, webpack, eslint, prettier)
- 소스 개발
  - 간단한 vue 샘플 작성, unit test, e2e test
- 운영 빌드/배포
  - Docker build
  - Docker container 실행
  - backend 서비스 호출 확인

## 1. 설치
### 1) 버전정보
- NVM: 1.1.7
- NODE: 10.16.2(LTS)
- NPM: 6.9.0
- Vue CLI: 3

### 2) NVM 설치
- [nvm-setup.zip 다운로드](https://github.com/coreybutler/nvm-windows/releases)
- Node Version Manager: 사용할 node 버전을 환경에 따라 바꾸기 편함
```bash
nvm version
```

### 3) Node/NPM 설치
#### NVM으로 설치하기
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
#### NPM 프록시 설정 (전역)
```bash
npm config set proxy http://70.10.15.10:8080 --global
npm config set https-proxy http://70.10.15.10:8080 --global
npm config set strict-ssl false --global
npm config get proxy
npm config get https-proxy
npm config get strict-ssl
npm config ls -l
```

### 4) Vue CLI 3 설치 (추천)

- Vue 스캐폴딩 프로젝트 생성
- webpack, babel, jest 등 수많은 configuration을 수작업으로 하지 않아도 됨
- 빠른 환경 구성 가능
- 단일 Vue 컴포넌트 실행/테스트

#### NPM으로 설치하기 (전역)
```bash
npm install -g @vue/cli
vue --version
# 3.10.0
```

#### 구성 요소
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


## 2. 프로젝트 생성

### 1) 스캐폴딩 & 모듈 선택
```bash
vue create hello-world
```
![cli-select-features.png](./cli-select-features.png)

#### Preset/Plugin 선택 -- 추가설명 붙이기
- 선택한 모듈: Babel, CSS Pre-processors, Linter, Unit Testing

#### Babel
- Transpiler, ECMAScript 6 사용

#### CSS Pre-processors: Sass/SCSS (with node-sass)
- CSS 모듈화, 가독성
- CSS 공통 속성은 변수 선언을 통해 중복 제거
- CSS 중첩, DOM 구조에 맞게 CSS도 구조화
- CSS 전처리기: Sass(가장 오래, 가장 많이 사용), Less, Stylus

#### Linter: ESLint + Prettier
- Code Convention을 파일에 설정/규칙으로 선언하고 관리
- Prettier: IDE 소스 포맷팅 단축키/메뉴를 통해 일관된 코딩 스타일 적용 가능

#### Unit tesing: Jest
- 

### 2) Intellij 설정
#### .vue 확장자 파일 인식을 위한 Intellij plugin 설치
```
File > Settings > Plugins > Vue.js
```

## 프로젝트 레이아웃
- entry point
  - main.js
  - App.vue
- package.json
- .eslintrc.js
```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
```
- babel.config.js
```js
module.exports = {
  presets: ["@vue/app"]
};
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
  - webpack 설정 파일 잡아주기
        - Settings > Languages & Frameworks > JavaScript > Webpack > D:\devops-console\workspace\hello-world\node_modules\@vue\cli-service\webpack.config.js
- prettier
  - Settings > javascript libraries > download > prettier, jest, webpack

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
  - vue에서 webpack 설정 보기
    - vue inspect > output.js
    - /node_modules/@vue/cli-service/webpack.config.js


# 프로젝트 실행 (개발)
## npm run serve
```bash
npm run serve
```
- hot deploy 기능

# 프로젝트 배포 (운영)
## 소스빌드
```bash
npm run build
```


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

# docs
https://github.com/coreybutler/nvm-windows/releases
https://nodejs.org/ko/download/
https://cli.vuejs.org/guide/installation.html
https://cli.vuejs.org/guide/creating-a-project.html#vue-create

https://alligator.io/vuejs/using-new-vue-cli-3/

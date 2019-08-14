# 설치
## 버전정보
NVM: 1.1.7
NODE: 10.16.2(LTS)
NPM: 6.9.0
VueCLI: 3
## 1. nvm 설치
```bash
nvm version
```

## 2. node/npm 설치
### node/npm
```bash
nvm proxy 70.10.15.10:8080
nvm install v10.16.2
nvm ls
nvm use 10.16.2
```
### npm 프록시 설정
```bash
npm config set proxy http://70.10.15.10:8080 --global
npm config set https-proxy http://70.10.15.10:8080 --global
npm config set strict-ssl false --global
npm config get proxy
npm config get https-proxy
npm config get strict-ssl
npm config ls -l
```
## 3. vue-cli 설치

```bash
npm install -g @vue/cli
vue --version
```
### Instant Prototyping
```bash
npm install -g @vue/cli-service-global
```
#### vue serve
```html
<!-- App.vue file -->
<template>
  <h1>Hello! Vue.js</h1>
</template>
```
```bash
vue serve
```
### vue build
```bash
vue build
```
## 4. Intellij 설정
###
###

# 프로젝트 구성

## 스캐폴딩
```bash
vue create hello-world
```
## preset 선택
Babel, CSS Pre-processors, Linter, Unit Testing(jest)
- CSS pre-processors: Sass/SCSS (with node-sass)
- Linter: ESLint + Prettier
- Unit tesing: Jest
- bundler(default): webpack

## 프로젝트 레이아웃
- entry point
  - main.js
  - App.vue
- package.json

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

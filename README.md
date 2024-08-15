# Boiler Plate
웹 사이트 기능 중 login, sign up 등 기본적인 공통 기능을 재사용할 수 있도록 미리 만들기 위함입니다.

## 개발 환경
- backend 
  - node.js : v20.13.1
  - express.js : v4.19.2
  - mongoDB : v8.5.2

- frontend
  - react

## 기능
- 로그인
- 회원가입


## trouble shooting
model.findone() no longer accepts a callback
원인 : mongose 5.0 부터는 callback() method를 지원하지 않음
조치 : Promise() 또는 async/await 방식으로 바꿔주어야함 .then().catch()로 처리

Model.prototype.save() no longer accepts a callback
원인 : mongose 5.0 부터는 callback() method를 지원하지 않음
조치 : Promise() 또는 async/await 방식으로 바꿔주어야함 .then().catch()로 처리

Error: User validation failed: password: Path `password` (`...`) is longer than the maximum allowed length (50).
원인 : pawword의 길이가 최대가 최대 50가 넘으면서 validation 문제 발생
조치 : userShchema.password.maxlength 50 -> 100 변경

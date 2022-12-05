# OmniTasks

基于Gradle的monorepo样例。

* db：数据库DDL代码。
* web：前端代码。
* app：后端代码。

## 依赖项

* JDK：用于gradle构建整个项目。
* pnpm：用于构建前端项目。

## 运行

```shell
./gradlew app:start &
./gradlew web:start &
```

访问[http://localhost:3000](http://localhost:3000)。
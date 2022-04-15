

# LeetcodeChallenge

This project was generated using [Nx](https://nx.dev).

 该 monorepo 用来完成 LeetCode-OpenSource 的[面试题](https://github.com/LeetCode-OpenSource/hire#%E5%B1%95%E7%8E%B0%E4%BD%A0%E7%9A%84%E8%83%BD%E5%8A%9B)

---

## table of contents
- [x] [基础编程能力](#基础编程能力)
- [x] [编写复杂的 Typescript 类型](#编写复杂的-typescript-类型)
- [x] [用 Webpack 实现 predictable long term cache](#用-webpack-实现-predictable-long-term-cache)
- [x] [编写工程化的组件](#编写工程化的组件)
- [ ] [用 RxJS 处理复杂的异步业务](#用-rxjs-处理复杂的异步业务)

## 基础编程能力
- [parseError 函数](https://github.com/Trigg3rZY/leetcode-challenge/blob/main/libs/utils/src/lib/parseError.ts#L10)
- [测试](https://github.com/Trigg3rZY/leetcode-challenge/blob/main/libs/utils/src/lib/parseError.spec.ts)

## 编写复杂的 Typescript 类型
编写了两个类型
- [ExtractMethodKeys<T>](https://github.com/Trigg3rZY/leetcode-challenge/blob/main/libs/utils/src/lib/connected.ts#L31) 用来获取 Class 中所有方法的类型
- [UnwrapMethods<T>](https://github.com/Trigg3rZY/leetcode-challenge/blob/main/libs/utils/src/lib/connected.ts#L36) 按题目要求从方法的参数、返回中 unwrap Promise/Action

## 用 Webpack 实现 predictable long term cache
[webpack config](https://github.com/Trigg3rZY/leetcode-challenge/blob/main/apps/webpack-zh/webpack.config.js) 

在项目根目录下执行 
```
yarn run build:webpack-zh
```
打包产物将输出在 dist/webpack-zh 下

## 编写工程化的组件
[AutoComplete](https://github.com/Trigg3rZY/leetcode-challenge/tree/main/libs/ui/src/lib/AutoComplete)  

build: (打包产物将输出在 dist/libs/ui)
```
yarn build ui
```

test:
```
yarn test ui
```

storybook: (目前只有一个简单的例子，文档待完善)
```
yarn run nx run ui:storybook
```

features:
- [x] 可供输入的输入框
- [x] 根据输入框输入，以 popper 的形式给出输入提示
- [x] 点击 suggestions 选项回填到输入框
- [x] suggestions 列表的虚拟滚动
- [ ] suggestions 的键盘导航

## 用 RxJS 处理复杂的异步业务
TBD

## 持续集成

```
.github/workflow  
    /ci.yml
    /publish-ui.yml
```
其中 `ci.yml` 将在代码 push 到 main 分支或 pr 发起后 lint 代码并运行宏仓库下的测试用例。得益于 nrwl/nx， 最新的提交将会和代码合并前的 commit 进行比对，根据模块间的依赖关系，只对受影响的部分重新运行测试。

`publish-ui.yml` 将在 release 创建后，打包 ui lib 并发布到 npm 仓库。

当然，如果对于一个正式的 ui 库来说，最好能补充一个流程，在 main 分支更新时，将 storybook 构建的文档自动部署。

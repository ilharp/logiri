# Logiri

从终端连接 Satori。

![正在输出 Satori 消息的终端](https://raw.githubusercontent.com/ilharp/logiri/master/assets/screenshot1.png)

Logiri 使用与 Satori 相同的消息编码技术，但将 Satori 消息发送到控制台输出而非聊天平台。

## 安装

```sh
yarn add logiri
```

## 使用 Logiri CLI

Logiri CLI 预加载了 Logiri 提供的所有事件输出，可以用来快速测试 Satori
服务是否运行正常，也可用于以可读和美观的方式存储收到的所有事件。

```sh
yarn logiri http://token@127.0.0.1:5500/v1
```

## 使用 logiri

创建 Logiri 实例并使用 register() 方法注册事件解析器，最后使用 parse() 方法即可获得输出。

```ts
import { Logiri, logiriMessageCreated } from 'logiri'

const lo = new Logiri()
lo.register(logiriMessageCreated)

// 收到消息时
const lines = await lo.parse(body) // body: Event
lines.forEach((line) => console.log(line))
```

[logiri CLI 的 cli.ts](https://github.com/ilharp/logiri/blob/master/packages/logiri/src/cli.ts)
是一个使用 logiri 的完美范例。

## 许可

MIT

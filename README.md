时光音乐的音源脚本与远程清单。

- `sources.json` — 清单（名称、版本、文件名、长度）
- `*.js` — 各音源脚本，由主仓库 `publish/sources/build.js` 生成

客户端会从 jsDelivr / ghproxy / GitHub 三个入口并发拉取本仓库内容。

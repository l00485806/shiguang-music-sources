// 把内置音源导成可远程分发的脚本与清单：node publish/sources/build.js
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '../..')
const SRC_DIR = path.join(ROOT, 'src/resources/userApi')
const OUT_DIR = __dirname

const IDS = ['ten', 'jiexiang', 'molan', 'xinghai', 'qdy']

const pick = (text, key) => {
  const match = new RegExp(key + ':\\s*("(?:[^"\\\\]|\\\\.)*")').exec(text)
  if (!match) throw new Error(`missing ${key}`)
  return JSON.parse(match[1])
}

const sources = []
for (const id of IDS) {
  const text = fs.readFileSync(path.join(SRC_DIR, `${id}.ts`), 'utf8')
  const script = pick(text, 'script')
  const file = `${id}.js`
  fs.writeFileSync(path.join(OUT_DIR, file), script)
  sources.push({
    name: pick(text, 'name'),
    version: pick(text, 'version'),
    file,
    length: script.length,
  })
}

const manifest = {
  version: 1,
  updatedAt: new Date().toISOString().slice(0, 10),
  sources,
}
fs.writeFileSync(path.join(OUT_DIR, 'sources.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`生成 ${sources.length} 个音源与 sources.json`)

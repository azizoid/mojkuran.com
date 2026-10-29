import { readdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'

const output = path.resolve('out')
const walk = async (directory) => {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(file)))
    else files.push(file)
  }
  return files
}

if (!(await stat(path.join(output, 'index.html')).catch(() => null))) {
  throw new Error('Expected Next.js export at out/index.html')
}
if (!(await stat(path.join(output, 'search/app.html')).catch(() => null))) {
  throw new Error('Expected Next.js search shell at out/search/app.html')
}

for (const file of await walk(output)) {
  if ((file.endsWith('.txt') && path.basename(file) !== 'robots.txt') || path.basename(file) === '.DS_Store') {
    await rm(file)
  }
}
await rm(path.join(output, 'data'), { recursive: true, force: true })

const files = await walk(output)
const oversized = []
for (const file of files) {
  if ((await stat(file)).size > 25 * 1024 * 1024) oversized.push(path.relative(output, file))
}
if (files.length > 20_000 || oversized.length) {
  throw new Error(
    `Workers Free asset limits exceeded: ${files.length} files; oversized: ${oversized.join(', ') || 'none'}`
  )
}

console.log(`Prepared ${files.length} Worker assets; removed RSC sidecars and private records.`)

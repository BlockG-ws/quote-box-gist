import { join } from 'path'
import { getInput } from '@actions/core'
import { readFile, writeFile } from 'fs/promises'

export interface Resp {
  id: number
  category: number
  cite: string
  author: string
  sentence: string
}

;(async () => {
  const quotes: Resp[] = await readFile(join(process.cwd(), getInput('quotes')))
    .then((buf) => buf.toString('utf-8'))
    .then((text) => JSON.parse(text))
  const rnd = Math.floor(Math.random() * quotes.length)
  const data = quotes[rnd]

  const content = `${data.sentence}
 ——${data.author !== null ? data.author : data.cite}

更新于 ${new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hourCycle: 'h23',
  })}`

  console.log(`\n${content}\n`)

  try {
    await writeFile(join(process.cwd(), 'quote.txt'), content)
  } catch (err) {
    console.error(`FATAL: ${err}`)
    process.exit(1)
  }

  console.log('INFO: 保存成功\n')
})()

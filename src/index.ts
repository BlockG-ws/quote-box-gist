import { join } from 'path'
import { getInput } from '@actions/core'
import { writeFile } from 'fs/promises'

export const quotes = getInput('quotes')

export interface Resp {
  id: number
  category: number
  cite: string
  author: string
  sentence: string
}

;(async () => {
  const rnd = Math.floor(Math.random() * quotes.length)
  const data: Resp = JSON.parse(quotes)[rnd]

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

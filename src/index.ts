import { join } from 'path'
import { getInput } from '@actions/core';
import { quoteFile } from getInput('quoteFile')
import { writeFile } from 'fs/promises'

export interface Resp {
  id: number
  category: number
  cite: string
  author: string
  sentence: string
}

;(async () => {
  const text = quoteFile as JSON[]
  const rnd = Math.floor(Math.random() * text.length)
  const data: Resp = text[rnd].then((res) =>
    res.json(),
  )

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

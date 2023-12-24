#!/usr/bin/env node

import type { Opcode, ServerPayload } from '@satorijs/protocol'
import { WebSocket } from 'ws'
import { Logiri } from './logiri.js'
import { logiriMessageCreated } from './parser.js'

const url = new URL(process.argv[2] as string)

let token: string | undefined = undefined

if (url.username || url.password)
  if (!url.password)
    // Token Exists
    token = url.username
  else token = `${url.username}:${url.password}`

url.username = url.password = ''
url.pathname += '/events'

const lo = new Logiri()
lo.register(logiriMessageCreated)

const ws = new WebSocket(url)
ws.on('error', console.error)
ws.on('close', (code) => console.log(`ws closed: ${code}`))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
ws.on('message', async (raw) => {
  const data = JSON.parse((raw as Buffer).toString()) as ServerPayload
  if (data.op !== (0 as Opcode.EVENT)) return
  const result = await lo.parse(data.body)
  if (result) for (const line of result) console.log(line)
})

ws.on('open', () => {
  ws.send(
    JSON.stringify({
      op: 3,
      body: {
        token,
      },
    }),
  )

  setInterval(
    () =>
      ws.send(
        JSON.stringify({
          op: 1,
        }),
      ),
    7000,
  )
})

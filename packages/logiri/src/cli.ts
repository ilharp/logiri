#!/usr/bin/env node

import { WebSocket } from 'ws'
import { Logiri } from './logiri'
import { logiriMessageCreated } from './parser'

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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
ws.on('message', async (data) => {
  const result = await lo.parse(
    JSON.parse((data as Buffer).toString()) as object,
  )
  if (result) for (const line of result) console.log(line)
})

import type { Event } from '@satorijs/protocol'
import styles from 'ansi-styles'
import { link } from './ansi.js'
import { LogiriMessager } from './messager.js'

export const logiriMessageCreated = async (data: object) => {
  const d = data as Event
  if (d.type !== 'message-created') return
  const messages = await new LogiriMessager().send(d.message?.content)
  return messages.map(
    (x) =>
      `${styles.blue.open}${link(
        d.channel?.id === d.guild?.id
          ? `${d.channel?.name}(${d.channel?.id})`
          : `${d.guild?.name}(${d.guild?.id})/${d.channel?.name}(${d.channel?.id})`,
        d.guild?.avatar,
      )}${styles.blue.close}${styles.grey.open}-${styles.grey.close}${
        styles.cyan.open
      }${link(
        `${d.user?.name || d.member?.name}(${d.user?.id})`,
        d.user?.avatar,
      )}${styles.cyan.close}${styles.grey.open}:${styles.grey.close} ${x}`,
  )
}

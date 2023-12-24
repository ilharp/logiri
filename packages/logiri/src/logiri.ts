import type { LogiriParser } from './types'

export class Logiri {
  private parsers: LogiriParser[] = []

  register(parser: LogiriParser) {
    this.parsers.unshift(parser)
  }

  async parse(data: object) {
    for (const parser of this.parsers) {
      const result = await parser(data)
      if (result) return result
    }

    return null
  }
}

export type LogiriParser = (
  data: object,
) => Promise<string[] | null | undefined>

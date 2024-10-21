export interface FetchResponse<T> {
  loading: boolean
  data: T
  error: { message: string; code: number } | null
}

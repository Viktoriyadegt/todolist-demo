import type { DomainTask } from "../../features/todolists/api/tasksApi.types"

export type FieldError = {
  error: string
  field: string
}

export type ResponseType<T = {}> = {
  data: T
  messages: string[]
  fieldsErrors: FieldError
  resultCode: 0
}

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

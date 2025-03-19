import type { RequestStatus } from "../../../app/appSlice"

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type FilterType = "All" | "Active" | "Completed"

export type DomainTodolist = Todolist & {
  filter: FilterType
  entityStatus: RequestStatus
}

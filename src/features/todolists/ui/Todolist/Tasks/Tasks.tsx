import { List } from "@mui/material"
import React, { useState } from "react"
import { Task } from "./Task/Task"
import { TaskStatus } from "common/enums"
import { useGetTasksQuery } from "../../../api/tasksApi"
import { TasksSkeleton } from "../../skeletons/TasksSkeleton/TasksSkeleton"
import type { DomainTodolist } from "../../../api/todolistsApi.types"
import { TasksPagination } from "../TasksPagination/TasksPagination"

export type Props = {
  todolist: DomainTodolist
}

const PAGE_SIZE = 5

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: id, args: { page } })

  let tasksForTodolist = data?.items

  if (filter === "Active") {
    tasksForTodolist = tasksForTodolist?.filter((f) => f.status === TaskStatus.New)
  }

  if (filter === "Completed") {
    tasksForTodolist = tasksForTodolist?.filter((f) => f.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <span>Тасок нет</span>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolistId={id} />
          })}
          {(data?.totalCount || 0) > PAGE_SIZE && (
            <TasksPagination page={page} setPage={setPage} totalCount={data?.totalCount || 0} />
          )}
        </List>
      )}
    </>
  )
}

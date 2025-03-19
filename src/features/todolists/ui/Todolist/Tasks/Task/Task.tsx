import { Checkbox, IconButton, ListItem } from "@mui/material"
import { Delete } from "@mui/icons-material"
import React, { type ChangeEvent } from "react"
import { EditableSpan } from "common/components"
import { getListItemSx } from "./Task.styles"
import type { DomainTask, UpdateTaskModel } from "../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../../../api/tasksApi"

export type Props = {
  task: DomainTask
  todolistId: string
}

export const Task = ({ task, todolistId }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    deleteTask({ todolistId, taskId: task.id })
  }

  const createTaskModel = (task: DomainTask, domainModel: Partial<UpdateTaskModel>): UpdateTaskModel => {
    return {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...domainModel,
    }
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status })
    updateTask({ taskId: task.id, todolistId, model })
  }

  const changeTaskTitleHandler = (title: string) => {
    const model = createTaskModel(task, { title })
    updateTask({ taskId: task.id, todolistId, model })
  }

  const disabled = task.status === TaskStatus.InProgress

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={disabled}
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}

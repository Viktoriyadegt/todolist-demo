import React from "react"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { useCreateTaskMutation } from "../../api/tasksApi"
import type { DomainTodolist } from "../../api/todolistsApi.types"

type TodolistPropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
  const { id } = todolist
  const [createTask] = useCreateTaskMutation()

  const addTaskHandler = (title: string) => {
    createTask({ todolistId: id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}

import { IconButton } from "@mui/material"
import React from "react"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components"
import { todolistsApi, useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../api/todolistsApi"
import { useAppDispatch } from "common/hooks"
import type { RequestStatus } from "../../../../../app/appSlice"
import type { DomainTodolist } from "../../../api/todolistsApi.types"

export type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()

  const changeTaskTitleHandler = (title: string) => {
    updateTodolist({ id, title })
  }

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((t) => t.id === id)
        todolist && (todolist.entityStatus = status)
      }),
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData("loading")
    deleteTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData("idle")
      })
  }

  return (
    <h3>
      <EditableSpan title={title} changeTitle={changeTaskTitleHandler} />
      <IconButton onClick={removeTodolistHandler}>
        <Delete />
      </IconButton>
    </h3>
  )
}

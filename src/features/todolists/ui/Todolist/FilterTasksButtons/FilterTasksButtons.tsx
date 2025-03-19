import { Box, Button } from "@mui/material"
import React from "react"
import { filterButtonsContainerSx } from "./ FilterTasksButtons.styles"
import { useAppDispatch } from "common/hooks"
import { todolistsApi } from "../../../api/todolistsApi"
import type { DomainTodolist, FilterType } from "../../../api/todolistsApi.types"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterType) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((t) => t.id === id)
        todolist && (todolist.filter = filter)
      }),
    )
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "All" ? "contained" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("All")}
      >
        All
      </Button>
      <Button
        variant={filter === "Active" ? "contained" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("Active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "contained" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("Completed")}
      >
        Completed
      </Button>
    </Box>
  )
}

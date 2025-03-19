import type { DomainTask, UpdateTaskModel } from "./tasksApi.types"
import type { GetTasksResponse, ResponseType } from "common/types/types"
import { baseApi } from "../../../app/baseApi"

export const PAGE_SIZE = 5

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE }
        return {
          method: "GET",
          url: `todo-lists/${todolistId}/tasks`,
          params,
        }
      },
      providesTags: (result, error, { todolistId }) =>
        result ? [{ type: "Task" as const, id: todolistId }] : ["Task"],
    }),
    createTask: build.mutation<ResponseType<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (result, error, { todolistId }) => {
        return [{ type: "Task", id: todolistId }]
      },
    }),
    deleteTask: build.mutation<ResponseType, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<
      ResponseType<{ item: DomainTask }>,
      { taskId: string; todolistId: string; model: UpdateTaskModel }
    >({
      query: ({ taskId, todolistId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
        method: "PUT",
      }),
      async onQueryStarted({ taskId, todolistId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")
        let patchResults: any[] = []

        cachedArgsForQuery.forEach(({ args }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, args: { page: args.page } }, (state) => {
                const task = state.items.find((t) => t.id === taskId)
                if (task) {
                  task.status = model.status
                }
              }),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useUpdateTaskMutation, useDeleteTaskMutation, useCreateTaskMutation, useGetTasksQuery } = tasksApi

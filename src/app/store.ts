import { appReducer, appSlice } from "./appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [appSlice.name]: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

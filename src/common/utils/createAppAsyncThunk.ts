import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: null | { err: Error; showGlobalError: boolean }
}>()

export type RejectValueType = {
  data: any
  showGlobalError: boolean
}

import { RootState } from './store'

export const selectAppStatus = (state: RootState) => state.app.status
export const selectError = (state: RootState) => state.app.error

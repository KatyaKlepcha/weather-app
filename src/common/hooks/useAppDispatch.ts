import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { RootState } from 'app/store'

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()

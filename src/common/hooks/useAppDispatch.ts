import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { useDispatch } from 'react-redux'

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
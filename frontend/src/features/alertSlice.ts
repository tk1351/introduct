import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export interface AlertState {
  id: string
  msg: string
  alertType: string
}

const initialState: AlertState[] = [
  {
    id: '',
    msg: '',
    alertType: '',
  },
]

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<AlertState>) {
      return [...state, action.payload]
    },
    removeAlert(state, action: PayloadAction<{ id: string }>) {
      return state.filter((alert) => alert.id !== action.payload.id)
    },
  },
})

export const { setAlert, removeAlert } = alertSlice.actions
export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer

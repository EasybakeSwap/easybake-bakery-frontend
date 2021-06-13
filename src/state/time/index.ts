/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TimeState } from '../types'

const initialState: TimeState = { currentTime: 0, initialTime: 0 }

export const timeSlice = createSlice({
  name: 'Time',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      if (state.initialTime === 0) {
        state.initialTime = action.payload
      }

      state.currentTime = action.payload
    },
  },
})

// Actions
export const { setTime } = timeSlice.actions

export default timeSlice.reducer

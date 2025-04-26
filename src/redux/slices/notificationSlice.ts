import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationState {
    notificationId: number
}

const initialState: NotificationState = {
    notificationId: 0
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationId: (state, action: PayloadAction<number>) => {
            state.notificationId = action.payload
        }
    }
})

export const { setNotificationId } = notificationSlice.actions
export default notificationSlice.reducer

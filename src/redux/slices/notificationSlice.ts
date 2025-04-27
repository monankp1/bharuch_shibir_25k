import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationState {
    seenNotificationIds: string[]
}

const initialState: NotificationState = {
    seenNotificationIds: []
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotificationIds: (state, action) => {
            // Add new IDs without duplicates
            const newIds = action.payload.filter((id: string) => !state.seenNotificationIds?.includes(id))
            console.log('----', newIds)
            state.seenNotificationIds?.push(...newIds)
        }
    }
})

export const { addNotificationIds } = notificationSlice.actions
export default notificationSlice.reducer

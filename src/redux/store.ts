import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Reducers
import loadingReducer from './slices/loadingSlice'
import notificationReducer from './slices/notificationSlice'
import userReducer from './slices/userSlice' // <-- Added user reducer

// Combine reducers
const rootReducer = combineReducers({
    loading: loadingReducer,
    notification: notificationReducer,
    user: userReducer // <-- Add user reducer here
})

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['notification', 'user'] // <-- Persist notification and user slices
}

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure store with persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/FLUSH',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER'
                ]
            }
        })
})

// Create persistor
export const persistor = persistStore(store)

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

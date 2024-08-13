import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist';
import authReducer from './authSlice';

const persistConfig = {
    key: 'auth',
    storage,
    
};
const reducers = combineReducers({ auth: authReducer });
const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

 export const persister = persistStore(makeStore)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof makeStore.getState>
export type AppDispatch = typeof makeStore.dispatch

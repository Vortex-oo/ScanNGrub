import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './Slices/userSlices';
import ownerReducer from './Slices/ownerSlice.js'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','owner', 'isAuthenticated']
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedOwnerReducer = persistReducer(persistConfig, ownerReducer);

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        owner: persistedOwnerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST']
            }
        })
});

export const persistor = persistStore(store);
export default store;
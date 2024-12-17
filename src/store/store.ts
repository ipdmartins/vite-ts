import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, AuthState } from "./user/loginSlice";
import { PersistPartial } from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "auth", // The key to store the persisted state in localStorage
  storage, // Storage provider (default is localStorage)
  version: 1, // Versioning to handle migrations later if needed
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

interface RootState {
  auth: AuthState & PersistPartial; // Combine AuthState with PersistPartial
}

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export default persistor;
export type { RootState };

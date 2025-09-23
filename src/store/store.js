import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "../feature/userSlice"
import loaderReducer from "../feature/loaderSlice"
const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["access", "refresh", "user", "isAuthenticated"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);


export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    loader: loaderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/slices/user.slice";
import orderReducer from "../feature/slices/order.slice";
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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  userState: userReducer,
  orderState: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistStor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDistpatch = typeof store.dispatch;

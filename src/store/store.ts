import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import userReducer from "slices/userSlice";
import newsReducer from "slices/newsSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blackList: ["news"],
};
const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export default store;

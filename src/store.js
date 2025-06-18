import { configureStore } from "@reduxjs/toolkit";
import { carCategoryApi } from "./services/carCategoryApi";
import { brandApi } from "./services/brandApi";
export const store = configureStore({
  reducer: {
    [carCategoryApi.reducerPath]: carCategoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(carCategoryApi.middleware)
      .concat(brandApi.middleware),
});

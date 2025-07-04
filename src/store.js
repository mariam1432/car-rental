import { configureStore } from "@reduxjs/toolkit";
import { carCategoryApi } from "./services/carCategoryApi";
import { brandApi } from "./services/brandApi";
import { carApi } from "./services/carApi";
export const store = configureStore({
  reducer: {
    [carCategoryApi.reducerPath]: carCategoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(carCategoryApi.middleware)
      .concat(brandApi.middleware)
      .concat(carApi.middleware),
});

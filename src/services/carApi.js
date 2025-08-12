import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./carCategoryApi";
import { buildQueryParams } from "../utils/carUtils";

export const carApi = createApi({
  reducerPath: "carApi",

  baseQuery,

  tagTypes: ["Cars"],

  endpoints: (builder) => ({
    cars: builder.query({
      query: (options) => {
        const {
          fields = [],
          populate = {},
          filters = {},
          pagination = {},
          sort = {},
        } = options;
        const query = buildQueryParams({
          fields,
          populate,
          filters,
          pagination,
          sort,
        });
        return `cars?${decodeURIComponent(query)}`;
      },
      providesTags: ["Cars"],
    }),

    car: builder.query({
      query: (options) => {
        const { populate = {}, filters = {}, pagination = {} } = options;
        const query = buildQueryParams({
          populate,
          filters,
          pagination,
        });
        return `/cars?${decodeURIComponent(query)}`;
      },
    }),
  }),
});

export const { useCarsQuery, useLazyCarQuery, useCarQuery, useLazyCarsQuery } =
  carApi;

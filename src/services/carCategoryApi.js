import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueryParams } from "../utils/carUtils";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const carCategoryApi = createApi({
  reducerPath: "carCategoryApi",

  baseQuery,

  tagTypes: ["carCategories"],

  endpoints: (builder) => ({
    categories: builder.query({
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
        return `car-categories?${decodeURIComponent(query)}`;
      },
      providesTags: ["carCategories"],
    }),

    category: builder.query({
      query: (id) => `/categories/${id}`,
    }),
  }),
});

export const { useCategoriesQuery } = carCategoryApi;

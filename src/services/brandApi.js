import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./carCategoryApi";
import { buildQueryParams } from "../utils/carUtils";

export const brandApi = createApi({
  reducerPath: "brandApi",

  baseQuery,

  tagTypes: ["Brand"],

  endpoints: (builder) => ({
    brands: builder.query({
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

        return `brand-test?${decodeURIComponent(query)}`;
      },
      providesTags: ["Brand"],
    }),

    category: builder.query({
      query: (id) => `/categories/${id}`,
    }),
  }),
});

export const { useBrandsQuery } = brandApi;

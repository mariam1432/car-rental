import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { carCategory } from "../models/carCategory";
import { buildQueryParams } from "../utils/carUtils";
export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
});
export const carCategoryApi = createApi({
    reducerPath: "carCategoryApi",

    baseQuery,

    tagTypes: ["carCategories"],

    endpoints: (builder) => ({
        categories: builder.query<{
            categories: carCategory[],
            pagination: { totalItems: number; totalPages: number; currentPage: number; limit: number }
        }, { options?: any; page?: number; limit?: number; search?: string; sort?: string; order?: string; filters?: Record<string, string> }>({
            query: (

                options
            ) => {
                const {
                    fields = [],
                    populate = {},
                    filters = {},
                    pagination = {},
                    sort = {}
                } = options
                const query = buildQueryParams({
                    fields, populate, filters, pagination, sort
                });
                console.log(query, 'paramss')
                return `car-categories?${decodeURIComponent(query)}`

            },
            providesTags: ["carCategories"],
        }),


        category: builder.query<any, number>({
            query: (id) => `/categories/${id}`,
        }),

    }),
});
export const {
    useCategoriesQuery,
} = carCategoryApi
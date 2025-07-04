import { createApi, } from "@reduxjs/toolkit/query/react";
import { brand } from "../models/brand";
import { baseQuery } from "./carCategoryApi"
import { buildQueryParams } from "../utils/carUtils";
export const brandApi = createApi({
    reducerPath: "brandApi",

    baseQuery,

    tagTypes: ["Brand"],

    endpoints: (builder) => ({
        brands: builder.query<{
            brands: brand[],
            pagination: { totalItems: number; totalPages: number; currentPage: number; limit: number }
        }, { options?: string; page?: number; limit?: number; search?: string; sort?: string; order?: string; filters?: Record<string, string> }>({
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
                console.log('brandsparams', query)

                return `brand-test?${decodeURIComponent(query)}`;
            },
            providesTags: ["Brand"],
        }),


        category: builder.query<any, number>({
            query: (id) => `/ categories / ${id}`,
        }),

    }),
});
export const {
    useBrandsQuery
} = brandApi
import { createApi, } from "@reduxjs/toolkit/query/react";
import { car } from "../models/car";
import { baseQuery } from "./carCategoryApi"
import { CAR_LIST_QUERY, buildQueryParams } from "../utils/carUtils"
export const carApi = createApi({
    reducerPath: "carApi",

    baseQuery,

    tagTypes: ["Cars"],

    endpoints: (builder) => ({
        cars: builder.query<{
            cars: car[],
            pagination: { totalItems: number; totalPages: number; currentPage: number; limit: number }, fields: Array<any>
        }, { populate?: any; page?: number; limit?: number; search?: string; sort?: string; order?: string; filters?: Record<string, string> }>({
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
                return `cars?${decodeURIComponent(query)}`
            },
            providesTags: ["Cars"],
        }),


        car: builder.query<any, any>({
            query: (options) => {
                const {
                    populate = {},
                    filters = {},
                    pagination = {}

                } = options;
                const query = buildQueryParams({
                    populate, filters, pagination
                });
                console.log(query)
                return `/cars?${decodeURIComponent(query)}`
            },
        }),

    }),
});
export const {
    useCarsQuery, useLazyCarQuery, useCarQuery, useLazyCarsQuery
} = carApi
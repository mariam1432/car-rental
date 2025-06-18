import { createApi, } from "@reduxjs/toolkit/query/react";
import { brand } from "../models/brand";
import { baseQuery } from "./carCategoryApi"
export const brandApi = createApi({
    reducerPath: "brandApi",

    baseQuery,

    tagTypes: ["Brand"],

    endpoints: (builder) => ({
        brands: builder.query<{
            brands: brand[],
            pagination: { totalItems: number; totalPages: number; currentPage: number; limit: number }
        }, { populate?: string; page?: number; limit?: number; search?: string; sort?: string; order?: string; filters?: Record<string, string> }>({
            query: (
                { populate }
                // { page = 1, limit = 10, search, sort = "createdAt", order = "desc", filters }
            ) => {
                // const params = new URLSearchParams();

                // params.append("page", page.toString());
                // params.append("limit", limit.toString());
                // if (search && search != "") params.append("search", search);
                // if (sort) params.append("sort", sort);
                // if (order) params.append("order", order);

                // // Append additional filters
                // if (filters) {
                //     Object.entries(filters).forEach(([key, value]) => {
                //         params.append(key, value);
                //     });
                // }

                return `brand-test?${populate && `populate=${populate}`}`;
            },
            providesTags: ["Brand"],
        }),


        category: builder.query<any, number>({
            query: (id) => `/categories/${id}`,
        }),

    }),
});
export const {
    useBrandsQuery
} = brandApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { carCategory } from "../models/carCategory";

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

                return `car-categories?${populate && `populate=${populate}`}`;
            },
            providesTags: ["carCategories"],
        }),


        category: builder.query<any, number>({
            query: (id) => `/categories/${id}`,
        }),

    }),
});
export const {
    useCategoriesQuery
} = carCategoryApi
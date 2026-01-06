import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../config';
export const otherAPI = createApi({
    reducerPath: 'otherAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}/api/v1/`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const {
                auth: { token }
            } = getState();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['users', 'orders', 'cabs', 'distance'],
    endpoints: (builder) => ({
        calculateDistance: builder.query({
            query: ({ origin, destination, startDate }) => ({
                url: '/system/distance',
                method: 'GET',
                params: { origin, destination, startDate }
            }),
            providesTags: ['distance'],

            transformResponse: (response) => {
                return response.data;
            }
        })
    })
});
export const { useCalculateDistanceQuery } = otherAPI;

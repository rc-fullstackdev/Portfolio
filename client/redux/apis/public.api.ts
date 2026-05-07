import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createAutoLogoutBaseQuery } from "./createAutoLogoutBaseQuery"
import { APP_URL } from "@/constants/config"
import { ADD_CONTACT_INFO_REQUEST, COMMON_RESPONSE, GET_EDUCATION_RESPONSE, GET_EXPERIENCE_RESPONSE, GET_PROJECT_RESPONSE, GET_SKILLS_RESPONSE, READ_ABOUT_INFO_RESPONSE } from "@/types/admin"

export const publicApi = createApi({
    reducerPath: "api",
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: `/api/public`,
        redirectPath: "/login"
    }),
    tagTypes: ["public"],
    endpoints: (builder) => {
        return {
            getPublicSkills: builder.query<GET_SKILLS_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/get-public-skills",
                        method: "GET"
                    }
                },
                providesTags: ["public"]
            }),

            getPublicExperience: builder.query<GET_EXPERIENCE_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/get-public-experience",
                        method: "GET",
                    }
                },
                providesTags: ["public"]
            }),

            getPublicProjects: builder.query<GET_PROJECT_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/get-public-projects",
                        method: "GET",
                    }
                },
                providesTags: ["public"]
            }),

            readPublicAboutInfo: builder.query<READ_ABOUT_INFO_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/read-public-about-info",
                        method: "GET",
                    }
                },
                providesTags: ["public"]
            }),

            getPublicEducationInfo: builder.query<GET_EDUCATION_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/get-public-education-info",
                        method: "GET",
                    }
                },
                providesTags: ["public"]
            }),

            addContactInfo: builder.mutation<COMMON_RESPONSE, ADD_CONTACT_INFO_REQUEST>({
                query: contactData => {
                    return {
                        url: "/add-public-contact-info",
                        method: "POST",
                        body: contactData
                    }
                },
                invalidatesTags: ["public"]
            }),
        }
    }
})

export const {
    useGetPublicSkillsQuery,
    useGetPublicExperienceQuery,
    useGetPublicProjectsQuery,
    useReadPublicAboutInfoQuery,
    useGetPublicEducationInfoQuery,
    useAddContactInfoMutation
} = publicApi

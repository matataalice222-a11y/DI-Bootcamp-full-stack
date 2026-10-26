import { createApi } from '@reduxjs/toolkit/query/react';
import type { Story, StoryComment, StoryContributor, StoryRevision } from '@story/types';
import { baseQueryWithReauth } from './apiBase';

interface StoriesResponse { stories: Story[] }
interface StoryResponse { story: Story }
interface CommentsResponse { comments: StoryComment[] }
interface ContributorsResponse { contributors: StoryContributor[] }
interface RevisionsResponse { revisions: StoryRevision[] }

export const storyApi = createApi({
  reducerPath: 'storyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Stories', 'Story', 'Comments', 'Contributors'],
  endpoints: (builder) => ({
    getStories: builder.query<StoriesResponse, boolean>({
      query: (ownOnly) => `/stories${ownOnly ? '?own=true' : ''}`,
      providesTags: ['Stories'],
    }),
    getStory: builder.query<StoryResponse, number>({
      query: (id) => `/stories/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Story', id }],
    }),
    createStory: builder.mutation<StoryResponse, { title: string; content: string }>({
      query: (body) => ({ url: '/stories', method: 'POST', body }),
      invalidatesTags: ['Stories'],
    }),
    updateStory: builder.mutation<StoryResponse, { id: number; title: string; content: string }>({
      query: ({ id, ...body }) => ({ url: `/stories/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _error, { id }) => ['Stories', { type: 'Story', id }],
    }),
    deleteStory: builder.mutation<void, number>({
      query: (id) => ({ url: `/stories/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Stories'],
    }),
    getComments: builder.query<CommentsResponse, number>({
      query: (storyId) => `/stories/${storyId}/comments`,
      providesTags: (_result, _error, storyId) => [{ type: 'Comments', id: storyId }],
    }),
    addComment: builder.mutation<{ comment: StoryComment }, { storyId: number; content: string }>({
      query: ({ storyId, content }) => ({ url: `/stories/${storyId}/comments`, method: 'POST', body: { content } }),
      invalidatesTags: (_result, _error, { storyId }) => [{ type: 'Comments', id: storyId }, 'Stories'],
    }),
    deleteComment: builder.mutation<void, { id: number; storyId: number }>({
      query: ({ id }) => ({ url: `/comments/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, { storyId }) => [{ type: 'Comments', id: storyId }, 'Stories'],
    }),
    getContributors: builder.query<ContributorsResponse, number>({
      query: (storyId) => `/stories/${storyId}/contributors`,
      providesTags: (_result, _error, storyId) => [{ type: 'Contributors', id: storyId }],
    }),
    getRevisions: builder.query<RevisionsResponse, number>({
      query: (storyId) => `/stories/${storyId}/revisions`,
      providesTags: (_result, _error, storyId) => [{ type: 'Story', id: storyId }],
    }),
    restoreRevision: builder.mutation<StoryResponse, { storyId: number; revisionId: number }>({
      query: ({ storyId, revisionId }) => ({
        url: `/stories/${storyId}/revisions/${revisionId}/restore`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { storyId }) => ['Stories', { type: 'Story', id: storyId }],
    }),
    addContributor: builder.mutation<{ contributor: StoryContributor }, { storyId: number; email: string }>({
      query: ({ storyId, email }) => ({ url: '/contributors', method: 'POST', body: { storyId, email } }),
      invalidatesTags: (_result, _error, { storyId }) => [{ type: 'Contributors', id: storyId }, 'Stories'],
    }),
    removeContributor: builder.mutation<void, { id: number; storyId: number }>({
      query: ({ id }) => ({ url: `/contributors/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, { storyId }) => [{ type: 'Contributors', id: storyId }, 'Stories'],
    }),
    updateProfile: builder.mutation<{ user: { displayName: string } }, { displayName: string }>({
      query: (body) => ({ url: '/auth/me', method: 'PATCH', body }),
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useGetStoryQuery,
  useCreateStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetContributorsQuery,
  useGetRevisionsQuery,
  useRestoreRevisionMutation,
  useAddContributorMutation,
  useRemoveContributorMutation,
  useUpdateProfileMutation,
} = storyApi;
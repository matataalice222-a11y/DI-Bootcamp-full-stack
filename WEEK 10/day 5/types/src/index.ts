export interface User {
  id: number;
  username: string;
  email: string;
  displayName: string;
}

export interface StoryContributor {
  id: number;
  userId: number;
  username: string;
  displayName: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorUsername: string;
  authorDisplayName: string;
  createdAt: string;
  updatedAt: string;
  contributors: StoryContributor[];
  commentCount: number;
}

export interface StoryComment {
  id: number;
  storyId: number;
  userId: number;
  username: string;
  displayName: string;
  content: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiError {
  message: string;
}

export interface StoryRevision {
  id: number;
  storyId: number;
  title: string;
  content: string;
  editorUserId: number;
  editorDisplayName: string;
  createdAt: string;
}
export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    username: "/auth/username",
  },
  chat: "/chat",
  profile: "/users/me",
  users: "/users",
  meeting: "/meeting",
  courses: {
    getAll: "/courses",
  },
  assign_courses: "/courses-assign",
  products: {
    getAll: "/products",
  },
  projects: {
    getAll: "/projects",
  },
  homeworks: {
    getAll: "/homeworks",
  },
  franchisee: {
    getAll: "/franchisee",
    subFranchisee: "franchisee/sub-franchisee",
  },
  quiz: {
    getAll: "/quizs",
  },
  ticket: {
    getAll: "/ticket",
  },
  files: {
    upload: "/upload/files",
    getFiles: "/upload",
  },
  announcements: { getAll: "/announcements" },
  dashboard: { getAll: "/reports" },
  createUser: "/users",
  address: {
    create: "/addresses",
    getAll: "/addresses",
  },
  batch: {
    getAll: "/batch",
  },
  teachers: {
    getAll: "/users/teachers",
    create: "/teachers",
  },
  students: {
    getAll: "/users/students",
  },
  recordings: {
    getAll: "/recordings",
  },
  notes: {
    getAll: "/notes",
  },
  todos: {
    getAll: "/notes",
  },
  buddy: {
    getAll: "/buddy",
  },
  schedules: {
    getAll: "/schedules",
  },
};

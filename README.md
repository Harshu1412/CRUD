# CRUD - React Native Task Management App

CRUD is a React Native application built with Expo that allows users to register, log in, and manage tasks with full CRUD (Create, Read, Update, Delete) functionality. The app uses JWT for authentication and integrates with a backend API deployed on Render.

## Features

- **User Authentication**
  - Sign up with name, email, and password.
  - Login with email and password.
  - Logout functionality (clears stored JWT token).

- **Task Management**
  - **Home Screen:** Display all tasks fetched from the backend with pull-to-refresh.
  - **Add Task Screen:** Create new tasks (title + description).
  - **Task Details Screen:** View, update, or delete an existing task.
  
- **State Management & Navigation**
  - Uses React Context API for managing authentication state.
  - Uses React Navigation (Stack Navigator) for screen transitions.
  
- **UI Components**
  - Built using React Native Paper for a consistent and material design look.
  - Uses AsyncStorage for storing JWT tokens locally.

## Tech Stack

- **Frontend:** React Native (Expo), React Navigation, React Context API, AsyncStorage, React Native Paper.
- **Backend (For Reference):** Node.js, Express, MongoDB, Mongoose and JWT

## Installation

Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- A backend API deployed on Render (update the API base URL in the project)

 Steps

1. Clone the repository:
   git clone https://github.com/Harshu1412/CRUD.git
2. Install dependencies:
   npm install
3.Start the Expo development server:
   npx expo start


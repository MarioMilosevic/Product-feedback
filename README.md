# Product Feedback 

Product Feedback is an full-stack application, designed for managing feedbacks. 

## Environment Variables
  To run this project, you will need to add the following environment variablet to your .env.local file:
    - VITE_SUPABASE_URL : Your Supabase URL,
    - VITE_SERVICE_KEY : Your service key.

## Features
  - **Sign up** : Create account in order to use this app's  functionality,
  - **Login** : After creating account login,
  - **Cloudinary** : Upload your image using Cloudinary API,
  - **Infinite scroll** : Scroll and new data get's displayed.

**Feedbacks**:
  - Supports CRUD operatins, when logged in, on your own feedbacks.
  - Filter feedbacks by category :**UI**, **UX**, **ENHANCEMENT**, **BUG**, **FEATURE**.
  - Sort feedbacks by likes (**Most Likes**, **Least Likes**), or by comments (**Most Comments**, **Least Comments**).
  - Like feedbacks.

**Comments**:
  - Comment on feedbacks, and reply on other's comments.


## Technologies Used:

- Vite
- Vue 3
- Typescript
- Zod
- Toastify
- Cloudinary API
- Intersection Observer API
- Supabase
- SCSS

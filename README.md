# Multi-Stage Mars Visit Application Form

This a simple multi-stage application form for individuals interested in visiting Mars. The form will collect various details and preferences from applicants.

## Features

- Users can navigate back and forth to review and edit their entries, except for the last stage. If users go back to modify previous stages, they have to fill out the last form stage again.
- Users must fill out all fields to proceed to the next form stage, except for fields marked as optional.
- Users cannot select a future date for the birth date.
- Users cannot select a past date for the departure date. They must select a departure date before selecting the return date, and they cannot select a return date earlier than the departure date. For example, if the user selects July 29 as the departure date, they must select July 29 or later for the return date.

## How to run this project on your local machine?

1. Clone this repo to your machine and open it with VS Code or any code editor.
2. Create a file named .env and add the following code:

```
NEXT_PUBLIC_SERVER_URL=https://visit-mars-backend.vercel.app/api/
```

3. Install all dev dependencies with the command npm i or npm install.
4. Now you can run the project on localhost with the command npm run dev.

visit the file `package.json` to know other commands.

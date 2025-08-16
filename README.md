Workcity Chat System - Frontend

This repository houses the user interface for the real-time chat system, forming the client-side application that interacts with the Workcity Chat Backend. It's built with React.js, styled with Tailwind CSS, and uses Socket.IO for real-time communication, providing a clean, responsive, and user-friendly experience

Table of Contents

    Features

    Technologies Used

    Setup Instructions

    Required Pages

    UI/UX Design Inspiration

    Challenges Faced

    Further Improvements

    Demo Video



Features

    User Authentication: Dedicated Signup and Login pages for user access.

    Real-time Inbox & Chat View:

        Displays a list of active conversations in an inbox.

        Provides a dynamic chat interface for real-time messaging within conversations.

    Profile Management: Users can view and potentially update their profiles.

    Admin Dashboard: (If implemented) An interface for administrators to manage users and system settings.

    Responsive UI: Adapts seamlessly to different screen sizes (mobile, tablet, desktop).

    API Connection: Integrates with the workcity-chat-backend for data fetching and real-time updates.

    Typing Indicators: Display "User is typing..." indicators for real-time feedback.

Technologies Used

    React.js: A JavaScript library for building user interfaces.

    Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.

    Socket.IO Client: For establishing and managing real-time connections with the backend.

    Axios: Promise-based HTTP client for making API requests.

    React Router (or similar state management for view switching): For client-side navigation between pages.

    React Context API (or Redux/Zustand): For state management across components.

Setup Instructions
Prerequisites

    Node.js (v14 or higher)

    npm or Yarn

Steps

    Clone the repository:

    git clone https://github.com/Nwike-badger/workcity-chat-frontend.git
    cd workcity-chat-frontend

    Install dependencies:

    npm install # or yarn install

    Create a .env file:
    In the root directory of the project, create a file named .env and add the following environment variable:

    REACT_APP_BACKEND_URL=http://localhost:5000/api # Adjust if your backend is on a different port/URL

    Run the application:

    npm start # or yarn start

    The application will open in your browser, typically at http://localhost:5173.

Required Pages

    /signup: User registration form.

    /login: User login form.

    /admin : displays admin dashboard if user token has admin

    /inbox: Displays a list of ongoing conversations.

    /chat/:conversationId: Real-time chat view for a specific conversation.


UI/UX 

The design is a clean layout that provides an okay user experience.

Challenges Faced

    Real-time UI Updates: Efficiently updating the UI in real-time as messages arrive via Socket.IO, ensuring smooth scrolling and message display.

    Responsive Design: Implementing a fully responsive layout using Tailwind CSS to ensure optimal viewing and usability across various devices (mobile, tablet, desktop, this could not completed in time).

    State Management: Managing complex application state, including user authentication, conversations, messages, and real-time indicators, to prevent re-renders and maintain performance.

    cors: handshake bewtween frontend and back endworks seamlessly 

    

    API Integration: Consuming the RESTful APIs from the backend and handling JWT authentication for protected routes.

Further Improvements (Bonus Considerations)

    Dark/Light Mode: Implement a toggle for a visually appealing dark theme.

    Notifications: In-app notifications for new messages or events.

    Offline Fallback: Provide a graceful experience when the user's internet connection is unstable or offline.

    User Experience for Chat: this can really be upgraded , combining the logic with ui was challenging given the time frame

    Online Status: Show the online/offline status of users.

    File Uploads: Integrate file attachment functionality within the chat.



## Demo Video

👉 [Watch the demo video here](https://www.loom.com/share/efeba07e4c3f4c1e8d3510a8afe6b22c?sid=a8374d43-c93a-4226-b059-cf91509309a0)



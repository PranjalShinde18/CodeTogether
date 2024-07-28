# Collaborative Coding Platform

Collaborate, code, and conquer your projects together with this Collaborative Coding Platform. This platform allows real-time collaboration on code, project management, and an interactive coding environment, integrating with popular coding platforms for an enhanced workflow.

## Features

- **Real-time Collaboration**: Work on code together with your team in real-time.
- **Project Management**: Organize your tasks, track progress, and meet deadlines.
- **Interactive Coding Environment**: Write, run, and test code directly in the browser.
- **Seamless Integration**: Integrate with popular coding platforms for enhanced workflow.

## Technologies Used

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js, MongoDB, Socket.io
- **Authentication**: JWT
- **Hosting**: Vercel (Frontend), Render (Backend)

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/collaborative-coding-platform.git
   cd collaborative-coding-platform

   # Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Set up environment variables
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000


# Run the backend
cd server
npm start

# Run the frontend
cd client
npm start

# Open your browser and navigate to
http://localhost:3000


# Overengineered Resume

Welcome to the Overengineered Resume - a testament to the "because I can" philosophy. This project isn't just a resume; it's an extravagant display of what happens when a developer decides a static HTML site is too mainstream. It's hosted live from a personal computer, tunneling through the digital abyss via ngrok, because why not live on the edge?

## Project Structure

- **Client Side (`/client`):**

  - Built with React, showcasing components like `Profile`, `Chat`, `Experience`, and more.
  - Each component is a needle in the haystack of complexity, adding layers to what could have been a simple text file.
  - The `Chat` component integrates a WebSocket connection, because communicating via carrier pigeons didn't seem practical.

- **Server Side (`/server`):**

  - An Express server acts as the backbone, handling requests with more routes than a cross-country road trip.
  - Socket.IO integration for real-time chat functionality, proving that even resumes need to chat.
  - Middleware like `chatKeyValidator.js` to make sure only the worthy can chat. It's like a bouncer, but for text messages.

- **Data (`resume.json`):**
  - A JSON file holding the resume data, because why use a simple Word document when you can format your career in JSON?

## Key Features

- **Real-time Chat:**
  - Chat live with the resume (or the person behind it) using Socket.IO. It's like talking to a piece of paper, but more technologically advanced.
- **Dynamic Content:**
  - Why be static when you can be dynamic? Each section of the resume is rendered using data-driven components.
- **Overengineered to Perfection:**
  - This project is an ode to unnecessary complexity, combining various technologies to turn a simple resume into a full-fledged web application.

## Running the Project

1. Clone the repository.
2. Navigate to `/client` and `/server`, running `npm install` in each to install dependencies.
3. Start the client and server separately, and watch the magic unfold.

## Why This Project?

In a world where simplicity is often key, we took the road less traveled. This Overengineered Resume serves as a playful demonstration of technical prowess, creativity, and a touch of humor. It's about pushing boundaries, embracing complexity, and showcasing skills in the most convoluted way possible.

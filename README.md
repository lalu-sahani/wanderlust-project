🌍 Wanderlust – Full-Stack Travel Listing Web App

Wanderlust is a full-stack travel listing web application where users can explore destinations, create listings, upload images, and share reviews.

This project was built as part of my full-stack development learning journey and focuses on implementing real-world backend architecture, authentication, cloud storage integration, and deployment.

🚀 Live Demo

🔗 Live Project: https://wanderlust-project-m5xp.onrender.com/listings

🔗 GitHub Repository: https://github.com/lalu-sahani/wanderlust-project

✨ Features

🔐 User Authentication (Sign up / Login / Logout)

🛡️ Authorization (Users can modify only their own listings & reviews)

🏡 Create, Edit, Delete Listings (CRUD Operations)

⭐ Review & Rating System

🔁 Cascade Deletion (Deleting listing removes associated reviews)

☁️ Cloud-based Image Upload (Cloudinary Integration)

🌍 MongoDB Atlas Cloud Database

📱 Responsive Navbar & UI (Bootstrap)

🏗️ MVC Architecture

✅ Server-side Validation & Error Handling

🚀 Deployed on Render

🛠️ Tech Stack
Backend

Node.js

Express.js

MongoDB

Mongoose

Frontend

EJS (Embedded JavaScript Templates)

Bootstrap

JavaScript

Cloud & Deployment

Cloudinary (Image Storage)

MongoDB Atlas (Cloud Database)

Render (Deployment)

🧠 What I Learned

Implementing RESTful routing

Structuring a project using MVC architecture

Connecting frontend, backend, and database

Handling authentication & authorization logic

Managing relational data and cascade deletion

Integrating third-party cloud services

Deploying production-ready applications

📂 Project Structure (MVC Pattern)
/models
/controllers
/routes
/views
/public
/middleware
/app.js
🔐 Authorization Logic

Only logged-in users can create listings or reviews.

Users can edit/delete only their own listings and reviews.

Protected routes using middleware.

📸 Image Upload Flow

User selects image from local system

Image is uploaded to Cloudinary

Cloudinary returns secure image URL

URL is stored in MongoDB database

🔮 Future Improvements

🔎 Search & Filter functionality

📄 Pagination

⭐ Average rating calculation

⚡ Performance optimization

❤️ Wishlist / Favorites feature

🧪 Installation (For Local Setup)
git clone <your-repo-link>
cd wanderlust
npm install

Create a .env file and add:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
ATLAS_DB_URL=your_mongodb_url
SESSION_SECRET=your_secret

Then run:

npm start

Visit:

http://localhost:3000
🙌 Acknowledgment

Built as part of my Full Stack Development learning journey.
Extended and deployed with additional features and cloud integrations.

📌 Author

Lalu Sahani
Aspiring Full-Stack Developer

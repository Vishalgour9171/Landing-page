# Portfolio Full-Stack Application

A modern, responsive portfolio website built with React (TypeScript) frontend and Node.js (Express) backend, featuring a complete admin panel for content management.

## 🚀 Features

### Frontend (React + TypeScript + Tailwind CSS)
- **Landing Page** with modern, responsive design
- **Projects Section** - Dynamic project showcase
- **Happy Clients Section** - Client testimonials display  
- **Contact Form** - Collects user inquiries
- **Newsletter Subscription** - Email collection system
- **Admin Panel** - Complete CRUD operations for content management

### Backend (Node.js + Express + TypeScript)
- **RESTful API** with Express.js
- **MongoDB Integration** with Mongoose
- **Image Upload & Processing** with Multer and Sharp
- **Automatic Image Resizing** (450x350px with cropping)
- **Input Validation** and error handling
- **CORS Support** for cross-origin requests

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- Multer (file uploads)
- Sharp (image processing)
- CORS
- dotenv

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- CRACO (Create React App Configuration Override)

## 📁 Project Structure

```
portfolio-app/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Main server file
│   ├── uploads/            # Image storage
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main app component
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system or configure MongoDB Atlas connection.

5. **Build and start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📚 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (with image upload)
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client (with image upload)
- `DELETE /api/clients/:id` - Delete client

### Contacts
- `GET /api/contacts` - Get all contact submissions
- `POST /api/contact` - Submit contact form
- `DELETE /api/contacts/:id` - Delete contact submission

### Newsletter
- `GET /api/subscribers` - Get all newsletter subscribers
- `POST /api/subscribe` - Subscribe to newsletter
- `DELETE /api/subscribers/:id` - Delete subscriber

## 🎨 Frontend Pages

### Landing Page (`/`)
- Hero section with call-to-action buttons
- Projects showcase (fetched from API)
- Client testimonials (fetched from API)
- Contact form
- Newsletter subscription
- Responsive navigation and footer

### Admin Panel (`/admin`)
- **Projects Management** - Add/view/delete projects with image upload
- **Client Management** - Add/view/delete clients with image upload
- **Contact Submissions** - View and manage contact form submissions
- **Newsletter Subscribers** - View and manage email subscribers

## 🔧 Configuration

### Image Processing
- Uploaded images are automatically resized to 450x350 pixels
- Images are converted to WebP format for optimal performance
- Original aspect ratio is maintained using cover fit

### Database Models

**Project Schema:**
```typescript
{
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Client Schema:**
```typescript
{
  name: string;
  description: string;
  designation: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Contact Schema:**
```typescript
{
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Newsletter Schema:**
```typescript
{
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎯 Usage

1. **Start the backend server** first to ensure API availability
2. **Start the frontend development server**
3. **Access the landing page** at `http://localhost:3000`
4. **Access the admin panel** at `http://localhost:3000/admin`
5. **Use the admin panel** to add projects and clients
6. **Test the contact form** and newsletter subscription
7. **View submissions** in the admin panel

## 🔒 Security Features

- Input validation on both frontend and backend
- File type validation for image uploads
- File size limits (5MB maximum)
- CORS configuration for secure cross-origin requests
- MongoDB injection protection with Mongoose

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Set production environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Configure MongoDB Atlas for production database

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to platforms like Netlify, Vercel, or AWS S3
3. Update `REACT_APP_API_BASE_URL` to point to production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors:** Ensure backend CORS is configured correctly
2. **Image Upload Issues:** Check file size limits and supported formats
3. **Database Connection:** Verify MongoDB is running and connection string is correct
4. **Build Errors:** Ensure all dependencies are installed and TypeScript types are correct

### Support

If you encounter any issues, please check the following:
- All dependencies are installed
- Environment variables are configured correctly
- MongoDB is running
- Both frontend and backend servers are started

For additional help, please open an issue in the repository.

---

**Made with ❤️ using React, Node.js, and MongoDB**

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./utils/database"));
// Import routes
const projects_1 = __importDefault(require("./routes/projects"));
const clients_1 = __importDefault(require("./routes/clients"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const newsletter_1 = __importDefault(require("./routes/newsletter"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to database
(0, database_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files (uploaded images)
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/api/projects', projects_1.default);
app.use('/api/clients', clients_1.default);
app.use('/api/contacts', contacts_1.default);
app.use('/api/contact', contacts_1.default); // Alias for contact form submission
app.use('/api/subscribers', newsletter_1.default);
app.use('/api/subscribe', newsletter_1.default); // Alias for newsletter subscription
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Portfolio API Server',
        version: '1.0.0',
        endpoints: {
            projects: '/api/projects',
            clients: '/api/clients',
            contacts: '/api/contacts',
            contact: '/api/contact',
            subscribers: '/api/subscribers',
            subscribe: '/api/subscribe',
            health: '/api/health'
        }
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            error: 'File size too large. Maximum size is 5MB.'
        });
    }
    if (err.message.includes('Only JPEG, JPG, PNG, and WebP images are allowed')) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    res.status(500).json({
        success: false,
        error: 'Internal Server Error'
    });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📄 API Documentation: http://localhost:${PORT}`);
});

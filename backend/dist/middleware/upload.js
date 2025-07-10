"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Configure multer for file uploads
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only JPEG, JPG, PNG, and WebP images are allowed'));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});
// Image processing middleware
const processImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
        const uploadPath = path_1.default.join(__dirname, '../../uploads', filename);
        // Ensure uploads directory exists
        const uploadDir = path_1.default.dirname(uploadPath);
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        // Process image with Sharp
        await (0, sharp_1.default)(req.file.buffer)
            .resize(450, 350, {
            fit: 'cover',
            position: 'center'
        })
            .webp({ quality: 80 })
            .toFile(uploadPath);
        // Add filename to request object
        req.body.image = filename;
        next();
    }
    catch (error) {
        console.error('Image processing error:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
};
exports.processImage = processImage;
exports.default = { upload: exports.upload, processImage: exports.processImage };

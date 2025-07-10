import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

// Configure multer for file uploads
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG, and WebP images are allowed'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Image processing middleware
export const processImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next();
    }

    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const uploadPath = path.join(__dirname, '../../uploads', filename);

    // Ensure uploads directory exists
    const uploadDir = path.dirname(uploadPath);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process image with Sharp
    await sharp(req.file.buffer)
      .resize(450, 350, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toFile(uploadPath);

    // Add filename to request object
    req.body.image = filename;
    
    next();
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
};

export default { upload, processImage };
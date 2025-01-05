import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
}

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files in the "uploads" directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create unique file name
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use the original file extension
    },
});

// File filter to restrict file types (e.g., only images and PDFs)
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only .jpg, .jpeg, .png, and .pdf files are allowed!')); // Reject the file
    }
};

// Create the upload middleware with file size limit and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max file size
    fileFilter: fileFilter, // Restrict allowed file types
}).fields([
    { name: 'Document1Name', maxCount: 1 },
    { name: 'Document2Name', maxCount: 1 },
    { name: 'Document3Name', maxCount: 1 },
    { name: 'Document4Name', maxCount: 1 },
]);

export default upload;

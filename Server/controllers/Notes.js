require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Note = require('../models/Notes'); // Adjust as per your folder structure
const path = require('path'); // To extract file extension

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary Storage for PDF
const pdfStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.fieldname === 'pdf_file') {
            return {
                folder: 'notes_pdf_file',
                //resource_type: 'raw', // For non-image files like PDFs
                allowed_formats: ['pdf'],
                public_id: path.parse(file.originalname).name, // Ensure .pdf extension is appended
            };
        }
    },
});

// Configure Cloudinary Storage for Image
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.fieldname === 'image') {
            return {
                folder: 'notes_images',
                allowed_formats: ['jpeg', 'jpg', 'png'],
                public_id: path.parse(file.originalname).name, // No need for extension here
            };
        }
    },
});

// Define Multer middleware for handling multiple file fields
const upload = multer({
    storage: multer.diskStorage({}),
}).fields([
    { name: 'pdf_file', maxCount: 1 },
    { name: 'image', maxCount: 1 },
]);

exports.createNotes = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            if (!req.files['pdf_file'] || !req.files['image']) {
                return res.status(400).json({ message: 'Both PDF and image files are required.' });
            }

            const pdfFile = req.files['pdf_file'][0];
            const imageFile = req.files['image'][0];

            const pdfUploadPromise = cloudinary.uploader.upload(pdfFile.path, {
                folder: 'notes_pdf_file',
                resource_type: 'raw',
                public_id: `${path.parse(pdfFile.originalname).name}`, // Append .pdf manually
            });

            const imageUploadPromise = cloudinary.uploader.upload(imageFile.path, {
                folder: 'notes_images',
                allowed_formats: ['jpeg', 'jpg', 'png'],
                public_id: path.parse(imageFile.originalname).name,
            });

            const [pdfUpload, imageUpload] = await Promise.all([pdfUploadPromise, imageUploadPromise]);

            const { notes_name, user_login, Class, board } = req.body;

            const newNote = new Note({
                notes_name,
                user_login,
                pdf_file: pdfUpload.secure_url,
                Class,
                board,
                image: imageUpload.secure_url,
            });

            await newNote.save();
            res.status(201).json({ message: 'Note created successfully', note: newNote });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};


exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find(); // Retrieve all notes
        res.status(200).json({ message: 'Notes retrieved successfully', notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { notes_name, user_login, Class, board } = req.body;

        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        const pdfFile = req.files?.['pdf_file']?.[0];
        const imageFile = req.files?.['image']?.[0];

        let pdfUpload, imageUpload;

        if (pdfFile) {
            // Destroy old PDF
            if (note.pdf_file) {
                const publicId = getPublicIdFromUrl(note.pdf_file, 'raw');
                await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
            }
            // Upload new PDF
            pdfUpload = await cloudinary.uploader.upload(pdfFile.path, {
                folder: 'notes_pdf_file',
                resource_type: 'raw',
                public_id: path.parse(pdfFile.originalname).name,
            });
        }

        if (imageFile) {
            // Destroy old image
            if (note.image) {
                const publicId = getPublicIdFromUrl(note.image, 'image');
                await cloudinary.uploader.destroy(publicId);
            }
            // Upload new image
            imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                folder: 'notes_images',
                allowed_formats: ['jpeg', 'jpg', 'png'],
                public_id: path.parse(imageFile.originalname).name,
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {
                notes_name,
                user_login,
                Class,
                board,
                pdf_file: pdfUpload ? pdfUpload.secure_url : note.pdf_file,
                image: imageUpload ? imageUpload.secure_url : note.image,
            },
            { new: true }
        );

        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Helper function to extract the public ID from Cloudinary URL
function getPublicIdFromUrl(url, resourceType) {
    const parts = url.split('/');
    const fileWithExtension = parts[parts.length - 1];
    const fileName = fileWithExtension.split('.')[0];
    const folderPath = parts.slice(parts.indexOf(resourceType) + 1, -1).join('/');
    return `${folderPath}/${fileName}`;
}


exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Destroy associated files from Cloudinary
        if (note.pdf_file) {
            const publicIdPdf = getPublicIdFromUrl(note.pdf_file, 'raw');
            await cloudinary.uploader.destroy(publicIdPdf, { resource_type: 'raw' });
        }

        if (note.image) {
            const publicIdImage = getPublicIdFromUrl(note.image, 'image');
            await cloudinary.uploader.destroy(publicIdImage);
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

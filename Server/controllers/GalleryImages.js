const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Gallery = require('../models/Gallery'); // Adjust path based on your project structure

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gallery_images', // Cloudinary folder
        allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed formats
    },
});

const upload = multer({ storage });

// Create a new gallery image
exports.createGalleryImage = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Image is required' });
            }

            const newGalleryImage = new Gallery({
                image: req.file.path, // Cloudinary URL
            });

            await newGalleryImage.save();
            res.status(201).json({ message: 'Gallery image created successfully', galleryImage: newGalleryImage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

// Get all gallery images
exports.getAllGalleryImages = async (req, res) => {
    try {
        const galleryImages = await Gallery.find();
        res.status(200).json({
            message: 'Gallery images retrieved successfully',
            galleryImages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Update a gallery image
exports.updateGalleryImage = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params;

            const galleryImage = await Gallery.findById(id);
            if (!galleryImage) {
                return res.status(404).json({ message: 'Gallery image not found' });
            }

            if (req.file) {
                // Delete old image from Cloudinary
                if (galleryImage.image) {
                    const publicId = getPublicIdFromUrl(galleryImage.image);
                    await cloudinary.uploader.destroy(publicId);
                }

                // Update with new Cloudinary URL
                galleryImage.image = req.file.path;
            }

            await galleryImage.save();
            res.status(200).json({ message: 'Gallery image updated successfully', galleryImage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

// Delete a gallery image
exports.deleteGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;

        const galleryImage = await Gallery.findById(id);
        if (!galleryImage) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }

        // Delete image from Cloudinary
        if (galleryImage.image) {
            const publicId = getPublicIdFromUrl(galleryImage.image);
            await cloudinary.uploader.destroy(publicId);
        }

        await galleryImage.deleteOne();
        res.status(200).json({ message: 'Gallery image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Helper function to extract Cloudinary public ID
function getPublicIdFromUrl(url) {
    const parts = url.split('/');
    const fileWithExtension = parts[parts.length - 1];
    const fileName = fileWithExtension.split('.')[0];
    const folderPath = parts.slice(parts.indexOf('gallery_images') + 1, -1).join('/');
    return `${folderPath}/${fileName}`;
}

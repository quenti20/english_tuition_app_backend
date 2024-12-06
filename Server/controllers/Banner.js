const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Banner = require('../models/Banner'); // Adjust path based on your project structure

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
        folder: 'banner_images', // Cloudinary folder
        allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed formats
    },
});

const upload = multer({ storage });

// Create a new banner
exports.createBanner = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Image is required' });
            }

            const newBanner = new Banner({
                image: req.file.path, // Cloudinary URL
            });

            await newBanner.save();
            res.status(201).json({ message: 'Banner created successfully', banner: newBanner });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

// Get all banners
exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({
            message: 'Banners retrieved successfully',
            banners,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Update a banner
exports.updateBanner = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params;

            const banner = await Banner.findById(id);
            if (!banner) {
                return res.status(404).json({ message: 'Banner not found' });
            }

            if (req.file) {
                // Delete old image from Cloudinary
                if (banner.image) {
                    const publicId = getPublicIdFromUrl(banner.image);
                    await cloudinary.uploader.destroy(publicId);
                }

                // Update with new Cloudinary URL
                banner.image = req.file.path;
            }

            await banner.save();
            res.status(200).json({ message: 'Banner updated successfully', banner });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

// Delete a banner
exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        // Delete image from Cloudinary
        if (banner.image) {
            const publicId = getPublicIdFromUrl(banner.image);
            await cloudinary.uploader.destroy(publicId);
        }

        await banner.deleteOne();
        res.status(200).json({ message: 'Banner deleted successfully' });
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
    const folderPath = parts.slice(parts.indexOf('banner_images') + 1, -1).join('/');
    return `${folderPath}/${fileName}`;
}

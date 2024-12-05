const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Data = require('../models/Data');
require('dotenv').config();

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
        folder: 'data_uploads', // Folder in your Cloudinary account
        allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed file formats
    },
});

const upload = multer({ storage: storage });

// Create Data with image upload to Cloudinary
exports.createData = async (req, res) => {
    upload.single('payment_qr')(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: err.message });
            
        }

        try {
            const { upi_id } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: 'Payment QR image is required' });
            }

            const newData = new Data({
                upi_id,
                payment_qr: req.file.path, // Cloudinary URL
            });

            await newData.save();
            res.status(201).json({ message: 'Data created successfully', data: newData });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

// Get All Data
exports.getAllData = async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Update Data (including updating image in Cloudinary)
exports.updateData = (req, res) => {
    upload.single('payment_qr')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params;
            const { upi_id } = req.body;

            const data = await Data.findById(id);
            if (!data) {
                return res.status(404).json({ message: 'Data not found' });
            }

            if (req.file) {
                // Delete old image from Cloudinary
                if (data.payment_qr) {
                    const publicId = data.payment_qr.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`data_uploads/${publicId}`);
                }

                data.payment_qr = req.file.path; // Update with the new Cloudinary URL
            }

            if (upi_id) data.upi_id = upi_id;

            await data.save();
            res.status(200).json({ message: 'Data updated successfully', data });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

// Delete Data (including deleting image from Cloudinary)
exports.deleteData = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Data.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Delete image from Cloudinary
        if (data.payment_qr) {
            const publicId = data.payment_qr.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`data_uploads/${publicId}`);
        }

        await data.deleteOne();
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

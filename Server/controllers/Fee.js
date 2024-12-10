const express = require('express');
const Fee = require('../models/Fee'); // Adjust path based on your project structure

// Create a new fee record
exports.createFee = async (req, res) => {
    try {
        const { Class, fee } = req.body;

        // Validate request body
        if (!Class || !fee) {
            return res.status(400).json({ message: 'Class and fee are required' });
        }

        const newFee = new Fee({ 
            Class,
            fee
        });

        await newFee.save();
        res.status(201).json({ message: 'Fee created successfully', fee: newFee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Get all fee records
exports.getAllFees = async (req, res) => {
    try {
        const fees = await Fee.find();
        res.status(200).json({
            message: 'Fees retrieved successfully',
            fees,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Get a fee record by ID
exports.getFeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const fee = await Fee.findById(id);
        if (!fee) {
            return res.status(404).json({ message: 'Fee record not found' });
        }

        res.status(200).json({ message: 'Fee retrieved successfully', fee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Update a fee record by ID
exports.updateFee = async (req, res) => {
    try {
        const { id } = req.params;
        const { class: className, fee } = req.body;

        // Find and update the fee record
        const updatedFee = await Fee.findByIdAndUpdate(
            id,
            { class: className, fee },
            { new: true, runValidators: true } // Return the updated document and validate inputs
        );

        if (!updatedFee) {
            return res.status(404).json({ message: 'Fee record not found' });
        }

        res.status(200).json({ message: 'Fee updated successfully', fee: updatedFee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Delete a fee record by ID
exports.deleteFee = async (req, res) => {
    try {
        const { id } = req.params;

        const fee = await Fee.findById(id);
        if (!fee) {
            return res.status(404).json({ message: 'Fee record not found' });
        }

        await fee.deleteOne();
        res.status(200).json({ message: 'Fee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

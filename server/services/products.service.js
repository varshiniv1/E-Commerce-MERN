import { Product } from '../models/product.js';
import { ApiError } from '../middleware/apiError.js';
import pkg from 'http-status'; // Use default import
const { NOT_FOUND } = pkg; // Destructure the required constants
import { Types } from 'mongoose';

import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: 'dkr4tsz17',
    api_key: '398887312889856',
    api_secret:`${process.env.CN_API_SECRET}`
});

const addProduct = async (body) => {
    try {
        const product = new Product({
            ...body
        });
        await product.save();
        return product;
    } catch (error) {
        throw error;
    }
};

// Get product by ID
const getProductById = async (_id) => {
    try {
        const product = await Product.findById(_id).populate('brand');
        if (!product) throw new ApiError(NOT_FOUND, 'Product not found');
        return product;
    } catch (error) {
        throw error;
    }
};

// Update product by ID
const updateProductById = async (_id, body) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id },
            { "$set": body },
            { new: true } // Return the updated document
        );
        if (!product) throw new ApiError(NOT_FOUND, 'Product not found');
        return product;
    } catch (error) {
        throw error;
    }
};

// Delete product by ID
const deleteProductById = async (_id) => {
    try {
        const product = await Product.findByIdAndDelete(_id);
        if (!product) throw new ApiError(NOT_FOUND, 'Product not found');
        return product;
    } catch (error) {
        throw error;
    }
};

// Get all products
const allProducts = async (req) => {
    try {
        const products = await Product
            .find({})
            .populate('brand')
            .sort([
                [req.query.sortBy, req.query.order]
            ])
            .limit(parseInt(req.query.limit));

        return products;
    } catch (error) {
        throw error;
    }
};

// Paginate products
const paginateProducts = async (req) => {
    try {
        let aggQueryArray = [];

        if (req.body.keywords && req.body.keywords !== '') {
            const re = new RegExp(`${req.body.keywords}`, 'gi');
            aggQueryArray.push({
                $match: { model: { $regex: re } }
            });
        }

        if (req.body.brand && req.body.brand.length > 0) {
            let newBrandsArray = req.body.brand.map((item) => (
                Types.ObjectId(item)
            ));
            aggQueryArray.push({
                $match: { brand: { $in: newBrandsArray } }
            });
        }

        if (req.body.frets && req.body.frets.length > 0) {
            aggQueryArray.push({
                $match: { frets: { $in: req.body.frets } }
            });
        }

        if ((req.body.min && req.body.min > 0) || (req.body.max && req.body.max < 5000)) {
            if (req.body.min) {
                aggQueryArray.push({ $match: { price: { $gt: req.body.min } } });
            }
            if (req.body.max) {
                aggQueryArray.push({ $match: { price: { $lt: req.body.max } } });
            }
        }

        aggQueryArray.push(
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            { $unwind: '$brand' }
        );

        console.log(aggQueryArray);

        let aggQuery = Product.aggregate(aggQueryArray);
        const options = {
            page: req.body.page,
            limit: 6,
            sort: { date: 'desc' }
        };
        const products = await Product.aggregatePaginate(aggQuery, options);
        return products;
    } catch (error) {
        throw error;
    }
};
const picUpload = async(req) => {
    try{
        const upload = await cloudinary.uploader.upload(req.files.file.path,{
            public_id:`${Date.now()}`,
            folder:'waves_upload'
        });

        return {
            public_id: upload.public_id,
            url: upload.url
        }
    } catch(error){
        throw error
    }
}

export default {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    allProducts,
    paginateProducts,
    picUpload
};
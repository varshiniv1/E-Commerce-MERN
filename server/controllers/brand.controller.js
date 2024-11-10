import { addBrand as addBrandService, getBrandById, deleteBrandById, getBrands } from '../services/brand.service.js'; // Import with alias if necessary
import httpStatus from 'http-status';
import { ApiError } from '../middleware/apiError.js';

const brandController = { 
    async addBrand(req, res, next) {
        try {
            const brand = await addBrandService(req.body.brandname); // Use the imported service function
            res.json(brand);
        } catch (error) {
            next(error);
        }
    },
    async getBrand(req, res, next) {
        try {
            const id = req.params.id;
            const brand = await getBrandById(id);
            if (!brand) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
            }
            res.json(brand);
        } catch (error) {
            next(error);
        }
    },
    async deleteBrandById(req, res, next) {
        try {
            const id = req.params.id;
            const brand = await deleteBrandById(id);
            if (!brand) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
            }
            res.json(brand);
        } catch (error) {
            next(error);
        }
    },
    async getBrands(req, res, next) {
        try {
            const brands = await getBrands(req.body);
            res.json(brands);
        } catch (error) {
            next(error);
        }
    }
};

export default brandController; // Make sure this line is present

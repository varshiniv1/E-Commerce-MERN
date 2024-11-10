import { Brand } from '../models/brand.js';
import { ApiError } from '../middleware/apiError.js';
import httpStatus from 'http-status';

const addBrand = async (brandname) => {
    try {
        const brand = new Brand({
            name: brandname
        });
        await brand.save();
        return brand;
    } catch (error) {
        throw error;
    }
}

const getBrandById = async (id) => {
    try {
        const brand = await Brand.findById(id);
        if (!brand) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
        return brand;
    } catch (error) {
        throw error;
    }
}

const deleteBrandById = async (id) => {
    try {
        const brand = await Brand.findByIdAndRemove(id);
        return brand;
    } catch (error) {
        throw error;
    }
}

const getBrands = async (args) => {
    try {
        let order = args.order ? args.order : "desc";
        let limit = args.limit ? args.limit : 5;

        const brands = await Brand
            .find({})
            .sort([
                ["_id", order]
            ])
            .limit(limit);

        if (!brands) throw new ApiError(httpStatus.NOT_FOUND, 'Brands not found');
        return brands;
    } catch (error) {
        throw error;
    }
}

export {
    addBrand,
    getBrandById,
    deleteBrandById,
    getBrands
};

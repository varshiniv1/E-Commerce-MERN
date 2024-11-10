import { Site } from '../models/site.js';
import { ApiError } from '../middleware/apiError.js';
import httpStatus from 'http-status';

// Get site details
const getSiteArgs = async () => {
    try {
        const sites = await Site.find({});
        if (sites.length === 0) {
            throw new ApiError(httpStatus.NOT_FOUND, 'No sites found');
        }
        return sites; // Return all sites
    } catch (error) {
        console.error("Error fetching sites:", error); // Log the error
        throw error; // Re-throw the error
    }
}

// Create a new site
const postSiteArgs = async (req) => {
    try {
        const site = new Site({ ...req.body });
        await site.save();
        return site;
    } catch (error) {
        console.error("Error creating site:", error); // Log the error
        throw error; // Re-throw the error
    }
}

// Update site details
const updateSiteArgs = async (req) => {
    try {
        const site = await Site.findOneAndUpdate(
            { _id: req.body._id },
            { "$set": req.body },
            { new: true }
        );
        if (!site) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Site not found');
        }
        return site;
    } catch (error) {
        console.error("Error updating site:", error); // Log the error
        throw error; // Re-throw the error
    }
}

// Export named functions
export {
    postSiteArgs,
    getSiteArgs,
    updateSiteArgs
};

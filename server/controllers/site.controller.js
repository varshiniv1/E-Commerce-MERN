import { postSiteArgs, getSiteArgs, updateSiteArgs } from '../services/site.service.js';

const siteController = {
    async postSiteArgs(req, res, next) {
        try {
            const site = await postSiteArgs(req); // Use the service method
            res.status(httpStatus.CREATED).json(site); // Return the created site with a 201 status
        } catch (error) {
            next(error); // Pass the error to the next middleware
        }
    },
    async getSiteArgs(req, res, next) {
        try {
            const sites = await getSiteArgs(); // Call the service method
            res.json(sites); // Return all sites
        } catch (error) {
            next(error); // Pass the error to the next middleware
        }
    },
    async updateSiteArgs(req, res, next) {
        try {
            const site = await updateSiteArgs(req); // Call the service method
            res.json(site); // Return the updated site
        } catch (error) {
            next(error); // Pass the error to the next middleware
        }
    },
};

export default siteController; // Export the controller

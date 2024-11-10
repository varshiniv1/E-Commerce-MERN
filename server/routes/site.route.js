import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import siteController from '../controllers/site.controller.js'; // Make sure to import the controller

router.route('/')
    .get(auth('readAny', 'site'), siteController.getSiteArgs) // Optional: Add auth if required
    .post(auth('createAny', 'site'), siteController.postSiteArgs)
    .patch(auth('updateAny', 'site'), siteController.updateSiteArgs);

export default router;

import { Router } from 'express';
import brandController from '../controllers/brand.controller.js'; // Import the entire controller
const router = Router();

router.post('/add', brandController.addBrand); // Call the function from the controller
router.get('/:id', brandController.getBrand);
router.delete('/:id', brandController.deleteBrandById);
router.get('/', brandController.getBrands);

export default router;

import { Router } from 'express';
import productsController from '../controllers/products.controller.js'; // Import the default export
import auth from '../middleware/auth.js';
import { addProductValidator } from '../middleware/validations.js';
import formidableMiddleware from 'express-formidable';

const router = Router();

router.post('/', auth('createAny', 'product'), addProductValidator, productsController.addProduct);

router.route('/product/:id')
    .get(productsController.getProductById)
    .patch(auth('updateAny', 'product'), productsController.updateProductById)
    .delete(auth('deleteAny', 'product'), productsController.deleteProductById);

router.get('/all', productsController.allProducts);
router.post('/paginate/all', productsController.paginateProducts);
///// UPLOADING IMAGES 
router.post('/upload', auth('createAny','product'),formidableMiddleware(),productsController.picUpload)

export default router;

import express from 'express';
import { uploadLendBook, getMyLendBooks, getAllLendBooks } from '../controllers/lendBook.controller.js';
import { lenderProtect } from '../middlewares/lenderAuth.middleware.js';

const router = express.Router();

// POST /api/lender/upload
router.post('/upload', lenderProtect, uploadLendBook);
router.get('/my-books', lenderProtect, getMyLendBooks);
router.get('/', getAllLendBooks);

export default router;
import LendBook from '../models/lendBook.model.js';

// Upload a book for lending
export const uploadLendBook = async (req, res) => {
  try {
    const { 
      isbn, 
      title, 
      author, 
      description, 
      cover_image, 
      category, 
      condition, 
      rent_price_per_week 
    } = req.body;

    // The lenderId is pulled from the protected route middleware (req.lenderId)
    const newLendBook = new LendBook({
      lenderId: req.lenderId, 
      isbn,
      title,
      author,
      description,
      cover_image, 
      category,
      condition,
      rent_price_per_week
    });

    const savedBook = await newLendBook.save();
    
    res.status(201).json({
      success: true,
      message: "Book listed for lending successfully!",
      book: savedBook
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Get all books uploaded by the specific lender
export const getMyLendBooks = async (req, res) => {
  try {
    // lenderProtect middleware provides req.lenderId
    const books = await LendBook.find({ lenderId: req.lenderId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all available books for rent (Public)
export const getAllLendBooks = async (req, res) => {
  try {
    // Only fetch books where isAvailable is true
    const books = await LendBook.find({ isAvailable: true })
      .populate('lenderId', 'name address') // Optional: get lender info
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      books
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
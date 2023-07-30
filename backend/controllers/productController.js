// Import necessary modules and models
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // Get pagination limit from environment variables
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  // Create a keyword filter for searching products by name
  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  // Count the total number of products with the applied keyword filter
  const count = await Product.countDocuments({ ...keyword });

  // Fetch products with the applied keyword filter, applying pagination
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Return the fetched products and pagination details in the response
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // Find the product by its ID and populate the user details in the response
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    // Return 404 if the product is not found
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // Create a new product with default values and save it to the database
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // Update product details based on the request body and save the changes
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // Find the product by its ID and delete it from the database
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  // Extract rating and comment from the request body
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if the user has already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    // Add the new review to the product's reviews array
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    // Update the number of reviews and average rating of the product
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  // Fetch top-rated products by sorting based on the rating in descending order
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// Export the controller functions to be used in the routes
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};

/*
This code includes several controller functions to handle different product-related operations, such as fetching products, creating, updating, and deleting products, fetching top-rated products, and adding product reviews.
The functions are async functions that use the asyncHandler middleware to handle errors in a centralized way.
getProducts: Fetches all products with optional pagination and search by keyword functionality.
getProductById: Fetches a single product by its ID.
createProduct: Creates a new product with default values and saves it to the database.
updateProduct: Updates the details of a product based on the request body and saves the changes.
deleteProduct: Deletes a product from the database based on its ID.
createProductReview: Adds a new review for a product, updating the product's reviews and rating.
getTopProducts: Fetches the top-rated products by sorting them based on
*/
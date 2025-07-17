import Product from "../models/product.js";

// Optional helper to check admin (replace or improve later)
function isAdmin(req) {
  return req.user && req.user.role === "admin";
}

// ✅ Create product controller
export async function createProduct(req, res) {
  // Access only allowed for admins
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Please login as administrator to add products"
    });
  }

  try {
    const newProductData = req.body;
    const product = new Product(newProductData);
    await product.save();

    res.status(201).json({
      message: "Product created successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// ✅ Get all products controller
export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

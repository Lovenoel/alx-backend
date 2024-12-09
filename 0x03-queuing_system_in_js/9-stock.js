const express = require("express");
const redis = require("redis");
const { promisify } = require("util");

const app = express();
const PORT = 1245;

const listProducts = [
  {
    itemId: 1,
    itemName: "Suitcase 250",
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: "Suitcase 450",
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: "Suitcase 650",
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: "Suitcase 1050",
    price: 550,
    initialAvailableQuantity: 5,
  },
];

// Redis client setup
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

// Helper function to get an item by ID
function getItemById(id) {
  return listProducts.find((product) => product.itemId === id);
}

// Reserve stock for a specific product
function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

// Get current reserved stock
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock ? parseInt(stock, 10) : null;
}


// Returns the list of all products.
app.get("/list_products", (req, res) => {
  res.json(listProducts);
});


// Returns details about a specific product, including current stock.
app.get("/list_products/:itemId", async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.status(404).json({ status: "Product not found" });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentStock =
    reservedStock !== null
      ? product.initialAvailableQuantity - reservedStock
      : product.initialAvailableQuantity;

  res.json({
    ...product,
    currentQuantity: currentStock,
  });
});


// Reserves stock for a product.
app.get("/reserve_product/:itemId", async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.status(404).json({ status: "Product not found" });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentStock =
    reservedStock !== null
      ? product.initialAvailableQuantity - reservedStock
      : product.initialAvailableQuantity;

  if (currentStock <= 0) {
    return res
      .status(400)
      .json({ status: "Not enough stock available", itemId });
  }

  reserveStockById(itemId, (reservedStock || 0) + 1);
  res.json({ status: "Reservation confirmed", itemId });
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

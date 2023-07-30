import mongoose from 'mongoose';

// Create a new Mongoose schema for the 'Order' model
const orderSchema = mongoose.Schema(
  {
    // Define the 'user' field, which is a reference to the 'User' model
    user: {
      type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
      required: true, // It is required (must be provided)
      ref: 'User', // Reference to the 'User' model
    },
    // Define the 'orderItems' field, which is an array of order items
    orderItems: [
      {
        name: { type: String, required: true }, // Name of the ordered item (required)
        qty: { type: Number, required: true }, // Quantity of the ordered item (required)
        image: { type: String, required: true }, // Image URL of the ordered item (required)
        price: { type: Number, required: true }, // Price of the ordered item (required)
        product: {
          type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
          required: true, // It is required (must be provided)
          ref: 'Product', // Reference to the 'Product' model
        },
      },
    ],
    // Define the 'shippingAddress' field, which contains shipping address information
    shippingAddress: {
      address: { type: String, required: true }, // Address (required)
      city: { type: String, required: true }, // City (required)
      postalCode: { type: String, required: true }, // Postal code (required)
      country: { type: String, required: true }, // Country (required)
    },
    // Define the 'paymentMethod' field, which stores the chosen payment method for the order
    paymentMethod: {
      type: String, // Data type is String
      required: true, // It is required (must be provided)
    },
    // Define the 'paymentResult' field, which stores information about the payment result
    paymentResult: {
      id: { type: String }, // ID of the payment
      status: { type: String }, // Status of the payment
      update_time: { type: String }, // Time of payment update
      email_address: { type: String }, // Email address used for payment
    },
    // Define the 'itemsPrice', 'taxPrice', 'shippingPrice', and 'totalPrice' fields, which store the calculated prices for the order
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // Define the 'isPaid' field, which indicates whether the order has been paid or not
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Define the 'paidAt' field, which stores the date when the order was paid
    paidAt: {
      type: Date,
    },
    // Define the 'isDelivered' field, which indicates whether the order has been delivered or not
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Define the 'deliveredAt' field, which stores the date when the order was delivered
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps to the schema
  }
);

// Create a model 'Order' based on the defined schema
const Order = mongoose.model('Order', orderSchema);

// Export the 'Order' model
export default Order;
